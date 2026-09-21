---
name: prototype-build-figma-make
description: >-
  Transform approved wireframes and user flows into an interactive prototype in
  Figma Make. Use when the user says prototype, Figma Make, build brief,
  clickable prototype, or wants skill 15 Prototype/Build.
disable-model-invocation: false
---

# 15 — Prototype / Build (Figma Make)

⏱ ~20 minutes after inputs exist.

## Why use this

Turn approved wireframes (or a locked plan + user flow) into an **interactive
prototype in Figma Make**, ready for stakeholder review, usability testing, and
early validation.

**Primary build surface: Figma Make.** Optional: Claude Artifacts, Claude Code.

## Use this before

- Usability testing
- Stakeholder presentations
- Design reviews
- Developer handoff
- High-fidelity UI design

## What you'll need

### Required

- Approved wireframes (screens, screen list + key functionalities) **or** a
  locked plan + user flow
- User flows / task flows
- Information architecture
- Platform (Web, iOS or Android)

### Optional

- Design system
- Brand guidelines
- Screen references
- Component library
- Existing codebase
- Technical constraints
- Accessibility requirements
- Motion guidelines

## The Workflow

```
Review inputs → Prepare Build Brief → Generate prototype in Figma Make → Review experience → Test → Refine
```

## Recommended tools

- **ChatGPT** — Create the build brief (Prompt 1)
- **Figma Make** — Generate the editable interactive prototype (Prompt 2 / paste
  [FIGMA-MAKE.md](FIGMA-MAKE.md))
- **Claude Artifacts / Claude Code** — Alternate builders
- **GitHub** — Optional versioning

## Procedure

1. Collect required inputs.
2. Run **Prompt 1** → Prototype Build Brief. Do not build yet.
3. Human-review the brief until unambiguous.
4. Open [figma.com/make](https://www.figma.com/make), new file, paste **Prompt
   2** plus the brief — or paste the whole [FIGMA-MAKE.md](FIGMA-MAKE.md).
5. Human-review against the checklist. Treat output as a first prototype, not
   production.

## Prompt 1: Generate the Build Brief (ChatGPT)

See [prompt-1-brief.txt](prompt-1-brief.txt). Do **not** build the prototype in
this step.

## Prompt 2: Build in Figma Make

See [prompt-2-figma-make.txt](prompt-2-figma-make.txt). Paste into Figma Make
after the brief exists.

For this repo’s book-app, the ready-to-paste Make prompt (brief already filled)
is [FIGMA-MAKE.md](FIGMA-MAKE.md).

## Final outputs

- Prototype Build Brief
- AI Build Prompt (Figma Make)
- Interactive prototype
- Interaction specification
- Validation checklist

## Human review required

- Every interaction follows the approved user flow
- Navigation, edge cases, error states
- Keyboard / touch
- Matches wireframes / brief
- No invented features

> Treat the output as a first prototype, not a production-ready application.
