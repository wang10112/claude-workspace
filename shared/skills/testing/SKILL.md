---
name: testing
description: 软件测试能力 - 单元测试、集成测试、E2E测试和测试覆盖率分析
type: skill
---

# Testing Skill

## 何时使用

当需要以下测试相关任务时使用此技能：

- 编写单元测试
- 设计集成测试
- 创建 E2E（端到端）测试
- 分析测试覆盖率
- 修复失败的测试
- 重构测试代码
- 设置测试框架
- 编写测试文档

## 核心能力

### 1. 单元测试 (Unit Testing)
- 为函数和类编写单元测试
- 使用 mock 和 stub 隔离依赖
- 测试边界条件和异常情况
- 保持测试的独立性和可重复性

### 2. 集成测试 (Integration Testing)
- 测试模块间的交互
- 测试数据库操作
- 测试 API 端点
- 测试第三方服务集成

### 3. E2E 测试 (End-to-End Testing)
- 模拟用户完整操作流程
- 测试关键业务场景
- 跨浏览器测试
- 性能和负载测试

### 4. 测试覆盖率分析
- 生成覆盖率报告
- 识别未测试的代码路径
- 设定覆盖率目标
- 持续改进测试质量

## 测试原则

### TDD (Test-Driven Development)
1. 先写测试（Red）
2. 实现功能（Green）
3. 重构代码（Refactor）

### 测试金字塔
- **单元测试**（70%）- 快速、大量、细粒度
- **集成测试**（20%）- 中等速度、适量、模块级
- **E2E 测试**（10%）- 慢速、少量、系统级

### 好测试的特征
- **Fast** - 快速执行
- **Independent** - 相互独立
- **Repeatable** - 可重复执行
- **Self-validating** - 自动验证
- **Timely** - 及时编写

## 常用测试框架

### JavaScript/TypeScript
- **Jest** - 全功能测试框架
- **Vitest** - 快速的 Vite 原生测试框架
- **Mocha + Chai** - 灵活的测试组合
- **Cypress** - E2E 测试
- **Playwright** - 跨浏览器 E2E 测试

### Python
- **pytest** - 功能强大的测试框架
- **unittest** - Python 标准库
- **nose2** - unittest 扩展
- **Selenium** - Web 自动化测试

### Go
- **testing** - Go 标准库
- **testify** - 断言和 mock 库
- **ginkgo** - BDD 风格测试框架

### Java
- **JUnit** - 标准单元测试框架
- **TestNG** - 功能丰富的测试框架
- **Mockito** - Mock 框架
- **Selenium** - Web 自动化测试

## 工作流程

### 1. 分析需求
- 理解要测试的功能
- 识别测试场景
- 确定测试类型
- 评估测试优先级

### 2. 设计测试
- 编写测试计划
- 设计测试用例
- 准备测试数据
- 设置测试环境

### 3. 编写测试
- 遵循命名约定
- 使用清晰的断言
- 添加必要的注释
- 保持测试简洁

### 4. 执行测试
- 运行测试套件
- 分析测试结果
- 修复失败的测试
- 生成覆盖率报告

### 5. 维护测试
- 更新过时的测试
- 重构重复的测试代码
- 优化慢速测试
- 删除无效测试

## 最佳实践

### 测试命名
```
test_<function_name>_<scenario>_<expected_result>
```

示例：
- `test_login_with_valid_credentials_succeeds`
- `test_login_with_invalid_password_fails`
- `test_login_with_empty_email_returns_error`

### 测试结构（AAA 模式）
```
// Arrange - 准备测试数据和环境
// Act - 执行被测试的操作
// Assert - 验证结果
```

### 测试隔离
- 每个测试独立运行
- 使用 setup/teardown 清理状态
- 避免测试间的依赖
- 使用测试数据库或 mock

### 测试数据
- 使用有意义的测试数据
- 测试边界值
- 测试异常情况
- 使用 fixture 或 factory

## 常见测试场景

### 1. 函数测试
- 正常输入
- 边界值
- 异常输入
- 空值/null
- 类型错误

### 2. API 测试
- 成功响应（200）
- 错误响应（400, 404, 500）
- 认证和授权
- 请求验证
- 响应格式

### 3. 数据库测试
- CRUD 操作
- 事务处理
- 约束验证
- 并发控制
- 数据迁移

### 4. UI 测试
- 元素可见性
- 用户交互
- 表单验证
- 导航流程
- 响应式布局

## 测试覆盖率目标

- **关键业务逻辑**：90%+
- **工具函数**：80%+
- **UI 组件**：70%+
- **配置文件**：可选

## 持续集成

### CI 配置
- 每次提交运行测试
- PR 必须通过测试
- 生成覆盖率报告
- 失败时通知团队

### 测试环境
- 独立的测试数据库
- Mock 外部服务
- 使用测试配置
- 清理测试数据

## 参考资源

- [Jest 文档](https://jestjs.io/)
- [pytest 文档](https://docs.pytest.org/)
- [Testing Best Practices](https://testingjavascript.com/)
- [Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)

## 相关技能

- `debugging` - 调试失败的测试
- `refactoring` - 重构测试代码
- `review` - 审查测试质量
- `verification` - 验证测试覆盖率
