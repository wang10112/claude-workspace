# Claude Hooks 系统

Hooks 是在特定事件发生时自动执行的脚本，用于自动化工作流、质量控制和记忆捕获。

## 目录结构

```
claude/hooks/
├── README.md              # 本文件
├── core/                  # 核心 hooks（JSON 配置）
├── scripts/               # Hook 脚本（Node.js）
├── examples/              # 示例 hooks
├── session-start.md       # 会话启动 hook 说明
├── pre-write-check.md     # 写入前检查 hook 说明
└── post-edit-review.md    # 编辑后审查 hook 说明
```

## 升级说明

**Version 1（当前）：** 说明性文档，教学为主
- `session-start.md` - 会话启动时的行为
- `pre-write-check.md` - 写入前的检查
- `post-edit-review.md` - 编辑后的审查

**Version 2（升级中）：** 可执行的 Hook 系统
- JSON 输出控制（block/allow/warn）
- 条件过滤（if 字段）
- Node.js 脚本支持
- 智能 agent hooks

## Hook 类型

### 1. Command Hook - 执行脚本
```json
{
  "type": "command",
  "command": "node claude/hooks/scripts/quality-gate.js",
  "timeout": 30
}
```

### 2. Prompt Hook - LLM 评估
```json
{
  "type": "prompt",
  "prompt": "Is this code change safe?",
  "model": "claude-sonnet-4-6"
}
```

### 3. Agent Hook - 智能验证
```json
{
  "type": "agent",
  "prompt": "Verify tests pass and coverage is maintained"
}
```

## JSON 输出控制

Hook 脚本可以返回 JSON 控制行为：

```json
{
  "continue": false,
  "stopReason": "Security check failed",
  "systemMessage": "Found hardcoded API key",
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny"
  }
}
```

## 快速开始

查看 `examples/` 目录中的示例 hooks。

详细文档：
- [Hook 事件类型](https://docs.anthropic.com/claude-code/hooks)
- [编写 Hook 脚本](scripts/README.md)
- [核心 Hooks 配置](core/README.md)
