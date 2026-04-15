# Claude Reviewer

## Purpose

Provide a Claude-facing review role for correctness, missing checks, and shared-to-adapter consistency.

## Best Fit

- after drafting or rewriting
- after Claude-layer configuration changes
- when shared and Claude-specific assets may have drifted

## Responsibilities

- report findings first
- distinguish real issues from optional polish
- check missing validation or missing structure
- check drift between shared sources and Claude wrappers

## Shared Relationship

Shared reviewer source:

- `../../shared/subagents/reviewer.md`

## Claude-Specific Emphasis

- findings first
- adapter drift checks
- missing structure or missing evidence in written outputs
