# 代码审查规范

## 原则

高质量的代码审查能发现问题、传播知识、提升代码质量。

## 置信度过滤

**重要：** 不要用噪音淹没审查。只报告你有信心的问题。

### 报告标准
- **报告** - 如果你 >80% 确信这是真实问题
- **跳过** - 风格偏好，除非违反项目规范
- **跳过** - 未变更代码中的问题，除非是 CRITICAL 安全问题
- **合并** - 相似问题（如"5 个函数缺少错误处理"而不是 5 个单独发现）
- **优先** - 可能导致 bug、安全漏洞或数据丢失的问题

## 审查清单

### 安全（CRITICAL）

这些**必须**标记 - 它们可能造成真实损害：

- [ ] **硬编码凭证** - 源代码中的 API keys、密码、tokens、连接字符串
- [ ] **SQL 注入** - 查询中的字符串拼接而不是参数化查询
- [ ] **XSS 漏洞** - HTML/JSX 中未转义的用户输入
- [ ] **路径遍历** - 未清理的用户控制文件路径
- [ ] **CSRF 漏洞** - 状态变更端点缺少 CSRF 保护
- [ ] **认证绕过** - 受保护路由缺少认证检查
- [ ] **不安全的依赖** - 已知漏洞的包
- [ ] **日志中的密钥** - 记录敏感数据（tokens、密码、PII）

#### ❌ 错误示例：SQL 注入
```typescript
// 通过字符串拼接的 SQL 注入
const query = `SELECT * FROM users WHERE id = ${userId}`;
```

#### ✅ 正确示例
```typescript
// 参数化查询
const query = `SELECT * FROM users WHERE id = $1`;
const result = await db.query(query, [userId]);
```

#### ❌ 错误示例：XSS
```typescript
// 渲染原始用户 HTML 未清理
<div dangerouslySetInnerHTML={{ __html: userComment }} />
```

#### ✅ 正确示例
```typescript
// 使用文本内容或清理
<div>{userComment}</div>
// 或使用 DOMPurify.sanitize()
```

### 代码质量（HIGH）

- [ ] **大函数**（>50 行）- 拆分为更小、聚焦的函数
- [ ] **大文件**（>800 行）- 按职责提取模块
- [ ] **深层嵌套**（>4 层）- 使用提前返回、提取辅助函数
- [ ] **缺少错误处理** - 未处理的 promise rejections、空 catch 块
- [ ] **突变模式** - 优先使用不可变操作（spread、map、filter）
- [ ] **console.log 语句** - 合并前移除调试日志
- [ ] **缺少测试** - 新代码路径没有测试覆盖
- [ ] **死代码** - 注释掉的代码、未使用的导入、不可达分支

#### ❌ 错误示例：深层嵌套 + 突变
```typescript
function processUsers(users) {
  if (users) {
    for (const user of users) {
      if (user.active) {
        if (user.email) {
          user.verified = true;  // 突变！
          results.push(user);
        }
      }
    }
  }
  return results;
}
```

#### ✅ 正确示例：提前返回 + 不可变 + 扁平
```typescript
function processUsers(users) {
  if (!users) return [];
  
  return users
    .filter(user => user.active && user.email)
    .map(user => ({ ...user, verified: true }));
}
```

### React/前端模式（HIGH）

审查 React/Next.js 代码时，还要检查：

- [ ] **缺少 key props** - 列表项没有唯一 key
- [ ] **内联函数** - 在 render 中创建函数（导致不必要的重渲染）
- [ ] **缺少 useMemo/useCallback** - 昂贵的计算或回调未记忆化
- [ ] **useEffect 依赖** - 缺少或不正确的依赖数组
- [ ] **状态突变** - 直接修改状态而不是创建新对象
- [ ] **prop drilling** - 通过多层传递 props（考虑 Context）

#### ❌ 错误示例：内联函数
```typescript
// 每次渲染都创建新函数
<button onClick={() => handleClick(id)}>Click</button>
```

