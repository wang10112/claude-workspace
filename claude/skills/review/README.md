# Claude Skill: review

## Purpose

This is the Claude-facing review skill for checking correctness, quality, and shared-to-adapter consistency.

## When To Use

- after drafting
- after structural changes
- when capability wrappers may have drifted from shared definitions

## Input Expectations

- target artifact
- review goal
- any acceptance criteria

## Output Expectations

- findings first
- open questions second
- summary last

## Shared Relationship

This skill aligns with the shared reviewer role and applies it in Claude-native terms.

## Collaboration Pattern

- pair with `agents/reviewer.md`
- pair with `skills/writing/` or `skills/formal-writing/` after drafts change
