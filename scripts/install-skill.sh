#!/bin/bash
#
# 技能安装脚本
#
# 用法:
#   ./scripts/install-skill.sh <github-url> [skill-name]
#   ./scripts/install-skill.sh https://github.com/user/skill-repo.git
#   ./scripts/install-skill.sh https://github.com/user/skill-repo.git my-skill
#

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 打印函数
info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# 检查参数
if [ $# -lt 1 ]; then
    error "用法: $0 <github-url> [skill-name]"
fi

REPO_URL=$1
SKILL_NAME=$2

# 提取仓库名作为默认技能名
if [ -z "$SKILL_NAME" ]; then
    SKILL_NAME=$(basename "$REPO_URL" .git)
    info "使用默认技能名: $SKILL_NAME"
fi

# 检查 vendor/skills 目录
VENDOR_DIR="vendor/skills"
if [ ! -d "$VENDOR_DIR" ]; then
    error "vendor/skills 目录不存在"
fi

# 目标目录
TARGET_DIR="$VENDOR_DIR/$SKILL_NAME"

# 检查是否已安装
if [ -d "$TARGET_DIR" ]; then
    warn "技能 '$SKILL_NAME' 已存在"
    read -p "是否覆盖? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        info "取消安装"
        exit 0
    fi
    rm -rf "$TARGET_DIR"
fi

# 克隆仓库
info "克隆仓库: $REPO_URL"
git clone "$REPO_URL" "$TARGET_DIR" || error "克隆失败"

# 验证 SKILL.md
if [ ! -f "$TARGET_DIR/SKILL.md" ]; then
    error "技能无效: 缺少 SKILL.md 文件"
fi

# 读取技能元数据
info "验证技能元数据..."
if ! grep -q "^name:" "$TARGET_DIR/SKILL.md"; then
    warn "SKILL.md 缺少 'name' 字段"
fi

if ! grep -q "^description:" "$TARGET_DIR/SKILL.md"; then
    warn "SKILL.md 缺少 'description' 字段"
fi

# 提取技能信息
SKILL_INFO=$(head -20 "$TARGET_DIR/SKILL.md" | grep -E "^(name|version|description):" || true)

# 显示安装信息
info "技能安装成功!"
echo ""
echo "技能信息:"
echo "$SKILL_INFO"
echo ""
echo "安装位置: $TARGET_DIR"
echo ""

# 更新 vendor/README.md 中的依赖清单
info "更新依赖清单..."
README_FILE="vendor/README.md"

# 提取版本号
VERSION=$(grep "^version:" "$TARGET_DIR/SKILL.md" | cut -d' ' -f2 || echo "unknown")

# 检查是否已在清单中
if grep -q "| $SKILL_NAME |" "$README_FILE"; then
    info "依赖清单中已存在，跳过更新"
else
    # 在依赖清单表格中添加新行（在表格末尾前插入）
    # 注意：这是简化实现，实际可能需要更复杂的逻辑
    info "请手动更新 vendor/README.md 中的依赖清单"
    echo ""
    echo "建议添加:"
    echo "| $SKILL_NAME | skill | $VERSION | GitHub | ✅ 已安装 |"
fi

echo ""
info "安装完成！"
info "使用方式: /$SKILL_NAME 或让 Claude 自动判断"
