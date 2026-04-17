---
name: formal-writing
description: Collaborative workflow for creating formal documents through guided content development and reader validation. Use when the user needs to write official documents, reports, proposals, notices, or formal communications. Trigger on "write a report", "draft a notice", "create a proposal", "need to write", or document types like 通知、报告、请示、函、决定. Also trigger when the user has partial content and wants help structuring or completing it.
---

# Formal Writing Workflow

A collaborative approach to creating formal documents that combines iterative content development with reader validation. This workflow helps you understand requirements, develop content through brainstorming and refinement, and verify the document works for its intended audience.

## When to Offer This Workflow

**Trigger conditions:**
- User mentions writing formal documents: "write a report", "draft a notice", "create a proposal"
- User mentions specific document types: "通知", "报告", "请示", "函", "decision doc", "memo"
- User has partial content and wants help completing or structuring it
- User seems to be starting a substantial writing task

**Initial offer:**
Offer the user a structured workflow for creating the document. Explain the three stages:

1. **Context Gathering**: User provides context while you ask clarifying questions
2. **Content Development**: Iteratively build each section through brainstorming and refinement
3. **Reader Validation**: Test the document with a fresh perspective to catch blind spots

Explain that this approach helps ensure the document works well when others read it. Ask if they want to try this workflow or prefer to work freeform.

If user declines, work freeform. If user accepts, proceed to Stage 1.

## Stage 1: Context Gathering

**Goal:** Close the gap between what the user knows and what you know, enabling smart guidance later.

### Initial Questions

Start by asking the user for meta-context about the document:

1. What type of document is this? (report, notice, proposal, memo, decision doc, etc.)
2. Who's the primary audience?
3. What's the desired impact when someone reads this? (approve a request, take action, be informed, make a decision)
4. Is there a template or specific format to follow?
5. Any other constraints or context to know?

Inform them they can answer in shorthand or dump information however works best for them.

**If user provides a template or mentions a doc type:**
- Ask if they have a template document to share
- If they provide a file, read it
- Identify required sections and formatting requirements

### Info Dumping

Once initial questions are answered, encourage the user to dump all the context they have. Request information such as:
- Background on the situation or problem
- Why this document is being written now
- Related discussions, documents, or decisions
- Key facts, data, or evidence
- Stakeholders and their concerns
- Timeline pressures or constraints
- Organizational context (politics, past incidents, sensitivities)

Advise them not to worry about organizing it - just get it all out. Offer multiple ways to provide context:
- Info dump stream-of-consciousness
- Point to existing documents or files to read
- Paste relevant materials

Inform them clarifying questions will be asked once they've done their initial dump.

**During context gathering:**

- If user mentions documents or files: Ask if you should read them
- If user mentions entities/concepts that are unknown: Ask for clarification
- As user provides context, track what's being learned and what's still unclear

**Asking clarifying questions:**

When user signals they've done their initial dump (or after substantial context provided), ask clarifying questions to ensure understanding:

Generate 5-10 numbered questions based on gaps in the context.

Inform them they can use shorthand to answer (e.g., "1: yes, 2: see file X, 3: no because backwards compat"), link to more docs, or just keep info-dumping. Whatever's most efficient for them.

**Exit condition:**
Sufficient context has been gathered when questions show understanding - when edge cases and nuances can be asked about without needing basics explained.

**Transition:**
Ask if there's any more context they want to provide at this stage, or if it's time to move on to developing the content.

If user wants to add more, let them. When ready, proceed to Stage 2.

## Stage 2: Content Development

**Goal:** Build the document section by section through brainstorming, curation, and iterative refinement.

### Offering Flexibility

Before starting, check the user's preference:
- "Do you want to follow the full structured workflow, or would you prefer to move faster?"
- If they want to skip stages or work more freely, adapt accordingly
- Always give user agency to adjust the process

### Structure Design

Based on the document type and context, suggest an appropriate structure.

**Common patterns:**

For reports:
1. Executive Summary / Overview
2. Background / Context  
3. Current Situation / Findings
4. Analysis / Discussion
5. Recommendations / Next Steps
6. Conclusion

