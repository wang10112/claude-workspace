---
name: official-doc-format
description: Format text into Chinese official document style (GB/T 9704-2012). Use when user has content ready and needs to apply official document formatting. Supports all document types (通知、报告、请示、函、决定、纪要、批复、意见等). Outputs to Word or PDF as specified by user.
---

# Official Document Formatting

## When To Use

Use when:
- User has approved content and needs official document formatting
- User requests "格式化为公文" or "应用公文格式"
- User mentions specific document types: 通知、报告、请示、函、决定、纪要、批复、意见
- Content is ready but needs proper layout and structure

## Core Responsibility

Transform plain text into properly formatted Chinese official documents following GB/T 9704-2012 standards, using the docx skill to generate Word documents with correct styling.

## Workflow

### Step 1: Analyze Content Structure

**Automatically identify** document elements from the provided content:

**Title Detection**:
- Look for: 关于...的通知/报告/请示/函
- Or: Short phrases at the beginning (typically ≤30 characters)
- Or: Text that summarizes the main topic

**Body Text Detection**:
- Main content paragraphs
- Numbered or bulleted lists
- Descriptive text explaining the matter

**Metadata Detection** (if present):
- Document number patterns: XX〔YYYY〕第X号
- Date patterns: YYYY年MM月DD日 or YYYY-MM-DD
- Recipient patterns: XXX: at the beginning
- Signature patterns: Organization names at the end
- Contact info patterns: 联系人、电话、邮箱

**Optional Elements** (only include if present):
- 附件 (Attachments)
- 抄送 (CC)
- 签发人 (Signer)
- 印章 (Seal)
- 联系方式 (Contact info)
- 红头 (Red header with organization name)

### Step 2: Identify Document Type

Try to infer document type from:
- Title keywords: 通知、报告、请示、函、决定、纪要、批复、意见
- Content structure and tone
- If unclear, ask user: "这是什么类型的公文？（通知/报告/请示/函/其他）"

### Step 3: Organize Elements Flexibly

**Required elements** (always format):
- Title (标题)
- Body text (正文)

**Optional elements** (only include if detected in source):
- Red header (红头) - only if organization name is prominent
- Document number (发文字号) - only if present
- Recipient (主送机关) - only if specified
- Signature (署名) - only if present
- Date (日期) - **ask user if not specified**, don't auto-use today
- Attachments (附件) - only if mentioned
- Contact info (联系方式) - only if provided
- CC (抄送) - only if specified
- Seal position (印章) - only if signature is present

**Principle**: Format what exists, don't invent missing elements.

Use the **docx skill** to create a Word document with these specifications:

#### Page Setup
- **纸张**: A4 (210mm × 297mm)
- **页边距**: 
  - 上: 37mm
  - 下: 35mm
  - 左: 28mm
  - 右: 26mm
- **行距**: 固定值 28磅
- **字符间距**: 标准

#### Typography Standards

**发文机关名称** (红色标题):
- 字体: 方正小标宋简体（必须使用，不可替换）
- 字号: 小初号 (36磅)
- 颜色: 红色 (RGB: 255, 0, 0)
- 对齐: 居中
- 位置: 版心上边缘
- **注意**: 如果系统没有此字体，提示用户安装

**文种** (如"函"、"通知"):
- 字体: 方正小标宋简体（必须使用，不可替换）
- 字号: 小初号 (36磅)
- 颜色: 红色
- 对齐: 居中

**发文字号**:
- 字体: 仿宋_GB2312
- 字号: 三号 (16磅)
- 对齐: 居中
- 格式: 机关代字〔YYYY〕第X号

**签发人** (上行文):
- 字体: 仿宋_GB2312
- 字号: 三号
- 位置: 发文字号右侧
- 格式: "签发人：XXX"

**标题**:
- 字体: 方正小标宋简体（必须使用，不可替换）
- 字号: 二号 (22磅)
- 对齐: 居中
- 行距: 单倍行距
- 格式: 发文机关名称 + 事由 + 文种

**主送机关**:
- 字体: 仿宋_GB2312
- 字号: 三号
- 对齐: 左对齐，顶格
- 格式: "XXX："（冒号后换行）

**正文**:
- 字体: 仿宋_GB2312
- 字号: 三号
- 对齐: 两端对齐
- 首行缩进: 2字符
- 段间距: 段前段后0磅

**附件说明**:
- 字体: 仿宋_GB2312
- 字号: 三号
- 格式: "附件：1. XXX"（左对齐，不缩进）

