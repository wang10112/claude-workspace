# Git 工作流

## 标准工作流程

### 1. 开始新功能
```bash
git checkout main
git pull
git checkout -b feature/new-feature
```

### 2. 开发和提交
```bash
git add .
git commit -m "feat: add new feature"
```

### 3. 同步主分支
```bash
git checkout main
git pull
git checkout feature/new-feature
git merge main
```

### 4. 推送和创建 PR
```bash
git push -u origin feature/new-feature
# 在 GitHub 创建 PR
```

### 5. 合并后清理
```bash
git checkout main
git pull
git branch -d feature/new-feature
```

## 提交信息规范

使用 Conventional Commits：
- feat: 新功能
- fix: Bug 修复
- docs: 文档
- style: 格式
- refactor: 重构
- test: 测试
- chore: 构建

## 相关资源

- `claude/skills/git-workflow/SKILL.md`
- `claude/memory/git-workflow-memory.md`
