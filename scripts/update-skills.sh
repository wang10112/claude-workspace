#!/bin/bash
#
# 技能更新脚本
#
# 用法:
#   ./scripts/update-skills.sh           # 更新所有技能
#   ./scripts/update-skills.sh skill-name # 更新指定技能
#

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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
}

header() {
    echo -e "${BLUE}===${NC} $1 ${BLUE}===${NC}"
}

# 检查 vendor/skills 目录
VENDOR_DIR="vendor/skills"
if [ ! -d "$VENDOR_DIR" ]; then
    error "vendor/skills 目录不存在"
fi

# 更新单个技能
update_skill() {
    local skill_dir=$1
    local skill_name=$(basename "$skill_dir")

    header "更新技能: $skill_name"

    # 检查是否是 git 仓库
    if [ ! -d "$skill_dir/.git" ]; then
        warn "不是 git 仓库，跳过"
        return
    fi

    # 进入目录
    cd "$skill_dir"

    # 获取当前版本
    local current_version=$(git describe --tags --always 2>/dev/null || echo "unknown")
    info "当前版本: $current_version"

    # 拉取更新
    info "拉取更新..."
    if git pull origin main 2>/dev/null || git pull origin master 2>/dev/null; then
        local new_version=$(git describe --tags --always 2>/dev/null || echo "unknown")

        if [ "$current_version" != "$new_version" ]; then
            info "✅ 更新成功: $current_version -> $new_version"
        else
            info "✅ 已是最新版本"
        fi
    else
        warn "更新失败"
    fi

    # 返回原目录
    cd - > /dev/null
    echo ""
}

# 主逻辑
if [ $# -eq 0 ]; then
    # 更新所有技能
    header "更新所有技能"
    echo ""

    skill_count=0
    for skill_dir in "$VENDOR_DIR"/*; do
        if [ -d "$skill_dir" ]; then
            update_skill "$skill_dir"
            ((skill_count++))
        fi
    done

    info "总计更新 $skill_count 个技能"
else
    # 更新指定技能
    SKILL_NAME=$1
    SKILL_DIR="$VENDOR_DIR/$SKILL_NAME"

    if [ ! -d "$SKILL_DIR" ]; then
        error "技能 '$SKILL_NAME' 不存在"
    fi

    update_skill "$SKILL_DIR"
fi

info "更新完成！"
