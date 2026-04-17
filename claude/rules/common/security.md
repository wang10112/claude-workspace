# 安全规范

## 原则

安全是第一优先级。所有代码必须通过安全检查才能提交。

## 强制安全检查清单

在任何提交前必须检查：

- [ ] 无硬编码密钥（API keys, passwords, tokens）
- [ ] 所有用户输入已验证
- [ ] SQL 注入防护（参数化查询）
- [ ] XSS 防护（HTML 转义）
- [ ] CSRF 防护已启用
- [ ] 认证/授权已验证
- [ ] 所有端点有速率限制
- [ ] 错误消息不泄露敏感信息

## 密钥管理

### ❌ 错误示例
```javascript
// 硬编码密钥
const API_KEY = "sk-1234567890abcdef";
const password = "admin123";
```

### ✅ 正确示例
```javascript
// 使用环境变量
const API_KEY = process.env.ANTHROPIC_API_KEY;
const password = process.env.DB_PASSWORD;

// 启动时验证
if (!API_KEY) {
  throw new Error('ANTHROPIC_API_KEY is required');
}
```

### 规则
1. **永远不要**硬编码密钥到源代码
2. **始终使用**环境变量或密钥管理服务
3. **启动时验证**必需的密钥是否存在
4. **立即轮换**任何可能泄露的密钥

## SQL 注入防护

### ❌ 错误示例
```javascript
// 字符串拼接 - 危险！
const query = `SELECT * FROM users WHERE id = ${userId}`;
const result = await db.query(query);
```

### ✅ 正确示例
```javascript
// 参数化查询
const query = 'SELECT * FROM users WHERE id = $1';
const result = await db.query(query, [userId]);
```

### 规则
1. **永远不要**使用字符串拼接构建 SQL
2. **始终使用**参数化查询或 ORM
3. **验证输入**即使使用参数化查询

## XSS 防护

### ❌ 错误示例
```javascript
// 直接渲染用户输入 - 危险！
element.innerHTML = userComment;
document.write(userInput);
```

### ✅ 正确示例
```javascript
// 使用 textContent
element.textContent = userComment;

// 或使用 DOMPurify 清理
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userComment);
```

### 规则
1. **永远不要**直接渲染未清理的用户输入
2. **使用** `textContent` 而不是 `innerHTML`
3. **必须清理** HTML 内容（使用 DOMPurify 等）

## 路径遍历防护

### ❌ 错误示例
```javascript
// 用户控制的路径 - 危险！
const filePath = `/uploads/${req.params.filename}`;
fs.readFileSync(filePath);
```

### ✅ 正确示例
```javascript
// 验证和清理路径
const path = require('path');
const filename = path.basename(req.params.filename);
const filePath = path.join('/uploads', filename);

// 确保在允许的目录内
if (!filePath.startsWith('/uploads/')) {
  throw new Error('Invalid file path');
}
```

### 规则
1. **验证**所有用户提供的文件路径
2. **使用** `path.basename()` 移除目录部分
3. **检查**最终路径是否在允许的目录内

## 认证和授权

### ❌ 错误示例
```javascript
// 缺少认证检查
app.delete('/api/users/:id', async (req, res) => {
  await db.deleteUser(req.params.id);
  res.json({ success: true });
});
```

### ✅ 正确示例
```javascript
// 认证 + 授权检查
app.delete('/api/users/:id', 
  requireAuth,
  requireAdmin,
  async (req, res) => {
    // 确保用户只能删除自己的账户（除非是管理员）
    if (req.user.id !== req.params.id && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    await db.deleteUser(req.params.id);
    res.json({ success: true });
  }
);
```

### 规则
1. **所有端点**必须有认证检查
2. **敏感操作**必须有授权检查
3. **验证用户权限**不要信任客户端

## 速率限制

### ✅ 正确示例
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 限制 100 次请求
  message: 'Too many requests'
});

app.use('/api/', limiter);
```

### 规则
1. **所有公开端点**必须有速率限制
2. **登录端点**应该有更严格的限制
3. **考虑**基于 IP 和用户的双重限制

## 错误处理

### ❌ 错误示例
```javascript
// 泄露敏感信息
catch (error) {
  res.status(500).json({ 
    error: error.message,
    stack: error.stack,
    query: sqlQuery
  });
}
```

### ✅ 正确示例
```javascript
// 通用错误消息
catch (error) {
  console.error('Database error:', error); // 记录到日志
  res.status(500).json({ 
    error: 'Internal server error'
  });
}
```

### 规则
1. **不要**在错误消息中泄露技术细节
2. **记录**详细错误到日志系统
3. **返回**通用错误消息给客户端

## 安全响应协议

如果发现安全问题：

1. **立即停止** - 不要继续开发
2. **使用 security-reviewer agent** - 进行全面审查
3. **修复 CRITICAL 问题** - 优先处理关键问题
4. **轮换密钥** - 如果有密钥泄露
5. **审查整个代码库** - 查找类似问题
6. **更新规则** - 防止再次发生

## 安全工具

### 推荐工具
- **npm audit** - 检查依赖漏洞
- **Snyk** - 持续安全监控
- **OWASP ZAP** - Web 应用安全测试
- **SonarQube** - 代码质量和安全分析

### 使用 Hooks
```bash
# 提交前自动安全扫描
node claude/hooks/scripts/security-scan.js
```

## 参考资料

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
