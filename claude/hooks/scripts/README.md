# Hook 脚本

这个目录包含可执行的 Hook 脚本（Node.js）。

## 脚本列表

### 核心脚本
- `hook-base.js` - Hook 脚本基类
- `quality-gate.js` - 代码质量检查
- `security-scan.js` - 安全扫描
- `memory-capture.js` - 记忆捕获

### 工具脚本
- `git-check.js` - Git 操作检查
- `format-code.js` - 代码格式化

## 编写 Hook 脚本

### 基本结构

```javascript
#!/usr/bin/env node
const HookBase = require('./hook-base');

class MyHook extends HookBase {
  async execute(input) {
    // 处理逻辑
    const result = {
      continue: true,
      systemMessage: "Hook executed"
    };
    return result;
  }
}

new MyHook().run();
```

### 输入格式

Hook 从 stdin 接收 JSON：

```json
{
  "session_id": "abc123",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.txt",
    "content": "..."
  },
  "tool_response": {
    "success": true
  }
}
```

### 输出格式

返回 JSON 控制行为：

```json
{
  "continue": true,
  "systemMessage": "Check passed",
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "Quality score: 95/100"
  }
}
```

## 测试脚本

```bash
# 模拟输入测试
echo '{"tool_name":"Write","tool_input":{"file_path":"test.txt"}}' | \
  node claude/hooks/scripts/quality-gate.js

# 查看输出
echo $?  # 退出码
```

## 最佳实践

1. **快速执行** - Hook 应在 5 秒内完成
2. **优雅失败** - 捕获异常，返回有意义的错误
3. **清晰日志** - 使用 stderr 输出调试信息
4. **幂等性** - 多次执行结果一致
5. **测试覆盖** - 为每个脚本编写测试

## 调试

设置环境变量启用调试：

```bash
DEBUG=hook:* node scripts/quality-gate.js
```
