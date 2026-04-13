---
name: gsd-import
description: Ingest external plans with conflict detection against project decisions before writing anything.
---


<objective>
Import external plan files into the GSD planning system with conflict detection against PROJECT.md decisions.

- **--from**: Import an external plan file, detect conflicts, write as GSD PLAN.md, validate via gsd-plan-checker.

Future: `--prd` mode for PRD extraction is planned for a follow-up PR.
</objective>

<execution_context>
@/Users/brenerpompeorodrigues/Library/CloudStorage/GoogleDrive-brenerpompeo@gmail.com/Meu Drive/Vault:second_brain/second_brain/Projetos/brasil-sustenta/.trae/get-shit-done/workflows/import.md
@/Users/brenerpompeorodrigues/Library/CloudStorage/GoogleDrive-brenerpompeo@gmail.com/Meu Drive/Vault:second_brain/second_brain/Projetos/brasil-sustenta/.trae/get-shit-done/references/ui-brand.md
@/Users/brenerpompeorodrigues/Library/CloudStorage/GoogleDrive-brenerpompeo@gmail.com/Meu Drive/Vault:second_brain/second_brain/Projetos/brasil-sustenta/.trae/get-shit-done/references/gate-prompts.md
</execution_context>

<context>
{{GSD_ARGS}}
</context>

<process>
Execute the import workflow end-to-end.
</process>
