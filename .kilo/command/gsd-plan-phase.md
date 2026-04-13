---
description: Create detailed phase plan (PLAN.md) with verification loop
argument-hint: "[phase] [--auto] [--research] [--skip-research] [--gaps] [--skip-verify] [--prd <file>] [--reviews] [--text]"
agent: gsd-planner
tools:
  read: true
  write: true
  bash: true
  glob: true
  grep: true
  task: true
  question: true
  webfetch: true
  mcp__context7__*: true
---
<objective>
Create executable phase prompts (PLAN.md files) for a roadmap phase with integrated research and verification.

**Default flow:** Research (if needed) → Plan → Verify → Done

**Orchestrator role:** Parse arguments, validate phase, research domain (unless skipped), spawn gsd-planner, verify with gsd-plan-checker, iterate until pass or max iterations, present results.
</objective>

<execution_context>
@/Users/brenerpompeorodrigues/Library/CloudStorage/GoogleDrive-brenerpompeo@gmail.com/Meu Drive/Vault:second_brain/second_brain/Projetos/brasil-sustenta/.kilo/get-shit-done/workflows/plan-phase.md
@/Users/brenerpompeorodrigues/Library/CloudStorage/GoogleDrive-brenerpompeo@gmail.com/Meu Drive/Vault:second_brain/second_brain/Projetos/brasil-sustenta/.kilo/get-shit-done/references/ui-brand.md
</execution_context>

<runtime_note>
**Copilot (VS Code):** Use `vscode_askquestions` wherever this workflow calls `question`. They are equivalent — `vscode_askquestions` is the VS Code Copilot implementation of the same interactive question API. Do not skip questioning steps because `question` appears unavailable; use `vscode_askquestions` instead.
</runtime_note>

<context>
Phase number: $ARGUMENTS (optional — auto-detects next unplanned phase if omitted)

**Flags:**
- `--research` — Force re-research even if RESEARCH.md exists
- `--skip-research` — Skip research, go straight to planning
- `--gaps` — Gap closure mode (reads VERIFICATION.md, skips research)
- `--skip-verify` — Skip verification loop
- `--prd <file>` — Use a PRD/acceptance criteria file instead of discuss-phase. Parses requirements into CONTEXT.md automatically. Skips discuss-phase entirely.
- `--reviews` — Replan incorporating cross-AI review feedback from REVIEWS.md (produced by `/gsd-review`)
- `--text` — Use plain-text numbered lists instead of TUI menus (required for `/rc` remote sessions)

Normalize phase input in step 2 before any directory lookups.
</context>

<process>
Execute the plan-phase workflow from @/Users/brenerpompeorodrigues/Library/CloudStorage/GoogleDrive-brenerpompeo@gmail.com/Meu Drive/Vault:second_brain/second_brain/Projetos/brasil-sustenta/.kilo/get-shit-done/workflows/plan-phase.md end-to-end.
Preserve all workflow gates (validation, research, planning, verification loop, routing).
</process>
