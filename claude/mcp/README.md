# Claude MCP Notes

## Purpose

This directory explains how Claude should think about MCP in the `project` framework.

## Responsibility Split

- VS Code layer: `.vscode/mcp.json`
- Claude layer: Claude-specific MCP usage notes and routing expectations
- shared layer: capability definitions that may benefit from MCP, but are not themselves MCP config
- WSL terminal layer: `git`, `gh`, and local commands

## Recommended Lean Set

For learning and day-to-day work, keep Claude's active MCP surface small.

Prioritize:

- OpenAI documentation lookups when current guidance matters
- GitHub when repository or PR context matters
- file memory in `../../shared/memory/` for durable project knowledge

Add heavier integrations only when a task actually needs them.

## Formal-Writing Relevance

For the built-in formal-writing module, MCP is mainly useful for:

- current OpenAI documentation
- repository context
- optional source lookups
- durable memory files when user preference or module history matters

It is not the center of the capability.

## Rule

Do not move shared capability logic into MCP config files.

Do not store long-term project memory only in ephemeral runtime state when it should live in `shared/memory/`.
