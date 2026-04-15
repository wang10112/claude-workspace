# Claude Skill: verification

## Purpose

This is the Claude-facing verification skill for readiness checks after drafting, editing, or framework changes.

## When To Use

- before declaring work complete
- after structural changes
- when a draft, mapping, or capability surface needs confirmation

## Input Expectations

- target artifact
- expected behavior or acceptance criteria
- available checks

## Output Expectations

- explicit validation summary
- findings and residual risks
- statement of what was and was not checked

## Shared Relationship

This skill adapts the shared verification lane to Claude usage.

Primary shared references:

- `../../../shared/workflows/verification.md`
- `../../../shared/skills/verification/SKILL.md`

## Collaboration Pattern

- pair with `skills/review/` for correctness findings
- pair with `agents/reviewer.md` when a review pass is the main validation method
