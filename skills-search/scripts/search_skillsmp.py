#!/usr/bin/env python3
"""
skillsmp.com 搜索脚本
使用 curl_cffi 绕过 Cloudflare 保护

依赖安装: pip install curl_cffi
"""

import sys
import json

# 环境检测
def check_environment():
    """检测 curl_cffi 是否已安装"""
    try:
        from curl_cffi import requests
        return True, requests
    except ImportError:
        return False, None


def print_install_guide():
    """输出安装指南"""
    print("  ⚠️ 缺少依赖: curl_cffi")
    print("")
    print("  📦 安装方式:")
    print("  ┌────────────────────────────────────────┐")
    print("  │  pip install curl_cffi                │")
    print("  │  # 或使用 pip3                         │")
    print("  │  pip3 install curl_cffi               │")
    print("  └────────────────────────────────────────┘")
    print("")
    print("  💡 curl_cffi 用于绕过 Cloudflare 保护")
    print("     安装后重新运行搜索即可")


def search_skillsmp(requests_module, keyword: str, limit: int = 5):
    """
    搜索 skillsmp.com 上的 skills
    
    Args:
        requests_module: curl_cffi.requests 模块
        keyword: 搜索关键词
        limit: 返回数量限制
    
    Returns:
        list: skill 列表
    """
    url = f"https://skillsmp.com/api/skills?page=1&limit={limit}&sortBy=stars&search={keyword}"
    
    headers = {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        "referer": "https://skillsmp.com/zh/search",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
        "x-search-source": "search",
    }
    
    try:
        response = requests_module.get(
            url, 
            headers=headers, 
            impersonate="chrome",
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            return data.get("skills", [])
        else:
            print(f"  ⚠️ HTTP 错误: {response.status_code}", file=sys.stderr)
            return []
            
    except Exception as e:
        print(f"  ⚠️ 请求失败: {e}", file=sys.stderr)
        return []


def main():
    if len(sys.argv) < 2:
        print("Usage: python search_skillsmp.py <keyword>")
        print("Example: python search_skillsmp.py apple")
        sys.exit(1)
    
    keyword = sys.argv[1]
    
    print(f"📦 skillsmp.com (Top 5 - 按 stars 排序)")
    
    # 环境检测
    has_curl_cffi, requests_module = check_environment()
    
    if not has_curl_cffi:
        print_install_guide()
        sys.exit(0)
    
    # 执行搜索
    skills = search_skillsmp(requests_module, keyword, limit=5)
    
    if not skills:
        print("  ⚠️ 无结果")
        return
    
    for i, skill in enumerate(skills, 1):
        name = skill.get("name", "?")
        stars = skill.get("stars", 0)
        author = skill.get("author", "?")
        desc = skill.get("description", "")[:50]
        print(f"  {i}. {name} ⭐{stars} (by {author})")
        if desc:
            print(f"     {desc}...")


if __name__ == "__main__":
    main()
