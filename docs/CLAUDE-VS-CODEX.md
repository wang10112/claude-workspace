# Claude 与 Codex 的关系

## 共同点

两组 AI 应当共享这些顶层语义：

- 工作区目的
- 能力名称
- 顶层规则
- 共享 workflow 边界
- 统一输出目录
- 统一长期记忆层

## 差异点

| 主题 | Claude 层 | Codex 层 |
|---|---|---|
| 主入口 | `claude/CLAUDE.md` | `codex/AGENTS.md` |
| 技能面 | Claude 风格 wrapper | Codex 风格 wrapper |
| 角色面 | Markdown 角色文件 | TOML 角色配置 |
| 命令面 | 可保留少量 slash-style 入口 | 以 instructions/config 为主 |
| hook | 适合建最小 hook 面 | 当前不强调 hook 对等 |
| 运行配置 | 说明文档为主 | `config.toml` 是一等入口 |
| 运行时记忆 | 文件记忆 + Claude 记忆约定 | 文件记忆 + memory MCP |

## 应共享什么

适合共享的内容包括：

- workflow 目标
- skill 的能力定义
- subagent 角色职责
- playbook
- 模块记忆
- 用户偏好

## 不应强行共享什么

- Claude 的 hooks 细节
- Codex 的 TOML 配置细节
- 仅某一侧需要的命令外壳

## 映射原则

最理想的路径应始终是：

`shared 资产 -> Claude 适配 -> Codex 适配`

而不是：

`Claude 版本 -> 复制一份 -> Codex 版本`

这样 drift 最小，也更容易长期维护。
