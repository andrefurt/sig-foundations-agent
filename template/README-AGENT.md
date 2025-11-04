# Significa Foundations Agent

A project-scoped agent that applies the **Significa Foundations** system — components, tokens, composition rules — with zero reliance on external UI kits.

## Quick Start
1. Copy the `.cursor/` folder into your project root.
2. In Cursor, open the project and press **Cmd+I** (Ask Cursor).
3. Example task:  
   > "Refactor the Button component to align with Foundations composition rules, update docs in `.cursor/rules/components/button.mdc`, and add missing states with a11y."

## What’s inside
- **Rules** (`.cursor/rules/*.mdc`): global standards, composition, stack conventions, docs policy, PR playbook.
- **Components** (`.cursor/rules/components/*.mdc`): one file per component, directly ingested by the agent.
- **MCP** (`.cursor/mcp.json`): filesystem + http (and optional GitHub actions via `GITHUB_TOKEN`).

## Recommended Workflow
- Start with a target list of components.
- Run a "component loop": **Analyze → Align → Document → Validate**.
- Keep diffs small and attach rationale/a11y notes.
