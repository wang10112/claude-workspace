# Testing Playbook

## 快速参考

### 常用命令
```bash
# 运行所有测试
npm test

# 运行特定测试
npm test -- path/to/test

# 生成覆盖率报告
npm test -- --coverage

# 监听模式
npm test -- --watch

# 调试模式
npm test -- --inspect-brk
```

### 测试类型选择
- **单元测试** - 测试单个函数/类
- **集成测试** - 测试模块间交互
- **E2E 测试** - 测试完整用户流程

## 测试模板库

### 1. 基础单元测试
```javascript
describe('functionName', () => {
  it('should return expected result for valid input', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = functionName(input);
    
    // Assert
    expect(result).toBe('expected');
  });

  it('should throw error for invalid input', () => {
    expect(() => functionName(null)).toThrow();
  });
});
```

### 2. 异步测试
```javascript
describe('asyncFunction', () => {
  it('should resolve with data', async () => {
    const result = await asyncFunction();
    expect(result).toEqual({ data: 'test' });
  });

  it('should reject with error', async () => {
    await expect(asyncFunction('invalid')).rejects.toThrow();
  });
});
```

### 3. Mock 测试
```javascript
import { jest } from '@jest/globals';

describe('functionWithDependency', () => {
  it('should call dependency correctly', () => {
    // Mock 依赖
    const mockDependency = jest.fn().mockReturnValue('mocked');
    
    // 执行
    const result = functionWithDependency(mockDependency);
    
    // 验证
    expect(mockDependency).toHaveBeenCalledWith('expected-arg');
    expect(result).toBe('mocked');
  });
});
```

### 4. API 测试
```javascript
describe('POST /api/users', () => {
  it('should create user successfully', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Test User', email: 'test@example.com' })
      .expect(201);
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test User');
  });

  it('should return 400 for invalid data', async () => {
    await request(app)
      .post('/api/users')
      .send({ name: '' })
      .expect(400);
  });
});
```

### 5. 数据库测试
```javascript
describe('User Repository', () => {
  beforeEach(async () => {
    await db.migrate.latest();
    await db.seed.run();
  });

  afterEach(async () => {
    await db.migrate.rollback();
  });

  it('should create user in database', async () => {
    const user = await userRepository.create({
      name: 'Test',
      email: 'test@example.com'
    });
    
    expect(user.id).toBeDefined();
    
    const found = await userRepository.findById(user.id);
    expect(found.name).toBe('Test');
  });
});
```

### 6. E2E 测试 (Playwright)
```javascript
import { test, expect } from '@playwright/test';

test('user login flow', async ({ page }) => {
  // 导航到登录页
  await page.goto('http://localhost:3000/login');
  
  // 填写表单
  await page.fill('[name="email"]', 'user@example.com');
  await page.fill('[name="password"]', 'password123');
  
  // 提交
  await page.click('button[type="submit"]');
  
  // 验证跳转
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  await expect(page.locator('.welcome')).toBeVisible();
});
```

## 测试场景清单

### 函数测试
- [ ] 正常输入
- [ ] 边界值（0, 1, -1, 最大值, 最小值）
- [ ] 空值（null, undefined, ''）
- [ ] 类型错误
- [ ] 异常情况

### API 测试
- [ ] 成功响应（200, 201）
- [ ] 客户端错误（400, 401, 403, 404）
- [ ] 服务器错误（500）
- [ ] 认证和授权
- [ ] 请求验证
- [ ] 响应格式

### 数据库测试
- [ ] Create 操作
- [ ] Read 操作
- [ ] Update 操作
- [ ] Delete 操作
- [ ] 唯一约束
- [ ] 外键约束
- [ ] 事务处理

### UI 测试
- [ ] 元素可见性
- [ ] 按钮点击
- [ ] 表单提交
- [ ] 输入验证
- [ ] 错误提示
- [ ] 加载状态

## 覆盖率分析

### 查看覆盖率报告
```bash
# 生成覆盖率
npm test -- --coverage

# 打开 HTML 报告
open coverage/lcov-report/index.html
```

### 覆盖率指标
- **行覆盖率** - 执行的代码行百分比
- **分支覆盖率** - 执行的分支百分比
- **函数覆盖率** - 调用的函数百分比
- **语句覆盖率** - 执行的语句百分比

### 提高覆盖率
1. 识别未覆盖的代码
2. 分析是否需要测试
3. 编写缺失的测试
4. 验证覆盖率提升

## 测试调试

### 调试单个测试
```bash
# Node.js 调试
node --inspect-brk node_modules/.bin/jest --runInBand path/to/test

# VS Code 调试配置
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "${file}"],
  "console": "integratedTerminal"
}
```

### 常见调试技巧
- 使用 `console.log` 输出中间值
- 使用 `debugger` 断点
- 使用 `--verbose` 查看详细输出
- 使用 `--no-coverage` 加快调试速度

## CI/CD 集成

### GitHub Actions 配置
```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

### GitLab CI 配置
```yaml
test:
  stage: test
  script:
    - npm ci
    - npm test -- --coverage
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
```

## 性能优化

### 并行执行
```bash
# Jest 并行执行
npm test -- --maxWorkers=4

# 或使用百分比
npm test -- --maxWorkers=50%
```

### 只运行变更的测试
```bash
# 只测试变更的文件
npm test -- --onlyChanged

# 或
npm test -- -o
```

### 使用测试缓存
```bash
# 清除缓存
npm test -- --clearCache

# 不使用缓存
npm test -- --no-cache
```

## 测试维护

### 定期审查清单
- [ ] 识别脆弱的测试（经常失败）
- [ ] 更新过时的测试
- [ ] 删除无效的测试
- [ ] 重构重复的测试代码
- [ ] 优化慢速测试

### 重构测试代码
```javascript
// 提取公共 setup
function createTestUser() {
  return {
    name: 'Test User',
    email: 'test@example.com'
  };
}

// 使用 beforeEach
beforeEach(() => {
  // 公共准备逻辑
});

// 提取断言辅助函数
function expectValidUser(user) {
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('email');
}
```

## 故障排查

### 测试失败
1. 查看错误信息
2. 检查测试逻辑
3. 验证测试数据
4. 检查环境配置
5. 运行单个测试隔离问题

### 测试超时
1. 增加超时时间
2. 检查异步操作
3. 优化测试逻辑
4. Mock 慢速依赖

### 测试不稳定
1. 避免时间依赖
2. 清理测试状态
3. 使用确定性数据
4. 增加等待时间

## 参考资源

- [Jest 文档](https://jestjs.io/)
- [Vitest 文档](https://vitest.dev/)
- [Playwright 文档](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
