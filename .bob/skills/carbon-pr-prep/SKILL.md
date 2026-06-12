---
name: carbon-pr-prep
description:
  Prepare Carbon pull request titles and bodies that match the repo template,
  include concrete testing and reviewing steps, and leave unresolved author
  checklist items explicit instead of guessed.
---

Prepare a Carbon pull request description using the repository template and the
actual diff.

Use this skill when the task is to draft or improve a PR title or body.

## Workflow

<Steps>
<Step>
Read the current diff and identify the affected packages, docs, or workflows.
</Step>

<Step>
Use `.github/PULL_REQUEST_TEMPLATE.md` as the required structure.

- Preserve the existing section names and order.
- Fill the changelog areas from the actual diff only. </Step>

<Step>
Write a concrete `Testing / Reviewing` section.

- Include practical reviewer steps for the actual change.
- Mention package-specific commands or Storybook/manual steps when relevant.
- Do not leave generic placeholders. </Step>

<Step>
Handle uncertainty explicitly.

- Do not invent issue links, changelog items, browser coverage, accessibility
  validation, or checklist confirmations.
- If information is missing, mark it as unresolved for the author to confirm.
  </Step>

<Step>
Output a concise PR title and body.

- Keep the title aligned with the change and existing commit/PR conventions.
- Prefer a body that is easy for maintainers to review.
- Use `checklist.md` to verify completeness before finalizing. </Step> </Steps>
