# 安全审查工作流

## 审查流程

### 1. 准备阶段
- 了解应用架构
- 识别敏感数据
- 确定审查范围

### 2. 代码审查
- 检查 OWASP Top 10
- 审查认证授权
- 验证输入输出
- 检查加密使用

### 3. 工具扫描
```bash
# 依赖扫描
npm audit

# 静态分析
npm run lint:security

# 密钥扫描
git-secrets --scan
```

### 4. 动态测试
- 渗透测试
- 模糊测试
- 安全测试

### 5. 报告和修复
- 记录问题
- 评估风险
- 制定修复计划
- 验证修复

## 安全检查清单

- [ ] 认证和授权
- [ ] 输入验证
- [ ] 输出编码
- [ ] 加密使用
- [ ] 错误处理
- [ ] 日志和监控
- [ ] 依赖安全

## 相关资源

- `shared/skills/security-review/SKILL.md`
- `shared/memory/security-review-memory.md`
