# Claude Hook: session-start

## Purpose

Orient Claude at the beginning of a session so it reads the correct project entrypoints before acting.

## Trigger

Session start or first active prompt in the repository.

## Suggested Action

- read `../CLAUDE.md`
- align with root `AGENTS.md` and `RULES.md`
- identify whether the task is general, module-specific, or requires research first

## Runtime Role

This is both:

- a learning sample
- a candidate mapping for a real Claude session-start hook
