# Formal Writing 模块

## 当前状态

`formal-writing` 已经是 `project` 中的正式内置模块。

它不再只是一个外部示例，而是共享能力层中的真实组成部分。

## 在 `project` 中的主位置

- workflow:
  - `claude/workflows/formal-writing.md`
  - `claude/workflows/doc-polish.md`
- shared skills:
  - `claude/skills/internal-comms/`
  - `claude/skills/official-doc-format/`
  - `claude/skills/humanizer-zh/`
- playbooks:
  - `claude/playbooks/formal-writing-playbook.md`
  - `claude/playbooks/formal-writing-validation-set.md`
  - `claude/playbooks/formal-writing-openai-workflow.md`
  - `claude/playbooks/formal-writing-prompt-architecture.md`
  - `claude/playbooks/formal-writing-skill-routing.md`
- memory:
  - `claude/memory/formal-writing-memory.md`
- example:
  - `examples/formal-writing/README.md`
  - `examples/formal-writing/SOURCE-MAP.md`

## 与旧工作区的关系

旧的 `formal-writing-workspace` 仍然可以保留，作为参考源和历史快照。

但后续这个能力模块的主开发位置应当是 `project`，而不是旧工作区。

## 为什么重要

这样做的意义是：

- `project` 作为总框架保持统一
- `formal-writing` 成为其中一个正式模块
- 未来第二、第三个模块可以沿用同一吸收方式，而不再复制出更多平行工作区
