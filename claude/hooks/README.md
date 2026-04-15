# Claude Hooks

This directory models a small ECC-style hook surface for Claude.

Version 1 covers three high-value hook scenarios:

- `session-start`
- `pre-write-check`
- `post-edit-review`

These files are intentionally explanatory first.

They teach:

- what each hook is for
- when it should trigger
- what behavior it should encourage

They can later be translated into real Claude runtime hook configuration if needed.
