# 自动记忆系统

自动捕获重要操作和决策，构建项目知识库。

## 目录结构

```
claude/memory/auto/
├── README.md          # 本文件
├── patterns/          # 代码模式和最佳实践
├── decisions/         # 架构决策和技术选型
└── learnings/         # 问题解决和经验教训
```

## 记忆分类

### patterns/ - 代码模式
记录项目中反复使用的代码模式和最佳实践。

**触发条件：**
- 修改重要配置文件（config, setup, init）
- 创建核心基础类（base, core）
- 实现通用工具函数

**示例：**
```markdown
# Hook 基类模式

**日期：** 2026-04-17
**文件：** claude/hooks/scripts/hook-base.js

## 模式

使用基类封装通用逻辑，子类只需实现 execute() 方法。

## 代码

\`\`\`javascript
class HookBase {
  async execute(input) {
    throw new Error('Must implement');
  }
  
  async run() {
    const input = await this.readInput();
    const result = await this.execute(input);
    this.writeOutput(result);
  }
}
\`\`\`

## 优点

- 统一输入/输出处理
- 统一错误处理
- 减少重复代码
```

### decisions/ - 架构决策
记录重要的架构决策和技术选型。

**触发条件：**
- Git commit 包含架构变更
- 技术选型讨论
- 重要的重构决策

**示例：**
```markdown
# 采用 Hooks 系统而非简单提醒

**日期：** 2026-04-17
**决策者：** 用户 + Claude

## 背景

需要在特定事件时自动执行检查和操作。

## 选项

1. 简单的 Markdown 提醒
2. 完整的 Hooks 系统（JSON 配置 + 脚本）

## 决策

选择方案 2：完整的 Hooks 系统

## 理由

- 可以实际执行操作（不只是提醒）
- JSON 输出可以控制行为（block/allow）
- 支持条件过滤（if 字段）
- 可以集成到 CI/CD

## 影响

- 需要编写 Node.js 脚本
- 配置稍复杂
- 但功能更强大
```

### learnings/ - 经验教训
记录问题解决过程和经验教训。

**触发条件：**
- 修复 bug
- 解决技术难题
- 性能优化

**示例：**
```markdown
# Hook 脚本需要优雅失败

**日期：** 2026-04-17
**问题：** Hook 脚本读取不存在的文件时崩溃

## 问题描述

quality-gate.js 尝试读取文件时，如果文件不存在会抛出异常。

## 解决方案

使用 try-catch 捕获异常，返回警告而不是失败：

\`\`\`javascript
try {
  content = fs.readFileSync(filePath, 'utf-8');
} catch (error) {
  return this.warn(\`Could not read file: ${error.message}\`);
}
\`\`\`

## 经验教训

- Hook 应该优雅失败，不阻塞工作流
- 使用 warn() 而不是 fail() 处理非关键错误
- 始终验证文件存在性
```

## 自动捕获机制

### 触发方式

通过 `memory-capture.js` Hook 自动捕获：

```json
{
  "PostToolUse": [{
    "matcher": "Write|Edit",
    "hooks": [{
      "type": "command",
      "command": "node claude/hooks/scripts/memory-capture.js",
      "async": true
    }]
  }]
}
```

### 捕获规则

**patterns/** - 当修改以下文件时：
- 文件名包含：config, setup, init, core, base
- 文件路径包含：/core/, /base/, /utils/

**decisions/** - 当执行以下操作时：
- `git commit` 或 `git merge`
- 创建新的架构目录
- 修改重要配置

**learnings/** - 当执行以下操作时：
- Bash 命令包含 "fix"
- 提交消息包含 "fix" 或 "solve"

## 手动添加记忆

### 创建新记忆

```bash
# 1. 选择分类
cd claude/memory/auto/patterns  # 或 decisions / learnings

# 2. 创建文件（使用日期前缀）
touch 2026-04-17-my-pattern.md

# 3. 编写内容
```

### 记忆模板

```markdown
# 标题

**日期：** YYYY-MM-DD
**相关文件：** path/to/file
**标签：** #tag1 #tag2

## 背景/问题

描述背景或问题。

## 解决方案/模式

描述解决方案或模式。

## 代码示例

\`\`\`language
代码示例
\`\`\`

## 经验教训/注意事项

- 要点 1
- 要点 2
```

## 记忆维护

### 定期审查

每月审查一次自动记忆：
1. 删除过时的记忆
2. 合并相似的记忆
3. 提取通用模式到核心记忆

### 提升到核心记忆

如果某个模式反复出现，考虑提升到核心记忆：

```bash
# 从 auto/ 移动到核心
mv claude/memory/auto/patterns/important-pattern.md \
   claude/memory/important-pattern.md
```

## 搜索记忆

### 按关键字搜索

```bash
# 搜索所有记忆
grep -r "关键字" claude/memory/

# 只搜索自动记忆
grep -r "关键字" claude/memory/auto/
```

### 按日期搜索

```bash
# 查找特定日期的记忆
find claude/memory/auto -name "2026-04-17-*.md"

# 查找最近的记忆
ls -lt claude/memory/auto/*/*.md | head -10
```

### 按分类浏览

```bash
# 查看所有模式
ls claude/memory/auto/patterns/

# 查看所有决策
ls claude/memory/auto/decisions/

# 查看所有经验
ls claude/memory/auto/learnings/
```

## 最佳实践

1. **及时记录** - 在解决问题后立即记录
2. **具体明确** - 包含代码示例和具体步骤
3. **标注日期** - 使用日期前缀便于追溯
4. **添加标签** - 使用 #标签 便于搜索
5. **定期整理** - 每月审查和清理

## 与其他系统集成

### 与 Hooks 集成
自动捕获通过 PostToolUse hook 触发。

### 与 Agents 集成
Agents 可以读取记忆来学习项目模式。

### 与规则集成
从记忆中提取的模式可以转化为规则。

## 参考资料

- [Memory Capture Hook](../../hooks/scripts/memory-capture.js)
- [核心记忆系统](../README.md)
