# CLAUDE.md

这个文件为 Claude Code 提供工作区指导。

## 项目概览

这是一个生产就绪的 Claude Code 工作区，包含技能、角色、工作流和记忆系统。

## 架构

项目采用单层架构：

- **claude/** - 核心能力层（skills, workflows, memory, agents, playbooks, templates, commands, hooks）
- **docs/** - 架构文档和使用指南
- **examples/** - 示例和学习资源
- **vendor/** - 第三方依赖（Anthropic 官方技能库）

## 核心原则

1. **技能优先** - 技能是主要工作流单元
2. **角色专业化** - 使用专门的 agents 处理特定任务
3. **单一真源** - 能力定义在 claude/ 统一维护
4. **记忆持久化** - 长期记忆存储在 claude/memory/
5. **命令作为入口** - commands 是便利入口，不是能力本身
6. **钩子作为提醒** - hooks 提供流程提醒，不是能力本身

## 技能路由

根据任务类型选择合适的技能：

### 开发任务
- 测试任务 → `claude/skills/testing/`
- 调试任务 → `claude/skills/debugging/`
- 重构任务 → `claude/skills/refactoring/`
- 审查任务 → `claude/skills/review/`
- 验证任务 → `claude/skills/verification/`
- Git 操作 → `claude/skills/git-workflow/`
- 安全审查 → `claude/skills/security-review/`

### 规划和研究
- 规划任务 → `claude/skills/planning/`
- 研究任务 → `claude/skills/research/`

### 写作任务

**工作流层（完整流程）：**

- **正式文档写作** → `claude/skills/formal-writing/` 
  - 包含：上下文收集、迭代开发、读者验证、可选格式化
  - 适用：报告、提案、公文、重要沟通
  - 特点：引导式协作、学习用户偏好、验证文档有效性
  
- **快速写作** → `claude/skills/writing/`
  - 包含：直接生成初稿
  - 适用：邮件、笔记、草稿、简单文档
  - 特点：轻量级、快速输出

**工具层（单一功能）：**

- **公文格式化** → `claude/skills/official-doc-format/`
  - 输入：文本内容 + 格式要求
  - 输出：格式化的公文（Word 文档）
  - 适用：已有内容，需要应用中国公文格式标准

**特殊工具（按需使用）：**

- **去除 AI 风格** → `vendor/skills/humanizer/`
  - 功能：移除文本的 AI 写作痕迹（基于维基百科 29 种 AI 写作模式）
  - 特点：支持语音校准（匹配用户个人写作风格）
  - 使用：当用户明确要求"humanize"或"去除 AI 味道"时使用
  - ⚠️ 主要适用于英文内容

**决策树：**

```
需要写文档？
├─ 从零开始写正式文档（报告、提案、公文）
│  └─ 使用 formal-writing
│     ├─ 需要 Word 格式？ → 在流程中选择 docx 输出
│     └─ 需要公文格式？ → 调用 official-doc-format
│
├─ 已有内容，只需格式化
│  └─ 使用 official-doc-format
│
├─ 快速写个邮件或笔记
│  └─ 使用 writing
│
└─ 需要去除 AI 味道
   └─ 使用 humanizer（支持语音校准）
```

**调用关系：**
- `formal-writing` 可以调用 `official-doc-format`
- `humanizer` 仅在用户明确要求时使用，不集成到工作流中

## 角色使用

当任务需要专业化处理时，使用 `agents/` 中的角色：

- `planner.md` - 任务分解和规划
- `writer.md` - 内容创作和改写
- `reviewer.md` - 质量审查和验证
- `researcher.md` - 信息收集和研究

## 记忆系统

在执行任务前，查阅相关记忆：

- `claude/memory/workspace-memory.md` - 工作区长期记忆
- `claude/memory/user-preferences.md` - 用户偏好
- `claude/memory/testing-memory.md` - 测试模块记忆
- `claude/memory/debugging-memory.md` - 调试模块记忆
- `claude/memory/refactoring-memory.md` - 重构模块记忆
- `claude/memory/git-workflow-memory.md` - Git 工作流记忆
- `claude/memory/security-review-memory.md` - 安全审查记忆
- `claude/memory/formal-writing-memory.md` - 正式写作模块记忆
- `claude/memory/planning-memory.md` - 规划模块记忆
- `claude/memory/research-memory.md` - 研究模块记忆
- `claude/memory/review-memory.md` - 审查模块记忆
- `claude/memory/verification-memory.md` - 验证模块记忆

## 工作流

复杂任务参考 `claude/workflows/` 中的工作流定义：

- `testing.md` - 测试工作流
- `debugging.md` - 调试工作流
- `refactoring.md` - 重构工作流
- `git-workflow.md` - Git 工作流
- `security-review.md` - 安全审查流程
- `formal-writing.md` - 正式文档写作流程
- `doc-polish.md` - 文档润色流程
- `research.md` - 研究工作流
- `review.md` - 审查工作流
- `verification.md` - 验证工作流

## 开发指南

### 添加新技能

1. 在 `claude/skills/` 创建技能定义
2. 更新相关文档

### 更新记忆

直接编辑 `claude/memory/` 中的 Markdown 文件

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
