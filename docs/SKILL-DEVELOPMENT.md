# 技能开发指南

如何创建自己的 Claude Code 技能。

## 快速开始

### 1. 创建技能目录

```bash
mkdir my-skill
cd my-skill
```

### 2. 创建 SKILL.md

使用下面的模板创建 `SKILL.md` 文件。

### 3. 编写技能内容

在 SKILL.md 中编写技能的详细说明和工作流程。

### 4. 测试技能

```bash
# 本地测试
cp -r my-skill /path/to/workspace/vendor/skills/

# 在 Claude Code 中测试
/my-skill
```

### 5. 发布技能

```bash
# 创建 git 仓库
git init
git add .
git commit -m "Initial commit"

# 推送到 GitHub
git remote add origin https://github.com/username/my-skill.git
git push -u origin main
```

## SKILL.md 模板

```markdown
---
name: my-skill
version: 1.0.0
description: |
  简短描述你的技能做什么。这个描述会被 Claude 用来判断何时使用这个技能。
  保持简洁明了，说明技能的核心功能和适用场景。
license: MIT
compatibility: claude-code opencode
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - Bash
---

# 技能名称

技能的详细说明。

## 功能

- 功能 1
- 功能 2
- 功能 3

## 使用方式

### 方式一：显式调用

\`\`\`bash
/my-skill
\`\`\`

### 方式二：自动触发

当用户提到 [关键词] 时，Claude 会自动使用这个技能。

## 工作流程

1. 步骤一：[描述]
2. 步骤二：[描述]
3. 步骤三：[描述]

## 示例

### 示例 1：[场景描述]

**输入：**
\`\`\`
用户输入示例
\`\`\`

**输出：**
\`\`\`
技能输出示例
\`\`\`

### 示例 2：[场景描述]

...

## 配置

如果技能需要配置，在这里说明：

\`\`\`json
{
  "my-skill": {
    "option1": "value1",
    "option2": "value2"
  }
}
\`\`\`

## 依赖

如果技能依赖其他工具或库：

- Node.js >= 16
- Python >= 3.8
- 其他依赖

## 限制

说明技能的限制和注意事项：

- 限制 1
- 限制 2

## 故障排查

### 问题 1：[问题描述]

**解决方案：** [解决方法]

### 问题 2：[问题描述]

**解决方案：** [解决方法]

## 参考资料

- [相关文档链接]
- [相关项目链接]
\`\`\`

## Frontmatter 字段说明

### 必需字段

- **name** - 技能名称（小写，连字符分隔）
- **description** - 技能描述（用于自动路由）

### 可选字段

- **version** - 版本号（语义化版本）
- **license** - 许可证（MIT, Apache-2.0 等）
- **compatibility** - 兼容的平台（claude-code, opencode, cursor 等）
- **allowed-tools** - 技能可以使用的工具列表
- **dependencies** - 依赖的其他技能
- **tags** - 标签（用于分类和搜索）

## 最佳实践

### 1. 清晰的描述

description 字段非常重要，它决定了 Claude 何时使用你的技能：

```yaml
# ❌ 不好 - 太模糊
description: A useful tool

# ✅ 好 - 具体明确
description: |
  Convert Markdown files to PDF with custom styling.
  Use when user wants to export markdown as PDF.
```

### 2. 完整的示例

提供具体的使用示例，帮助用户理解技能的功能：

```markdown
## 示例

### 转换单个文件

**输入：**
\`\`\`
/my-skill convert README.md
\`\`\`

**输出：**
\`\`\`
✅ 已转换: README.md -> README.pdf
\`\`\`
```

### 3. 明确的工作流程

使用编号列表说明技能的工作流程：

```markdown
## 工作流程

1. 读取输入文件
2. 解析 Markdown 内容
3. 应用样式模板
4. 生成 PDF 文件
5. 保存到输出目录
```

### 4. 错误处理

说明可能的错误和解决方案：

```markdown
## 故障排查

### 文件不存在

**错误：** `Error: File not found`

**解决方案：** 检查文件路径是否正确
```

### 5. 版本管理

使用语义化版本：

- **主版本** - 不兼容的 API 变更
- **次版本** - 向后兼容的功能新增
- **修订版本** - 向后兼容的 Bug 修复

## 技能类型

### 1. 工具型技能

提供特定功能的工具：

- 文件转换
- 代码生成
- 数据处理

### 2. 工作流型技能

引导用户完成复杂任务：

- 文档写作流程
- 代码审查流程
- 项目初始化流程

### 3. 知识型技能

提供专业知识和建议：

- 架构设计建议
- 最佳实践指南
- 技术选型建议

## 发布清单

发布前检查：

- [ ] SKILL.md 完整
- [ ] Frontmatter 字段正确
- [ ] 描述清晰明确
- [ ] 示例完整可用
- [ ] 文档无错别字
- [ ] 版本号正确
- [ ] LICENSE 文件存在
- [ ] README.md 存在（可选）

## 示例技能

参考这些优秀的技能：

- [humanizer](https://github.com/blader/humanizer) - 去除 AI 写作风格
- [Anthropic Skills](https://github.com/anthropics/anthropic-skills) - 官方技能库

## 提交到市场

### 1. 创建 GitHub 仓库

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/my-skill.git
git push -u origin main
```

### 2. 添加标签

```bash
git tag v1.0.0
git push origin v1.0.0
```

### 3. 创建 Release

在 GitHub 上创建 Release，说明版本变更。

### 4. 分享

在社区分享你的技能：

- Claude Code Discord
- GitHub Discussions
- Twitter/X

## 获取帮助

- [Claude Code 文档](https://docs.anthropic.com/claude-code)
- [GitHub Issues](https://github.com/anthropics/claude-code/issues)
- [Discord 社区](https://discord.gg/claude)
