# Obsidian Knowledge Maintenance

## Purpose

Provide a neutral workflow for organizing, enriching, and maintaining an Obsidian vault without mixing tool-specific runtime details into the shared layer.

## When To Use

- note cleanup inside an Obsidian vault
- converting rough notes into linked notes
- importing web material into markdown notes
- building property-driven note collections
- creating visual maps with canvas files

## Trigger Signals

- the user explicitly mentions Obsidian, vault, wikilinks, callouts, frontmatter, Bases, or Canvas
- the task targets `.md`, `.base`, or `.canvas` files intended for Obsidian
- the user wants notes reorganized into a connected vault structure rather than plain markdown files

## Routing Rules

- use `obsidian-markdown` when the main artifact is an Obsidian note and the task depends on wikilinks, embeds, tags, frontmatter, or callouts
- use `obsidian-bases` when the main artifact is a `.base` file or when the user wants filtered views, property-driven tables, cards, or formulas
- use `json-canvas` when the main artifact is a `.canvas` file or when the user wants a visual relationship map
- use `defuddle` when the task starts from a web page and the next step is to turn it into clean markdown for later vault ingestion
- use `obsidian-cli` only when a running Obsidian instance and the `obsidian` command are available

## Core Steps

1. identify the target artifact type: note, base, canvas, or imported source
2. determine whether the task is content cleanup, structure design, or vault operation
3. choose the primary skill and any secondary skill handoff
4. create or edit the artifact using valid Obsidian-specific syntax
5. verify syntax integrity and relationship integrity before handoff

## Recommended Skill Sequences

### Web to note

1. `defuddle` to extract clean markdown from the source URL
2. `obsidian-markdown` to turn the cleaned content into an Obsidian-native note
3. `obsidian-bases` if the note should appear in a structured collection

### Rough notes to structured vault note

1. `obsidian-markdown` to normalize frontmatter, links, embeds, tags, and callouts
2. `json-canvas` if the note should also be represented in a visual knowledge map

### Property-driven collection

1. `obsidian-markdown` to normalize note properties first
2. `obsidian-bases` to build the view layer on top of those properties

### Knowledge map

1. `obsidian-markdown` to stabilize note names and links if needed
2. `json-canvas` to represent relationships visually

## Validation Focus

- `.md` files: valid frontmatter, sensible wikilinks, correct embed syntax, no broken Obsidian-only constructs
- `.base` files: valid YAML, correct property names, formulas defined before use
- `.canvas` files: valid JSON, unique IDs, edges point to existing nodes
- imported sources: markdown is clean enough to be rewritten into vault-native structure

## Outputs

- cleaned Obsidian note
- structured `.base` view
- valid `.canvas` relationship map
- imported markdown ready for vault placement

## Boundary Rules

- do not treat generic markdown cleanup as an Obsidian task unless vault-specific syntax matters
- do not route to `obsidian-cli` when the local CLI is unavailable
- do not create Bases before note properties are stable if the task depends on those properties
