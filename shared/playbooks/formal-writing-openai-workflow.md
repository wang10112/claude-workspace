# Formal Writing OpenAI Workflow

## Scope

This playbook captures OpenAI-facing defaults that are especially relevant to the formal-writing capability.

## Source Priority

For OpenAI-related questions in this capability, use this order:

1. current OpenAI official documentation
2. stable repository guidance derived from official docs
3. older historical notes

## Default API Choice

Prefer `Responses API` for future formal-writing automation and prompt operationalization.

Reasons:

- it fits multi-turn and tool-using workflows well
- it aligns with conversation state and long-running execution patterns
- it provides a stable default path for future productization

## Default Model And Reasoning Strategy

- routine formal writing: start from `gpt-5.4` with `reasoning.effort: none` or `low`
- dense synthesis, policy comparison, or source reconciliation: raise to `medium`
- only go above `medium` when evidence shows a real benefit

## Conversation State Defaults

- prefer `previous_response_id` for continuation
- avoid replaying full history when conversation-state support exists
- consider `background: true` for long-running tasks

## Tool Defaults

- prefer official built-in tools when they already cover the required capability
- keep custom function schemas explicit and narrow
- prefer strict schema behavior when practical
