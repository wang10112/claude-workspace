# Claude Settings Notes

## Purpose

This directory documents how the Claude layer should be operated inside the larger `project` framework.

## Layering

- VS Code layer: workspace opening, extensions, UI auth, shared MCP discovery
- Claude layer: instructions, skill routing, commands, hooks, and Claude-facing runtime behavior
- shared layer: workflows, skills, playbooks, templates, and subagents
- WSL terminal layer: git operations, GitHub CLI, and local commands

## Working Rule

Use `project/claude/` as the Claude authoring and organization surface.

If a more native Claude runtime layout is needed later, map from this directory rather than treating it as a separate competing system.

## Recommended Operating Habits

- open the repository in WSL
- read `claude/CLAUDE.md` before expanding the Claude layer
- use the shared layer as the source of truth for module logic
- use commands as entrypoints, not as the capability itself
- use hooks as guardrails, not as a substitute for architecture

## GitHub And MCP Boundary

- GitHub UI belongs largely to VS Code and the terminal
- Claude uses the MCP and instruction layer to reason about when repository context matters
- shared assets should stay tool-neutral even when Claude consumes them often
