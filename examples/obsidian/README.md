# Obsidian 示例

## 目的

这个示例用来展示：已安装的 Obsidian skills 如何在当前工作区里被路由和组合使用。

## 共享来源

- workflow:
  - `shared/workflows/obsidian-knowledge-maintenance.md`
- memory:
  - `shared/memory/obsidian-memory.md`

## Codex 路径

1. 从 `codex/AGENTS.md` 开始
2. 通过 `codex/skills/obsidian/` 判断任务属于哪种产物
3. 按目标产物进入对应已安装 skill

## 常见路径

### 1. 网页资料入库

1. 用 `defuddle` 清洗网页为 markdown
2. 用 `obsidian-markdown` 改写为 Obsidian 笔记
3. 如需进入索引视图，再交给 `obsidian-bases`

### 2. 零散笔记整理

1. 用 `obsidian-markdown` 统一 frontmatter、tags、wikilinks、callouts
2. 如需补知识关系图，再交给 `json-canvas`

### 3. 资料库或任务库视图

1. 先保证笔记 properties 稳定
2. 用 `obsidian-bases` 构建 `.base` 视图

### 4. 知识地图

1. 先保证笔记标题和链接稳定
2. 用 `json-canvas` 输出 `.canvas`

## 当前限制

- `obsidian-cli` 依赖本机 `obsidian` 命令和运行中的 Obsidian 实例
- 当前环境不满足该条件，因此 live vault operation 暂不作为默认工作流

## 这个示例为什么重要

它把 Obsidian 相关工作从“泛化笔记整理”收敛成了清晰的几条路径：

- URL ingestion
- note normalization
- property-driven views
- visual knowledge mapping
