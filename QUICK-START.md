# 快速开始

5 分钟快速上手 Claude Code 工作区。

## 📦 安装

```bash
# 克隆仓库
git clone <your-repo-url>
cd claude-workspace

# 初始化 submodules
git submodule update --init --recursive

# 安装依赖（如果需要）
npm install  # 或 pip install -r requirements.txt
```

## 🎯 核心功能

### 1. Hooks 系统

自动执行质量检查和安全扫描。

**配置：**
```json
// .claude/settings.json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Write|Edit",
      "hooks": [{
        "type": "command",
        "command": "node claude/hooks/scripts/quality-gate.js"
      }]
    }]
  }
}
```

**可用 Hooks：**
- `quality-gate.js` - 代码质量检查
- `security-scan.js` - 安全扫描
- `memory-capture.js` - 自动记忆捕获

### 2. 规则系统

代码规范和最佳实践。

**位置：**
- `claude/rules/common/` - 通用规则
- `claude/rules/languages/typescript/` - TypeScript 规则
- `claude/rules/languages/python/` - Python 规则

**使用：**
Claude 会自动参考这些规则进行代码审查和建议。

### 3. Agents 系统

专业化 AI 助手。

**可用 Agents：**

| Agent | 用途 | 调用方式 |
|-------|------|----------|
| code-reviewer | 代码审查（置信度过滤） | 让 Claude 审查代码 |
| security-reviewer | 安全审查（OWASP Top 10） | 让 Claude 做安全审查 |
| architect | 架构设计建议 | 询问架构问题 |
| build-resolver | 构建错误解决 | 提供构建错误信息 |
| database-reviewer | 数据库优化 | 提供 SQL 查询 |
| performance-optimizer | 性能优化 | 询问性能问题 |

**示例：**
```
用户: 请审查这段代码的安全性
Claude: [使用 security-reviewer agent]

用户: 这个构建错误怎么解决？
Claude: [使用 build-resolver agent]
```

### 4. 记忆系统

自动记录项目知识。

**位置：**
- `claude/memory/` - 核心记忆（手动维护）
- `claude/memory/auto/` - 自动记忆（自动捕获）
  - `patterns/` - 代码模式
  - `decisions/` - 架构决策
  - `learnings/` - 经验教训

**查看记忆：**
```bash
# 搜索记忆
grep -r "关键字" claude/memory/

# 查看最近的记忆
ls -lt claude/memory/auto/*/*.md | head -10
```

### 5. 技能市场

安装和管理第三方技能。

**安装技能：**
```bash
./scripts/install-skill.sh https://github.com/user/skill-repo.git
```

**更新技能：**
```bash
# 更新所有技能
./scripts/update-skills.sh

# 更新指定技能
./scripts/update-skills.sh skill-name
```

## 📚 常用命令

### 代码审查
```
请审查这段代码：
[粘贴代码]
```

### 安全检查
```
请检查这段代码的安全问题：
[粘贴代码]
```

### 构建错误
```
我遇到这个构建错误：
[粘贴错误信息]
```

### 性能优化
```
这个页面加载很慢，如何优化？
[提供相关代码]
```

### 数据库优化
```
这个查询很慢，如何优化？
[粘贴 SQL 查询]
```

## 🔍 故障排查

### Hooks 不工作

**检查：**
1. Hooks 配置是否正确（`.claude/settings.json`）
2. 脚本是否有执行权限
   ```bash
   chmod +x claude/hooks/scripts/*.js
   ```
3. Node.js 是否安装

**测试 Hook：**
```bash
echo '{"tool_name":"Write","tool_input":{"file_path":"test.js"}}' | \
  node claude/hooks/scripts/quality-gate.js
```

### 规则不生效

**检查：**
1. 规则文件是否存在
2. 文件格式是否正确（Markdown）
3. Claude 是否能访问规则目录

### Agents 不响应

**原因：**
- Agent 是自动触发的，不需要显式调用
- Claude 会根据你的问题自动选择合适的 agent

**提示：**
- 使用明确的关键词（"审查"、"优化"、"安全"）
- 提供足够的上下文信息

### 记忆未捕获

**检查：**
1. `memory-capture.js` hook 是否配置
2. 脚本是否有执行权限
3. 查看日志确认是否执行

## 📖 进阶使用

### 自定义规则

在 `claude/rules/project-specific/` 添加项目特定规则：

```markdown
# API 设计规范

## 端点命名
- GET /api/users - 获取列表
- POST /api/users - 创建
...
```

### 自定义 Agent

参考 `claude/agents/specialized/` 中的示例创建自定义 agent。

### 添加语言规则

为新语言添加规则：

```bash
mkdir -p claude/rules/languages/go
touch claude/rules/languages/go/patterns.md
touch claude/rules/languages/go/testing.md
touch claude/rules/languages/go/security.md
```

## 🎓 学习资源

- [完整文档](docs/) - 详细的使用指南
- [架构说明](docs/WORKSPACE-ARCHITECTURE.md) - 架构设计
- [技能开发](docs/SKILL-DEVELOPMENT.md) - 开发自己的技能
- [升级计划](docs/UPGRADE-PLAN.md) - 项目演进历史

## 💡 最佳实践

1. **定期审查记忆** - 每月检查 `claude/memory/auto/`
2. **更新规则** - 根据项目需求调整规则
3. **测试 Hooks** - 确保 hooks 正常工作
4. **记录决策** - 重要决策手动记录到记忆系统
5. **分享经验** - 将通用模式提取到规则中

## 🆘 获取帮助

- 查看文档：`docs/`
- 搜索记忆：`grep -r "关键字" claude/memory/`
- 查看示例：`claude/hooks/examples/`
- GitHub Issues：[项目地址]

## 🚀 下一步

1. ✅ 完成快速开始
2. 📖 阅读完整文档
3. 🔧 配置 Hooks
4. 🎯 在实际项目中使用
5. 📝 记录经验和反馈

---

**开始使用吧！** 🎉
