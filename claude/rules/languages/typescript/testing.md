# TypeScript 测试规范

## 原则

编写可维护、可靠的测试，确保代码质量。

## 测试框架

### Jest（推荐）

**适用场景：**
- React 项目
- Node.js 项目
- 需要快照测试

**配置：**
```typescript
// jest.config.ts
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### Vitest（现代化）

**适用场景：**
- Vite 项目
- 需要快速测试
- ESM 优先

**配置：**
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    }
  }
});
```

## 测试结构

### ✅ 使用 AAA 模式

```typescript
describe('UserService', () => {
  it('should create a new user', async () => {
    // Arrange - 准备
    const userData = {
      name: 'Alice',
      email: 'alice@example.com'
    };
    const mockDb = { save: jest.fn() };
    const service = new UserService(mockDb);

    // Act - 执行
    const result = await service.createUser(userData);

    // Assert - 断言
    expect(result).toEqual({
      id: expect.any(String),
      ...userData
    });
    expect(mockDb.save).toHaveBeenCalledWith(userData);
  });
});
```

### ✅ 清晰的测试命名

```typescript
// ✅ 好 - 描述行为和预期结果
it('should return 404 when user not found', () => {});
it('should throw ValidationError when email is invalid', () => {});
it('should cache result after first call', () => {});

// ❌ 不好 - 模糊不清
it('test user', () => {});
it('works', () => {});
it('error case', () => {});
```

## 单元测试

### ✅ 测试纯函数

```typescript
// 被测试的函数
function calculateTotal(items: Item[], taxRate: number): number {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  return subtotal * (1 + taxRate);
}

// 测试
describe('calculateTotal', () => {
  it('should calculate total with tax', () => {
    const items = [
      { price: 10 },
      { price: 20 }
    ];
    
    const total = calculateTotal(items, 0.1);
    
    expect(total).toBe(33);
  });

  it('should return 0 for empty items', () => {
    expect(calculateTotal([], 0.1)).toBe(0);
  });

  it('should handle zero tax rate', () => {
    const items = [{ price: 10 }];
    expect(calculateTotal(items, 0)).toBe(10);
  });
});
```

### ✅ 使用依赖注入便于测试

```typescript
// ✅ 好 - 依赖注入
class UserService {
  constructor(private db: Database) {}
  
  async getUser(id: string) {
    return this.db.findUser(id);
  }
}

// 测试时注入 mock
const mockDb = { findUser: jest.fn() };
const service = new UserService(mockDb);

// ❌ 不好 - 硬编码依赖
class UserService {
  async getUser(id: string) {
    const db = new Database(); // 难以测试
    return db.findUser(id);
  }
}
```

## Mock 和 Stub

### ✅ Mock 外部依赖

```typescript
// Mock 数据库
const mockDb = {
  findUser: jest.fn().mockResolvedValue({
    id: '1',
    name: 'Alice'
  }),
  saveUser: jest.fn().mockResolvedValue(undefined)
};

// Mock HTTP 请求
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockResolvedValue({ data: { id: 1 } });
```

### ✅ 使用 jest.spyOn

```typescript
// 监听方法调用
const spy = jest.spyOn(service, 'sendEmail');

await service.createUser(userData);

expect(spy).toHaveBeenCalledWith('alice@example.com');
spy.mockRestore();
```

## React 组件测试

### ✅ 使用 React Testing Library

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  it('should display user name', () => {
    const user = { name: 'Alice', email: 'alice@example.com' };
    
    render(<UserProfile user={user} />);
    
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('should call onEdit when edit button clicked', () => {
    const onEdit = jest.fn();
    const user = { name: 'Alice', email: 'alice@example.com' };
    
    render(<UserProfile user={user} onEdit={onEdit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    
    expect(onEdit).toHaveBeenCalledWith(user);
  });
});
```

### ✅ 测试异步行为

```typescript
import { render, screen, waitFor } from '@testing-library/react';

it('should load and display user data', async () => {
  const mockFetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve({ name: 'Alice' })
  });
  global.fetch = mockFetch;

  render(<UserProfile userId="1" />);

  // 等待加载完成
  await waitFor(() => {
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  expect(mockFetch).toHaveBeenCalledWith('/api/users/1');
});
```

## 集成测试

### ✅ 测试 API 端点

```typescript
import request from 'supertest';
import { app } from './app';

describe('POST /api/users', () => {
  it('should create a new user', async () => {
    const userData = {
      name: 'Alice',
      email: 'alice@example.com'
    };

    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(String),
      ...userData
    });
  });

  it('should return 400 for invalid email', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'invalid' })
      .expect(400);

    expect(response.body.error).toContain('email');
  });
});
```

## 测试覆盖率

### 目标

- **行覆盖率**: ≥ 80%
- **分支覆盖率**: ≥ 80%
- **函数覆盖率**: ≥ 80%
- **语句覆盖率**: ≥ 80%

### 检查覆盖率

```bash
# Jest
npm test -- --coverage

# Vitest
npm test -- --coverage
```

### ✅ 关注关键路径

```typescript
// 优先测试关键业务逻辑
describe('PaymentService', () => {
  it('should process payment successfully', () => {});
  it('should handle payment failure', () => {});
  it('should refund payment', () => {});
  it('should validate payment amount', () => {});
});

// 工具函数可以较低覆盖率
describe('formatDate', () => {
  it('should format date correctly', () => {});
});
```

## 测试最佳实践

### 1. 独立性

```typescript
// ✅ 好 - 每个测试独立
describe('UserService', () => {
  let service: UserService;
  
  beforeEach(() => {
    service = new UserService(mockDb);
  });

  it('test 1', () => {});
  it('test 2', () => {});
});

// ❌ 不好 - 测试相互依赖
let userId: string;
it('should create user', () => {
  userId = createUser(); // 后续测试依赖这个
});
it('should get user', () => {
  getUser(userId); // 依赖前一个测试
});
```

### 2. 快速执行

```typescript
// ✅ 好 - 使用 mock
const mockDb = { findUser: jest.fn() };

// ❌ 不好 - 真实数据库（慢）
const db = new Database();
```

### 3. 可读性

```typescript
// ✅ 好 - 清晰的断言
expect(user.name).toBe('Alice');
expect(user.email).toBe('alice@example.com');
expect(user.role).toBe('admin');

// ❌ 不好 - 模糊的断言
expect(user).toBeTruthy();
```

## 常见陷阱

### ❌ 测试实现细节

```typescript
// ❌ 不好 - 测试内部状态
expect(component.state.count).toBe(1);

// ✅ 好 - 测试行为
expect(screen.getByText('Count: 1')).toBeInTheDocument();
```

### ❌ 过度 Mock

```typescript
// ❌ 不好 - mock 所有东西
jest.mock('./utils');
jest.mock('./helpers');
jest.mock('./validators');

// ✅ 好 - 只 mock 外部依赖
jest.mock('axios');
```

## 参考资料

- [Jest 文档](https://jestjs.io/)
- [Vitest 文档](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
