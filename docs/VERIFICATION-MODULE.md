# Verification 模块

## 当前状态

`verification` 已经是 `project` 中的第五个正式内置模块。

它负责把“是否真的检查过、检查到了什么、还剩什么风险”从临时说明提升为可复用的共享能力。

## 在 `project` 中的主位置

- workflow:
  - `shared/workflows/verification.md`
- shared skills:
  - `shared/skills/verification/`
- shared subagents:
  - `shared/subagents/verifier.md`
- playbook:
  - `shared/playbooks/verification-playbook.md`
- memory:
  - `shared/memory/verification-memory.md`
- example:
  - `examples/verification/README.md`
  - `examples/verification/SOURCE-MAP.md`

## 为什么单独成模块

这样做的意义是：

- verification 有稳定的 readiness 语义
- review 与 verification 可以明确分层
- Claude 与 Codex 可以共享同一套检查完成标准
