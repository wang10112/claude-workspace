# Agents 系统

Agents 是专业化的 AI 角色，用于处理特定类型的任务。

## 目录结构

```
claude/agents/
├── README.md              # 本文件
├── core/                  # 核心 agents（通用型）
│   ├── planner.md        # 任务分解和规划
│   ├── writer.md         # 内容创作和改写
│   ├── reviewer.md       # 质量审查和验证
│   └── researcher.md     # 信息收集和研究
└── specialized/           # 专业化 agents
    ├── code-reviewer.md  # 代码审查专家
    ├── security-reviewer.md  # 安全审查专家
    └── architect.md      # 架构设计专家
```

## Agent 类型

### 核心 Agents（Core）
通用型 agents，适用于各种场景：
- **planner** - 任务分解、规划、优先级排序
- **writer** - 内容创作、文档编写、改写润色
- **reviewer** - 质量审查、代码审查、文档审查
- **researcher** - 信息收集、技术调研、方案对比

### 专业化 Agents（Specialized）
针对特定领域的专家型 agents：
- **code-reviewer** - 代码审查专家（置信度过滤、分级审查）
- **security-reviewer** - 安全审查专家（OWASP Top 10、漏洞扫描）
- **architect** - 架构设计专家（技术选型、模式识别）

## 使用方式

### 方式一：显式调用
```bash
# 使用 Agent tool
Agent({
  subagent_type: "code-reviewer",
  prompt: "Review the changes in src/api/users.ts"
})
```

### 方式二：自动路由
Claude 会根据任务类型自动选择合适的 agent。

## Agent 特性

### 置信度过滤
专业化 agents 使用置信度过滤，只报告高置信度（>80%）的问题，避免噪音。

### 分级审查
问题按严重程度分级：
- **CRITICAL** - 安全漏洞、数据丢失风险
- **HIGH** - 代码质量问题、性能问题
- **MEDIUM** - 可维护性问题
- **LOW** - 风格问题、优化建议

### 上下文感知
Agents 会读取相关规则和记忆，提供符合项目规范的建议。

## 编写 Agent

### Agent 文件格式
```markdown
---
name: agent-name
description: Agent 描述（用于自动路由）
tools: ["Read", "Grep", "Glob", "Bash"]
model: sonnet
---

# Agent 名称

Agent 的详细说明和工作流程。

## 工作流程

1. 步骤一
2. 步骤二
3. 步骤三

## 输出格式

期望的输出格式。
```

### 最佳实践
1. **明确职责** - 每个 agent 聚焦一个领域
2. **清晰流程** - 详细说明工作步骤
3. **标准输出** - 使用统一的输出格式
4. **上下文引用** - 引用相关规则和记忆
5. **示例丰富** - 提供具体示例

## Agent 与其他系统的关系

### Agent + Rules
Agents 执行规则中定义的检查和标准。

### Agent + Hooks
Hooks 可以自动触发 agents（如提交前自动代码审查）。

### Agent + Memory
Agents 从记忆系统学习项目特定的模式和偏好。

## 参考资料

- [Code Reviewer Agent](specialized/code-reviewer.md)
- [Security Reviewer Agent](specialized/security-reviewer.md)
- [Architect Agent](specialized/architect.md)
