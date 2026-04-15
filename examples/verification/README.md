# Verification 示例

## 目的

这个示例用来展示：verification 如何作为第五正式模块，在 Claude 和 Codex 两侧落地。

## 共享来源

- workflow:
  - `shared/workflows/verification.md`
- 模块说明:
  - `docs/VERIFICATION-MODULE.md`
- skill:
  - `shared/skills/verification/`
- subagent:
  - `shared/subagents/verifier.md`
- playbook:
  - `shared/playbooks/verification-playbook.md`
- memory:
  - `shared/memory/verification-memory.md`

## Claude 路径

1. 从 `claude/CLAUDE.md` 开始
2. 通过 `claude/skills/verification/` 进入 verification 能力
3. 需要 findings-first 分析时，再进入 `claude/skills/review/`

## Codex 路径

1. 从 `codex/AGENTS.md` 开始
2. 通过 `codex/skills/verification/` 进入 verification 能力
3. 需要 findings-first 分析时，再进入 `codex/skills/review/`
4. 需要角色分工时，调用 `verifier` role

## 这个示例为什么重要

它证明了：

- verification 可以作为正式模块存在
- verification 能稳定表达已执行检查与残余风险
- Claude / Codex 可以共享同一套 readiness 语义
