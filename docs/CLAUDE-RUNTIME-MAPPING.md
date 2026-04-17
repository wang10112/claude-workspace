# Claude 运行映射

## 目的

说明 `project/claude/` 这一层，如何映射到更接近 Claude Code 原生运行方式的结构。

## 为什么需要映射

因为这个仓库是双 AI 总框架，所以 `claude/` 不能直接吞掉整个仓库结构。

因此：

- `claude/` 是学习、组织、维护主层
- 更原生的 Claude Code 运行面，是这层内容的运行时视图

## 核心映射关系

| `project` 中的 Claude 层 | 更原生的 Claude 运行含义 |
|---|---|
| `claude/CLAUDE.md` | Claude 项目入口说明 |
| `claude/skills/` | Claude 可用的 skill 面 |
| `claude/agents/` | Claude 可调用的角色定义 |
| `claude/commands/` | slash-style 工作流入口 |
| `claude/hooks/` | hook 规则、hook 样例、hook 说明 |
| `claude/mcp/` | Claude 侧 MCP 说明 |
| `claude/settings/` | Claude 运行设置说明 |

## 哪些内容继续留在共享层

这些内容仍然属于整个框架，不应被搬进 Claude 专属运行层：

- 根级 `AGENTS.md`
- 根级 `RULES.md`
- `claude/`
- `examples/`
- `docs/`

## 迁移规则

如果未来需要把 `claude/` 的某些内容更贴近真实运行环境：

1. 保持能力定义在 `claude/`
2. 只迁移 Claude 专属 wrapper 或配置
3. 保留它与共享来源之间的关系说明

## 实践原则

把 `project/claude/` 视为作者面与维护面。

把更原生的 Claude 运行布局视为部署面或运行面，而不是另起一套竞争性的系统。