For notices:
1. Purpose / Reason for Notice
2. Key Information / Details
3. Action Required (if any)
4. Timeline / Deadlines
5. Contact Information

For proposals / requests:
1. Purpose / Request Summary
2. Background / Justification
3. Proposed Approach / Solution
4. Benefits / Impact
5. Resource Requirements
6. Timeline
7. Approval Request

For decision documents:
1. Decision Summary
2. Context / Background
3. Options Considered
4. Rationale for Decision
5. Implementation Plan
6. Risks / Mitigation

Ask if this structure works, or if they want to adjust it based on organizational norms or specific requirements.

**Once structure is agreed:**

Create the initial document structure with placeholder text for all sections.

**If working in files:**
Create a file with all section headers and brief placeholder text like "[To be written]".

Confirm the filename and indicate it's time to fill in each section.

### For Each Section

Start with whichever section has the most unknowns (usually the core content), then work through the rest.

#### Step 1: Clarifying Questions

Announce work will begin on the [SECTION NAME] section. Ask 5-10 clarifying questions about what should be included:

Generate 5-10 specific questions based on context and section purpose.

Inform them they can answer in shorthand or just indicate what's important to cover.

#### Step 2: Brainstorming

For the [SECTION NAME] section, brainstorm 5-20 things that might be included, depending on the section's complexity. Look for:
- Context shared that might have been forgotten
- Angles or considerations not yet mentioned
- Different ways to frame the same information

Generate 5-20 numbered options based on section complexity. At the end, offer to brainstorm more if they want additional options.

#### Step 3: Curation

Ask which points should be kept, removed, or combined. Request brief justifications to help learn priorities for the next sections.

Provide examples:
- "Keep 1,4,7,9"
- "Remove 3 (duplicates 1)"
- "Remove 6 (audience already knows this)"
- "Combine 11 and 12"

**If user gives freeform feedback** (e.g., "looks good" or "I like most of it but...") instead of numbered selections, extract their preferences and proceed. Parse what they want kept/removed/changed and apply it.

#### Step 4: Gap Check

Based on what they've selected, ask if there's anything important missing for the [SECTION NAME] section.

#### Step 5: Drafting

Announce the [SECTION NAME] section will be drafted now based on what they've selected.

Draft the section using appropriate formal language:
- Use clear, direct language (clarity over cleverness - readers have limited cognitive capacity)
- Structure with topic sentences and supporting details
- Use formatting (bullets, numbering) to improve readability
- Maintain consistent tone and style
- Be specific rather than vague (concrete details reduce ambiguity)

**Why these principles matter:**
- Clarity over cleverness: Readers process information sequentially; complexity compounds
- Specificity over vagueness: Ambiguity forces readers to guess, leading to misinterpretation
- Brevity over verbosity: Every unnecessary word increases cognitive load
- Structure over stream: Visual hierarchy helps readers navigate and retain information

After drafting, confirm completion and ask them to read through it and indicate what to change. Note that being specific helps learning for the next sections.

**Key instruction for user (include when drafting the first section):**
Instead of editing the doc directly, ask them to indicate what to change. This helps learning of their style for future sections. For example: "Remove the X bullet - already covered by Y" or "Make the third paragraph more concise".

#### Step 6: Iterative Refinement

As user provides feedback:
- Make targeted edits based on their input
- If user edits doc directly and asks to read it: mentally note the changes they made and keep them in mind for future sections (this shows their preferences)
- If they point out missing information, ask clarifying questions before adding it
- If they want tone adjustments, understand why before revising

**Continue iterating** until user is satisfied with the section.

**Learning and applying preferences:**
After each section, explicitly note patterns in their feedback:
- "I notice you prefer shorter paragraphs - I'll apply that to remaining sections"
- "You emphasized X over Y - I'll prioritize that in the next section"

Apply these learned preferences proactively in subsequent sections.

### Quality Checking

After 3 consecutive iterations with no substantial changes, ask if anything can be removed without losing important information.

When section is done, confirm [SECTION NAME] is complete. Ask if ready to move to the next section.

**Repeat for all sections.**

