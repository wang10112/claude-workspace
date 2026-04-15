# Formal Writing 示例

## 目的

这个示例用来展示：同一个共享能力模块，如何在 Claude 和 Codex 两侧分别落地。

## 共享来源

- workflow:
  - `shared/workflows/formal-writing.md`
- 模块说明:
  - `docs/FORMAL-WRITING-MODULE.md`
- skills:
  - `shared/skills/internal-comms/`
  - `shared/skills/official-doc-format/`
  - `shared/skills/humanizer-zh/`
- playbooks:
  - `shared/playbooks/formal-writing-playbook.md`
  - `shared/playbooks/formal-writing-validation-set.md`
  - `shared/playbooks/formal-writing-openai-workflow.md`
  - `shared/playbooks/formal-writing-prompt-architecture.md`
  - `shared/playbooks/formal-writing-skill-routing.md`
- template:
  - `shared/templates/formal-writing-request-template.md`
- memory:
  - `shared/memory/formal-writing-memory.md`

## Claude 路径

1. 从 `claude/CLAUDE.md` 开始
2. 通过 `claude/skills/formal-writing/` 进入模块
3. 根据任务分流到 `internal-comms`、`official-doc-format`、`humanizer-zh`
4. 需要角色分工时，调用 `writer`、`reviewer`、`researcher`

## Codex 路径

1. 从 `codex/AGENTS.md` 开始
2. 用 `codex/config.toml` 提供运行时默认值
3. 通过 `codex/skills/formal-writing/` 进入模块
4. 根据任务分流到 `writing`、`internal-comms`、`official-doc-format`、`humanizer-zh`
5. 需要上下文时结合 memory MCP 与共享 memory 文件

## 这个示例为什么重要

它证明了：

- 共享层拥有能力定义
- 各自适配层拥有原生运行方式
- 模块记忆可以同时服务两组 AI
