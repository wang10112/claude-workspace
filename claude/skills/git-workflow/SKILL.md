---
name: git-workflow
description: Git 工作流 - 分支管理、提交规范、PR 流程、冲突解决
type: skill
---

# Git Workflow Skill

## 何时使用

- 创建和管理分支
- 编写规范的提交信息
- 处理合并冲突
- 创建和审查 Pull Request
- 回退和修复提交
- 管理 Git 历史

## 核心能力

### 1. 分支管理
- 创建功能分支
- 合并分支
- 删除分支
- 分支命名规范

### 2. 提交规范
- Conventional Commits
- 提交信息格式
- 原子提交
- 提交最佳实践

### 3. PR 流程
- 创建 Pull Request
- 代码审查
- 处理反馈
- 合并策略

### 4. 冲突解决
- 识别冲突
- 解决冲突
- 测试合并结果
- 预防冲突

## Git 工作流模型

### Feature Branch Workflow
```bash
# 创建功能分支
git checkout -b feature/user-auth

# 开发和提交
git add .
git commit -m "feat: add user authentication"

# 推送到远程
git push -u origin feature/user-auth

# 创建 PR 并合并
```

### Git Flow
- **main** - 生产环境
- **develop** - 开发环境
- **feature/** - 功能分支
- **release/** - 发布分支
- **hotfix/** - 紧急修复

### GitHub Flow
- **main** - 主分支
- **feature/** - 功能分支
- 通过 PR 合并

## 提交信息规范

### Conventional Commits
```
<type>(<scope>): <subject>

<body>

<footer>
```

### 类型 (type)
- **feat** - 新功能
- **fix** - Bug 修复
- **docs** - 文档更新
- **style** - 代码格式
- **refactor** - 重构
- **test** - 测试
- **chore** - 构建/工具

### 示例
```
feat(auth): add JWT authentication

- Implement JWT token generation
- Add token validation middleware
- Update user login endpoint

Closes #123
```

## 常用命令

### 分支操作
```bash
# 创建并切换分支
git checkout -b feature/new-feature

# 查看分支
git branch -a

# 删除本地分支
git branch -d feature/old-feature

# 删除远程分支
git push origin --delete feature/old-feature
```

### 提交操作
```bash
# 暂存更改
git add .
git add -p  # 交互式暂存

# 提交
git commit -m "feat: add new feature"

# 修改最后一次提交
git commit --amend

# 查看提交历史
git log --oneline --graph
```

### 同步操作
```bash
# 拉取最新代码
git pull origin main

# 推送到远程
git push origin feature/branch

# 强制推送（谨慎使用）
git push --force-with-lease
```

### 冲突解决
```bash
# 查看冲突文件
git status

# 解决冲突后
git add .
git commit -m "fix: resolve merge conflicts"

# 中止合并
git merge --abort
```

### 回退操作
```bash
# 撤销工作区更改
git checkout -- file.txt

# 撤销暂存
git reset HEAD file.txt

# 回退提交（保留更改）
git reset --soft HEAD~1

# 回退提交（丢弃更改）
git reset --hard HEAD~1

# 恢复已删除的提交
git reflog
git cherry-pick <commit-hash>
```

## PR 最佳实践

### 创建 PR
1. 确保分支是最新的
2. 运行测试
3. 编写清晰的 PR 描述
4. 添加相关标签
5. 请求审查者

### PR 描述模板
```markdown
## 变更说明
简要描述这个 PR 的目的

## 变更类型
- [ ] 新功能
- [ ] Bug 修复
- [ ] 重构
- [ ] 文档更新

## 测试
- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 手动测试完成

## 截图（如适用）

## 相关 Issue
Closes #123
```

### 代码审查
- 检查代码质量
- 验证功能正确性
- 确认测试覆盖
- 提供建设性反馈

## 冲突解决策略

### 1. 预防冲突
- 频繁同步主分支
- 小步提交
- 及时合并
- 沟通协作

### 2. 解决冲突
```bash
# 更新主分支
git checkout main
git pull

# 切换到功能分支
git checkout feature/branch

# 合并主分支
git merge main

# 解决冲突
# 编辑冲突文件，选择保留的代码

# 标记为已解决
git add .
git commit -m "fix: resolve merge conflicts"
```

### 3. 使用 Rebase
```bash
# Rebase 到主分支
git rebase main

# 解决冲突后
git add .
git rebase --continue

# 推送（需要强制推送）
git push --force-with-lease
```

## Git 钩子

### Pre-commit
```bash
#!/bin/sh
# 运行 linter
npm run lint

# 运行测试
npm test
```

### Commit-msg
```bash
#!/bin/sh
# 验证提交信息格式
commit_msg=$(cat $1)
if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+"; then
  echo "错误: 提交信息不符合规范"
  exit 1
fi
```

## 最佳实践

### 提交
- 原子提交 - 每次提交一个逻辑变更
- 清晰的提交信息
- 频繁提交
- 提交前运行测试

### 分支
- 使用描述性的分支名
- 及时删除已合并的分支
- 保持分支简洁
- 定期同步主分支

### 协作
- 及时 code review
- 清晰的 PR 描述
- 响应反馈
- 保持沟通

## 故障排查

### 提交到错误分支
```bash
# 撤销提交
git reset --soft HEAD~1

# 切换到正确分支
git checkout correct-branch

# 重新提交
git commit -m "..."
```

### 需要修改已推送的提交
```bash
# 修改提交
git commit --amend

# 强制推送
git push --force-with-lease
```

### 恢复已删除的分支
```bash
# 查找分支的最后一次提交
git reflog

# 恢复分支
git checkout -b recovered-branch <commit-hash>
```

## 相关技能

- `review` - 代码审查
- `testing` - 确保提交质量
- `debugging` - 解决 Git 问题
