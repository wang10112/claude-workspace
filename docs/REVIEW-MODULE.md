# Review 模块

## 当前状态

`review` 已经是 `project` 中的第二个正式内置模块。

它负责把“检查正确性、风险和 readiness”从零散动作，提升为可复用的共享能力。

## 在 `project` 中的主位置

- workflow:
  - `claude/workflows/review.md`
  - `claude/workflows/verification.md`
- shared skills:
  - `claude/skills/review/`
  - `claude/skills/verification/`
- shared subagents:
  - `claude/agents/reviewer.md`
  - `claude/agents/verifier.md`
- playbook:
  - `claude/playbooks/review-playbook.md`
- memory:
  - `claude/memory/review-memory.md`
- example:
  - `examples/review/README.md`
  - `examples/review/SOURCE-MAP.md`

## 为什么单独成模块

这样做的意义是：

- review 有稳定的输出形状和边界
- verification 能和 review 明确分层
- Claude 与 Codex 可以共享同一套检查语义，而不是各自临时发挥
