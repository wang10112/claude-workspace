# MCP 策略

## 目标

让 MCP 真正帮助编辑器工作流和 AI 运行时，而不是把工作区变成一个过度集成的重型配置仓库。

## 分层

### VS Code 层

`.vscode/mcp.json` 是共享编辑器入口。

它只放对 VS Code Agent 模式、且对两组 AI 都有价值的 MCP。

### Claude 层

Claude 相关 MCP 说明放在 `claude/mcp/`。

重点是说明 Claude 何时应使用 MCP，以及如何与共享能力层协作。

### Codex 层

Codex 相关 MCP 说明放在 `codex/mcp/`，实际启用的运行时配置放在 `codex/config.toml`。

## 当前建议集

### 共享编辑器集

- `openaiDeveloperDocs`

### Codex 运行集

- `openaiDeveloperDocs`
- `github`
- `memory`
- 可选 `playwright`

### Claude 运行集

Claude 当前主要通过：

- 文件记忆层
- Claude 侧 MCP 使用约定
- 编辑器层 MCP

来获得记忆和外部上下文能力。

## 记忆策略

记忆不要只依赖 MCP。

本仓库采用两层记忆：

1. `claude/memory/` 中可审阅、可维护的文件记忆
2. 运行时 memory MCP

这样即使某一侧的 MCP 运行状态变化，项目知识也不会丢失。

## GitHub 职责划分

- VS Code 扩展层：PR 浏览、账号登录、可视化操作
- Claude/Codex 工具层：AI 可调用的仓库上下文
- WSL 终端层：`git`、`gh` 与本地仓库操作

## 经验法则

- 如果一个集成只服务某一组 AI 的运行层，就放到该 AI 自己的目录
- 如果它服务两组 AI 的编辑器体验，就放到 `.vscode/`
- 如果它承载的是项目长期知识，就优先放进 `claude/memory/`
