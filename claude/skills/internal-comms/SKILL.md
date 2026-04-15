---
name: internal-comms
description: Write internal reports, briefings, and decision-friendly memos following this repository's shared conventions. Use for internal status notes, explanation memos, and structured briefings within this project. For general-purpose company communications (newsletters, 3P updates, HR announcements), use the Anthropic internal-comms skill instead.
---

# Internal Communications

## When To Use

Use for internal reports, briefings, status notes, and explanation memos within this repository's workflow.

## Core Responsibility

Turn rough facts into a restrained, decision-friendly internal document following shared conventions.

## Input Expectations

- goal or request
- facts and timeline
- actors, actions, and deadlines

## Output Expectations

- key point first
- high fact density
- non-promotional tone

## Boundary Rules

- do not invent facts
- do not use as a formatting-only step
- for general company communication templates, prefer the Anthropic internal-comms skill

## Shared Source

`shared/skills/internal-comms/SKILL.md`

## Collaboration Pattern

- pair with `skills/official-doc-format/` for final layout
- pair with `skills/humanizer-zh/` for Chinese polish
- pair with `agents/writer.md` for drafting role separation
