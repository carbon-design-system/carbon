---
name: coforge-new-component
description: >-
  Author Luma/CoForge prototype-only components under folders named new/. Use
  when Carbon cannot express the job even composed. Research-only Luma still
  forbids Book. The booker example (Plans/luma-agentic-hf.md) may Book.
---

# CoForge new components (`new/`)

Carbon first. A `new/` component exists only when the token map row **cannot**
carry the job even when composed.

## Location (mandatory)

```
packages/themes/examples/coforge-skin/new/<ComponentName>/
  README.md
  spec.json
  <ComponentName>.jsx
```

Never put these in `packages/react/src/components/`. Never `cf-*` prefix. Never
publish as a fifth IBM theme.

## Compose, do not draw

Inside the folder, **only** `@carbon/react` vendor names + CoForge tokens
(`--cds-*`). No shadcn, no raw hex, no Figma Make.

| Allowed inside `new/`                                                                                         | Forbidden                                                         |
| ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Header, Search, Tile, Tag, Button, Link, Form, RadioButtonGroup, OrderedList, InlineNotification, Grid, Stack | Rectangles painted coral, `cf-*`, `packages/react/src` authorship |

## When to add a folder

Add only if **all** are true:

1. A named use case in `USE-CASES.md` fails a Nielsen heuristic **or** anti-HMW
   when built from the map alone.
2. The gap is **behaviour** (spatial pair, drop-as-success, physical sequence),
   not taste.
3. `spec.json` lists the Carbon parts it wraps and the forbidden CTAs.

If the map already has it (Search, Tag, Button lg), **do not** add a folder.

## After write

Update the active plan inventory (`Plans/prototype-agentic-2.md` or
`Plans/luma-agentic-hf.md`). Research-only app: no Book/checkout/hold/sell.
Booker app (`book/`): Book and Pay are allowed; concierge must **not** confirm
Pay.
