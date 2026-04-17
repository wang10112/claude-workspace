# Obsidian 来源映射

## 说明

该能力当前基于外部安装 skills 与本仓库内部路由文档组合而成，还不是完整吸收完成的正式模块。

## 当前主映射

| 能力面 | 当前位置 |
|---|---|
| shared workflow | `claude/workflows/obsidian-knowledge-maintenance.md` |
| module memory | `claude/memory/obsidian-memory.md` |
| codex wrapper | `codex/skills/obsidian/README.md` |
| example | `examples/obsidian/README.md` |
| installed skill | `~/.codex/skills/obsidian-markdown/SKILL.md` |
| installed skill | `~/.codex/skills/obsidian-bases/SKILL.md` |
| installed skill | `~/.codex/skills/json-canvas/SKILL.md` |
| installed skill | `~/.codex/skills/defuddle/SKILL.md` |
| installed skill | `~/.codex/skills/obsidian-cli/SKILL.md` |

## 结论

当前阶段的主开发位置仍在 `project` 共享层与 Codex 适配层。

外部技能提供能力正文，本仓库负责：

- 触发条件
- 工作流路由
- 环境约束
- 示例和长期记忆
