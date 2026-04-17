# Hook 脚本需要优雅失败

**日期：** 2026-04-17
**问题：** Hook 脚本读取不存在的文件时崩溃
**标签：** #learning #hooks #error-handling

## 问题描述

在测试 `quality-gate.js` 时，发现当文件不存在时会抛出异常：

```
ENOENT: no such file or directory, open '/tmp/test.js'
```

这会导致 hook 失败，可能阻塞工作流。

## 根本原因

Hook 脚本直接使用 `fs.readFileSync()` 读取文件，没有处理文件不存在的情况。

## 解决方案

### 方案 1：try-catch 捕获异常

```javascript
try {
  content = fs.readFileSync(filePath, 'utf-8');
} catch (error) {
  return this.warn(`Could not read file: ${error.message}`);
}
```

### 方案 2：先检查文件存在

```javascript
if (!fs.existsSync(filePath)) {
  return this.warn(`File does not exist: ${filePath}`);
}
content = fs.readFileSync(filePath, 'utf-8');
```

**选择方案 1** - try-catch 更通用，可以捕获所有读取错误（权限、编码等）。

## 实施

在 `quality-gate.js` 中添加错误处理：

```javascript
async execute(input) {
  const filePath = tool_input?.file_path;
  
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    return this.warn(`Could not read file: ${error.message}`);
  }
  
  // 继续检查...
}
```

## 验证

测试不存在的文件：

```bash
echo '{"tool_name":"Write","tool_input":{"file_path":"/tmp/test.js"}}' | \
  node claude/hooks/scripts/quality-gate.js
```

输出：
```json
{
  "continue": true,
  "systemMessage": "⚠️  Could not read file: ENOENT: no such file or directory"
}
```

✅ 优雅失败，不阻塞工作流。

## 经验教训

1. **优雅失败原则** - Hook 应该容错，不阻塞正常工作流
2. **使用 warn() 而不是 fail()** - 非关键错误应该警告而不是失败
3. **try-catch 优于存在性检查** - 可以捕获更多类型的错误
4. **测试边界情况** - 文件不存在、权限不足、编码错误等
5. **返回有意义的错误消息** - 帮助用户理解问题

## 应用到其他 Hooks

这个模式应该应用到所有 hooks：

- ✅ quality-gate.js - 已实现
- ✅ security-scan.js - 已实现
- ✅ memory-capture.js - 已实现

## 相关模式

- [Hook 基类模式](../patterns/2026-04-17-hook-base-class.md) - 统一错误处理
