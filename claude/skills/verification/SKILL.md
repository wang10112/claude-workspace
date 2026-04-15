---
name: verification
description: Verify that output matches expected behavior, constraints, and acceptance criteria before calling work complete. Use before sign-off, after changes, or when an artifact claims readiness. Always name the checks performed — never claim success without stating what was verified.
---

# Verification

## When To Use

Use before calling work complete, after changes, or when an artifact claims readiness.

## Core Responsibility

Verify that output matches its expected behavior, constraints, and acceptance criteria.

## Input Expectations

- target artifact or changed area
- acceptance criteria or expected behavior
- available checks, commands, or review focus

## Output Expectations

- validation summary
- findings and risks
- explicit statement of what was and was not checked

## Boundary Rules

- do not claim success without naming the checks performed
- if execution checks are unavailable, say so explicitly instead of implying full validation

## Shared Source

`shared/skills/verification/SKILL.md`

## Collaboration Pattern

- pair with `agents/reviewer.md` for coverage
- pair with `skills/review/` for qualitative checks alongside functional verification
