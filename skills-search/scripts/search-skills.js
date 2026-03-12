#!/usr/bin/env node
/**
 * Skills Search - 多仓库 Skill 搜索工具
 * 按平台分组展示，每个平台返回前5个结果
 */

const https = require('https');
const http = require('http');

const RESULTS_PER_SOURCE = 5;

/**
 * 发送 HTTPS 请求
 */
function httpsRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    const reqOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/html, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
        'Cache-Control': 'no-cache',
        ...options.headers
      }
    };

    const req = protocol.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ data: JSON.parse(data), type: 'json' });
        } catch {
          resolve({ data, type: 'html' });
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end();
  });
}

/**
 * 搜索 skills.netease.com
 */
async function searchNetease(keyword) {
  try {
    const url = `https://skills.netease.com/api/skills?search=${encodeURIComponent(keyword)}&page=1&limit=${RESULTS_PER_SOURCE}&sort=downloads&order=desc`;
    const { data } = await httpsRequest(url, {
      headers: { 'Referer': 'https://skills.netease.com/' }
    });
    
    if (data.data && Array.isArray(data.data)) {
      return data.data.slice(0, RESULTS_PER_SOURCE).map(item => ({
        name: item.name || item.title,
        description: item.description || '暂无描述',
        stars: item.downloads || item.stars || item.download_count || 0,
        author: item.author || item.creator || '',
      }));
    }
    return [];
  } catch (e) {
    return [];
  }
}

/**
 * 搜索 skills.sh
 */
async function searchSkillsSh(keyword) {
  try {
    const url = `https://skills.sh/api/search?q=${encodeURIComponent(keyword)}&limit=50`;
    const { data } = await httpsRequest(url, {
      headers: { 'Referer': 'https://skills.sh/' }
    });
    
    if (Array.isArray(data)) {
      return data.slice(0, RESULTS_PER_SOURCE).map(item => ({
        name: item.name || item.id,
        description: item.description || item.summary || '暂无描述',
        stars: item.downloads || item.installs || item.stars || 0,
        author: item.author || '',
      }));
    }
    return [];
  } catch (e) {
    return [];
  }
}

/**
 * 搜索 skillsmp.com
 */
async function searchSkillsmp(keyword) {
  try {
    const url = `https://skillsmp.com/api/skills?page=1&limit=${RESULTS_PER_SOURCE}&sortBy=stars&search=${encodeURIComponent(keyword)}`;
    const { data } = await httpsRequest(url, {
      headers: {
        'Referer': 'https://skillsmp.com/zh/search',
        'x-search-source': 'search'
      }
    });
    
    if (data.skills && Array.isArray(data.skills)) {
      return data.skills.slice(0, RESULTS_PER_SOURCE).map(item => ({
        name: item.name,
        description: item.description || '暂无描述',
        stars: item.stars || item.downloads || 0,
        author: item.author || '',
      }));
    }
    return [];
  } catch (e) {
    return [];
  }
}

/**
 * 搜索 skills.homes
 */
async function searchSkillsHomes(keyword) {
  try {
    const url = `https://skills.homes/en/search?keyword=${encodeURIComponent(keyword)}`;
    const { data, type } = await httpsRequest(url, {
      headers: { 'Referer': 'https://skills.homes/en' }
    });
    
    if (type === 'html') {
      const results = [];
      const skillRegex = /<div[^>]*class="[^"]*skill-card[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
      const nameRegex = /<h[23][^>]*>([^<]+)<\/h[23]>/i;
      const descRegex = /<p[^>]*class="[^"]*description[^"]*"[^>]*>([^<]+)<\/p>/i;
      
      let match;
      while ((match = skillRegex.exec(data)) !== null && results.length < RESULTS_PER_SOURCE) {
        const card = match[1];
        const nameMatch = nameRegex.exec(card);
        const descMatch = descRegex.exec(card);
        
        if (nameMatch) {
          results.push({
            name: nameMatch[1].trim(),
            description: descMatch ? descMatch[1].trim() : '暂无描述',
            stars: 0,
            author: '',
          });
        }
      }
      return results;
    }
    return [];
  } catch (e) {
    return [];
  }
}

