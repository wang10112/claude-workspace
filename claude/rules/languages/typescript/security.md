# TypeScript 安全规范

## 原则

利用 TypeScript 的类型系统提升安全性，防止常见漏洞。

## 类型安全

### ✅ 启用严格模式

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

### ✅ 避免 any

```typescript
// ❌ 危险 - 失去类型安全
function process(data: any) {
  return data.value; // 可能运行时错误
}

// ✅ 安全 - 使用具体类型
function process(data: { value: string }) {
  return data.value;
}

// ✅ 安全 - 使用泛型
function process<T extends { value: string }>(data: T) {
  return data.value;
}
```

## 输入验证

### ✅ 使用 Zod 验证

```typescript
import { z } from 'zod';

// 定义 schema
const UserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(0).max(150)
});

// 验证输入
function createUser(input: unknown) {
  // 运行时验证
  const userData = UserSchema.parse(input);
  
  // 现在 userData 是类型安全的
  return saveUser(userData);
}

// 安全的 API 处理
app.post('/api/users', (req, res) => {
  try {
    const userData = UserSchema.parse(req.body);
    const user = createUser(userData);
    res.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    }
  }
});
```

### ✅ 类型守卫

```typescript
// 类型守卫函数
function isValidUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'email' in obj &&
    typeof obj.id === 'string' &&
    typeof obj.email === 'string'
  );
}

// 使用
function processUser(data: unknown) {
  if (!isValidUser(data)) {
    throw new Error('Invalid user data');
  }
  
  // 现在 data 是 User 类型
  console.log(data.email);
}
```

## SQL 注入防护

### ✅ 使用参数化查询

```typescript
// ❌ 危险 - SQL 注入
async function getUser(userId: string) {
  const query = `SELECT * FROM users WHERE id = '${userId}'`;
  return db.query(query);
}

// ✅ 安全 - 参数化查询
async function getUser(userId: string) {
  const query = 'SELECT * FROM users WHERE id = $1';
  return db.query(query, [userId]);
}
```

### ✅ 使用 ORM

```typescript
// ✅ 安全 - Prisma
const user = await prisma.user.findUnique({
  where: { id: userId }
});

// ✅ 安全 - TypeORM
const user = await userRepository.findOne({
  where: { id: userId }
});
```

## XSS 防护

### ✅ React 自动转义

```typescript
// ✅ 安全 - React 自动转义
function UserComment({ comment }: { comment: string }) {
  return <div>{comment}</div>;
}

// ❌ 危险 - dangerouslySetInnerHTML
function UserComment({ comment }: { comment: string }) {
  return <div dangerouslySetInnerHTML={{ __html: comment }} />;
}

// ✅ 安全 - 使用 DOMPurify
import DOMPurify from 'dompurify';

function UserComment({ comment }: { comment: string }) {
  const clean = DOMPurify.sanitize(comment);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

### ✅ 服务端渲染安全

```typescript
// ❌ 危险 - 直接插入用户输入
const html = `<div>${userInput}</div>`;

// ✅ 安全 - 转义 HTML
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const html = `<div>${escapeHtml(userInput)}</div>`;
```

## 认证和授权

### ✅ 类型安全的认证

```typescript
// 定义用户类型
type User = {
  id: string;
  email: string;
  role: 'admin' | 'user';
};

// 扩展 Express Request
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// 认证中间件
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// 授权中间件
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}

// 使用
app.delete('/api/users/:id', requireAuth, requireAdmin, async (req, res) => {
  // req.user 是类型安全的
  await deleteUser(req.params.id);
  res.json({ success: true });
});
```

### ✅ JWT 类型安全

```typescript
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// 定义 JWT payload schema
const JWTPayloadSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
  exp: z.number()
});

type JWTPayload = z.infer<typeof JWTPayloadSchema>;

// 生成 token
function generateToken(user: User): string {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 3600
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET!);
}

// 验证 token
function verifyToken(token: string): JWTPayload {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  
  // 运行时验证
  return JWTPayloadSchema.parse(decoded);
}
```

## 密钥管理

### ✅ 环境变量类型安全

```typescript
import { z } from 'zod';

// 定义环境变量 schema
const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  API_KEY: z.string().min(20)
});

// 验证并导出
export const env = EnvSchema.parse(process.env);

// 使用
console.log(env.PORT); // 类型是 number
console.log(env.DATABASE_URL); // 类型是 string
```

### ❌ 避免硬编码

```typescript
// ❌ 危险 - 硬编码密钥
const API_KEY = 'sk-1234567890abcdef';

// ✅ 安全 - 环境变量
const API_KEY = env.API_KEY;

// ✅ 安全 - 启动时验证
if (!process.env.API_KEY) {
  throw new Error('API_KEY is required');
}
```

## CSRF 防护

### ✅ 使用 CSRF token

```typescript
import csrf from 'csurf';

// 配置 CSRF 保护
const csrfProtection = csrf({ cookie: true });

app.get('/form', csrfProtection, (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/process', csrfProtection, (req, res) => {
  // CSRF token 已验证
  res.json({ success: true });
});
```

## 速率限制

### ✅ 类型安全的速率限制

```typescript
import rateLimit from 'express-rate-limit';

// 定义限制配置类型
type RateLimitConfig = {
  windowMs: number;
  max: number;
  message: string;
};

// 创建限制器
function createLimiter(config: RateLimitConfig) {
  return rateLimit({
    windowMs: config.windowMs,
    max: config.max,
    message: config.message
  });
}

// 使用
const loginLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 5,
  message: 'Too many login attempts'
});

app.post('/api/login', loginLimiter, async (req, res) => {
  // 处理登录
});
```

## 依赖安全

### ✅ 定期审计

```bash
# 检查已知漏洞
npm audit

# 自动修复
npm audit fix

# 使用 Snyk
npx snyk test
```

### ✅ 锁定依赖版本

```json
// package.json
{
  "dependencies": {
    "express": "4.18.2",  // 精确版本
    "zod": "^3.22.0"      // 允许补丁更新
  }
}
```

## 错误处理

### ✅ 不泄露敏感信息

```typescript
// ❌ 危险 - 泄露堆栈信息
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    error: err.message,
    stack: err.stack  // 泄露内部信息
  });
});

// ✅ 安全 - 通用错误消息
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err); // 记录到日志
  
  res.status(500).json({
    error: 'Internal server error'
  });
});
```

### ✅ 自定义错误类型

```typescript
class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// 使用
throw new AppError(400, 'Invalid email format');

// 错误处理
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError && err.isOperational) {
    // 可以安全地返回给客户端
    return res.status(err.statusCode).json({
      error: err.message
    });
  }
  
  // 未知错误 - 不泄露信息
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Internal server error' });
});
```

## 安全检查清单

- [ ] 启用 TypeScript 严格模式
- [ ] 所有用户输入都经过验证（Zod）
- [ ] 使用参数化查询或 ORM
- [ ] HTML 输出已转义或清理
- [ ] 认证和授权检查完整
- [ ] 密钥存储在环境变量
- [ ] CSRF 保护已启用
- [ ] 速率限制已配置
- [ ] 依赖定期审计
- [ ] 错误不泄露敏感信息

## 参考资料

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [TypeScript Security Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)
- [Zod Documentation](https://zod.dev/)
