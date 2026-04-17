# Vendor 目录

存放第三方依赖（技能、agents、工具等）。

## 目录结构

```
vendor/
├── README.md          # 本文件
├── skills/            # 第三方技能
│   └── humanizer/    # AI 写作风格去除工具
├── agents/            # 第三方 agents（未来）
└── tools/             # 第三方工具（未来）
```

## 设计原则

1. **长期主义** - 提前规划目录结构，避免后期重构
2. **分类清晰** - 按类型组织（skills/agents/tools）
3. **易于管理** - 每个依赖独立目录
4. **版本控制** - 使用 git submodule 或记录版本信息

## 第三方 Skills

### humanizer
- **路径**: `vendor/skills/humanizer/`
- **来源**: https://github.com/blader/humanizer.git
- **版本**: 2.5.1
- **用途**: 移除 AI 写作痕迹（基于维基百科 29 种模式）
- **调用**: `/humanizer` 或 Claude 自动判断

## 安装第三方依赖

### 方式一：使用安装脚本（推荐）
```bash
# 安装技能
./scripts/install-skill.sh https://github.com/user/skill-name.git

# 指定技能名
./scripts/install-skill.sh https://github.com/user/skill-name.git my-skill
```

### 方式二：Git Clone
```bash
cd vendor/skills
git clone https://github.com/user/skill-name.git
```

### 方式三：Git Submodule（团队协作）
```bash
git submodule add https://github.com/user/skill-name.git vendor/skills/skill-name
```

### 方式四：手动下载
下载后解压到对应目录。

## 更新第三方依赖

### 使用更新脚本（推荐）
```bash
# 更新所有技能
./scripts/update-skills.sh

# 更新指定技能
./scripts/update-skills.sh humanizer
```

### 手动更新

```bash
# 更新单个依赖
cd vendor/skills/humanizer
git pull

# 更新所有 submodules
git submodule update --remote
```

## 依赖清单

| 名称 | 类型 | 版本 | 来源 | 状态 |
|------|------|------|------|------|
| humanizer | skill | 2.5.1 | GitHub | ✅ 已安装 |

## 添加新依赖

1. 确定依赖类型（skill/agent/tool）
2. 克隆到对应目录
3. 更新本 README 的依赖清单
4. 测试依赖是否正常工作
5. 提交到 git（如果使用 submodule）

## 依赖管理最佳实践

1. **记录版本** - 在依赖清单中记录版本号
2. **定期更新** - 每月检查依赖更新
3. **测试兼容性** - 更新后测试是否正常工作
4. **文档完整** - 记录依赖的用途和配置
5. **安全审查** - 审查第三方代码的安全性

## 卸载依赖

```bash
# 删除目录
rm -rf vendor/skills/skill-name

# 如果是 submodule
git submodule deinit vendor/skills/skill-name
git rm vendor/skills/skill-name
```

## 故障排查

### 依赖无法调用
1. 检查路径是否正确
2. 检查 SKILL.md 的 frontmatter 配置
3. 检查 Claude Code 是否识别到该技能

### 依赖冲突
1. 检查是否有同名依赖
2. 使用命名空间（如 `vendor-humanizer`）
3. 更新 CLAUDE.md 中的路径引用

## 相关文档

- [添加技能指南](../docs/ADDING-SHARED-SKILLS.md)
- [技能开发规范](../docs/SKILL-DEVELOPMENT.md)
- [依赖安全审查](../docs/SECURITY-REVIEW.md)
