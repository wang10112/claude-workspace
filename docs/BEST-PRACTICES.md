# 最佳实践指南

Claude Code 工作区的最佳实践和使用技巧。

## 日常使用

### 1. 代码审查

**场景：** 审查代码变更

```
用户: 请审查这段代码的质量和安全性

[粘贴代码]
```

**Claude 会：**
- 使用 `code-reviewer` agent（置信度 >80%）
- 使用 `security-reviewer` agent（OWASP Top 10）
- 提供具体的改进建议

**最佳实践：**
- 提供完整的上下文
- 说明代码的用途
- 提及特别关注的点

### 2. 构建错误

**场景：** 解决构建错误

```
用户: 遇到这个构建错误，如何解决？

[粘贴错误信息]
```

**Claude 会：**
- 使用 `build-resolver` agent
- 识别错误类型
- 提供解决方案

**最佳实践：**
- 提供完整的错误输出
- 说明最近的代码变更
- 提供相关配置文件

### 3. 性能优化

**场景：** 优化性能

```
用户: 这个页面加载很慢，如何优化？

[提供相关代码]
```

**Claude 会：**
- 使用 `performance-optimizer` agent
- 识别性能瓶颈
- 提供优化建议

**最佳实践：**
- 提供性能指标
- 说明用户场景
- 提供相关代码

### 4. 数据库优化

**场景：** 优化数据库查询

```
用户: 这个查询很慢，如何优化？

[粘贴 SQL 或 ORM 代码]
```

**Claude 会：**
- 使用 `database-reviewer` agent
- 检查 N+1 查询
- 建议索引优化

**最佳实践：**
- 提供查询代码
- 说明数据量
- 提供表结构

## 项目开发

### 1. API 开发

**工作流：** 参考 [API 开发工作流](../claude/workflows/api-development.md)

**步骤：**
1. 设计 API（OpenAPI）
2. 实现端点
3. 添加测试
4. 文档化
5. 部署

**使用 Agent：**
- `api-reviewer` - 审查 API 设计
- `security-reviewer` - 安全检查
- `database-reviewer` - 数据库优化

### 2. 组件开发

**工作流：** 参考 [组件开发工作流](../claude/workflows/component-development.md)

**步骤：**
1. 设计组件 API
2. 实现组件
3. 添加测试
4. 文档化
5. 发布

**使用 Agent：**
- `component-reviewer` - 审查组件
- `performance-optimizer` - 性能优化

### 3. 重构

**工作流：** 参考 [重构工作流](../claude/workflows/refactoring.md)

**步骤：**
1. 识别问题
2. 制定计划
3. 执行重构
4. 验证功能
5. 提交变更

**使用 Agent：**
- `code-reviewer` - 审查重构
- `architect` - 架构建议

## 记忆系统

### 1. 搜索记忆

```bash
# 搜索关键词
./scripts/memory-index.sh search "关键字"

# 列出所有记忆
./scripts/memory-index.sh list

# 查看统计
./scripts/memory-index.sh stats
```

### 2. 添加记忆

**手动添加核心记忆：**

```bash
# 创建新记忆
cat > claude/memory/my-pattern-memory.md << 'EOF'
---
name: my-pattern
description: 我的代码模式
type: pattern
---

# 我的代码模式

## 模式描述
...
EOF
```

**自动记忆：**
- 自动捕获到 `claude/memory/auto/`
- 定期审查并提升到核心记忆

### 3. 维护记忆

**每月：**
- 审查自动记忆
- 提取通用模式
- 删除过时记忆

**每季度：**
- 整理记忆结构
- 更新记忆内容
- 优化记忆索引

## Hooks 使用

### 1. 启用 Hooks

```bash
# 复制模板
cp .claude/settings.local.json.template .claude/settings.local.json

# 编辑配置
vim .claude/settings.local.json
```

### 2. 测试 Hooks

```bash
# 测试质量检查
echo '{"tool_name":"Write","tool_input":{"file_path":"test.js"}}' | \
  node claude/hooks/scripts/quality-gate.js

# 测试安全扫描
echo '{"tool_name":"Write","tool_input":{"file_path":"test.js"}}' | \
  node claude/hooks/scripts/security-scan.js
```

### 3. 调试 Hooks

```bash
# 查看 Hook 输出
DEBUG=hooks node claude/hooks/scripts/quality-gate.js

# 临时禁用 Hooks
# 在 .claude/settings.local.json 中注释掉 hooks 配置
```

