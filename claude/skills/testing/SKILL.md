# Testing Skill - Claude 适配器

## 概述

这是 `shared/skills/testing/` 的 Claude Code 适配器，用于软件测试任务。

## 何时使用

当用户请求以下任务时，使用此技能：

- "写测试"、"添加测试"
- "测试这个函数"
- "提高测试覆盖率"
- "修复失败的测试"
- "设置测试框架"
- "运行测试"
- "E2E 测试"、"集成测试"、"单元测试"

## 快速开始

### 1. 分析测试需求
```
我需要为 [功能/模块] 编写测试。
```

### 2. 选择测试类型
- **单元测试** - 测试单个函数/类
- **集成测试** - 测试模块间交互
- **E2E 测试** - 测试完整用户流程

### 3. 编写测试
参考 `shared/playbooks/testing-playbook.md` 中的模板。

### 4. 运行测试
```bash
npm test
npm test -- --coverage
```

## 工作流程

1. **阅读共享定义**
   - `shared/skills/testing/SKILL.md` - 技能定义
   - `shared/workflows/testing.md` - 工作流程
   - `shared/playbooks/testing-playbook.md` - 测试手册

2. **查阅记忆**
   - `shared/memory/testing-memory.md` - 测试模块记忆
   - `shared/memory/user-preferences.md` - 用户偏好

3. **执行测试任务**
   - 分析需求
   - 设计测试
   - 编写测试代码
   - 运行并验证

4. **输出结果**
   - 测试代码
   - 覆盖率报告
   - 测试文档

## 常用测试框架

### JavaScript/TypeScript
- Jest
- Vitest
- Cypress
- Playwright

### Python
- pytest
- unittest

### Go
- testing
- testify

## 测试模板

参考 `shared/playbooks/testing-playbook.md` 获取完整的测试模板库。

### 快速模板
```javascript
describe('functionName', () => {
  it('should handle normal case', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = functionName(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

## 相关资源

- **共享层**
  - `shared/skills/testing/SKILL.md`
  - `shared/workflows/testing.md`
  - `shared/playbooks/testing-playbook.md`
  - `shared/memory/testing-memory.md`

- **相关技能**
  - `debugging` - 调试失败的测试
  - `refactoring` - 重构测试代码
  - `review` - 审查测试质量

## 示例

参考 `examples/testing/` 目录（待创建）获取实际示例。
