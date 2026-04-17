# Hooks 配置指南

完整的 Hooks 配置示例和最佳实践。

## 基础配置

### 最小配置

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node claude/hooks/scripts/quality-gate.js"
          }
        ]
      }
    ]
  }
}
```

### 完整配置

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node claude/hooks/scripts/quality-gate.js",
            "description": "代码质量检查",
            "timeout": 5000
          },
          {
            "type": "command",
            "command": "node claude/hooks/scripts/security-scan.js",
            "description": "安全扫描",
            "timeout": 5000
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "node claude/hooks/scripts/memory-capture.js",
            "description": "自动记忆捕获"
          }
        ]
      }
    ]
  }
}
```

## 常见场景

### 1. 代码质量检查

**场景：** 在写入文件前检查代码质量

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node claude/hooks/scripts/quality-gate.js"
          }
        ]
      }
    ]
  }
}
```

### 2. 安全扫描

**场景：** 在写入文件前扫描安全问题

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node claude/hooks/scripts/security-scan.js"
          }
        ]
      }
    ]
  }
}
```

### 3. 自动记忆捕获

**场景：** 在所有操作后自动捕获记忆

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "node claude/hooks/scripts/memory-capture.js"
          }
        ]
      }
    ]
  }
}
```

### 4. 特定文件类型

**场景：** 只对特定文件类型执行检查

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "filter": {
          "file_path": "\\.(ts|tsx|js|jsx)$"
        },
        "hooks": [
          {
            "type": "command",
            "command": "npx eslint --stdin --stdin-filename ${file_path}"
          }
        ]
      }
    ]
  }
}
```

### 5. Git 提交前检查

**场景：** 在 Git 提交前运行测试

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "filter": {
          "command": "git commit"
        },
        "hooks": [
          {
            "type": "command",
            "command": "npm test",
            "description": "运行测试"
          }
        ]
      }
    ]
  }
}
```

## 高级配置

### 条件执行

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "filter": {
          "file_path": "src/.*\\.ts$",
          "content": "TODO|FIXME"
        },
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Warning: File contains TODO/FIXME'"
          }
        ]
      }
    ]
  }
}
```

### 多个 Hooks 串联

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node claude/hooks/scripts/quality-gate.js",
            "description": "质量检查"
          },
          {
            "type": "command",
            "command": "node claude/hooks/scripts/security-scan.js",
            "description": "安全扫描"
          },
          {
            "type": "command",
            "command": "npx prettier --check ${file_path}",
            "description": "格式检查"
          }
        ]
      }
    ]
  }
}
```

### 超时配置

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npm test",
            "timeout": 30000,
            "description": "运行测试（30秒超时）"
          }
        ]
      }
    ]
  }
}
```

## 输出控制

### Block（阻止操作）

```json
{
  "output": {
    "action": "block",
    "message": "发现安全问题，操作已阻止"
  }
}
```

### Allow（允许操作）

```json
{
  "output": {
    "action": "allow",
    "message": "检查通过"
  }
}
```

### Allow with Warning（允许但警告）

```json
{
  "output": {
    "action": "allow",
    "message": "检查通过，但发现 3 个警告"
  }
}
```

## 最佳实践

### 1. 优雅失败

Hook 应该在失败时提供清晰的错误信息：

```javascript
try {
  // 执行检查
  const result = performCheck();
  
  if (result.hasErrors) {
    console.log(JSON.stringify({
      output: {
        action: "block",
        message: `发现 ${result.errors.length} 个错误`
      }
    }));
    process.exit(1);
  }
} catch (error) {
  // 优雅失败 - 不阻止操作
  console.log(JSON.stringify({
    output: {
      action: "allow",
      message: `检查失败: ${error.message}`
    }
  }));
  process.exit(0);
}
```

### 2. 性能优化

- 使用超时避免长时间等待
- 只对必要的文件执行检查
- 使用缓存加速重复检查

### 3. 清晰的反馈

```javascript
console.log(JSON.stringify({
  output: {
    action: "block",
    message: "代码质量检查失败",
    details: [
      "src/utils.ts:42 - 未使用的变量",
      "src/api.ts:15 - 缺少错误处理"
    ]
  }
}));
```

### 4. 可配置性

使用环境变量控制 Hook 行为：

```javascript
const STRICT_MODE = process.env.STRICT_MODE === 'true';

if (STRICT_MODE && hasWarnings) {
  // 严格模式下警告也阻止
  console.log(JSON.stringify({
    output: { action: "block", message: "发现警告" }
  }));
} else {
  // 宽松模式下只提示
  console.log(JSON.stringify({
    output: { action: "allow", message: "发现警告但允许继续" }
  }));
}
```

## 调试 Hooks

### 1. 测试 Hook

```bash
# 手动测试 Hook
echo '{"tool_name":"Write","tool_input":{"file_path":"test.js"}}' | \
  node claude/hooks/scripts/quality-gate.js
```

### 2. 查看 Hook 输出

```bash
# 启用调试模式
DEBUG=hooks node claude/hooks/scripts/quality-gate.js
```

### 3. 禁用 Hook

临时禁用 Hook 进行调试：

```json
{
  "hooks": {
    "PreToolUse": []
  }
}
```

## 故障排查

### Hook 不执行

**检查：**
1. Hook 配置是否正确
2. 脚本是否有执行权限
3. matcher 是否匹配

### Hook 超时

**解决：**
1. 增加 timeout 值
2. 优化 Hook 性能
3. 使用异步执行

### Hook 阻止了正常操作

**解决：**
1. 检查 Hook 输出
2. 修复报告的问题
3. 临时禁用 Hook

## 参考资料

- [Claude Code Hooks 文档](https://docs.anthropic.com/claude-code/hooks)
- [示例 Hooks](claude/hooks/examples/)
- [Hook 脚本](claude/hooks/scripts/)
