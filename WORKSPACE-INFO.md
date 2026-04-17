# Claude 工作区说明

这是一个独立纯净的 Claude Code 工作区。

## 来源
从 `/home/zhang/workspace/project` 迁移而来，仅保留 Claude 相关内容。

## 架构
- **核心能力层** (`claude/`): 技能、工作流、记忆、角色、playbooks、templates、配置
- **文档层** (`docs/`): 架构文档和使用指南
- **示例层** (`examples/`): 使用示例和学习资源
- **第三方依赖** (`vendor/`): Anthropic 官方技能库

## 入口
- Claude Code: 读取 `CLAUDE.md`
- 文档: 从 `README.md` 开始

## 维护
- 新增能力: 直接在 `claude/` 对应目录创建
- 更新记忆: 修改 `claude/memory/` 中的文件
- 添加技能: 参考 `docs/ADDING-SKILLS.md`
