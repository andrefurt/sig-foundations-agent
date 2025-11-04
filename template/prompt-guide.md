# Prompt Guide – Significa Foundations Agent

This guide includes **concise, technical prompts** and **pedagogical, step‑by‑step prompts** to work effectively inside Cursor with the Foundations rules.

---

## 1) Technical Prompts (short & surgical)

- **Refactor to Foundations**
  > Refactor `packages/ui/button/index.tsx` to follow Foundations composition rules: slots (leading/trailing), typed variants, tokens, a11y notes. Keep public API stable and update `.cursor/rules/components/button.mdc` examples.

- **Add Missing States**
  > Audit `Checkbox` for focus/invalid/loading states. Implement missing states with tokens (OKLCH), ensure WCAG AA, and document in the component MDC file.

- **Docs Sync**
  > Parse `docs/components/*` and sync content into `.cursor/rules/components/*.mdc`. Do not duplicate sections; prefer a single, canonical description.

- **Token Hygiene**
  > Replace hardcoded hex in `Avatar` with token variables. Document the mapping in the component MDC and add a note in the global tokens section.

- **API Guardrail**
  > Review `Badge` public props, deprecate unstable options with JSDoc `@deprecated`, and add a migration note in the component MDC.

---

## 2) Pedagogical Prompts (step‑by‑step)

- **Component Alignment**
  > Step 1: Read `.cursor/rules/02-foundations-composition.mdc` and `.cursor/rules/components/button.mdc`.  
  > Step 2: Analyze current `Button` implementation; list gaps (composition, slots, tokens, a11y).  
  > Step 3: Propose a minimal refactor plan (bulleted).  
  > Step 4: Apply changes with small diffs.  
  > Step 5: Update docs and add tests for edge states.  
  > Step 6: Output a summary with before/after notes and migration hints.

- **A11y Audit Loop**
  > Step 1: For `Calendar`, enumerate interactive elements and their roles.  
  > Step 2: Verify tab order and focus visibility.  
  > Step 3: Add ARIA attributes where missing.  
  > Step 4: Validate contrast against tokens.  
  > Step 5: Document a11y behavior in the component MDC.

- **Docs Creation**
  > Step 1: From `docs/components/{name}.md`, extract Overview, Anatomy, Props, States, Examples, A11y.  
  > Step 2: Normalize naming and slot terminology to Foundations.  
  > Step 3: Write `.cursor/rules/components/{name}.mdc`.  
  > Step 4: Cross‑link related components.  
  > Step 5: Provide a changelog section if behavior changed.

---

## 3) Good Practices

- Keep prompts **contextual**: reference exact paths and rule files.  
- Prefer **intent + constraints** over big wishlists.  
- Ask the agent to **explain deltas** (before/after) and capture **a11y impact**.  
- For multi‑file edits, request **small progressive diffs**.  
- When in doubt, **quote the rule** you want enforced (copy a bullet from `.cursor/rules/*.mdc`).

## 4) Anti‑patterns

- Vague goals ("make it better").  
- Oversized batch refactors without a plan.  
- Hardcoding colors or bypassing tokens.  
- Introducing new dependencies without rule approval.