## 技能管理

### 1. 安装技能

```bash
# 安装技能
./scripts/install-skill.sh https://github.com/user/skill-repo.git

# 指定名称
./scripts/install-skill.sh https://github.com/user/skill-repo.git my-skill
```

### 2. 更新技能

```bash
# 更新所有技能
./scripts/update-skills.sh

# 更新指定技能
./scripts/update-skills.sh skill-name
```

### 3. 开发技能

参考 [技能开发指南](SKILL-DEVELOPMENT.md)

## Git 工作流

### 1. 提交代码

```
用户: 请创建一个 Git 提交
```

**Claude 会：**
1. 查看 git status
2. 查看 git diff
3. 分析变更
4. 创建有意义的提交消息
5. 执行提交

**最佳实践：**
- 让 Claude 自动生成提交消息
- 审查提交消息
- 确认后再推送

### 2. 创建 PR

```
用户: 请创建一个 Pull Request
```

**Claude 会：**
1. 查看分支历史
2. 分析所有变更
3. 生成 PR 标题和描述
4. 创建 PR

**最佳实践：**
- 提供 PR 的背景信息
- 说明测试情况
- 提及相关 Issue

## 性能优化

### 1. 减少权限提示

在 `.claude/settings.local.json` 中添加常用命令：

```json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git log *)",
      "Bash(git diff *)",
      "Bash(ls *)",
      "Bash(cat *)",
      "Bash(grep *)"
    ]
  }
}
```

### 2. 使用快捷命令

```bash
# 创建别名
alias mem='./scripts/memory-index.sh'
alias skill='./scripts/install-skill.sh'

# 使用
mem search "关键字"
skill https://github.com/user/skill.git
```

## 团队协作

### 1. 共享配置

**提交到 Git：**
- `claude/rules/` - 团队规则
- `claude/workflows/` - 团队工作流
- `claude/agents/` - 团队 agents

**不提交：**
- `.claude/settings.local.json` - 个人配置
- `claude/memory/auto/` - 个人记忆

### 2. 统一规范

**创建团队规则：**

```bash
# 在 claude/rules/project-specific/ 添加
- api-design.md - API 设计规范
- code-style.md - 代码风格
- git-workflow.md - Git 工作流
```

### 3. 知识共享

**提取通用模式：**
- 将个人记忆提升到核心记忆
- 分享有价值的 agents
- 记录最佳实践

## 故障排查

### 1. Hooks 不工作

**检查：**
```bash
# 检查配置
cat .claude/settings.local.json

# 检查权限
ls -l claude/hooks/scripts/*.js

# 测试 Hook
echo '{}' | node claude/hooks/scripts/quality-gate.js
```

### 2. Agents 不响应

**原因：**
- Agent 是自动触发的
- 需要使用明确的关键词

**解决：**
- 使用"审查"、"优化"、"检查"等关键词
- 提供足够的上下文

### 3. 记忆未捕获

**检查：**
```bash
# 检查 Hook 配置
grep -A 10 "memory-capture" .claude/settings.local.json

# 检查脚本
ls -l claude/hooks/scripts/memory-capture.js

# 查看记忆目录
ls -la claude/memory/auto/
```

## 进阶技巧

### 1. 自定义 Agent

创建项目特定的 agent：

```markdown
---
name: my-reviewer
description: 我的项目审查专家
tools: ["Read", "Grep"]
---

# My Reviewer

项目特定的审查规则...
```

### 2. 自定义工作流

创建项目特定的工作流：

```markdown
# 我的部署工作流

1. 运行测试
2. 构建项目
3. 部署到测试环境
4. 验证功能
5. 部署到生产环境
```

### 3. 自动化脚本

创建自动化脚本：

```bash
#!/bin/bash
# deploy.sh

# 运行测试
npm test

# 构建
npm run build

# 部署
./scripts/deploy-to-prod.sh
```

## 参考资料

- [QUICK-START.md](../QUICK-START.md) - 快速开始
- [HOOKS-GUIDE.md](HOOKS-GUIDE.md) - Hooks 指南
- [SKILL-DEVELOPMENT.md](SKILL-DEVELOPMENT.md) - 技能开发
- [PROJECT-SUMMARY.md](PROJECT-SUMMARY.md) - 项目总结
