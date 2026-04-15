---
name: Obsidian 笔记工作流
description: 创建 Obsidian 笔记时的自动化流程和保存规范
type: feedback
originSessionId: b7c94791-28ea-471d-acba-0a40c82d2e0e
---
用户要求创建 Obsidian 笔记时，必须自动保存到指定知识库并按规范整理。

**Why:** 用户希望笔记直接进入知识管理系统，避免手动移动文件和格式调整的重复劳动。

**How to apply:**

1. **目标路径**：所有 Obsidian 笔记保存到 `/mnt/e/Obsidian/自我成长/`（Windows: `E:\Obsidian\自我成长\`）

2. **分类规则**：
   - AI/技术相关 → `AI/` 文件夹
   - 写作内容 → `写作/` 文件夹  
   - 学习笔记 → `学习成长/` 文件夹
   - 不确定时询问用户或默认放到 `AI/`

3. **Skills 选择**（根据内容类型自动选择）：
   
   | 需求类型 | 使用 Skill | 说明 |
   |---------|-----------|------|
   | 创建/编辑普通笔记 | `obsidian:obsidian-markdown` | 支持 wikilinks、callouts、frontmatter 等 |
   | 保存网页文章 | `obsidian:defuddle` + `obsidian:obsidian-markdown` | 先用 defuddle 提取内容，再整理为笔记 |
   | 创建数据库视图 | `obsidian:obsidian-bases` | 表格视图、卡片视图、过滤器、公式 |
   | 创建思维导图/流程图 | `obsidian:json-canvas` | 可视化画布、节点连接 |
   | 批量管理笔记 | `obsidian:obsidian-cli` | 搜索、批量操作、vault 管理 |

4. **工作流程**：
   - 根据需求类型自动选择合适的 skill
   - 直接创建笔记到目标目录，不要先创建到工作区再移动
   - 严格遵循所选 skill 中的所有规范
   - 创建完成后告知用户文件路径和使用的 skill
   - 不需要询问是否保存，直接执行

5. **触发条件**：
   - 用户明确要求"创建 Obsidian 笔记"
   - 用户要求"整理为笔记"、"保存到知识库"
   - 用户提到"Obsidian"相关的内容创建需求
   - 用户提供网页链接并要求保存为笔记
   - 用户要求创建思维导图、数据库视图等特殊格式

6. **特殊场景处理**：
   - **网页转笔记**：先用 `defuddle` 提取内容 → 再用 `obsidian-markdown` 整理格式 → 保存到对应分类
   - **YouTube 视频笔记**：先用 `/youtube-transcript` 提取字幕 → 再用 `obsidian-markdown` 整理为笔记
   - **知识库整合**：如果用户提到 `/llm-wiki`，优先使用 llm-wiki 工作流，但笔记仍保存到 Obsidian vault
