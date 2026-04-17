#!/bin/bash
#
# 记忆索引和搜索工具
#
# 用法:
#   ./scripts/memory-index.sh build    # 构建索引
#   ./scripts/memory-index.sh search <keyword>  # 搜索记忆
#   ./scripts/memory-index.sh list     # 列出所有记忆
#   ./scripts/memory-index.sh stats    # 统计信息
#

set -e

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

header() {
    echo -e "${BLUE}===${NC} $1 ${BLUE}===${NC}"
}

MEMORY_DIR="claude/memory"
INDEX_FILE="$MEMORY_DIR/.index.json"

# 构建索引
build_index() {
    header "构建记忆索引"

    echo "{"
    echo "  \"updated\": \"$(date -Iseconds)\","
    echo "  \"memories\": ["

    first=true
    for file in $(find "$MEMORY_DIR" -name "*.md" -type f | sort); do
        if [ "$first" = true ]; then
            first=false
        else
            echo ","
        fi

        # 提取文件信息
        filename=$(basename "$file")
        filepath=$(realpath --relative-to="$MEMORY_DIR" "$file")

        # 提取标题
        title=$(head -1 "$file" | sed 's/^# //')

        # 提取标签（如果有）
        tags=$(grep -o '#[a-zA-Z0-9_-]*' "$file" | sort -u | tr '\n' ',' | sed 's/,$//')

        # 统计行数
        lines=$(wc -l < "$file")

        # 最后修改时间
        modified=$(stat -c %Y "$file")

        echo -n "    {"
        echo -n "\"file\":\"$filepath\","
        echo -n "\"title\":\"$title\","
        echo -n "\"tags\":\"$tags\","
        echo -n "\"lines\":$lines,"
        echo -n "\"modified\":$modified"
        echo -n "}"
    done

    echo ""
    echo "  ]"
    echo "}"

    info "索引已构建"
}

# 搜索记忆
search_memory() {
    local keyword=$1

    if [ -z "$keyword" ]; then
        echo "用法: $0 search <keyword>"
        exit 1
    fi

    header "搜索记忆: $keyword"
    echo ""

    # 搜索文件名
    echo "📁 文件名匹配:"
    find "$MEMORY_DIR" -name "*$keyword*.md" -type f | while read file; do
        echo "  - $(realpath --relative-to="$MEMORY_DIR" "$file")"
    done
    echo ""

    # 搜索内容
    echo "📝 内容匹配:"
    grep -r -i -n "$keyword" "$MEMORY_DIR" --include="*.md" | while IFS=: read file line content; do
        filename=$(realpath --relative-to="$MEMORY_DIR" "$file")
        echo "  - $filename:$line"
        echo "    $(echo "$content" | sed 's/^[[:space:]]*//')"
    done
}

# 列出所有记忆
list_memories() {
    header "所有记忆"
    echo ""

    echo "核心记忆 (core):"
    find "$MEMORY_DIR" -maxdepth 1 -name "*.md" -type f | sort | while read file; do
        title=$(head -1 "$file" | sed 's/^# //')
        lines=$(wc -l < "$file")
        echo "  - $title ($lines 行)"
    done
    echo ""

    echo "自动记忆 (auto):"
    for category in patterns decisions learnings; do
        echo "  $category/:"
        find "$MEMORY_DIR/auto/$category" -name "*.md" -type f 2>/dev/null | sort | while read file; do
            title=$(head -1 "$file" | sed 's/^# //')
            echo "    - $title"
        done
    done
}

# 统计信息
show_stats() {
    header "记忆统计"
    echo ""

    # 核心记忆
    core_count=$(find "$MEMORY_DIR" -maxdepth 1 -name "*.md" -type f | wc -l)
    core_lines=$(find "$MEMORY_DIR" -maxdepth 1 -name "*.md" -type f -exec wc -l {} + | tail -1 | awk '{print $1}')

    # 自动记忆
    auto_count=$(find "$MEMORY_DIR/auto" -name "*.md" -type f 2>/dev/null | wc -l)
    auto_lines=$(find "$MEMORY_DIR/auto" -name "*.md" -type f -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}')

    # 总计
    total_count=$((core_count + auto_count))
    total_lines=$((core_lines + auto_lines))

    echo "核心记忆:"
    echo "  文件数: $core_count"
    echo "  总行数: $core_lines"
    echo ""

    echo "自动记忆:"
    echo "  文件数: $auto_count"
    echo "  总行数: $auto_lines"
    echo ""

    echo "总计:"
    echo "  文件数: $total_count"
    echo "  总行数: $total_lines"
    echo ""

    # 按类别统计
    echo "自动记忆分类:"
    for category in patterns decisions learnings; do
        count=$(find "$MEMORY_DIR/auto/$category" -name "*.md" -type f 2>/dev/null | wc -l)
        echo "  $category: $count"
    done
}

# 主逻辑
case "${1:-}" in
    build)
        build_index > "$INDEX_FILE"
        ;;
    search)
        search_memory "$2"
        ;;
    list)
        list_memories
        ;;
    stats)
        show_stats
        ;;
    *)
        echo "用法: $0 {build|search|list|stats}"
        echo ""
        echo "命令:"
        echo "  build          - 构建记忆索引"
        echo "  search <word>  - 搜索记忆"
        echo "  list           - 列出所有记忆"
        echo "  stats          - 显示统计信息"
        exit 1
        ;;
esac
