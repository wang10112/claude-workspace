---
title: Claude Code 完全使用指南
date: 2026-04-15
tags:
  - claude-code
  - 教程
  - 开发工具
status: 完成
---

# Claude Code 完全使用指南

> [!info] 关于本指南
> 这是一份面向开发者的 Claude Code 完整使用手册，涵盖所有核心功能、配置选项和实用技巧。

## 目录

1. [[#Context 上下文管理]]
2. [[#Model 模型设置]]
3. [[#Customize 自定义配置]]
4. [[#Slash Commands 斜杠命令]]
5. [[#实用场景案例]]
6. [[#最佳实践]]

---

## Context 上下文管理

### Attach file（附加文件）

**功能**：将本地文件内容完整加载到对话上下文中。

**使用场景**：
- 需要分析/修改特定文件
- 让 Claude 理解文件的完整内容
- 处理配置文件、日志文件等

**示例**：
```
用户：Attach file... → 选择 config.json
Claude：我看到了你的配置文件，其中数据库连接设置为...
```

> [!tip] 使用技巧
> - 大文件会占用较多 token，考虑只附加关键部分
> - 可以同时附加多个相关文件
> - 附加后文件内容会保留在整个对话中

---

### Mention file from this project（引用项目文件）

**功能**：轻量级引用工作区内的文件路径，不完整加载内容。

**使用场景**：
- 快速指向某个文件位置
- 让 Claude 按需读取文件
- 节省上下文空间

**示例**：
```
用户：检查 src/utils/helper.ts 中的错误
Claude：让我读取这个文件... [自动调用 Read 工具]
```

> [!tip] Attach vs Mention 的选择
> - **Attach**：需要深度分析整个文件时使用
> - **Mention**：只是指向文件，让 Claude 自己决定是否读取

---

### Clear conversation（清空对话）

**功能**：重置当前会话，清空所有上下文。

**使用场景**：
- 开始全新的任务
- 上下文混乱需要重新开始
- 释放 token 使用量

**快捷键**：通常是 `Ctrl+L` 或 `Cmd+L`

> [!warning] 注意
> 清空后之前的对话内容无法恢复，但 Memory 系统中的记忆会保留。

---

### Rewind（回退对话）

**功能**：撤销最近的一轮或多轮对话。

**使用场景**：
- 发现给了错误的指令
- 想尝试不同的方案
- Claude 理解错误需要重新表达

**示例**：
```
用户：删除所有测试文件
[意识到说错了]
用户：Rewind → 回退到上一步
用户：只删除过期的测试文件
```

---

## Model 模型设置

### Switch model（切换模型）

**可用模型**：
- **Claude Opus 4.6**：最强大，适合复杂任务
- **Claude Sonnet 4.6**：平衡性能和速度
- **Claude Haiku 4.5**：快速响应，简单任务

**选择建议**：
| 任务类型 | 推荐模型 | 原因 |
|---------|---------|------|
| 复杂重构 | Opus | 需要深度理解代码架构 |
| 日常开发 | Sonnet | 性价比最高 |
| 快速查询 | Haiku | 响应速度快 |

---

### Effort（工作强度）

**模式**：
- **Auto**（自动）：根据任务复杂度自动调整
- **Low**：简洁回复
- **High**：详细分析

**使用场景**：
- 需要快速答案时选 Low
- 复杂问题需要深入分析时选 High

---

### Thinking（思考模式）

**功能**：开启后 Claude 会展示内部推理过程。

**适用场景**：
- 调试复杂逻辑问题
- 理解 Claude 的决策过程
- 学习问题分析方法

**示例输出**：
```
<thinking>
用户想要优化这个函数...
当前实现的时间复杂度是 O(n²)...
可以用哈希表优化到 O(n)...
</thinking>

我建议使用哈希表来优化...
```

---

### Account & usage（账户和用量）

**功能**：查看 API 使用情况、token 消耗、费用统计。

**监控指标**：
- 当前会话 token 使用量
- 本月总消耗
- 剩余配额

---

## Customize 自定义配置

### Output styles（输出样式）

**功能**：自定义 Claude 的回复格式和风格。

**可配置项**：
- 代码块语言高亮
- 回复详细程度
- 是否使用 emoji
- Markdown 格式偏好

---

### Agents（代理配置）

**功能**：管理子代理（subagent）的行为和权限。

**常用代理类型**：
- **Explore**：快速探索代码库
- **Plan**：制定实施计划
- **Code-reviewer**：代码审查

**使用示例**：
```
用户：分析这个项目的架构
Claude：[启动 Explore agent 并行搜索]
```

> [!tip] 并行处理
> 多个独立任务可以同时启动多个 agent 加速处理。

---

### Hooks（钩子）

**功能**：配置自动化触发器，在特定事件时执行命令。

**常见钩子**：
- `user-prompt-submit-hook`：提交消息前执行
- `tool-call-hook`：工具调用前执行
- `session-start-hook`：会话开始时执行

**示例配置**（settings.json）：
```json
{
  "hooks": {
    "user-prompt-submit-hook": "git status"
  }
}
```

**使用场景**：
- 提交前自动运行测试
- 每次对话前检查 git 状态
- 自动格式化代码

---

### Memory（记忆系统）

**功能**：持久化存储用户偏好、项目上下文、反馈等信息。

**记忆类型**：

| 类型 | 用途 | 示例 |
|-----|------|------|
| **user** | 用户角色和偏好 | "用户是资深 Go 开发者" |
| **feedback** | 工作方式指导 | "不要在测试中使用 mock" |
| **project** | 项目状态和目标 | "正在重构认证模块" |
| **reference** | 外部资源位置 | "bug 在 Linear INGEST 项目" |

**存储位置**：`~/.claude/projects/<project>/memory/`

**使用示例**：
```
用户：记住我喜欢用 tabs 而不是 spaces
Claude：[保存到 feedback memory]

[下次对话]
Claude：[自动使用 tabs 格式化代码]
```

> [!important] 记忆管理
> - 定期检查和更新过时的记忆
> - 不要存储临时任务信息
> - 代码规范应该在 CLAUDE.md 中，不是 memory

---

### Permissions（权限管理）

**功能**：控制 Claude 可以自动执行的操作。

**权限级别**：
- **Auto-approve**：自动批准
- **Ask every time**：每次询问
- **Deny**：拒绝

**常见权限设置**：
```json
{
  "permissions": {
    "bash": {
      "npm install": "auto-approve",
      "rm -rf": "ask",
      "git push": "ask"
    }
  }
}
```

> [!warning] 安全建议
> - 危险命令（删除、强制推送）设为 "ask"
> - 只对安全的读操作设置 auto-approve

---

### MCP servers（MCP 服务器）

**功能**：Model Context Protocol 服务配置，连接外部工具和 API。

**用途**：
- 集成第三方服务（GitHub, Slack, Jira）
- 访问数据库
- 调用自定义 API

**配置示例**：
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

---

### Manage plugins（插件管理）

**功能**：安装和管理 Claude Code 扩展插件。

**常见插件**：
- 语言支持插件
- 框架集成插件
- 自定义工具插件

---

### Open Claude in Terminal（终端模式）

**功能**：在命令行中使用 Claude Code。

**使用场景**：
- 服务器环境开发
- 脚本自动化
- CI/CD 集成

**命令示例**：
```bash
claude "优化这个函数的性能"
claude --file src/app.ts "找出潜在的 bug"
```

---

## Slash Commands 斜杠命令

> [!info] 什么是 Slash Commands？
> 斜杠命令是预配置的技能（Skills），通过 `/命令名` 快速调用专业功能。

### 开发类命令

#### /claude-api

**功能**：构建、调试和优化 Claude API 应用。

**适用场景**：
- 开发使用 Anthropic SDK 的应用
- 实现 prompt caching
- 调试 API 调用问题

**示例**：
```
用户：/claude-api 帮我实现一个带缓存的聊天应用
Claude：[创建完整的 SDK 示例代码，包含 prompt caching]
```

---

#### /commit

**功能**：智能 Git 提交助手。

**工作流程**：
1. 分析 `git diff` 和 `git status`
2. 生成符合规范的 commit message
3. 暂存相关文件
4. 创建提交

**示例**：
```
用户：/commit
Claude：
  检查到以下更改：
  - 添加了用户认证模块
  - 修复了登录页面的 XSS 漏洞
  
  建议的 commit message：
  feat: add user authentication module
  
  fix: prevent XSS vulnerability in login form
  
  Co-Authored-By: Claude Opus 4.6
```

> [!tip] 最佳实践
> - 让 Claude 分析提交历史，学习项目的 commit 风格
> - 不要一次提交太多不相关的更改

---

#### /review

**功能**：Pull Request 代码审查。

**审查内容**：
- 代码质量和可读性
- 潜在 bug 和安全问题
- 性能优化建议
- 测试覆盖率

**使用方式**：
```bash
# 方式 1：审查当前分支
用户：/review

# 方式 2：审查特定 PR
用户：/review 123  # PR 编号
```

---

#### /security-review

**功能**：专注于安全的代码审查。

**检查项**：
- SQL 注入
- XSS 漏洞
- CSRF 防护
- 敏感信息泄露
- 权限控制问题

---

### 文档类命令

#### /doc-coauthoring

**功能**：结构化文档协作工作流。

**适用文档**：
- 技术规范
- 设计文档
- 提案
- 决策记录

**工作流程**：
1. 收集上下文和需求
2. 生成文档大纲
3. 迭代完善内容
4. 验证可读性

**示例**：
```
用户：/doc-coauthoring 写一份 API 设计文档
Claude：
  让我先了解一些信息：
  1. 这个 API 的主要用途是什么？
  2. 目标用户是谁？
  3. 有哪些核心功能？
```

---

#### /pdf

**功能**：PDF 文件处理工具集。

**支持操作**：
- 读取和提取文本
- 合并多个 PDF
- 拆分 PDF
- 旋转页面
- 添加水印
- 表单填写
- OCR 识别

**示例**：
```
用户：/pdf 合并 report1.pdf 和 report2.pdf
用户：/pdf 提取 document.pdf 的第 3-5 页
用户：/pdf 从扫描件中提取文字
```

---

#### /pptx

**功能**：PowerPoint 演示文稿处理。

**支持操作**：
- 创建幻灯片
- 读取和修改现有 PPT
- 提取文本内容
- 应用模板和主题

**示例**：
```
用户：/pptx 创建一个产品发布会的演示文稿
Claude：[生成包含封面、产品介绍、功能展示、路线图的完整 PPT]
```

---

#### /docx

**功能**：Word 文档处理。

**支持操作**：
- 创建专业文档
- 编辑现有文档
- 格式化（标题、目录、页码）
- 插入图片和表格

**示例**：
```
用户：/docx 生成一份项目总结报告
用户：/docx 在 report.docx 中添加一个表格
```

---

#### /xlsx

**功能**：Excel 表格处理。

**支持操作**：
- 创建和编辑表格
- 数据清洗和转换
- 公式计算
- 图表生成
- CSV/TSV 转换

**示例**：
```
用户：/xlsx 分析 sales_data.csv 并生成月度报表
用户：/xlsx 清理这个表格中的重复数据
```

---

### 内容类命令

#### /youtube-transcript

**功能**：提取 YouTube 视频字幕。

**支持格式**：
- 带时间戳
- 纯文本
- 多语言字幕

**示例**：
```
用户：/youtube-transcript https://youtube.com/watch?v=xxxxx
Claude：[提取完整字幕]

用户：总结这个视频的要点
Claude：[基于字幕生成摘要]
```

---

#### /baoyu-url-to-markdown

**功能**：将网页转换为 Markdown 格式。

**特性**：
- 使用 Chrome CDP 渲染
- 提取 YouTube 字幕
- 处理动态内容
- 保存 HTML 快照

**示例**：
```
用户：/baoyu-url-to-markdown https://example.com/article
Claude：[保存为 article.md]
```

---

#### /llm-wiki

**功能**：个人知识库构建系统（基于 Karpathy 方法论）。

**支持来源**：
- 网页
- Twitter/X
- 微信公众号
- 小红书
- 知乎
- YouTube
- PDF
- 本地文件

**工作流程**：
1. **初始化**：创建知识库结构
2. **消化**：处理素材并整理为 wiki
3. **查询**：检索知识库内容
4. **维护**：健康检查和更新

**示例**：
```
用户：/llm-wiki 初始化一个关于机器学习的知识库
用户：/llm-wiki 消化这篇论文 paper.pdf
用户：/llm-wiki 查询"注意力机制"相关内容
```

> [!tip] 知识库最佳实践
> - 定期消化新内容保持更新
> - 使用标签和分类组织知识
> - 定期运行健康检查清理过时内容

---

### 设计类命令

#### /frontend-design

**功能**：创建高质量的前端界面。

**技术栈**：
- React
- Tailwind CSS
- shadcn/ui

**适用场景**：
- 网站和落地页
- 仪表板
- Web 组件

**示例**：
```
用户：/frontend-design 创建一个现代风格的登录页面
Claude：[生成完整的 React 组件，包含响应式设计]
```

---

#### /canvas-design

**功能**：创建视觉艺术作品（PNG/PDF）。

**适用场景**：
- 海报设计
- 信息图表
- 艺术作品

---

#### /algorithmic-art

**功能**：使用 p5.js 创建算法艺术。

**特性**：
- 生成式艺术
- 粒子系统
- 流场效果
- 可交互参数

---

### 工具类命令

#### /loop

**功能**：循环执行任务。

**使用场景**：
- 定期检查构建状态
- 监控部署进度
- 轮询 API 状态

**示例**：
```
用户：/loop 5m 检查 CI 构建状态
Claude：[每 5 分钟检查一次，直到构建完成]

用户：/loop 监控这个进程
Claude：[自动调整检查频率]
```

---

#### /schedule

**功能**：创建定时任务（cron job）。

**示例**：
```
用户：/schedule 每天早上 9 点检查 PR 状态
Claude：[创建 cron 任务：0 9 * * *]
```

---

#### /init

**功能**：初始化 CLAUDE.md 项目文档。

**用途**：
- 记录项目架构
- 定义代码规范
- 配置 Claude 行为

---

#### /simplify

**功能**：代码简化和重构。

**检查项**：
- 代码复用
- 质量问题
- 效率优化

---

### 其他命令

#### /defuddle

**功能**：清理网页内容，移除广告和导航。

---

#### /compact

**功能**：压缩对话上下文，节省 token。

---

#### /debug

**功能**：调试模式，显示详细的执行信息。

---

#### /cost

**功能**：计算当前会话的 token 成本。

---

## 实用场景案例

### 场景 1：日常开发工作流

**任务**：实现一个新功能并提交代码。

**步骤**：
```
1. 用户：我需要添加用户头像上传功能
   Claude：[分析现有代码结构，制定实施计划]

2. Claude：[创建必要的文件和代码]

3. 用户：运行测试
   Claude：[执行 npm test，发现并修复问题]

4. 用户：/commit
   Claude：[生成规范的 commit message 并提交]

5. 用户：/review
   Claude：[自我审查代码，提出改进建议]
```

---

### 场景 2：代码审查和重构

**任务**：审查 PR 并优化代码质量。

**步骤**：
```
1. 用户：/review 456
   Claude：[分析 PR 变更，指出潜在问题]

2. 用户：/security-review
   Claude：[检查安全漏洞]

3. 用户：/simplify
   Claude：[重构代码，消除重复]

4. 用户：确认更改后 /commit
```

---

### 场景 3：文档编写

**任务**：为新功能编写技术文档。

**步骤**：
```
1. 用户：/doc-coauthoring 写 API 文档
   Claude：[引导收集信息]

2. Claude：[生成文档大纲]

3. 用户：添加更多示例
   Claude：[补充代码示例和用例]

4. 用户：/docx 导出为 Word 文档
   Claude：[生成专业格式的文档]
```

---

### 场景 4：知识管理

**任务**：构建个人技术知识库。

**步骤**：
```
1. 用户：/llm-wiki 初始化知识库
   Claude：[创建 wiki 结构]

2. 用户：/youtube-transcript [视频链接]
   Claude：[提取字幕]

3. 用户：/llm-wiki 消化这个视频内容
   Claude：[整理为结构化笔记]

4. 用户：/baoyu-url-to-markdown [文章链接]
   Claude：[保存为 markdown]

5. 用户：/llm-wiki 消化这篇文章
   Claude：[添加到知识库]
```

---

### 场景 5：数据分析

**任务**：分析销售数据并生成报告。

**步骤**：
```
1. 用户：Attach file... → sales_2024.csv
   Claude：[分析数据结构]

2. 用户：/xlsx 清理数据并计算月度统计
   Claude：[生成清洗后的表格]

3. 用户：创建可视化图表
   Claude：[添加图表到 Excel]

4. 用户：/pptx 生成汇报演示文稿
   Claude：[创建包含数据和图表的 PPT]
```

---

### 场景 6：持续监控

**任务**：监控部署状态直到完成。

**步骤**：
```
1. 用户：部署到生产环境
   [执行部署命令]

2. 用户：/loop 检查部署状态
   Claude：[每隔一段时间检查，自动调整频率]

3. Claude：✅ 部署成功！所有健康检查通过。
```

---

## 最佳实践

### 1. 上下文管理

> [!tip] 保持上下文清晰
> - 新任务开始前考虑 Clear conversation
> - 使用 Mention 而不是 Attach 来节省 token
> - 定期使用 /compact 压缩对话

---

### 2. Memory 使用

**应该保存到 Memory**：
- ✅ 个人偏好（代码风格、工具选择）
- ✅ 项目约定（不要用 mock、必须写测试）
- ✅ 外部资源位置（文档链接、issue tracker）

**不应该保存到 Memory**：
- ❌ 临时任务状态
- ❌ 代码片段（应该在代码库中）
- ❌ 已经在 CLAUDE.md 中的信息

---

### 3. 权限配置

**推荐设置**：
```json
{
  "permissions": {
    "bash": {
      // 安全的读操作 - 自动批准
      "git status": "auto-approve",
      "git log": "auto-approve",
      "npm test": "auto-approve",
      
      // 写操作 - 每次询问
      "git push": "ask",
      "npm install": "ask",
      
      // 危险操作 - 拒绝或询问
      "rm -rf": "ask",
      "git reset --hard": "ask"
    }
  }
}
```

---

### 4. 技能选择

**选择合适的命令**：

| 需求 | 使用命令 | 不要用 |
|-----|---------|--------|
| 提交代码 | `/commit` | 手动写 commit message |
| 审查 PR | `/review` | 只看 diff |
| 写文档 | `/doc-coauthoring` | 直接让 Claude 写 |
| 处理 PDF | `/pdf` | 手动复制粘贴 |
| 构建知识库 | `/llm-wiki` | 散乱的笔记 |

---

### 5. 并行处理

**利用并行能力**：
```
❌ 低效方式：
用户：读取 file1.ts
Claude：[读取]
用户：读取 file2.ts
Claude：[读取]

✅ 高效方式：
用户：分析 file1.ts 和 file2.ts 的关系
Claude：[并行读取两个文件]
```

---

### 6. Hooks 自动化

**常用 Hook 配置**：
```json
{
  "hooks": {
    // 提交前运行测试
    "pre-commit": "npm test",
    
    // 每次对话前显示 git 状态
    "user-prompt-submit-hook": "git status --short",
    
    // 会话开始时检查依赖
    "session-start-hook": "npm outdated"
  }
}
```

---

### 7. 错误处理

**遇到问题时**：
1. 使用 Rewind 回退错误操作
2. 开启 Thinking 模式理解问题
3. 使用 /debug 查看详细信息
4. 检查 Permissions 设置

---

### 8. 成本优化

**节省 Token**：
- 使用 /compact 压缩长对话
- Mention 文件而不是 Attach
- 清理不需要的上下文
- 选择合适的模型（Haiku vs Opus）

**查看成本**：
```
用户：/cost
Claude：当前会话使用了 15,234 tokens
       预估费用：$0.23
```

---

## 快速参考

### 常用快捷键

| 操作 | 快捷键 |
|-----|--------|
| 清空对话 | `Ctrl/Cmd + L` |
| 提交消息 | `Ctrl/Cmd + Enter` |
| 多行输入 | `Shift + Enter` |
| 打开命令面板 | `Ctrl/Cmd + Shift + P` |

---

### 核心命令速查

```
# 开发
/commit              # 智能提交
/review              # 代码审查
/security-review     # 安全审查
/simplify            # 代码重构

# 文档
/doc-coauthoring     # 协作写文档
/pdf                 # PDF 处理
/pptx                # PPT 处理
/docx                # Word 处理
/xlsx                # Excel 处理

# 内容
/youtube-transcript  # 提取字幕
/baoyu-url-to-markdown  # 网页转 MD
/llm-wiki            # 知识库

# 工具
/loop                # 循环任务
/schedule            # 定时任务
/init                # 初始化项目
```

---

## 相关资源

- [[CLAUDE.md 配置指南]]
- [[Memory 系统详解]]
- [[MCP 服务器开发]]
- [[自定义 Skills 开发]]

---

> [!success] 开始使用
> 现在你已经掌握了 Claude Code 的核心功能！
> 
> 建议：
> 1. 先配置好 Permissions 和 Hooks
> 2. 尝试几个常用命令（/commit, /review）
> 3. 根据需要调整 Memory 设置
> 4. 探索更多高级功能

---

*最后更新：2026-04-15*
*版本：v1.0*