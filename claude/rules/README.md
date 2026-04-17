# 规则系统

规则是 Claude 在工作时必须遵守的指导原则，分为通用规则和语言特定规则。

## 目录结构

```
claude/rules/
├── README.md                  # 本文件
├── common/                    # 通用规则（所有项目）
│   ├── security.md           # 安全规范
│   ├── git-workflow.md       # Git 工作流
│   ├── code-review.md        # 代码审查
│   ├── testing.md            # 测试规范
│   ├── performance.md        # 性能优化
│   └── patterns.md           # 通用模式
├── languages/                 # 语言特定规则
│   ├── typescript/
│   │   ├── patterns.md       # TS 最佳实践
│   │   ├── testing.md        # TS 测试规范
│   │   └── security.md       # TS 安全规范
│   ├── python/
│   ├── golang/
│   ├── java/
│   └── rust/
└── project-specific/          # 项目特定规则
    └── README.md             # 如何添加项目规则
```

## 规则加载优先级

1. **Common 规则** - 始终加载（核心原则）
2. **Language 规则** - 根据项目语言自动加载
3. **Project 规则** - 项目特定规则（优先级最高）

## 通用规则（Common）

### security.md - 安全规范
- 强制安全检查清单
- 密钥管理规范
- 安全响应协议

### git-workflow.md - Git 工作流
- 分支策略
- 提交规范
- PR 流程

### code-review.md - 代码审查
- 审查清单
- 置信度过滤
- 分级标准（CRITICAL/HIGH/MEDIUM/LOW）

### testing.md - 测试规范
- 测试覆盖率要求
- 测试命名规范
- TDD 流程

### performance.md - 性能优化
- 性能基准
- 优化策略
- 监控指标

### patterns.md - 通用模式
- 设计模式
- 代码组织
- 最佳实践

## 语言特定规则（Languages）

每种语言包含：
- `patterns.md` - 语言最佳实践
- `testing.md` - 语言测试规范
- `security.md` - 语言安全规范

### 支持的语言
- TypeScript/JavaScript
- Python
- Go
- Java
- Rust

## 项目特定规则（Project-Specific）

在项目根目录的 `.claude/rules/` 中添加项目规则：

```
.claude/rules/
├── api-design.md
├── database-schema.md
└── deployment.md
```

这些规则会覆盖通用规则和语言规则。

## 规则编写规范

### 结构
```markdown
# 规则标题

## 原则

简短描述核心原则。

## 规则清单

- [ ] 规则 1
- [ ] 规则 2
- [ ] 规则 3

## 示例

### ❌ 错误示例
\`\`\`
// 不好的代码
\`\`\`

### ✅ 正确示例
\`\`\`
// 好的代码
\`\`\`

## 例外情况

说明何时可以例外。
```

### 最佳实践

1. **具体明确** - 规则应该可执行，不要模糊
2. **提供示例** - 每个规则都有 Before/After 示例
3. **说明原因** - 解释为什么这样做
4. **列出例外** - 说明何时可以例外
5. **保持简洁** - 每个文件聚焦一个主题

## 规则验证

规则应该可以通过工具验证：
- Linter 规则
- Git hooks
- CI/CD 检查

## 规则更新

1. 发现新的最佳实践时更新
2. 遇到反复出现的问题时添加规则
3. 定期审查和精简规则

## 相关文档

- [Hooks 系统](../hooks/README.md) - 自动化规则检查
- [Code Reviewer Agent](../agents/specialized/code-reviewer.md) - 规则执行
- [Security Reviewer Agent](../agents/specialized/security-reviewer.md) - 安全规则执行
