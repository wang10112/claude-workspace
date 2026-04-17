# Research 示例

## 目的

这个示例用来展示：research 如何作为第三正式模块，在 Claude 和 Codex 两侧落地。

## 共享来源

- workflow:
  - `claude/workflows/research.md`
- 模块说明:
  - `docs/RESEARCH-MODULE.md`
- skill:
  - `claude/skills/research/`
- subagent:
  - `claude/subagents/researcher.md`
- playbook:
  - `claude/playbooks/research-playbook.md`
- memory:
  - `claude/memory/research-memory.md`

## Claude 路径

1. 从 `claude/CLAUDE.md` 开始
2. 通过 `claude/skills/research/` 进入 research 能力
3. 需要成稿时，再进入 `claude/skills/writing/`
4. 需要检查时，再进入 `claude/skills/review/` 或 `claude/skills/verification/`

## Codex 路径

1. 从 `codex/AGENTS.md` 开始
2. 通过 `codex/skills/research/` 进入 research 能力
3. 需要成稿时，再进入 `codex/skills/writing/`
4. 需要检查时，再进入 `codex/skills/review/` 或 `codex/skills/verification/`

## 这个示例为什么重要

它证明了：

- research 可以作为正式模块存在
- research 能稳定向 writing / review / verification 提供输入
- Claude / Codex 可以共享 source-grounded 的模块语义