/**
 * 打印平台结果
 */
function printSourceResults(sourceName, sourceUrl, results, globalIndex) {
  console.log(`\n┌─ 📦 ${sourceName}`);
  console.log(`│  🔗 ${sourceUrl}`);
  console.log('│');
  
  if (results.length === 0) {
    console.log('│  ⚪ 无搜索结果');
  } else {
    results.forEach((skill, idx) => {
      const index = globalIndex + idx + 1;
      const stars = skill.stars > 0 ? `⭐ ${skill.stars}` : '';
      console.log(`│  [${index}] ${skill.name} ${stars}`);
      console.log(`│      ${skill.description.substring(0, 50)}${skill.description.length > 50 ? '...' : ''}`);
    });
  }
  
  console.log('└─');
  return results.length;
}

/**
 * 主搜索函数
 */
async function searchAllSources(keyword) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  🔍 正在搜索: "${keyword}"`);
  console.log(`${'═'.repeat(60)}`);
  console.log('\n⏳ 正在查询各个 Skill 仓库...');
  
  const results = await Promise.allSettled([
    searchNetease(keyword),
    searchSkillsSh(keyword),
    searchSkillsmp(keyword),
    searchSkillsHomes(keyword)
  ]);
  
  const sources = [
    { name: 'skills.netease.com', url: 'https://skills.netease.com', note: '(网易内部)' },
    { name: 'skills.sh', url: 'https://skills.sh', note: '(官方)' },
    { name: 'skillsmp.com', url: 'https://skillsmp.com', note: '(市场)' },
    { name: 'skills.homes', url: 'https://skills.homes', note: '(社区)' }
  ];
  
  const allSkills = [];
  let globalIndex = 0;
  
  console.log(`\n${'─'.repeat(60)}`);
  console.log('  📋 搜索结果 (按平台分组，每平台最多5个)');
  console.log(`${'─'.repeat(60)}`);
  
  results.forEach((result, index) => {
    const source = sources[index];
    const skills = result.status === 'fulfilled' ? result.value : [];
    
    const count = printSourceResults(
      `${source.name} ${source.note}`,
      source.url,
      skills,
      globalIndex
    );
    
    // 记录全局索引
    skills.forEach((skill, idx) => {
      allSkills.push({
        globalIndex: globalIndex + idx + 1,
        source: source.name,
        ...skill
      });
    });
    
    globalIndex += count;
  });
  
  // 统计信息
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`  📊 共找到 ${allSkills.length} 个 Skills`);
  console.log(`${'─'.repeat(60)}`);
  
  if (allSkills.length > 0) {
    console.log('\n💡 安装方式:');
    console.log('   npx skills install <skill-name>\n');
  }
  
  // 输出 JSON 格式供程序解析
  console.log('---JSON_OUTPUT_START---');
  console.log(JSON.stringify(allSkills, null, 2));
  console.log('---JSON_OUTPUT_END---');
  
  return allSkills;
}

// 主程序入口
async function main() {
  const keyword = process.argv[2];
  
  if (!keyword) {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    🔍 Skills Search                           ║
║                  多仓库 Skill 搜索工具                         ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  用法: node scripts/search-skills.js <搜索词>                 ║
║                                                              ║
║  示例:                                                       ║
║    node scripts/search-skills.js popo                        ║
║    node scripts/search-skills.js react                       ║
║    node scripts/search-skills.js typescript                  ║
║                                                              ║
║  支持的仓库:                                                 ║
║    1. skills.netease.com (网易内部)                          ║
║    2. skills.sh          (官方)                              ║
║    3. skillsmp.com       (市场)                              ║
║    4. skills.homes       (社区)                              ║
║                                                              ║
║  每个仓库返回前 5 个结果，按 stars/downloads 排序            ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
    `);
    process.exit(1);
  }
  
  try {
    await searchAllSources(keyword);
  } catch (error) {
    console.error('❌ 搜索出错:', error.message);
    process.exit(1);
  }
}

main();
