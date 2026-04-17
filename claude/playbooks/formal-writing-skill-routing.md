# Formal Writing Skill Routing

## Purpose

This guide explains how to route formal-writing work inside the larger `project` framework.

## Default Routes

- draft or rewrite a formal document: `formal-writing -> internal-comms`
- write an internal memo, briefing, or situation note: `formal-writing -> internal-comms`
- polish Chinese wording after structure is correct: `formal-writing -> internal-comms -> humanizer-zh`
- deliver official-format normalization only: `formal-writing -> official-doc-format`
- need current OpenAI guidance: `openai-docs`

## Calling Rules

- keep the stack small
- choose one main writing skill first
- add polish only after structure is correct
- keep formatting as a separate task when the wording is already approved

## Task Map

| Task | Recommended Path |
|---|---|
| formal Chinese memo, notice, report, explanation | `formal-writing -> internal-comms` |
| internal status note or briefing | `formal-writing -> internal-comms` |
| polish a correct but stiff Chinese draft | `formal-writing -> internal-comms -> humanizer-zh` |
| normalize an approved draft into official format | `formal-writing -> official-doc-format` |
| current model or API guidance | `openai-docs` |
