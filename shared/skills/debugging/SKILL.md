---
name: debugging
description: 调试能力 - 错误诊断、日志分析、性能分析和问题定位
type: skill
---

# Debugging Skill

## 何时使用

当需要以下调试相关任务时使用此技能：

- 诊断和修复 bug
- 分析错误日志
- 性能问题排查
- 内存泄漏检测
- 网络请求调试
- 数据库查询优化
- 代码执行流程追踪
- 异常堆栈分析

## 核心能力

### 1. 错误诊断
- 分析错误信息和堆栈跟踪
- 识别错误根本原因
- 重现问题场景
- 验证修复方案

### 2. 日志分析
- 解析应用日志
- 识别异常模式
- 追踪请求链路
- 分析时间序列

### 3. 性能分析
- CPU 性能分析
- 内存使用分析
- 网络延迟分析
- 数据库查询优化

### 4. 问题定位
- 使用断点调试
- 变量监视
- 条件断点
- 调用栈分析

## 调试方法论

### 1. 重现问题
- 收集问题描述
- 确定重现步骤
- 准备测试环境
- 验证问题存在

### 2. 隔离问题
- 缩小问题范围
- 排除无关因素
- 识别关键变量
- 定位问题代码

### 3. 分析原因
- 检查错误信息
- 分析代码逻辑
- 验证假设
- 找到根本原因

### 4. 修复验证
- 实施修复方案
- 编写测试用例
- 验证修复效果
- 防止问题复发

## 调试工具

### JavaScript/TypeScript

#### 浏览器开发者工具
- **Console** - 日志输出和交互式调试
- **Sources** - 断点调试和代码执行
- **Network** - 网络请求监控
- **Performance** - 性能分析
- **Memory** - 内存分析

#### Node.js 调试
```bash
# 启动调试模式
node --inspect app.js
node --inspect-brk app.js  # 启动时暂停

# Chrome DevTools
chrome://inspect
```

#### VS Code 调试配置
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Program",
  "program": "${workspaceFolder}/app.js",
  "console": "integratedTerminal"
}
```

### Python

#### pdb 调试器
```python
import pdb

# 设置断点
pdb.set_trace()

# 或使用 breakpoint()（Python 3.7+）
breakpoint()
```

#### 常用命令
- `n` (next) - 下一行
- `s` (step) - 进入函数
- `c` (continue) - 继续执行
- `p variable` - 打印变量
- `l` (list) - 显示代码
- `q` (quit) - 退出

### Go

#### Delve 调试器
```bash
# 安装
go install github.com/go-delve/delve/cmd/dlv@latest

# 调试
dlv debug
dlv test
```

### 日志工具

#### 结构化日志
```javascript
// Winston (Node.js)
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

```python
# Python logging
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
```

## 调试技巧

### 1. 二分法调试
```
1. 在代码中间设置断点
2. 检查变量状态
3. 如果正常，问题在后半部分
4. 如果异常，问题在前半部分
5. 重复直到找到问题
```

### 2. 橡皮鸭调试法
- 向他人（或橡皮鸭）解释代码
- 逐行说明代码逻辑
- 在解释过程中发现问题

### 3. 日志驱动调试
```javascript
console.log('Step 1: Input =', input);
console.log('Step 2: Processed =', processed);
console.log('Step 3: Result =', result);
```

### 4. 断言调试
```javascript
console.assert(value > 0, 'Value should be positive');
console.assert(array.length > 0, 'Array should not be empty');
```

### 5. 时间旅行调试
- 使用支持时间旅行的调试器
- 回退到之前的状态
- 重新执行代码

## 常见问题类型

### 1. 语法错误
- 拼写错误
- 括号不匹配
- 缺少分号
- 缩进错误

**调试方法**：
- 查看编译器/解释器错误信息
- 使用 linter 工具
- 检查行号附近的代码

### 2. 逻辑错误
- 条件判断错误
- 循环逻辑错误
- 边界条件处理错误
- 算法实现错误

**调试方法**：
- 使用断点逐步执行
- 打印中间变量
- 验证假设
- 编写测试用例

### 3. 运行时错误
- 空指针/未定义
- 类型错误
- 数组越界
- 除零错误

**调试方法**：
- 查看堆栈跟踪
- 检查变量值
- 添加空值检查
- 使用 try-catch

### 4. 性能问题
- 慢查询
- 内存泄漏
- CPU 占用高
- 网络延迟

**调试方法**：
- 使用性能分析工具
- 分析热点代码
- 优化算法
- 添加缓存

### 5. 并发问题
- 竞态条件
- 死锁
- 数据不一致
- 资源争用

**调试方法**：
- 使用并发调试工具
- 添加日志追踪
- 使用锁机制
- 简化并发逻辑

## 性能分析

### CPU 分析
```bash
# Node.js
node --prof app.js
node --prof-process isolate-*.log

# Chrome DevTools
Performance tab -> Record -> Stop
```

### 内存分析
```bash
# Node.js heap snapshot
node --inspect app.js
# Chrome DevTools -> Memory -> Take snapshot

# 内存泄漏检测
node --trace-gc app.js
```

### 网络分析
- 使用浏览器 Network 面板
- 检查请求时间
- 分析瀑布图
- 优化请求顺序

## 调试清单

### 问题重现
- [ ] 收集问题描述
- [ ] 确定重现步骤
- [ ] 准备测试数据
- [ ] 验证问题存在

### 信息收集
- [ ] 错误信息
- [ ] 堆栈跟踪
- [ ] 日志文件
- [ ] 环境信息
- [ ] 输入数据

### 问题分析
- [ ] 缩小问题范围
- [ ] 识别关键变量
- [ ] 分析代码逻辑
- [ ] 验证假设

### 修复验证
- [ ] 实施修复
- [ ] 编写测试
- [ ] 验证修复
- [ ] 代码审查

## 最佳实践

### 1. 使用版本控制
- 提交前的代码可以工作
- 小步提交，便于回退
- 使用分支隔离调试

### 2. 编写测试
- 为 bug 编写测试用例
- 确保修复后测试通过
- 防止问题复发

### 3. 添加日志
- 在关键位置添加日志
- 使用合适的日志级别
- 包含上下文信息

### 4. 代码审查
- 让他人审查修复
- 讨论根本原因
- 分享调试经验

### 5. 文档记录
- 记录问题和解决方案
- 更新故障排查文档
- 分享给团队

## 调试工作流

```
1. 重现问题
   ↓
2. 收集信息（错误、日志、堆栈）
   ↓
3. 形成假设
   ↓
4. 验证假设（断点、日志、测试）
   ↓
5. 找到根本原因
   ↓
6. 实施修复
   ↓
7. 编写测试
   ↓
8. 验证修复
   ↓
9. 代码审查
   ↓
10. 部署和监控
```

## 常用调试命令

### Chrome DevTools
- `debugger` - 设置断点
- `console.log()` - 输出日志
- `console.table()` - 表格显示
- `console.time()` / `console.timeEnd()` - 计时
- `console.trace()` - 堆栈跟踪

### VS Code
- `F5` - 开始调试
- `F9` - 切换断点
- `F10` - 单步跳过
- `F11` - 单步进入
- `Shift+F11` - 单步跳出

## 参考资源

- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [VS Code Debugging](https://code.visualstudio.com/docs/editor/debugging)
- [Node.js Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [Python pdb](https://docs.python.org/3/library/pdb.html)

## 相关技能

- `testing` - 编写测试防止 bug
- `refactoring` - 重构代码提高质量
- `review` - 代码审查发现问题
- `verification` - 验证修复效果
