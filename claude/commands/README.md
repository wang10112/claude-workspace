# Claude Commands

This directory holds a small ECC-style compatibility surface for Claude.

Version 1 intentionally keeps the command catalog small:

- `plan`
- `review`
- `write`

These commands are workflow entrypoints only.

The source of truth remains:

- `skills/` for capability logic
- `agents/` for role separation
