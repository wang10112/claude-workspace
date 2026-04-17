# Git 工作流规范

## 原则

清晰的 Git 历史有助于代码审查、问题追踪和团队协作。

## 分支策略

### 主要分支
- `main` - 生产环境代码，始终可部署
- `develop` - 开发分支，集成最新功能

### 功能分支
- `feature/功能名` - 新功能开发
- `fix/问题描述` - Bug 修复
- `refactor/重构内容` - 代码重构
- `docs/文档更新` - 文档更新

### 示例
```bash
# 创建功能分支
git checkout -b feature/user-authentication

# 创建修复分支
git checkout -b fix/login-error

# 创建重构分支
git checkout -b refactor/api-structure
```

## 提交规范

### 提交消息格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型
- `feat` - 新功能
- `fix` - Bug 修复
- `docs` - 文档更新
- `style` - 代码格式（不影响功能）
- `refactor` - 重构
- `test` - 测试相关
- `chore` - 构建/工具相关

### ✅ 好的提交消息
```
feat(auth): add JWT token authentication

- Implement JWT token generation
- Add token validation middleware
- Update user login endpoint

Closes #123
```

```
fix(api): handle null response in user endpoint

The user endpoint was crashing when user not found.
Now returns 404 with proper error message.

Fixes #456
```

### ❌ 不好的提交消息
```
update code
```

```
fix bug
```

```
WIP
```

### 规则
1. **第一行**不超过 50 字符
2. **使用祈使句** - "add" 而不是 "added"
3. **说明原因** - 不只是"做了什么"，还要"为什么"
4. **引用 Issue** - 使用 `Closes #123` 或 `Fixes #456`

## 提交前检查

### 必须检查
- [ ] 代码已测试
- [ ] 无 console.log 或调试代码
- [ ] 无硬编码密钥
- [ ] 通过 linter 检查
- [ ] 提交消息清晰

### 使用 Hook 自动检查
```bash
# 提交前自动运行安全扫描
git commit -m "feat: add new feature"
# Hook 会自动运行 security-scan.js
```

## PR（Pull Request）流程

### 创建 PR

1. **确保分支最新**
```bash
git checkout main
git pull
git checkout feature/my-feature
git rebase main
```

2. **推送到远程**
```bash
git push origin feature/my-feature
```

3. **创建 PR**
- 标题清晰描述变更
- 描述包含：变更内容、测试方法、截图（如果是 UI）
- 关联相关 Issue

### PR 模板
```markdown
## 变更内容
简要描述这个 PR 做了什么。

## 测试方法
- [ ] 单元测试通过
- [ ] 手动测试通过
- [ ] 回归测试通过

## 截图（如果适用）
[添加截图]

## 相关 Issue
Closes #123
```

### PR 审查清单
- [ ] 代码符合规范
- [ ] 测试覆盖充分
- [ ] 文档已更新
- [ ] 无安全问题
- [ ] 性能无明显下降

## 合并策略

### Squash Merge（推荐）
将多个提交合并为一个，保持主分支历史清晰。

```bash
# GitHub 上选择 "Squash and merge"
```

### Rebase Merge
保留所有提交，适合重要功能。

```bash
git checkout main
git merge --ff-only feature/my-feature
```

### 规则
1. **功能分支** - 使用 Squash merge
2. **重要功能** - 使用 Rebase merge
3. **永远不要** - 使用 Merge commit（会产生混乱的历史）

## 回滚策略

### 回滚最近的提交
```bash
# 创建反向提交
git revert HEAD

# 或重置到之前的提交（谨慎使用）
git reset --hard HEAD~1
```

### 回滚已发布的版本
```bash
# 创建反向提交
git revert <commit-hash>
git push origin main
```

### 规则
1. **已推送的提交** - 使用 `git revert`
2. **未推送的提交** - 可以使用 `git reset`
3. **生产环境** - 永远不要 force push

## 标签管理

### 语义化版本
```bash
# 主版本.次版本.修订版本
git tag v1.2.3
git push origin v1.2.3
```

### 版本号规则
- **主版本** - 不兼容的 API 变更
- **次版本** - 向后兼容的功能新增
- **修订版本** - 向后兼容的 Bug 修复

## 常见问题

### 提交了敏感信息怎么办？
```bash
# 1. 立即轮换密钥
# 2. 从历史中移除（需要 force push）
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/file" \
  --prune-empty --tag-name-filter cat -- --all

# 3. Force push（谨慎！）
git push origin --force --all
```

### 如何修改最后一次提交？
```bash
# 修改提交消息
git commit --amend -m "new message"

# 添加遗漏的文件
git add forgotten-file.js
git commit --amend --no-edit
```

### 如何合并多个提交？
```bash
# 交互式 rebase
git rebase -i HEAD~3

# 在编辑器中将 pick 改为 squash
```

## 自动化

### Git Hooks
在 `.git/hooks/` 或使用 husky：

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm test",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

### CI/CD 集成
- 自动运行测试
- 自动代码审查
- 自动部署到测试环境

## 参考资料

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
