---
name: security-review
description: 安全审查 - 漏洞扫描、代码安全审查、依赖检查、安全最佳实践
type: skill
---

# Security Review Skill

## 何时使用

- 审查代码安全性
- 扫描安全漏洞
- 检查依赖安全
- 验证认证授权
- 审查数据处理
- 评估安全风险

## 核心能力

### 1. 代码安全审查
- SQL 注入检测
- XSS 漏洞检测
- CSRF 防护检查
- 命令注入检测
- 路径遍历检测

### 2. 认证授权审查
- 密码安全
- Token 管理
- 会话管理
- 权限控制
- API 安全

### 3. 数据安全审查
- 敏感数据加密
- 数据传输安全
- 数据存储安全
- 日志安全
- 备份安全

### 4. 依赖安全检查
- 已知漏洞扫描
- 过期依赖检测
- 许可证合规
- 供应链安全

## OWASP Top 10

### 1. 注入攻击
**风险**: SQL 注入、命令注入、LDAP 注入

**检查点**:
- 使用参数化查询
- 输入验证和清理
- 最小权限原则

**示例**:
```javascript
// ❌ 不安全
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ 安全
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
```

### 2. 失效的身份认证
**风险**: 弱密码、会话劫持、凭证泄露

**检查点**:
- 强密码策略
- 多因素认证
- 安全的会话管理
- 密码加密存储

### 3. 敏感数据泄露
**风险**: 未加密数据、弱加密、密钥泄露

**检查点**:
- 传输加密 (HTTPS)
- 存储加密
- 密钥管理
- 敏感数据最小化

### 4. XML 外部实体 (XXE)
**风险**: XML 解析漏洞

**检查点**:
- 禁用外部实体
- 使用安全的 XML 解析器
- 输入验证

### 5. 失效的访问控制
**风险**: 未授权访问、权限提升

**检查点**:
- 实施访问控制
- 验证用户权限
- 最小权限原则
- 拒绝默认访问

### 6. 安全配置错误
**风险**: 默认配置、不必要的功能、详细错误信息

**检查点**:
- 移除默认账户
- 禁用不必要的功能
- 最小化错误信息
- 定期更新

### 7. 跨站脚本 (XSS)
**风险**: 注入恶意脚本

**检查点**:
- 输出编码
- 内容安全策略 (CSP)
- 输入验证
- 使用安全的模板引擎

**示例**:
```javascript
// ❌ 不安全
element.innerHTML = userInput;

// ✅ 安全
element.textContent = userInput;
// 或使用 DOMPurify
element.innerHTML = DOMPurify.sanitize(userInput);
```

### 8. 不安全的反序列化
**风险**: 远程代码执行

**检查点**:
- 避免反序列化不可信数据
- 使用安全的序列化格式
- 实施完整性检查

### 9. 使用含有已知漏洞的组件
**风险**: 第三方库漏洞

**检查点**:
- 定期更新依赖
- 使用漏洞扫描工具
- 监控安全公告

### 10. 不足的日志记录和监控
**风险**: 攻击检测延迟

**检查点**:
- 记录安全事件
- 实时监控
- 告警机制
- 日志保护

## 安全审查清单

### 认证和授权
- [ ] 使用强密码策略
- [ ] 实施多因素认证
- [ ] 安全的会话管理
- [ ] Token 过期和刷新
- [ ] 权限验证
- [ ] 最小权限原则

### 输入验证
- [ ] 验证所有输入
- [ ] 白名单验证
- [ ] 长度限制
- [ ] 类型检查
- [ ] 格式验证

### 输出编码
- [ ] HTML 编码
- [ ] JavaScript 编码
- [ ] URL 编码
- [ ] SQL 转义
- [ ] 命令转义

### 加密
- [ ] HTTPS 传输
- [ ] 敏感数据加密
- [ ] 使用强加密算法
- [ ] 安全的密钥管理
- [ ] 密码哈希 (bcrypt, Argon2)

### 错误处理
- [ ] 不泄露敏感信息
- [ ] 通用错误消息
- [ ] 记录详细错误
- [ ] 优雅降级

### 日志和监控
- [ ] 记录安全事件
- [ ] 保护日志文件
- [ ] 不记录敏感数据
- [ ] 实时监控
- [ ] 告警机制

## 安全工具

### 静态分析
- **ESLint** + security plugins
- **SonarQube**
- **Semgrep**
- **Bandit** (Python)
- **Brakeman** (Ruby)

### 依赖扫描
- **npm audit**
- **Snyk**
- **OWASP Dependency-Check**
- **GitHub Dependabot**

### 动态测试
- **OWASP ZAP**
- **Burp Suite**
- **Nikto**

### 密钥扫描
- **git-secrets**
- **TruffleHog**
- **GitGuardian**

## 常见漏洞示例

### SQL 注入
```javascript
// ❌ 不安全
const query = `SELECT * FROM users WHERE username = '${username}'`;

// ✅ 安全
const query = 'SELECT * FROM users WHERE username = ?';
db.query(query, [username]);
```

### XSS
```javascript
// ❌ 不安全
document.getElementById('output').innerHTML = userInput;

// ✅ 安全
document.getElementById('output').textContent = userInput;
```

### 命令注入
```javascript
// ❌ 不安全
exec(`ping ${userInput}`);

// ✅ 安全
execFile('ping', [userInput]);
```

### 路径遍历
```javascript
// ❌ 不安全
const filePath = path.join(__dirname, userInput);

// ✅ 安全
const filePath = path.join(__dirname, path.basename(userInput));
```

### 硬编码密钥
```javascript
// ❌ 不安全
const API_KEY = 'sk-1234567890abcdef';

// ✅ 安全
const API_KEY = process.env.API_KEY;
```

## 安全最佳实践

### 1. 纵深防御
- 多层安全控制
- 不依赖单一防护
- 假设每层都可能失败

### 2. 最小权限原则
- 只授予必要权限
- 定期审查权限
- 及时撤销权限

### 3. 安全默认
- 默认拒绝访问
- 默认加密
- 默认安全配置

### 4. 失败安全
- 安全的错误处理
- 不泄露敏感信息
- 优雅降级

### 5. 不信任输入
- 验证所有输入
- 清理用户数据
- 使用白名单

## 安全审查流程

1. **准备阶段**
   - 了解应用架构
   - 识别敏感数据
   - 确定审查范围

2. **代码审查**
   - 检查 OWASP Top 10
   - 审查认证授权
   - 验证输入输出

3. **工具扫描**
   - 静态分析
   - 依赖扫描
   - 密钥扫描

4. **动态测试**
   - 渗透测试
   - 模糊测试
   - 安全测试

5. **报告和修复**
   - 记录发现的问题
   - 评估风险等级
   - 制定修复计划
   - 验证修复效果

## 相关技能

- `review` - 代码审查
- `testing` - 安全测试
- `debugging` - 调试安全问题
