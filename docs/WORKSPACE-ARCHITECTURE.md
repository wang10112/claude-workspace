# 工作区架构

## 设计理念

这个工作区借鉴了 `everything-claude-code` 的核心思想：

- 共享层负责能力定义
- 适配层负责工具原生运行

但它更轻量、更适合学习和长期维护。

## 两层模型

### 1. 共享意图层 (shared/)

回答这些问题：

- 这个工作区有哪些能力
- 每种能力解决什么问题
- 输入、输出、边界是什么
- 哪些角色和流程可以被复用

**内容**：
- `workflows/` - 中立工作流定义
- `skills/` - 中立技能定义
- `memory/` - 长期记忆、用户偏好、模块记忆
- `subagents/` - 中立角色定义
- `playbooks/` - 可复用 playbook 与验证集
- `templates/` - 模板

### 2. Claude 适配层 (claude/)

回答这些问题：

- Claude 如何消费共享能力
- 需要哪些 agents、commands、hooks、skills
- 如何配置 MCP 和运行环境

**内容**：
- `CLAUDE.md` - Claude 工作区入口
- `agents/` - Markdown 格式的角色定义
- `commands/` - Slash 命令入口
- `hooks/` - 会话钩子
- `skills/` - 技能包装器
- `mcp/` - MCP 使用指南
- `settings/` - 运行配置指南

### 3. 编辑器层 (.vscode/)

回答这些问题：

- VS Code 如何集成 MCP
- 哪些配置只是编辑器层

**内容**：
- `mcp.json` - MCP 服务器配置

## 核心原则

### 共享优先
- 能力定义在 `shared/` 维护
- 是能力定义的唯一真实来源
- 适配层只做格式转换，不复制完整内容

### 适配分离
- Claude 特定配置在 `claude/` 中
- 使用 Markdown 格式
- 遵循 Claude Code 的原生约定

### 记忆持久化
- 长期记忆存储在 `shared/memory/`
- 使用 Markdown 文件
- 可以被人类审阅和维护

### 技能驱动
- 技能是主要工作流单元
- 命令是便利入口
- 钩子是流程提醒

## 设计规则

1. **语言规则**
   - 共享层描述能力本身
   - 适配层描述 Claude 的原生使用方式
   - 用户面向文档优先中文
   - AI 关键入口保留英文

2. **维护规则**
   - 共享资产变更时，更新适配器
   - 不在适配层复制完整的共享资产
   - 持久化记忆存储在 `shared/memory/`

3. **扩展规则**
   - 新增能力先在 `shared/` 定义
   - 然后在 `claude/` 创建适配器
   - 更新相关文档
   - 添加示例

## 模块组织

### 当前核心模块

- **正式写作** (formal-writing) - 公文、报告等正式文档写作
- **规划** (planning) - 项目规划和任务分解
- **研究** (research) - 信息收集和分析
- **审查** (review) - 代码和文档审查
- **验证** (verification) - 质量验证和测试

### 模块结构

每个模块包含：
- `shared/skills/{module}/` - 技能定义
- `shared/workflows/{module}.md` - 工作流定义
- `shared/memory/{module}-memory.md` - 模块记忆
- `shared/playbooks/{module}-playbook.md` - 可复用手册
- `claude/skills/{module}/` - Claude 包装器
- `examples/{module}/` - 示例和学习资源
- `docs/{MODULE}-MODULE.md` - 模块文档

## 信息流

```
用户请求
    ↓
claude/CLAUDE.md (入口)
    ↓
claude/skills/ (技能包装器)
    ↓
shared/skills/ (技能定义)
    ↓
shared/workflows/ (工作流)
    ↓
shared/memory/ (记忆)
    ↓
执行任务
    ↓
output/ (交付物)
```

## 与 everything-claude-code 的关系

### 借鉴的思想
- 共享层 + 适配层的架构
- 技能优先的工作流
- 记忆持久化
- 角色专业化

### 差异
- 更轻量，专注于核心能力
- 只支持 Claude Code
- 中文优先的文档
- 更简单的目录结构

## 参考文档

- [CLAUDE-VS-CODEX.md](CLAUDE-VS-CODEX.md) - 与原双工具架构的对比
- [EXTENDING-CAPABILITIES.md](EXTENDING-CAPABILITIES.md) - 扩展指南
- [ADDING-SHARED-SKILLS.md](ADDING-SHARED-SKILLS.md) - 添加技能指南
- [MEMORY-STRATEGY.md](MEMORY-STRATEGY.md) - 记忆策略
