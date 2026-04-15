# Claude Skill: planning

## Purpose

This is the Claude-facing planning skill for the `project` framework.

## When To Use

- multi-step work
- structural changes
- capability additions
- migrations from legacy side workspaces into `project`

## Input Expectations

- goal
- constraints
- current state
- desired output

## Output Expectations

- phased plan
- dependency-aware sequence
- clear success criteria
- minimal unresolved decisions

## Shared Relationship

This skill is a Claude-side wrapper around the repository's general planning lane rather than a separate source of project truth.

## Collaboration Pattern

- pair with `agents/planner.md` for decomposition
- pair with `skills/review/` when validating the plan
