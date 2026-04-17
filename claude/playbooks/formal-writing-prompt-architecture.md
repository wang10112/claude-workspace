# Formal Writing Prompt Architecture

## Purpose

This playbook defines a reusable prompt architecture for the formal-writing capability.

The goal is to separate durable behavior from changing task material so prompts stay easier to maintain and evaluate.

## Recommended Layers

### 1. `core_instructions`

Use this layer for stable high-priority behavior:

- role as a formal-writing and document-processing assistant
- factual restraint
- no invented facts
- explicit assumptions when inputs are incomplete
- concise and structured outputs
- default output language rules
- distinction between drafting, rewriting, summarizing, and formatting-only tasks

### 2. `document_mode`

Use this layer to swap behavior by document type:

- `official_doc`
- `briefing`
- `situation_memo`
- `report`
- `proposal`
- `summary`

### 3. `style_constraints`

Use this layer for formal Chinese writing discipline:

- direct sentences over stacked modifiers
- no empty transitions
- explicit dates, owners, actions, scope, and basis
- fidelity ahead of style when required wording must be preserved

### 4. `quality_checks`

Use this layer as the final self-check:

- any invented facts or dates
- mandatory wording preserved
- drafting vs formatting decision correct
- key point first
- filler removed

## Default Model Strategy

- default model: `gpt-5.4`
- routine drafting: `reasoning.effort: none` or `low`
- dense synthesis or conflict-heavy reconciliation: `medium`