### Near Completion

As approaching completion (80%+ of sections done), announce intention to re-read the entire document and check for:
- Flow and consistency across sections
- Redundancy or contradictions
- Anything that feels generic or unnecessary
- Whether every sentence carries weight

Read entire document and provide feedback.

**When all sections are drafted and refined:**
Announce all sections are drafted. Indicate intention to review the complete document one more time.

Review for overall coherence, flow, completeness.

Provide any final suggestions.

Ask if ready to move to Reader Validation, or if they want to refine anything else.

## Stage 3: Reader Validation

**Goal:** Test the document with a fresh perspective (no context bleed) to verify it works for readers.

**Why this matters:** Authors know too much. What seems clear to you may confuse readers who lack your context. This stage catches blind spots before the document goes to real stakeholders.

### Testing Approach

**If access to sub-agents is available:**

Perform the testing directly without user involvement.

#### Step 1: Predict Reader Questions

Announce intention to predict what questions readers might ask when encountering this document.

Generate 5-10 questions that readers would realistically ask based on the document type and content.

#### Step 2: Test with Sub-Agent

Announce that these questions will be tested with a fresh Claude instance (no context from this conversation).

For each question, invoke a sub-agent with just the document content and the question.

Summarize what Reader Claude got right/wrong for each question.

#### Step 3: Run Additional Checks

Announce additional checks will be performed.

Invoke sub-agent to check for ambiguity, false assumptions, contradictions.

Summarize any issues found.

#### Step 4: Report and Fix

If issues found:
Report that Reader Claude struggled with specific issues.

List the specific issues.

Indicate intention to fix these gaps.

Loop back to refinement for problematic sections.

---

**If no access to sub-agents:**

The user will need to do the testing manually.

#### Step 1: Predict Reader Questions

Ask what questions people might ask when encountering this document.

Generate 5-10 questions that readers would realistically ask.

#### Step 2: Setup Testing

Provide testing instructions:
1. Open a fresh Claude conversation
2. Paste the document content
3. Ask Reader Claude the generated questions

For each question, instruct Reader Claude to provide:
- The answer
- Whether anything was ambiguous or unclear
- What knowledge/context the doc assumes is already known

Check if Reader Claude gives correct answers or misinterprets anything.

#### Step 3: Additional Checks

Also ask Reader Claude:
- "What in this doc might be ambiguous or unclear to readers?"
- "What knowledge or context does this doc assume readers already have?"
- "Are there any internal contradictions or inconsistencies?"

#### Step 4: Iterate Based on Results

Ask what Reader Claude got wrong or struggled with. Indicate intention to fix those gaps.

Loop back to refinement for any problematic sections.

---

### Exit Condition (Both Approaches)

When Reader Claude consistently answers questions correctly and doesn't surface new gaps or ambiguities, the doc is ready.

## Final Review

When Reader Validation passes:
Announce the doc has passed Reader Claude testing. Before completion:

1. Recommend they do a final read-through themselves - they own this document and are responsible for its quality
2. Suggest double-checking any facts, references, or technical details
3. Ask them to verify it achieves the impact they wanted

Ask if they want one more review, or if the work is done.

## Format & Deliver

If the document needs specific formatting (Word .docx, PDF, specific fonts/layout):

### Determine Format Requirements

Confirm:
- Output format (Markdown, Word .docx, PDF, plain text)
- Page size and margins
- Font family and sizes
- Heading styles
- Spacing and indentation
- Header/footer requirements

### Apply Formatting

**For Markdown:**
- Use proper heading hierarchy
- Format lists consistently
- Use tables where appropriate
- Add emphasis sparingly

**For Word .docx:**
- Use the **docx skill** from Anthropic skills (`vendor/anthropic-skills/skills/docx/`) for technical implementation
- Apply consistent styles
- Set appropriate page layout
- Configure fonts and spacing per requirements
- See the docx skill documentation for detailed guidance on creating professional Word documents

**For formal Chinese documents:**
- Use standard fonts (仿宋_GB2312 for body, 方正小标宋 for titles)
- Follow official document formatting standards
- Format dates in Chinese characters if required
- Consider using **official-doc-format** skill for Chinese government document standards

