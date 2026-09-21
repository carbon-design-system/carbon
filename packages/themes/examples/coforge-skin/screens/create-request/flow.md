# Flow — create-request

Persona: operations practitioner (`USER.md`). Scenario: file a work request.

```
Land (default)
  → fill title + description
  → optional checkbox
  → Submit (cds-button primary lg)
      → success: inline notification
      → error: text input invalid (empty title)
  → Cancel (ghost lg) stays on screen, clears nothing in v1 ASSUMPTION
  → Help link (coral-text)
```

Screens in this job: **one** (Create request). Success and error are states, not
extra pages.
