# 记忆系统

这里存放整个项目的长期记忆，服务于 Claude、Codex 和人工维护。

## 目录结构

```
claude/memory/
├── README.md              # 本文件
├── core/                  # 核心记忆（手动维护）
│   ├── workspace-memory.md
│   ├── user-preferences.md
│   ├── testing-memory.md
│   └── ...
└── auto/                  # 自动记忆（自动捕获）
    ├── patterns/         # 代码模式
    ├── decisions/        # 架构决策
    └── learnings/        # 经验教训
```

## 核心记忆（Core）

手动维护的长期记忆，记录稳定的事实和约定。

### 模块记忆
- `workspace-memory.md` - 工作区长期事实与稳定约定
- `user-preferences.md` - 用户偏好与长期习惯
- `testing-memory.md` - 测试模块的长期经验
- `debugging-memory.md` - 调试模块的长期经验
- `refactoring-memory.md` - 重构模块的长期经验
- `git-workflow-memory.md` - Git 工作流的长期经验
- `security-review-memory.md` - 安全审查的长期经验
- `formal-writing-memory.md` - 正式写作模块的长期经验
- `planning-memory.md` - 规划模块的长期经验
- `research-memory.md` - 研究模块的长期经验
- `review-memory.md` - 审查模块的长期经验
- `verification-memory.md` - 验证模块的长期经验

## 自动记忆（Auto）

通过 Hooks 自动捕获的记忆，记录项目演进过程。

### patterns/ - 代码模式
记录反复使用的代码模式和最佳实践。

**示例：**
- Hook 基类模式
- 错误处理模式
- 配置管理模式

### decisions/ - 架构决策
记录重要的架构决策和技术选型。

**示例：**
- 为什么选择完整 Hooks 系统
- 为什么采用分层规则结构
- 技术栈选择理由

### learnings/ - 经验教训
记录问题解决过程和经验教训。

**示例：**
- Hook 需要优雅失败
- 置信度过滤避免噪音
- 长期主义的价值

详细说明参考：[自动记忆系统](auto/README.md)

## 使用规则

### 核心记忆
1. **只写长期有价值的信息** - 不要把临时聊天内容塞进这里
2. **当偏好稳定后** - 应写入这里而不是反复口头说明
3. **定期审查** - 删除过时的记忆，更新变化的约定

### 自动记忆
1. **自动捕获** - 通过 memory-capture.js Hook 自动记录
2. **定期整理** - 每月审查，提取通用模式到核心记忆
3. **可以手动添加** - 重要的模式和决策可以手动记录

## 记忆维护

### 提升自动记忆到核心
如果某个模式反复出现且稳定，提升到核心记忆：

```bash
mv claude/memory/auto/patterns/important-pattern.md \
   claude/memory/important-pattern-memory.md
```

### 搜索记忆
```bash
# 搜索所有记忆
grep -r "关键字" claude/memory/

# 只搜索核心记忆
grep -r "关键字" claude/memory/*.md

# 只搜索自动记忆
grep -r "关键字" claude/memory/auto/
```

## 参考资料

- [自动记忆系统](auto/README.md)
- [Memory Capture Hook](../hooks/scripts/memory-capture.js)