#### ✅ 正确示例
```typescript
// 使用 useCallback 记忆化
const handleButtonClick = useCallback(() => {
  handleClick(id);
}, [id]);

<button onClick={handleButtonClick}>Click</button>
```

### 性能（MEDIUM）

- [ ] **N+1 查询** - 循环中的数据库查询
- [ ] **缺少索引** - 频繁查询的字段没有索引
- [ ] **大负载** - API 返回过多数据
- [ ] **缺少缓存** - 昂贵操作未缓存
- [ ] **同步操作** - 阻塞操作应该异步

### 可维护性（MEDIUM）

- [ ] **魔法数字** - 未命名的常量
- [ ] **不清晰的命名** - 变量/函数名不能自解释
- [ ] **重复代码** - 相同逻辑出现多次
- [ ] **缺少文档** - 复杂逻辑没有注释
- [ ] **过度抽象** - 不必要的间接层

## 审查流程

### 1. 收集上下文
```bash
# 查看所有变更
git diff --staged
git diff

# 如果没有 diff，检查最近的提交
git log --oneline -5
```

### 2. 理解范围
- 识别哪些文件变更
- 它们关联什么功能/修复
- 它们如何连接

### 3. 阅读周围代码
- 不要孤立审查变更
- 阅读完整文件
- 理解导入、依赖和调用点

### 4. 应用审查清单
从 CRITICAL 到 LOW 逐个检查。

### 5. 报告发现
使用下面的输出格式。

## 输出格式

### 发现问题时
```markdown
## 代码审查发现

### CRITICAL
- **文件**: src/api/users.ts:42
- **问题**: SQL 注入通过字符串拼接
- **建议**: 使用参数化查询

### HIGH
- **文件**: src/components/UserList.tsx:15
- **问题**: 5 个函数缺少错误处理
- **建议**: 添加 try-catch 块或 .catch() 处理器

### MEDIUM
- **文件**: src/utils/format.ts:23
- **问题**: 魔法数字 86400000
- **建议**: 提取为命名常量 `const MS_PER_DAY = 86400000`
```

### 无问题时
```markdown
## 代码审查通过 ✅

审查了以下文件：
- src/api/users.ts
- src/components/UserList.tsx

未发现安全或质量问题。
```

## 审查技巧

### 1. 先看大局
- 整体架构是否合理？
- 变更是否在正确的位置？

### 2. 关注边界
- 错误处理
- 边界条件
- 空值/未定义处理

### 3. 考虑维护者
- 6 个月后能理解这段代码吗？
- 命名是否清晰？
- 是否需要注释？

### 4. 测试思维
- 如何测试这个变更？
- 测试覆盖是否充分？
- 边界情况是否测试？

## 自动化审查

### 使用 Linter
```bash
# ESLint
npm run lint

# TypeScript
tsc --noEmit
```

### 使用 Hooks
```bash
# 提交前自动审查
node claude/hooks/scripts/quality-gate.js
```

### 使用 Agent
```bash
# 使用 code-reviewer agent
/code-review
```

## 审查礼仪

### ✅ 好的反馈
- "这里可能有 SQL 注入风险。建议使用参数化查询。"
- "考虑提取这个函数以提高可测试性。"
- "这个命名不太清晰，`getUserData` 比 `getData` 更好。"

### ❌ 不好的反馈
- "这代码太烂了。"
- "你不知道怎么写代码吗？"
- "重写这个。"

### 原则
1. **建设性** - 提供具体建议
2. **尊重** - 对事不对人
3. **教育性** - 解释为什么
4. **平衡** - 也指出好的地方

## 参考资料

- [Google Code Review Guidelines](https://google.github.io/eng-practices/review/)
- [Conventional Comments](https://conventionalcomments.org/)
- [Code Review Best Practices](https://github.com/thoughtbot/guides/tree/main/code-review)
