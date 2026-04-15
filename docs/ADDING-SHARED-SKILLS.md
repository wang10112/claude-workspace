# 新增共享 Skill

## 目的

说明如何新增一个共享 skill，并同时让 Claude 与 Codex 都能消费它，而不制造长期重复维护。

## 单一事实源

先建立共享 skill：

- `shared/skills/<skill-name>/SKILL.md`

这个文件应说明：

- 何时使用
- 它解决什么问题
- 输入要求
- 输出要求
- 边界规则

## Claude 适配

然后建立：

- `claude/skills/<skill-name>/README.md`

Claude wrapper 负责说明：

- Claude 如何调用它
- 它与哪些 Claude agents / commands 协作
- 它来源于哪个 shared skill

## Codex 适配

然后建立：

- `codex/skills/<skill-name>/README.md`

Codex wrapper 负责说明：

- Codex 如何调用它
- 它与哪些 Codex roles / config 协作
- 它来源于哪个 shared skill
- 它如何与其他 Codex wrapper 路由协作

## Drift 规则

不要长期维护两份彼此独立的 skill 正文。

优先采用：

- 一份共享 skill 定义
- 两侧各自的轻量 wrapper

## 检查清单

- shared skill 已存在
- Claude wrapper 已引用 shared skill
- Codex wrapper 已引用 shared skill
- 如果该 skill 属于某模块，相关 example / playbook / memory 已同步
- 如果仓库顶层文档声明了该能力，Codex 与 Claude 两侧入口都必须真实存在
- 不要把恢复出来的旧 wrapper 直接当作事实源，先审计其归属层级
