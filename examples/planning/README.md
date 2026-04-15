# Planning 示例

## 目的

这个示例用来展示：planning 如何作为第四正式模块，在 Claude 和 Codex 两侧落地。

## 共享来源

- skill:
  - `shared/skills/planning/`
- 模块说明:
  - `docs/PLANNING-MODULE.md`
- subagent:
  - `shared/subagents/planner.md`
- playbook:
  - `shared/playbooks/planning-playbook.md`
- memory:
  - `shared/memory/planning-memory.md`

## Claude 路径

1. 从 `claude/CLAUDE.md` 开始
2. 通过 `claude/skills/planning/` 进入 planning 能力
3. 需要验证计划完整性时，再进入 `claude/skills/review/` 或 `claude/skills/verification/`

## Codex 路径

1. 从 `codex/AGENTS.md` 开始
2. 通过 `codex/skills/planning/` 进入 planning 能力
3. 需要验证计划完整性时，再进入 `codex/skills/review/` 或 `codex/skills/verification/`
4. 需要角色分工时，调用 `planner` role

## 这个示例为什么重要

它证明了：

- planning 可以作为正式模块存在
- 计划输出可以稳定交给后续执行或验证
- Claude / Codex 可以共享同一套拆解语义
