# 扩展能力模块

## 添加新能力模块的步骤

当你要添加新的能力模块时，按以下顺序进行：

### 1. 定义共享层

在 `shared/` 中创建能力定义：

```bash
# 1. 创建工作流定义
shared/workflows/{module}.md

# 2. 创建技能定义
shared/skills/{module}/SKILL.md

# 3. 创建或复用角色定义
shared/subagents/{role}.md

# 4. 创建 playbook
shared/playbooks/{module}-playbook.md

# 5. 创建模块记忆
shared/memory/{module}-memory.md

# 6. 创建模板（如需要）
shared/templates/{module}-template.md
```

### 2. 创建 Claude 适配层

在 `claude/` 中创建适配器：

```bash
# 1. 创建技能包装器
claude/skills/{module}/SKILL.md
claude/skills/{module}/README.md

# 2. 创建或复用角色（如需要）
claude/agents/{role}.md

# 3. 创建命令入口（可选）
claude/commands/{command}.md

# 4. 创建钩子（可选）
claude/hooks/{hook}.md
```

### 3. 添加文档和示例

```bash
# 1. 创建模块文档
docs/{MODULE}-MODULE.md

# 2. 创建示例
examples/{module}/README.md
examples/{module}/SOURCE-MAP.md
```

### 4. 更新顶层文档

如果新模块改变了顶层语义，更新：

- `README.md` - 添加模块说明
- `AGENTS.md` - 添加相关角色
- `RULES.md` - 添加模块规则（如需要）
- `claude/CLAUDE.md` - 添加技能路由

## 示例：添加"测试"模块

### 步骤 1：共享层

```bash
# 工作流
shared/workflows/testing.md

# 技能
shared/skills/testing/SKILL.md

# 角色（复用或新建）
shared/subagents/tester.md

# Playbook
shared/playbooks/testing-playbook.md

# 记忆
shared/memory/testing-memory.md
```

### 步骤 2：Claude 适配层

```bash
# 技能包装器
claude/skills/testing/SKILL.md
claude/skills/testing/README.md

# 角色
claude/agents/tester.md

# 命令
claude/commands/test.md
```

### 步骤 3：文档和示例

```bash
# 文档
docs/TESTING-MODULE.md

# 示例
examples/testing/README.md
examples/testing/SOURCE-MAP.md
```

### 步骤 4：更新顶层

在 `README.md` 的"核心能力"部分添加：
```markdown
- **测试** (testing) - 单元测试、集成测试、E2E 测试
```

在 `claude/CLAUDE.md` 的"技能路由"部分添加：
```markdown
- 测试任务 → `skills/testing/`
```

## 当前参考模块

以下模块可作为范例：

- **formal-writing** - 最成熟的模块，包含完整的工作流、记忆、playbook
- **planning** - 规划和任务分解
- **research** - 信息收集和分析
- **review** - 审查和验证
- **verification** - 质量验证

## 推荐的下一个模块方向

- **测试** (testing) - 单元测试、集成测试、E2E 测试
- **部署** (deployment) - CI/CD、发布流程
- **监控** (monitoring) - 日志分析、性能监控
- **知识库维护** (knowledge-base) - 文档整理、知识管理

## 设计约束

### 共享优先原则
- `shared/` 是能力定义的唯一真实来源
- `claude/` 只补适配层，不复制完整能力定义
- 新模块必须遵循：
  - workflow 定义流程
  - skill 定义能力
  - subagent 定义角色
  - playbook 定义可复用手册
  - memory 定义长期记忆

### 一致性原则
- 如果文档声明某能力存在，对应的 wrapper 必须真实落地
- 文件命名使用小写字母和连字符
- 技能文件必须包含 SKILL.md
- 角色文件使用 Markdown 格式

### 验证原则
- 从其他工作区迁移的文件必须先审计
- 确保文件放在正确的层级
- 更新所有相关文档
- 添加示例和测试

## 模块成熟度检查清单

新模块应该包含：

- [ ] `shared/workflows/{module}.md` - 工作流定义
- [ ] `shared/skills/{module}/SKILL.md` - 技能定义
- [ ] `shared/memory/{module}-memory.md` - 模块记忆
- [ ] `shared/playbooks/{module}-playbook.md` - Playbook
- [ ] `claude/skills/{module}/SKILL.md` - Claude 包装器
- [ ] `docs/{MODULE}-MODULE.md` - 模块文档
- [ ] `examples/{module}/README.md` - 示例
- [ ] 在 `README.md` 中添加说明
- [ ] 在 `claude/CLAUDE.md` 中添加路由

## 参考文档

- [WORKSPACE-ARCHITECTURE.md](WORKSPACE-ARCHITECTURE.md) - 架构详解
- [ADDING-SHARED-SKILLS.md](ADDING-SHARED-SKILLS.md) - 添加技能指南
- [MEMORY-STRATEGY.md](MEMORY-STRATEGY.md) - 记忆策略
- [FORMAL-WRITING-MODULE.md](FORMAL-WRITING-MODULE.md) - 正式写作模块示例