**发文机关署名**:
- 字体: 仿宋_GB2312
- 字号: 三号
- 对齐: 右对齐
- 位置: 正文下方右侧

**成文日期**:
- 字体: 仿宋_GB2312
- 字号: 三号
- 对齐: 右对齐
- 格式: YYYY年MM月DD日（用汉字数字）
- 位置: 发文机关署名下方

**印章位置标注**:
- 标注: （盖章）或 预留印章位置
- 位置: 发文机关署名与成文日期之间

**附注**:
- 字体: 仿宋_GB2312
- 字号: 三号
- 对齐: 左对齐
- 格式: "联系人：XXX；联系电话：XXX"

**抄送机关**:
- 字体: 仿宋_GB2312
- 字号: 四号 (14磅)
- 格式: "抄送：XXX、XXX。"

**印发机关和印发日期**:
- 字体: 仿宋_GB2312
- 字号: 四号
- 位置: 页面底部
- 格式: "XX单位办公室                    YYYY年MM月DD日印发"

#### Special Elements

**表格格式**:
- 边框: 黑色实线
- 字体: 仿宋_GB2312
- 字号: 三号或四号（根据内容调整）
- 表头: 加粗
- 对齐: 文字左对齐，数字右对齐

**序号格式**:
- 一级: 一、二、三、
- 二级: （一）（二）（三）
- 三级: 1. 2. 3.
- 四级: （1）（2）（3）

### Step 4: Generate Document

**Document naming**: Use format `[标题]_[生成日期YYYYMMDD].docx`
- Example: `关于加强安全管理的通知_20260416.docx`
- If title is too long (>30 chars), truncate and add ellipsis

Call the **docx skill** with the structure based on **detected elements only**:

**Minimal structure** (if only title and body are present):
```
[标题]

[正文内容]
```

**Standard structure** (with common elements):
```
[发文字号] (if present)

[标题]

[主送机关]： (if present)
  [正文内容]
  
                              [署名] (if present)
                              [日期]
```

**Full structure** (with all detected elements):
```
[红头：发文机关名称] (if present)

[发文字号] (if present)

[标题]

[主送机关]： (if present)
  [正文内容]
  
  [附件说明] (if present)
  
                              [发文机关署名] (if present)
                              [成文日期]

[联系方式] (if present)
[抄送] (if present)
```

**Key principle**: Only include elements that exist in the source content. Do not add placeholders or empty fields.

### Step 5: Offer PDF Conversion

After generating the Word document, ask user:
"Word 文档已生成。是否需要转换为 PDF 格式？"

If yes, use the **pdf skill** to convert the docx to PDF.

## Document Type Templates

**Note**: These are **reference templates** showing complete structure. In practice, only include elements that exist in the source content. Do not force this structure if elements are missing.

### 通知 (Notice)

**Reference structure** (adapt based on available content):
```
[发文机关名称]
通知

[发文字号]

[主送机关]：
  [正文内容]
  一、[第一部分]
  二、[第二部分]
  
  [附件说明]
  
                              [发文机关署名]
                              [成文日期]

[附注]
[抄送]
[印发机关]                    [印发日期]
```

### 报告 (Report)

**Reference structure** (adapt based on available content):
```
[发文机关名称]
关于[事由]的报告

[发文字号]                    签发人：[XXX]

[主送机关]：
  [报告缘由]
  [报告事项]
  一、[基本情况]
  二、[主要做法]
  三、[存在问题]
  四、[下步打算]
  
  特此报告。
  
                              [发文机关署名]
                              [成文日期]
```

### 请示 (Request)

**Reference structure** (adapt based on available content):
```
[发文机关名称]
关于[事由]的请示

[发文字号]                    签发人：[XXX]

[主送机关]：
  [请示缘由]
  [请示事项]
  一、[具体内容]
  二、[理由说明]
  
  以上请示，请予批准。
  
                              [发文机关署名]
                              [成文日期]
```

### 函 (Letter)

**Reference structure** (adapt based on available content):
```
[发文机关名称]
函

[发文字号]

[主送机关]：
  [函的缘由]
  [函的事项]
  
  [结束语：特此函告/特此函复/请予函复]
  
  [附件说明]
  
                              [发文机关署名]
                              [成文日期]

[附注：联系人及电话]
```

## Input Expectations

- Text content (can be plain text or partially structured)
- Content should include at minimum:
  - A title or topic
  - Body text
