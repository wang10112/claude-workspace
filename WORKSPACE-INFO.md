# Claude 工作区说明

这是一个独立纯净的 Claude Code 工作区。

## 来源
从 `/home/zhang/workspace/project` 迁移而来，仅保留 Claude 相关内容。

## 架构
- **共享层** (`shared/`): 能力定义、工作流、记忆
- **Claude 适配层** (`claude/`): Claude 原生格式的配置

## 入口
- Claude Code: 读取 `claude/CLAUDE.md`
- 文档: 从 `README.md` 开始

## 维护
- 新增能力: 先在 `shared/` 定义，再在 `claude/` 适配
- 更新记忆: 修改 `shared/memory/` 中的文件
- 添加技能: 参考 `docs/ADDING-SHARED-SKILLS.md`