### Integration with Other Skills

This workflow can seamlessly integrate with other skills:

**official-doc-format** — For Chinese government document formatting
- Use when the document needs to follow specific Chinese official document standards
- Handles red headers, specific fonts, standard layouts
- Call after content is finalized

**docx (Anthropic)** — For Word document generation
- Use for creating professional .docx files with complex formatting
- Supports tables, images, headers/footers, styles
- See `vendor/anthropic-skills/skills/docx/SKILL.md` for detailed capabilities

**Note on humanizer-zh:** This skill removes AI-style language from Chinese text but reduces readability and flow. Only use when the user explicitly requests to "remove AI tone" or "make it less AI-like". Not recommended for formal documents.

### Final Delivery

Provide the final document:
- Give the file path or present the content
- Summarize what was created
- Note any items that need user attention
- Offer to make adjustments if needed

## Handling Deviations

**If user wants to skip a stage:**
Ask if they want to skip this and write freeform. Adapt to their preference.

**If user seems frustrated:**
Acknowledge this is taking longer than expected. Suggest ways to move faster (skip brainstorming, work on multiple sections in parallel, etc.).

**If user wants to work differently:**
Always give user agency to adjust the process. The workflow is a guide, not a mandate.

## Context Management

**Throughout the process:**
- If context is missing on something mentioned, proactively ask
- Don't let gaps accumulate - address them as they come up
- Track what's been learned and what's still unclear

## Special Considerations

### Working with Templates

If the user provides a template:
1. Read and understand the template structure
2. Identify required sections and optional sections
3. Note any specific formatting or style requirements
4. Fill in the template while preserving its structure
5. Don't remove template elements unless explicitly asked

### Handling Sensitive Content

For documents with sensitive information:
- Don't invent or assume sensitive details
- Ask for clarification on what can be stated explicitly
- Use appropriate level of specificity
- Consider who might read the document beyond the primary audience
- Flag any areas where the user should review carefully

### Collaboration with Other Skills

This workflow integrates with specialized skills for specific needs:

**official-doc-format** — Chinese government document formatting
- When: Document needs to follow Chinese official document standards
- What: Handles red headers, specific fonts, standard layouts
- When to call: After content is finalized

**humanizer-zh** — Chinese language polishing  
- When: Need to refine Chinese text for naturalness and formality
- What: Polishes tone, style, and language flow
- When to call: During drafting or after completion

**docx (Anthropic)** — Word document generation
- When: Need professional .docx files with complex formatting
- What: Creates Word documents with tables, images, headers/footers, styles
- Reference: `vendor/anthropic-skills/skills/docx/SKILL.md`

## Principles & Rationale

**Understand before writing:**
The time spent understanding requirements is never wasted. A clear understanding leads to fewer revisions. Why: Misaligned expectations cause more rework than any other factor.

**Structure first, polish later:**
Get the structure and key points right before worrying about perfect wording. Why: It's easier to polish good structure than to restructure polished prose.

**Write for the reader, not the writer:**
The document should be easy for the audience to understand, even if that means more work for you. Why: The document's value is measured by reader comprehension, not author effort.

**Be specific:**
Vague language creates ambiguity. Use concrete details, specific examples, and clear statements. Why: Readers fill ambiguity with their own assumptions, leading to misinterpretation.

**Respect the user's voice:**
You're helping them write, not writing for them. When they have strong preferences about wording or approach, honor that even if you might choose differently. Why: The document represents them, not you.

**Know when to stop:**
Perfect is the enemy of done. Once the document accomplishes its purpose and meets quality standards, it's ready. Why: Diminishing returns set in quickly; time is better spent on other work.

## Common Pitfalls to Avoid

- **Don't invent facts** — If you don't know something, ask
- **Don't over-formalize** — Formal doesn't mean stuffy or impenetrable
- **Don't bury the lead** — Put important information where readers will find it
- **Don't assume context** — What's obvious to you may not be obvious to the reader
- **Don't skip Reader Validation** — This is where you catch the blind spots that matter most
