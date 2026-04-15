# Review 示例

## 目的

这个示例用来展示：review 如何作为第二正式模块，在 Claude 和 Codex 两侧落地。

## 共享来源

- workflow:
  - `shared/workflows/review.md`
  - `shared/workflows/verification.md`
- 模块说明:
  - `docs/REVIEW-MODULE.md`
- skills:
  - `shared/skills/review/`
  - `shared/skills/verification/`
- subagents:
  - `shared/subagents/reviewer.md`
  - `shared/subagents/verifier.md`
- playbook:
  - `shared/playbooks/review-playbook.md`
- memory:
  - `shared/memory/review-memory.md`

## Claude 路径

1. 从 `claude/CLAUDE.md` 开始
2. 通过 `claude/skills/review/` 进入 review 能力
3. 需要 readiness 检查时，再进入 `claude/skills/verification/`
4. 需要角色分工时，调用 reviewer 相关角色

## Codex 路径

1. 从 `codex/AGENTS.md` 开始
2. 通过 `codex/skills/review/` 进入 review 能力
3. 需要 readiness 检查时，再进入 `codex/skills/verification/`
4. 需要角色分工时，调用 `reviewer` 与 `verifier` role

## 这个示例为什么重要

它证明了：

- review 可以作为正式模块存在，而不只是附属动作
- review 与 verification 可以分层但协作
- Claude / Codex 可以共享同一套检查语义
