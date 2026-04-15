# Claude Skill: formal-writing

## Purpose

This is the Claude-side module entrypoint for the built-in `formal-writing` capability.

## When To Use

- formal notices
- internal briefings
- explanation memos
- formatting-only handoffs
- Chinese polish after a draft is structurally correct

## Input Expectations

- document type
- audience
- source facts
- any wording that must remain unchanged
- desired output form

## Output Expectations

- route the task to the correct shared formal-writing capability
- keep drafting, polishing, and formatting as separate decisions
- preserve factual discipline

## Shared Relationship

Primary shared references:

- `../../shared/workflows/formal-writing.md`
- `../../docs/FORMAL-WRITING-MODULE.md`

## Collaboration Pattern

- `skills/writing/` for general drafting
- `skills/internal-comms/` for internal formal writing
- `skills/official-doc-format/` for formatting-only work
- `skills/humanizer-zh/` for final Chinese polish
- `agents/writer.md` and `agents/reviewer.md` for role separation
