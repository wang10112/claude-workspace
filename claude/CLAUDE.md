# CLAUDE.md

这个文件为 Claude Code 提供工作区指导。

## 项目概览

这是一个生产就绪的 Claude Code 工作区，包含技能、角色、工作流和记忆系统。

## 架构

项目组织为两层结构：

- **shared/** - 共享能力层（技能定义、工作流、记忆、playbooks）
- **claude/** - Claude 适配层（agents, commands, hooks, skills）
- **docs/** - 架构文档和使用指南
- **examples/** - 示例和学习资源

## 核心原则

1. **技能优先** - 技能是主要工作流单元
2. **角色专业化** - 使用专门的 agents 处理特定任务
3. **共享优先** - 能力定义在 shared/ 维护
4. **记忆持久化** - 长期记忆存储在 shared/memory/
5. **命令作为入口** - commands 是便利入口，不是能力本身
6. **钩子作为提醒** - hooks 提供流程提醒，不是能力本身

## 技能路由

根据任务类型选择合适的技能：

### 开发任务
- 测试任务 → `skills/testing/`
- 调试任务 → `skills/debugging/`
- 重构任务 → `skills/refactoring/`
- 审查任务 → `skills/review/`
- 验证任务 → `skills/verification/`

### 规划和研究
- 规划任务 → `skills/planning/`
- 研究任务 → `skills/research/`

### 写作任务
- 正式文档写作 → `skills/formal-writing/`
- 通用写作 → `skills/writing/`
- 内部沟通文档 → `skills/internal-comms/`
- 公文格式化 → `skills/official-doc-format/`
- 中文润色 → `skills/humanizer-zh/`

## 角色使用

当任务需要专业化处理时，使用 `agents/` 中的角色：

- `planner.md` - 任务分解和规划
- `writer.md` - 内容创作和改写
- `reviewer.md` - 质量审查和验证
- `researcher.md` - 信息收集和研究

## 记忆系统

在执行任务前，查阅相关记忆：

- `shared/memory/workspace-memory.md` - 工作区长期记忆
- `shared/memory/user-preferences.md` - 用户偏好
- `shared/memory/testing-memory.md` - 测试模块记忆
- `shared/memory/debugging-memory.md` - 调试模块记忆
- `shared/memory/refactoring-memory.md` - 重构模块记忆
- `shared/memory/formal-writing-memory.md` - 正式写作模块记忆
- `shared/memory/planning-memory.md` - 规划模块记忆
- `shared/memory/research-memory.md` - 研究模块记忆
- `shared/memory/review-memory.md` - 审查模块记忆
- `shared/memory/verification-memory.md` - 验证模块记忆

## 工作流

复杂任务参考 `shared/workflows/` 中的工作流定义：

- `testing.md` - 测试工作流
- `debugging.md` - 调试工作流
- `refactoring.md` - 重构工作流
- `formal-writing.md` - 正式文档写作流程
- `doc-polish.md` - 文档润色流程
- `research.md` - 研究工作流
- `review.md` - 审查工作流
- `verification.md` - 验证工作流

## 开发指南

### 添加新技能

1. 在 `shared/skills/` 创建技能定义
2. 在 `claude/skills/` 创建 Claude 包装器
3. 更新相关文档

### 更新记忆

直接编辑 `shared/memory/` 中的 Markdown 文件

### 添加角色

在 `claude/agents/` 创建 Markdown 格式的角色定义

详细说明参考：
- `docs/WORKSPACE-ARCHITECTURE.md` - 架构详解
- `docs/EXTENDING-CAPABILITIES.md` - 扩展指南
- `docs/ADDING-SHARED-SKILLS.md` - 添加技能指南

## 文件命名

使用小写字母和连字符：
- 技能: `formal-writing.md`, `planning-workflow.md`
- 角色: `planner.md`, `reviewer.md`
- 工作流: `doc-polish.md`, `research.md`
