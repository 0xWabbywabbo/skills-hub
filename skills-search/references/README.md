# Skills Search 使用指南

## 📖 简介

Skills Search 是一个多仓库 Skill 搜索工具，可以同时从多个 Skill 仓库中搜索并帮助用户安装所需的 Skills。

## 🏪 支持的仓库

| 仓库 | 网址 | 说明 |
|------|------|------|
| **skills.netease.com** | https://skills.netease.com | 网易内部 Skill 仓库（需内网访问） |
| **skills.sh** | https://skills.sh | 官方 Skill 仓库 |
| **skillsmp.com** | https://skillsmp.com | Skill 市场 |
| **skills.homes** | https://skills.homes | 社区 Skill 仓库 |

## 🚀 快速开始

### 1. 搜索 Skills

```bash
# 进入项目目录
cd /path/to/skills-search

# 执行搜索
node scripts/search-skills.js <搜索词>
```

### 2. 示例

```bash
# 搜索 POPO 相关的 Skills
node scripts/search-skills.js popo

# 搜索 React 相关的 Skills
node scripts/search-skills.js react

# 搜索 TypeScript 相关的 Skills
node scripts/search-skills.js typescript
```

### 3. 安装 Skill

找到需要的 Skill 后，使用以下命令安装：

```bash
npx skills install <skill-name>
```

## 📋 输出格式

搜索结果包含以下信息：

| 字段 | 说明 |
|------|------|
| `name` | Skill 名称 |
| `source` | 来源仓库 |
| `description` | Skill 描述 |
| `downloads` | 下载量 |
| `installCmd` | 安装命令 |

## ⚠️ 注意事项

1. **网络限制**: 部分外部仓库（skillsmp.com、skills.homes）有 Cloudflare 保护，直接 API 调用可能被拦截
2. **内网访问**: skills.netease.com 需要在公司内网环境访问
3. **超时设置**: 每个请求超时时间为 10 秒

## 🔧 故障排除

### 问题：所有仓库都无结果

**可能原因**：
- 网络连接问题
- Cloudflare 拦截
- 搜索词过于特殊

**解决方案**：
1. 检查网络连接
2. 尝试更通用的搜索词
3. 直接访问仓库网站手动搜索

### 问题：安装失败

**解决方案**：
```bash
# 确保 npx 可用
npm install -g npx

# 重试安装
npx skills install <skill-name>
```

## 📁 项目结构

```
skills-search/
├── SKILL.md                 # Skill 主文件
├── scripts/
│   └── search-skills.js     # 搜索脚本
└── references/
    └── README.md            # 使用指南（本文档）
```

## 📚 相关链接

- [Skills 官方文档](https://skills.sh/docs)
- [网易 Skills 平台](https://skills.netease.com)
- [Skill 开发指南](https://skills.sh/docs/create)

## 🔄 更新日志

### v1.0.0 (2026-03-11)
- 初始版本
- 支持 4 个 Skill 仓库搜索
- 按下载量排序，返回 Top 5 结果
- 提供安装命令指引
