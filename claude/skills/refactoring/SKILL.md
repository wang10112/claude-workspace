---
name: refactoring
description: 代码重构能力 - 改进代码结构、提高可维护性、优化性能
type: skill
---

# Refactoring Skill

## 何时使用

- 改进代码结构
- 消除代码重复
- 提高代码可读性
- 优化性能
- 简化复杂逻辑
- 更新过时代码
- 技术债务清理

## 核心能力

### 1. 代码清理
- 删除死代码
- 删除注释代码
- 统一代码风格
- 修复 linter 警告

### 2. 结构优化
- 提取函数/方法
- 提取类
- 内联函数
- 移动代码

### 3. 命名改进
- 重命名变量
- 重命名函数
- 重命名类
- 使用有意义的名称

### 4. 逻辑简化
- 简化条件表达式
- 合并重复代码
- 分解复杂函数
- 使用设计模式

## 重构原则

1. **小步前进** - 每次只做一个小改动
2. **测试保护** - 重构前后测试都通过
3. **提交频繁** - 每个重构步骤都提交
4. **保持功能** - 不改变外部行为

## 常见重构模式

### 提取函数
```javascript
// Before
function printOwing() {
  printBanner();
  console.log('name:', name);
  console.log('amount:', getOutstanding());
}

// After
function printOwing() {
  printBanner();
  printDetails(getOutstanding());
}

function printDetails(outstanding) {
  console.log('name:', name);
  console.log('amount:', outstanding);
}
```

### 提取变量
```javascript
// Before
if (platform.toUpperCase().indexOf('MAC') > -1 && browser.toUpperCase().indexOf('IE') > -1) {
  // ...
}

// After
const isMacOS = platform.toUpperCase().indexOf('MAC') > -1;
const isIE = browser.toUpperCase().indexOf('IE') > -1;
if (isMacOS && isIE) {
  // ...
}
```

### 合并重复代码
```javascript
// Before
function getPrice() {
  if (isSpecialDeal()) {
    return basePrice * 0.9;
  }
  return basePrice * 0.95;
}

// After
function getPrice() {
  const discount = isSpecialDeal() ? 0.9 : 0.95;
  return basePrice * discount;
}
```

## 重构工作流

1. 识别需要重构的代码
2. 确保有测试覆盖
3. 小步重构
4. 运行测试
5. 提交更改
6. 重复

## 相关技能

- `testing` - 确保重构安全
- `review` - 审查重构质量
- `debugging` - 修复重构引入的问题
