# Obsidian 模块记忆

## 当前定位

- `obsidian` 目前是工作区中的候选正式模块，用于 Obsidian 知识整理与 vault 维护
- 它负责把网页导入、笔记规范化、属性视图、知识地图这几类任务路由到合适的 Obsidian 技能

## 当前技能面

- `obsidian-markdown`: 负责 Obsidian 笔记语法与结构
- `obsidian-bases`: 负责 `.base` 视图、过滤、公式、汇总
- `json-canvas`: 负责 `.canvas` 关系图与可视化布局
- `defuddle`: 负责网页到干净 markdown 的预处理
- `obsidian-cli`: 负责运行中的 Obsidian 实例操作，但依赖本机 CLI

## 长期约束

- Obsidian 任务应按目标产物路由，而不是把所有笔记任务都归为一个模糊类别
- 先稳定 note properties，再构建 Bases
- 先稳定 note names 与 links，再构建 Canvas
- 只有当 Obsidian 专有语法或 vault 结构真的重要时，才进入 Obsidian 路由

## 环境事实

- 当前环境中 `defuddle` 可用
- 当前环境中 `obsidian` CLI 不可用，因此 `obsidian-cli` 不是默认路径

## 维护规则

- shared 侧维护 workflow / memory / examples 的 canonical surface
- Codex 侧维护运行入口与路由说明
- 若后续把 Obsidian 升级为正式模块，应补 shared skill、playbook，以及 Claude / Codex 对等 wrapper
