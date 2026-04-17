# TypeScript 最佳实践

## 原则

充分利用 TypeScript 的类型系统，编写类型安全、可维护的代码。

## 类型定义

### ✅ 使用接口和类型别名
```typescript
// 接口 - 用于对象形状
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// 类型别名 - 用于联合类型、交叉类型
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };
```

### ❌ 避免 any
```typescript
// 不好 - 失去类型安全
function process(data: any) {
  return data.value;
}
```

### ✅ 使用具体类型或泛型
```typescript
// 好 - 类型安全
function process<T extends { value: string }>(data: T) {
  return data.value;
}
```

## 严格模式

### tsconfig.json 配置
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

## 空值处理

### ✅ 使用可选链和空值合并
```typescript
// 好 - 安全访问
const userName = user?.profile?.name ?? 'Anonymous';

// 好 - 类型守卫
if (user?.email) {
  sendEmail(user.email);
}
```

### ❌ 避免非空断言
```typescript
// 不好 - 可能运行时错误
const email = user!.email!;
```

### ✅ 使用类型守卫
```typescript
// 好 - 类型安全
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'email' in obj
  );
}

if (isUser(data)) {
  console.log(data.email); // 类型安全
}
```

## 函数类型

### ✅ 明确返回类型
```typescript
// 好 - 明确返回类型
function getUser(id: string): Promise<User | null> {
  return db.findUser(id);
}

// 好 - 箭头函数
const formatName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`;
};
```

### ✅ 使用函数重载
```typescript
// 好 - 函数重载
function format(value: string): string;
function format(value: number): string;
function format(value: Date): string;
function format(value: string | number | Date): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toString();
  return value.toISOString();
}
```

## 泛型

### ✅ 使用泛型提高复用性
```typescript
// 好 - 泛型函数
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 好 - 泛型接口
interface Repository<T> {
  find(id: string): Promise<T | null>;
  save(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}
```

### ✅ 泛型约束
```typescript
// 好 - 约束泛型
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// 使用
const user = { id: '1', name: 'John' };
const name = getProperty(user, 'name'); // 类型安全
```

## 枚举

### ✅ 使用字符串枚举
```typescript
// 好 - 字符串枚举
enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST'
}

// 或使用 const 对象（更轻量）
const UserRole = {
  Admin: 'ADMIN',
  User: 'USER',
  Guest: 'GUEST'
} as const;

type UserRole = typeof UserRole[keyof typeof UserRole];
```

## 类型断言

### ❌ 避免 as any
```typescript
// 不好
const data = response as any;
```

### ✅ 使用类型守卫或 unknown
```typescript
// 好 - 使用 unknown 然后验证
const data = response as unknown;
if (isValidData(data)) {
  // 现在类型安全
  processData(data);
}
```

## 实用类型

### ✅ 使用内置实用类型
```typescript
// Partial - 所有属性可选
type PartialUser = Partial<User>;

// Required - 所有属性必需
type RequiredUser = Required<User>;

// Pick - 选择部分属性
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - 排除部分属性
type UserWithoutEmail = Omit<User, 'email'>;

// Record - 创建对象类型
type UserMap = Record<string, User>;

// ReturnType - 获取函数返回类型
type UserResult = ReturnType<typeof getUser>;
```

## 异步代码

### ✅ 正确类型化 Promise
```typescript
// 好 - 明确 Promise 类型
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// 好 - 错误处理
async function safeGetUser(id: string): Promise<Result<User>> {
  try {
    const user = await fetchUser(id);
    return { success: true, data: user };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
```

## 模块导入

### ✅ 使用路径别名
```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

```typescript
// 好 - 使用别名
import { Button } from '@components/Button';
import { formatDate } from '@utils/date';

// 而不是
import { Button } from '../../../components/Button';
```

## 类型声明文件

### ✅ 为第三方库添加类型
```typescript
// types/custom.d.ts
declare module 'untyped-library' {
  export function doSomething(value: string): number;
}
```

## 常见陷阱

### ❌ 类型断言覆盖错误
```typescript
// 不好 - 隐藏类型错误
const value = someValue as SomeType;
```

### ✅ 修复根本问题
```typescript
// 好 - 正确类型化
function getValue(): SomeType {
  // 确保返回正确类型
  return validValue;
}
```

### ❌ 过度使用联合类型
```typescript
// 不好 - 难以处理
type Data = string | number | boolean | null | undefined | object;
```

### ✅ 使用判别联合
```typescript
// 好 - 易于处理
type Result = 
  | { type: 'success'; data: string }
  | { type: 'error'; error: string }
  | { type: 'loading' };

function handle(result: Result) {
  switch (result.type) {
    case 'success':
      return result.data; // 类型安全
    case 'error':
      return result.error;
    case 'loading':
      return 'Loading...';
  }
}
```

## 性能优化

### ✅ 使用 const 断言
```typescript
// 好 - 更精确的类型
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
} as const;

// config.apiUrl 类型是 'https://api.example.com'
// 而不是 string
```

### ✅ 避免大型联合类型
```typescript
// 不好 - 编译慢
type BigUnion = Type1 | Type2 | ... | Type100;

// 好 - 使用映射类型
type TypeMap = {
  type1: Type1;
  type2: Type2;
  // ...
};
```

## 测试类型

### ✅ 使用类型测试
```typescript
// 测试类型推断
type test1 = Expect<Equal<typeof result, string>>;

// 测试类型兼容性
type test2 = Expect<Extends<User, { id: string }>>;
```

## 参考资料

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Type Challenges](https://github.com/type-challenges/type-challenges)
