# Hook 基类模式

**日期：** 2026-04-17
**文件：** claude/hooks/scripts/hook-base.js
**标签：** #pattern #hooks #base-class

## 背景

需要为多个 Hook 脚本提供统一的输入/输出处理和错误处理。

## 模式

使用基类封装通用逻辑，子类只需实现 `execute()` 方法。

## 代码示例

```javascript
class HookBase {
  // 读取 stdin 输入
  async readInput() {
    return new Promise((resolve, reject) => {
      let data = '';
      process.stdin.on('data', chunk => { data += chunk; });
      process.stdin.on('end', () => {
        resolve(JSON.parse(data));
      });
    });
  }

  // 输出 JSON 结果
  writeOutput(result) {
    console.log(JSON.stringify(result, null, 2));
  }

  // 子类实现
  async execute(input) {
    throw new Error('execute() must be implemented');
  }

  // 主流程
  async run() {
    try {
      const input = await this.readInput();
      const result = await this.execute(input);
      this.writeOutput(result);
      process.exit(result.continue ? 0 : 1);
    } catch (error) {
      this.writeOutput({
        continue: true,  // 优雅失败
        systemMessage: `Hook error: ${error.message}`
      });
      process.exit(0);
    }
  }
}
```

## 使用方式

```javascript
class QualityGate extends HookBase {
  async execute(input) {
    // 实现具体逻辑
    return this.success('Quality gate passed');
  }
}

new QualityGate().run();
```

## 优点

- **统一处理** - 所有 hooks 使用相同的输入/输出格式
- **错误处理** - 统一的异常捕获和优雅失败
- **代码复用** - 减少重复代码
- **易于扩展** - 新 hook 只需实现 execute()

## 注意事项

- 子类必须实现 `execute()` 方法
- 优雅失败：默认 `continue: true`，不阻塞工作流
- 使用辅助方法：`success()`, `fail()`, `warn()`
