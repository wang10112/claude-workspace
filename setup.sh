#!/bin/bash
# Claude Workspace 自动配置脚本
# 用于在新电脑上快速配置 Memory 和其他设置

set -e  # 遇到错误立即退出

echo "🚀 开始配置 Claude Workspace..."
echo ""

# 获取工作区路径
WORKSPACE_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKSPACE_MEMORY="$WORKSPACE_DIR/memory"

# 计算 Claude Memory 路径（基于工作区路径）
# Claude 使用项目路径的哈希来组织 Memory
PROJECT_HASH="-home-zhang-workspace-claude-workspace"
CLAUDE_MEMORY_DIR="$HOME/.claude/projects/$PROJECT_HASH/memory"

echo "📁 工作区路径: $WORKSPACE_DIR"
echo "📁 Memory 源路径: $WORKSPACE_MEMORY"
echo "📁 Claude Memory 目标路径: $CLAUDE_MEMORY_DIR"
echo ""

# 检查 memory 目录是否存在
if [ ! -d "$WORKSPACE_MEMORY" ]; then
    echo "❌ 错误: memory 目录不存在"
    echo "   请确保已经从 Git 克隆了完整的仓库"
    exit 1
fi

# 创建 Claude projects 目录
echo "📦 创建 Claude projects 目录..."
mkdir -p "$(dirname "$CLAUDE_MEMORY_DIR")"

# 检查是否已经存在 Memory 配置
if [ -e "$CLAUDE_MEMORY_DIR" ]; then
    echo "⚠️  检测到已存在的 Memory 配置"

    # 如果是符号链接且指向正确位置，跳过
    if [ -L "$CLAUDE_MEMORY_DIR" ] && [ "$(readlink -f "$CLAUDE_MEMORY_DIR")" = "$WORKSPACE_MEMORY" ]; then
        echo "✅ Memory 已正确配置，无需重复设置"
        exit 0
    fi

    # 备份现有配置
    BACKUP_DIR="$CLAUDE_MEMORY_DIR.backup.$(date +%Y%m%d_%H%M%S)"
    echo "📦 备份现有配置到: $BACKUP_DIR"
    mv "$CLAUDE_MEMORY_DIR" "$BACKUP_DIR"
fi

# 创建符号链接
echo "🔗 创建符号链接..."
ln -s "$WORKSPACE_MEMORY" "$CLAUDE_MEMORY_DIR"

# 验证配置
if [ -L "$CLAUDE_MEMORY_DIR" ]; then
    echo ""
    echo "✅ 配置完成！"
    echo ""
    echo "📋 配置摘要:"
    echo "   - Memory 文件: $(ls -1 "$WORKSPACE_MEMORY" | wc -l) 个"
    echo "   - 符号链接: $CLAUDE_MEMORY_DIR -> $WORKSPACE_MEMORY"
    echo ""
    echo "🎉 现在可以使用 Claude Code 了！"
    echo ""
    echo "💡 提示:"
    echo "   - Memory 文件会自动同步到工作区的 memory/ 目录"
    echo "   - 使用 git pull 可以获取最新的 Memory 配置"
    echo "   - 修改 Memory 后记得 git commit && git push"
else
    echo ""
    echo "❌ 配置失败，请检查权限或手动创建符号链接："
    echo "   ln -s $WORKSPACE_MEMORY $CLAUDE_MEMORY_DIR"
    exit 1
fi
