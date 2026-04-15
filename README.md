# Claude 工作区

一个生产就绪的 Claude Code 工作区，包含技能、工作流、记忆系统和最佳实践。

## 快速开始

1. 在 VS Code 中打开此工作区
2. Claude Code 会自动读取 `claude/CLAUDE.md`
3. 查看 `SOUL.md` 了解核心原则
4. 参考 `docs/` 目录学习架构和扩展方法

## 核心组件

- **claude/** - Claude 适配层（agents, commands, hooks, skills）
- **shared/** - 共享能力层（skills, workflows, memory, playbooks）
- **docs/** - 架构文档和使用指南
- **examples/** - 示例和学习资源
- **output/** - 交付物输出目录

## 架构原则

### 两层模型

1. **共享意图层** (`shared/`)
   - 中立的工作流、技能、角色定义
   - 长期记忆和用户偏好
   - 可复用的 playbooks 和模板

2. **Claude 适配层** (`claude/`)
   - Markdown 格式的角色定义
   - Slash 命令入口
   - 会话钩子
   - 技能包装器

### 设计原则

- **共享优先** - 能力定义在 `shared/` 中维护
- **适配分离** - Claude 特定配置在 `claude/` 中
- **记忆持久化** - 使用 `shared/memory/` 存储长期记忆
- **技能驱动** - 以技能为主要工作流单元

## 推荐阅读

1. [SOUL.md](SOUL.md) - 核心身份和原则
2. [AGENTS.md](AGENTS.md) - 角色定义
3. [RULES.md](RULES.md) - 全局规则
4. [docs/WORKSPACE-ARCHITECTURE.md](docs/WORKSPACE-ARCHITECTURE.md) - 架构详解
5. [docs/EXTENDING-CAPABILITIES.md](docs/EXTENDING-CAPABILITIES.md) - 扩展指南

## 核心能力

当前工作区包含以下核心能力模块：

### 开发能力
- **测试** (testing) - 单元测试、集成测试、E2E测试
- **调试** (debugging) - 错误诊断、日志分析、性能优化
- **重构** (refactoring) - 代码重构、结构优化、技术债务清理
- **审查** (review) - 代码和文档审查
- **验证** (verification) - 质量验证和测试

### 规划和研究
- **规划** (planning) - 项目规划和任务分解
- **研究** (research) - 信息收集和分析

### 写作能力
- **正式写作** (formal-writing) - 公文、报告等正式文档写作
- **通用写作** (writing) - 通用文档写作
- **内部沟通** (internal-comms) - 内部沟通文档
- **中文润色** (humanizer-zh) - 中文文本润色

## 维护指南

### 添加新技能

1. 在 `shared/skills/` 创建技能定义
2. 在 `claude/skills/` 创建 Claude 包装器
3. 更新相关文档

### 更新记忆

直接编辑 `shared/memory/` 中的 Markdown 文件

### 添加工作流

在 `shared/workflows/` 创建新的工作流定义

详细说明请参考 [docs/ADDING-SHARED-SKILLS.md](docs/ADDING-SHARED-SKILLS.md)

## 来源

从多工具工作区迁移而来，专注于 Claude Code 的最佳实践。

## License

MIT
