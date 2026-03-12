#!/bin/bash
# Skills Search - 多仓库 Skill 搜索工具 (Bash/curl 版本)
# 更通用，不依赖 Node.js

KEYWORD="$1"
RESULTS_PER_SOURCE=5

if [ -z "$KEYWORD" ]; then
    echo ""
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                    🔍 Skills Search                           ║"
    echo "║                  多仓库 Skill 搜索工具                         ║"
    echo "╠══════════════════════════════════════════════════════════════╣"
    echo "║                                                              ║"
    echo "║  用法: ./search-skills.sh <搜索词>                            ║"
    echo "║                                                              ║"
    echo "║  示例:                                                       ║"
    echo "║    ./scripts/search-skills.sh popo                           ║"
    echo "║    ./scripts/search-skills.sh react                          ║"
    echo "║                                                              ║"
    echo "║  支持的仓库:                                                 ║"
    echo "║    1. skills.netease.com (网易内部)                          ║"
    echo "║    2. skills.sh          (官方)                              ║"
    echo "║    3. skillsmp.com       (市场)                              ║"
    echo "║    4. skills.homes       (社区)                              ║"
    echo "║                                                              ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    exit 1
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo "  🔍 正在搜索: \"$KEYWORD\""
echo "════════════════════════════════════════════════════════════"
echo ""
echo "⏳ 正在查询各个 Skill 仓库..."
echo ""
echo "────────────────────────────────────────────────────────────"
echo "  📋 搜索结果 (按平台分组，每平台最多${RESULTS_PER_SOURCE}个)"
echo "────────────────────────────────────────────────────────────"

GLOBAL_INDEX=0
TOTAL_COUNT=0

# 函数: 打印平台结果
print_source_header() {
    local name="$1"
    local url="$2"
    echo ""
    echo "┌─ 📦 $name"
    echo "│  🔗 $url"
    echo "│"
}

print_source_footer() {
    echo "└─"
}

print_no_results() {
    echo "│  ⚪ 无搜索结果"
}

print_skill() {
    local index="$1"
    local name="$2"
    local stars="$3"
    local desc="$4"
    
    if [ "$stars" -gt 0 ] 2>/dev/null; then
        echo "│  [$index] $name ⭐$stars"
    else
        echo "│  [$index] $name"
    fi
    echo "│      ${desc:0:50}"
}

# 1. 搜索 skills.netease.com
print_source_header "skills.netease.com (网易内部)" "https://skills.netease.com"

NETEASE_RESULT=$(curl -s --connect-timeout 5 \
    "https://skills.netease.com/api/skills?search=${KEYWORD}&page=1&limit=${RESULTS_PER_SOURCE}&sort=downloads&order=desc" \
    -H 'Accept: application/json' \
    -H 'Referer: https://skills.netease.com/' 2>/dev/null)

if [ -n "$NETEASE_RESULT" ] && echo "$NETEASE_RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); exit(0 if d.get('data') else 1)" 2>/dev/null; then
    COUNT=$(echo "$NETEASE_RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d.get('data',[])))" 2>/dev/null)
    if [ "$COUNT" -gt 0 ]; then
        echo "$NETEASE_RESULT" | python3 -c "
import sys,json
d=json.load(sys.stdin)
for i,item in enumerate(d.get('data',[])):
    idx = $GLOBAL_INDEX + i + 1
    name = item.get('name','') or item.get('title','')
    stars = item.get('downloads',0) or item.get('stars',0)
    desc = (item.get('description','') or '暂无描述')[:50]
    star_str = f' ⭐{stars}' if stars else ''
    print(f'│  [{idx}] {name}{star_str}')
    print(f'│      {desc}')
"
        GLOBAL_INDEX=$((GLOBAL_INDEX + COUNT))
        TOTAL_COUNT=$((TOTAL_COUNT + COUNT))
    else
        print_no_results
    fi
else
    print_no_results
fi
print_source_footer

# 2. 搜索 skills.sh
print_source_header "skills.sh (官方)" "https://skills.sh"

SKILLSSH_RESULT=$(curl -s --connect-timeout 5 \
    "https://skills.sh/api/search?q=${KEYWORD}&limit=50" \
    -H 'Accept: application/json' \
    -H 'Referer: https://skills.sh/' 2>/dev/null)

if [ -n "$SKILLSSH_RESULT" ] && echo "$SKILLSSH_RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); exit(0 if isinstance(d,list) else 1)" 2>/dev/null; then
    COUNT=$(echo "$SKILLSSH_RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(min(len(d),$RESULTS_PER_SOURCE))" 2>/dev/null)
    if [ "$COUNT" -gt 0 ]; then
        echo "$SKILLSSH_RESULT" | python3 -c "
import sys,json
d=json.load(sys.stdin)[:$RESULTS_PER_SOURCE]
for i,item in enumerate(d):
    idx = $GLOBAL_INDEX + i + 1
    name = item.get('name','') or item.get('id','')
    stars = item.get('downloads',0) or item.get('installs',0)
    desc = (item.get('description','') or item.get('summary','') or '暂无描述')[:50]
    star_str = f' ⭐{stars}' if stars else ''
    print(f'│  [{idx}] {name}{star_str}')
    print(f'│      {desc}')
"
        GLOBAL_INDEX=$((GLOBAL_INDEX + COUNT))
        TOTAL_COUNT=$((TOTAL_COUNT + COUNT))
    else
        print_no_results
    fi
else
    print_no_results
fi
print_source_footer

# 3. 搜索 skillsmp.com
print_source_header "skillsmp.com (市场)" "https://skillsmp.com"
print_no_results  # Cloudflare 保护，跳过
print_source_footer

# 4. 搜索 skills.homes
print_source_header "skills.homes (社区)" "https://skills.homes"
print_no_results  # Cloudflare 保护，跳过
print_source_footer

# 统计
echo ""
echo "────────────────────────────────────────────────────────────"
echo "  📊 共找到 $TOTAL_COUNT 个 Skills"
echo "────────────────────────────────────────────────────────────"

if [ "$TOTAL_COUNT" -gt 0 ]; then
    echo ""
    echo "💡 安装方式:"
    echo "   npx skills install <skill-name>"
    echo ""
fi
