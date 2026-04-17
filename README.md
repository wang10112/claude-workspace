# Claude 工作区

一个生产就绪的 Claude Code 工作区，包含技能、工作流、记忆系统和最佳实践。

## 快速开始

### 首次使用

```bash
# 1. 克隆仓库
git clone https://github.com/wang10112/claude-workspace.git
cd claude-workspace

# 2. 运行配置脚本（自动配置 Memory）
./setup.sh

# 3. 在 VS Code 中打开工作区
# Claude Code 会自动读取配置
```

### 已有工作区更新

```bash
# 拉取最新配置
git pull

# Memory 会自动同步（通过符号链接）
```

## 核心组件

- **claude/** - Claude 适配层（agents, commands, hooks, skills）
- **claude/** - 共享能力层（skills, workflows, memory, playbooks）
- **vendor/** - 第三方依赖（Anthropic 官方 skills）
- **memory/** - Memory 配置文件（自动同步到 ~/.claude/）
- **docs/** - 架构文档和使用指南
- **examples/** - 示例和学习资源
- **output/** - 交付物输出目录
- **setup.sh** - 自动配置脚本

## Memory 系统

Memory 文件存储在 `memory/` 目录中，通过 `setup.sh` 自动配置符号链接到 Claude 的系统目录。

当前包含：
- `MEMORY.md` - Memory 索引文件
- `feedback_obsidian_workflow.md` - Obsidian 笔记工作流配置

### 更新 Memory

```bash
# 修改 memory/ 目录中的文件
vim memory/feedback_obsidian_workflow.md

# 提交到 Git
git add memory/
git commit -m "update: 更新 Memory 配置"
git push
```

## 架构原则

### 两层模型

1. **共享意图层** (`claude/`)
   - 中立的工作流、技能、角色定义
   - 长期记忆和用户偏好
   - 可复用的 playbooks 和模板

2. **Claude 适配层** (`claude/`)
   - Markdown 格式的角色定义
   - Slash 命令入口
   - 会话钩子
   - 技能包装器

### 设计原则

- **共享优先** - 能力定义在 `claude/` 中维护
- **适配分离** - Claude 特定配置在 `claude/` 中
- **记忆持久化** - 使用 `claude/memory/` 存储长期记忆
- **技能驱动** - 以技能为主要工作流单元

## 推荐阅读

1. [Claude Code 完全使用指南.md](./Claude%20Code%20完全使用指南.md) - 完整的功能说明和使用教程
2. [SOUL.md](SOUL.md) - 核心身份和原则
3. [AGENTS.md](AGENTS.md) - 角色定义
4. [RULES.md](RULES.md) - 全局规则
5. [docs/WORKSPACE-ARCHITECTURE.md](docs/WORKSPACE-ARCHITECTURE.md) - 架构详解
6. [docs/EXTENDING-CAPABILITIES.md](docs/EXTENDING-CAPABILITIES.md) - 扩展指南

## 故障排除

### Memory 未生效

```bash
# 检查符号链接是否正确
ls -la ~/.claude/projects/-home-zhang-workspace-claude-workspace/memory

# 重新运行配置脚本
./setup.sh
```

### 路径问题

如果工作区路径不是 `/home/zhang/workspace/claude-workspace`，Memory 路径哈希可能不同：

1. 查看 `~/.claude/projects/` 下的实际目录名
2. 修改 `setup.sh` 中的 `PROJECT_HASH` 变量
3. 重新运行 `./setup.sh`

## 核心能力

当前工作区包含以下核心能力模块：

### Obsidian 笔记工作流

自动化的 Obsidian 笔记创建和管理：
- 自动保存到指定知识库（`E:\Obsidian\自我成长\`）
- 支持多种 Obsidian skills（markdown、bases、canvas、cli、defuddle）
- 智能分类和格式化
- 符合 Obsidian 规范（wikilinks、callouts、frontmatter）

详见：[Claude Code 完全使用指南.md](./Claude%20Code%20完全使用指南.md)

### 开发能力
- **测试** (testing) - 单元测试、集成测试、E2E测试
- **调试** (debugging) - 错误诊断、日志分析、性能优化
- **重构** (refactoring) - 代码重构、结构优化、技术债务清理
- **审查** (review) - 代码和文档审查
- **验证** (verification) - 质量验证和测试
- **Git 工作流** (git-workflow) - 分支管理、提交规范、PR 流程
- **安全审查** (security-review) - 漏洞扫描、安全最佳实践

### 规划和研究
- **规划** (planning) - 项目规划和任务分解
- **研究** (research) - 信息收集和分析

### 写作能力

**工作流层：**
- **正式文档写作** (formal-writing) - 完整的引导式工作流，包含上下文收集、迭代开发、读者验证
- **快速写作** (writing) - 轻量级快速写作

**工具层：**
- **公文格式化** (official-doc-format) - 中国公文格式标准化

**特殊工具（按需使用）：**
- **去除 AI 风格** (humanizer-zh) - 移除 AI 味道（会降低可读性，仅在明确要求时使用）

详见：[docs/SKILLS-GUIDE.md](docs/SKILLS-GUIDE.md)

## 维护指南

### 添加新技能

1. 在 `claude/skills/` 创建技能定义
2. 在 `claude/skills/` 创建 Claude 包装器
3. 更新相关文档

### 更新记忆

直接编辑 `claude/memory/` 中的 Markdown 文件

### 添加工作流

在 `claude/workflows/` 创建新的工作流定义

详细说明请参考 [docs/ADDING-SHARED-SKILLS.md](docs/ADDING-SHARED-SKILLS.md)

## 来源

从多工具工作区迁移而来，专注于 Claude Code 的最佳实践。

## License

MIT
