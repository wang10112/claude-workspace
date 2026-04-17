# API 开发工作流

完整的 API 开发流程，从设计到部署。

## 工作流程

### 阶段 1：设计 API

#### 1.1 定义需求
```markdown
## API 需求

### 功能
- 用户管理（CRUD）
- 认证和授权
- 数据验证

### 非功能需求
- 响应时间 < 200ms
- 支持 1000 并发
- 99.9% 可用性
```

#### 1.2 设计端点
```yaml
# openapi.yaml
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0

paths:
  /api/users:
    get:
      summary: Get users
      parameters:
        - name: page
          in: query
          schema:
            type: integer
        - name: limit
          in: query
          schema:
            type: integer
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/User'
                  pagination:
                    $ref: '#/components/schemas/Pagination'

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        email:
          type: string
```

#### 1.3 审查设计
使用 `api-reviewer` agent 审查设计：
- RESTful 规范
- 命名一致性
- 状态码正确性
- 错误处理

### 阶段 2：实现 API

#### 2.1 创建路由
```typescript
// src/routes/users.ts
import { Router } from 'express';
import { z } from 'zod';

const router = Router();

// 验证 schema
const CreateUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(0).max(150)
});

// GET /api/users
router.get('/users', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  const users = await db.user.findMany({
    skip: (page - 1) * limit,
    take: limit
  });
  
  const total = await db.user.count();
  
  res.json({
    success: true,
    data: users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
});

// POST /api/users
router.post('/users', async (req, res) => {
  try {
    const data = CreateUserSchema.parse(req.body);
    const user = await db.user.create({ data });
    
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(422).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: error.errors
        }
      });
    } else {
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Internal server error'
        }
      });
    }
  }
});

export default router;
```

#### 2.2 添加中间件
```typescript
// src/middleware/auth.ts
export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required'
      }
    });
  }
  
  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired token'
      }
    });
  }
}

// src/middleware/rateLimit.ts
import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 最多 100 次请求
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests'
    }
  }
});
```

#### 2.3 错误处理
```typescript
// src/middleware/errorHandler.ts
export function errorHandler(err, req, res, next) {
  console.error('Error:', err);
  
  // 已知错误
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message
      }
    });
  }
  
  // 未知错误
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Internal server error'
    }
  });
}
```

### 阶段 3：测试 API

#### 3.1 单元测试
```typescript
// src/routes/users.test.ts
import request from 'supertest';
import { app } from '../app';

describe('POST /api/users', () => {
  it('should create a new user', async () => {
    const userData = {
      name: 'Alice',
      email: 'alice@example.com',
      age: 30
    };
    
    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject(userData);
    expect(response.body.data.id).toBeDefined();
  });
  
  it('should return 422 for invalid email', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'Alice',
        email: 'invalid-email',
        age: 30
      })
      .expect(422);
    
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});
```

#### 3.2 集成测试
```typescript
// tests/integration/users.test.ts
describe('User API Integration', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });
  
  afterAll(async () => {
    await cleanupTestDatabase();
  });
  
  it('should complete user lifecycle', async () => {
    // 创建用户
    const createRes = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'alice@example.com', age: 30 });
    
    const userId = createRes.body.data.id;
    
    // 获取用户
    const getRes = await request(app)
      .get(`/api/users/${userId}`)
      .expect(200);
    
    expect(getRes.body.data.name).toBe('Alice');
    
    // 更新用户
    await request(app)
      .patch(`/api/users/${userId}`)
      .send({ name: 'Alice Updated' })
      .expect(200);
    
    // 删除用户
    await request(app)
      .delete(`/api/users/${userId}`)
      .expect(204);
    
    // 验证已删除
    await request(app)
      .get(`/api/users/${userId}`)
      .expect(404);
  });
});
```

#### 3.3 性能测试
```bash
# 使用 ab
ab -n 1000 -c 10 http://localhost:3000/api/users

# 使用 wrk
wrk -t4 -c100 -d30s http://localhost:3000/api/users
```

### 阶段 4：文档化

#### 4.1 生成文档
```bash
# 从 OpenAPI 生成文档
npx @redocly/cli build-docs openapi.yaml

# 或使用 Swagger UI
npx swagger-ui-watcher openapi.yaml
```

#### 4.2 添加示例
```yaml
# openapi.yaml
paths:
  /api/users:
    post:
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUser'
            examples:
              basic:
                value:
                  name: Alice
                  email: alice@example.com
                  age: 30
```

### 阶段 5：部署

#### 5.1 环境配置
```bash
# .env.production
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://...
JWT_SECRET=...
REDIS_URL=redis://...
```

#### 5.2 Docker 化
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### 5.3 部署检查清单
- [ ] 环境变量已配置
- [ ] 数据库迁移已运行
- [ ] 健康检查端点可用
- [ ] 日志已配置
- [ ] 监控已设置
- [ ] 备份已配置

### 阶段 6：监控

#### 6.1 健康检查
```typescript
// src/routes/health.ts
router.get('/health', async (req, res) => {
  try {
    // 检查数据库
    await db.$queryRaw`SELECT 1`;
    
    // 检查 Redis
    await redis.ping();
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});
```

#### 6.2 日志
```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// 记录请求
app.use((req, res, next) => {
  logger.info('Request', {
    method: req.method,
    path: req.path,
    ip: req.ip
  });
  next();
});
```

#### 6.3 指标
```typescript
import prometheus from 'prom-client';

const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status']
});

app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration);
  });
  
  next();
});
```

## 最佳实践

### 1. 版本控制
- 使用 URL 版本（/api/v1/）
- 保持向后兼容
- 提前通知废弃

### 2. 安全
- 使用 HTTPS
- 验证所有输入
- 实施速率限制
- 使用 CORS 正确配置

### 3. 性能
- 使用缓存
- 实施分页
- 优化数据库查询
- 使用 CDN

### 4. 可维护性
- 编写测试
- 文档化 API
- 使用类型系统
- 代码审查

## 参考资料

- [REST API Best Practices](https://restfulapi.net/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