- Optional elements (will be detected automatically):
  - Document type
  - Document number
  - Recipient
  - Signature
  - Date
  - Attachments
  - Contact info

**No need to provide**:
- Complete metadata upfront
- All formal elements
- Specific formatting instructions

**The skill will**:
- Analyze content structure automatically
- Identify title vs. body text
- Detect any metadata present
- Format only what exists

## Output Expectations

- Properly formatted Word document (.docx)
- Optional PDF conversion
- All elements correctly positioned
- Correct fonts, sizes, and colors
- Professional appearance matching GB/T 9704-2012

## Boundary Rules

- **Do not rewrite content** - only format existing text
- **Do not add missing elements** - format what exists, don't invent
- **Do not force complete structure** - adapt to available content
- **Do not substitute fonts** - 方正小标宋简体 is required, not optional
- **Do not auto-use today's date** - ask user if date is not specified
- **Do not handle content issues** - if content needs work, route to formal-writing or writing skills
- If source content is weak or incomplete, suggest user to use **formal-writing skill** first
- If user doesn't specify output format, default to Word (.docx)
- Automatically infer document type from content; only ask if truly ambiguous
- Preserve all original content, only adjust structure and styling
- If no red header organization name is present, don't add one
- If no signature is present, don't add placeholder
- If no attachments mentioned, don't add attachment section
- If system lacks required fonts, inform user to install them

## Integration with Other Skills

**Before formatting**:
- If content needs writing → use **formal-writing skill**
- If content needs refinement → use **writing skill**

**During formatting**:
- Use **docx skill** to generate Word documents
- Use **pdf skill** for PDF conversion (if requested)

**After formatting**:
- Use **review skill** to check formatting quality
- Use **verification skill** to ensure all elements are correct

## Example Usage

**Example 1: Minimal content**

**User**: "格式化这段文字：关于加强安全管理的通知。各部门要高度重视安全工作，落实安全责任制。"

**Assistant**:
1. 自动识别：标题"关于加强安全管理的通知"，正文"各部门要..."
2. 检测到的要素：标题、正文（无其他要素）
3. 生成简洁格式的 Word 文档（只包含标题和正文）
4. 询问：是否需要转换为 PDF？

**Example 2: Complete content**

**User**: "格式化：XX公司关于项目进展的报告。XX领导：我司项目进展顺利，现将情况报告如下。一、完成情况...。特此报告。XX公司 2024年4月16日 联系人：张三 电话：123456"

**Assistant**:
1. 自动识别：
   - 红头：XX公司
   - 标题：关于项目进展的报告
   - 主送机关：XX领导
   - 正文：我司项目...
   - 署名：XX公司
   - 日期：2024年4月16日
   - 联系方式：张三、123456
2. 生成完整格式的 Word 文档（包含所有检测到的要素）
3. 询问：是否需要转换为 PDF？

**Example 3: Partial content**

**User**: "把这个格式化为公文：项目验收通知。经研究决定，定于5月1日进行项目验收，请做好准备。"

**Assistant**:
1. 自动识别：标题"项目验收通知"，正文"经研究决定..."
2. 检测到的要素：标题、正文、日期（从内容推断）
3. 生成标准格式（不添加缺失的红头、署名等）
4. 询问：是否需要转换为 PDF？

## Common Document Types Reference

| 文种 | 用途 | 行文方向 | 主要特点 |
|------|------|----------|----------|
| 通知 | 发布规定、传达事项 | 下行文 | 要求明确、便于执行 |
| 报告 | 汇报工作、反映情况 | 上行文 | 陈述事实、不要求批复 |
| 请示 | 请求指示、批准 | 上行文 | 一文一事、需要批复 |
| 函 | 商洽工作、询问答复 | 平行文 | 灵活简便、不受级别限制 |
| 决定 | 奖惩、变更重要事项 | 下行文 | 严肃性、权威性 |
| 纪要 | 记载会议情况和议定事项 | - | 纪实性、约束性 |
| 批复 | 答复下级请示 | 下行文 | 针对性、明确性 |
| 意见 | 对重要问题提出见解 | 上行/下行/平行 | 指导性、建议性 |

## Notes

- This skill focuses on **formatting only**, not content creation
- Always use **docx skill** for Word generation (don't create documents manually)
- Follow GB/T 9704-2012 standards strictly
- Maintain professional appearance and readability
- Respect user's choice of output format (Word or PDF)
