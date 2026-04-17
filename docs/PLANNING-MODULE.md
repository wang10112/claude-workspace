# Planning 模块

## 当前状态

`planning` 已经是 `project` 中的第四个正式内置模块。

它负责把“先拆解、再排序、最后明确成功标准”沉淀为可复用的共享能力。

## 在 `project` 中的主位置

- workflow:
  - `claude/skills/planning/`
- shared skills:
  - `claude/skills/planning/`
- shared subagents:
  - `claude/agents/planner.md`
- playbook:
  - `claude/playbooks/planning-playbook.md`
- memory:
  - `claude/memory/planning-memory.md`
- example:
  - `examples/planning/README.md`
  - `examples/planning/SOURCE-MAP.md`

## 为什么单独成模块

这样做的意义是：

- planning 有稳定的输入、输出和边界
- 复杂工作可以先形成 decision-complete 计划再进入执行
- Claude 与 Codex 可以共享同一套分阶段工作方式
