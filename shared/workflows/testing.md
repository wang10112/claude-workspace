# 测试工作流

## 概述

这个工作流定义了如何系统地进行软件测试，从测试计划到执行和维护。

## 适用场景

- 为新功能编写测试
- 修复失败的测试
- 提高测试覆盖率
- 重构测试代码
- 设置测试框架

## 工作流步骤

### 阶段 1：测试规划

#### 1.1 分析需求
- 理解功能需求
- 识别测试范围
- 确定测试类型（单元/集成/E2E）
- 评估测试优先级

#### 1.2 设计测试策略
- 选择测试框架
- 确定覆盖率目标
- 规划测试数据
- 设计测试环境

### 阶段 2：编写测试

#### 2.1 单元测试
```
对于每个函数/类：
1. 测试正常情况
2. 测试边界条件
3. 测试异常情况
4. 测试边缘情况
```

#### 2.2 集成测试
```
对于每个模块交互：
1. 测试模块间通信
2. 测试数据流转
3. 测试错误处理
4. 测试性能
```

#### 2.3 E2E 测试
```
对于每个用户场景：
1. 模拟用户操作
2. 验证完整流程
3. 测试关键路径
4. 测试异常流程
```

### 阶段 3：执行测试

#### 3.1 本地测试
```bash
# 运行所有测试
npm test

# 运行特定测试
npm test -- path/to/test

# 生成覆盖率报告
npm test -- --coverage

# 监听模式
npm test -- --watch
```

#### 3.2 分析结果
- 检查失败的测试
- 分析错误信息
- 查看覆盖率报告
- 识别未测试的代码

#### 3.3 修复问题
- 修复失败的测试
- 补充缺失的测试
- 优化慢速测试
- 重构重复代码

### 阶段 4：持续集成

#### 4.1 CI 配置
```yaml
# 示例 GitHub Actions 配置
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test -- --coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v2
```

#### 4.2 质量门禁
- 所有测试必须通过
- 覆盖率不能降低
- 新代码必须有测试
- PR 必须包含测试

### 阶段 5：维护测试

#### 5.1 定期审查
- 每月审查测试质量
- 识别脆弱的测试
- 更新过时的测试
- 删除无效的测试

#### 5.2 重构测试
- 提取公共测试工具
- 使用测试 fixture
- 优化测试性能
- 改进测试可读性

## 测试类型决策树

```
需要测试什么？
├─ 单个函数/类
│  └─ 使用单元测试
├─ 模块间交互
│  └─ 使用集成测试
├─ 完整用户流程
│  └─ 使用 E2E 测试
└─ 性能/负载
   └─ 使用性能测试
```

## 测试优先级

### P0 - 必须测试
- 核心业务逻辑
- 支付和交易
- 安全相关功能
- 数据完整性

### P1 - 应该测试
- 常用功能
- API 端点
- 数据验证
- 错误处理

### P2 - 可以测试
- 辅助功能
- UI 组件
- 工具函数
- 配置逻辑

## 测试模板

### 单元测试模板
```javascript
describe('FunctionName', () => {
  // 准备测试数据
  beforeEach(() => {
    // setup
  });

  // 清理
  afterEach(() => {
    // teardown
  });

  it('should handle normal case', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = functionName(input);
    
    // Assert
    expect(result).toBe('expected');
  });

  it('should handle edge case', () => {
    // ...
  });

  it('should throw error for invalid input', () => {
    // ...
  });
});
```

### 集成测试模板
```javascript
describe('API Integration', () => {
  let server;

  beforeAll(async () => {
    server = await startTestServer();
  });

  afterAll(async () => {
    await server.close();
  });

  it('should create resource', async () => {
    const response = await request(server)
      .post('/api/resource')
      .send({ data: 'test' });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
```

### E2E 测试模板
```javascript
describe('User Login Flow', () => {
  it('should login successfully', async () => {
    await page.goto('http://localhost:3000/login');
    await page.fill('[name="email"]', 'user@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    await expect(page.locator('.welcome')).toBeVisible();
  });
});
```

## 覆盖率目标

### 代码覆盖率
- **行覆盖率**：80%+
- **分支覆盖率**：75%+
- **函数覆盖率**：85%+
- **语句覆盖率**：80%+

### 功能覆盖率
- **核心功能**：100%
- **常用功能**：90%+
- **辅助功能**：70%+

## 常见问题

### 测试太慢
- 使用并行执行
- Mock 外部依赖
- 优化测试数据
- 使用内存数据库

### 测试不稳定
- 避免时间依赖
- 清理测试状态
- 使用确定性数据
- 增加等待时间

### 覆盖率不足
- 识别未测试代码
- 补充边界测试
- 添加异常测试
- 测试错误路径

## 检查清单

### 测试编写
- [ ] 测试命名清晰
- [ ] 使用 AAA 模式
- [ ] 测试独立运行
- [ ] 断言明确
- [ ] 有必要的注释

### 测试质量
- [ ] 覆盖正常情况
- [ ] 覆盖边界条件
- [ ] 覆盖异常情况
- [ ] 测试快速执行
- [ ] 测试稳定可靠

### CI/CD
- [ ] 配置 CI 运行测试
- [ ] 生成覆盖率报告
- [ ] 设置质量门禁
- [ ] 失败时通知

## 相关资源

- `shared/skills/testing/` - 测试技能定义
- `shared/playbooks/testing-playbook.md` - 测试手册
- `shared/memory/testing-memory.md` - 测试记忆
- `claude/agents/tester.md` - 测试角色（如有）

## 输出

- 测试代码
- 覆盖率报告
- 测试文档
- CI 配置
