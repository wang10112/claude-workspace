# 记忆策略

## 目标

让 Claude 和 Codex 都拥有真正可用的记忆能力，同时避免项目知识只存在于某个运行时工具里。

## 两层记忆模型

### 1. 文件记忆层

主目录：

- `shared/memory/`

它负责保存：

- 用户长期偏好
- 工作区长期记忆
- 模块记忆
- 语言与文档习惯

这是可审阅、可维护、可迁移的记忆层。

### 2. 运行时记忆层

负责让 AI 在运行时能直接调用 memory 工具。

当前策略：

- Codex：启用 `memory` MCP
- Claude：通过文件记忆层 + Claude 侧 memory 使用约定补齐；后续如有稳定运行配置，再映射到更原生的 Claude 运行面

## 为什么不用单层

如果只用 MCP memory：

- 知识不容易审阅
- 迁移仓库时容易丢
- 不方便人工维护

如果只用文件记忆：

- 运行时调用不够顺手
- 不利于工具型查询

所以本仓库坚持两层都要。

## 当前文件记忆布局

- `shared/memory/README.md`
- `shared/memory/workspace-memory.md`
- `shared/memory/user-preferences.md`
- `shared/memory/formal-writing-memory.md`

## 规则

- 长期偏好写入 `shared/memory/user-preferences.md`
- 工作区长期规则性知识写入 `shared/memory/workspace-memory.md`
- 模块经验写入对应模块 memory 文件
- 不要把 `tmp/`、聊天消息、一次性草稿当作长期记忆
