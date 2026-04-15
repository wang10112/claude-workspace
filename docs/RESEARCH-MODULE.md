# Research 模块

## 当前状态

`research` 已经是 `project` 中的第三个正式内置模块。

它负责把“找资料、核实来源、整理证据”从临时动作提升为可复用的共享能力。

## 在 `project` 中的主位置

- workflow:
  - `shared/workflows/research.md`
- shared skills:
  - `shared/skills/research/`
- shared subagents:
  - `shared/subagents/researcher.md`
- playbook:
  - `shared/playbooks/research-playbook.md`
- memory:
  - `shared/memory/research-memory.md`
- example:
  - `examples/research/README.md`
  - `examples/research/SOURCE-MAP.md`

## 为什么单独成模块

这样做的意义是：

- research 有稳定的输入、输出和边界
- writing、review、verification 可以复用 research 结果
- Claude 与 Codex 可以共享同一套 source-grounded 工作方式
