# Carbon workspace standards

- Treat this repository as a large Yarn workspaces and Lerna monorepo.
- Start from the narrowest relevant package, component, workflow, or doc.
- Avoid broad repo scans unless the task truly spans multiple packages.
- Use `.nvmrc` for the expected Node version.
- Prefer package-scoped commands and package-scoped reasoning before top-level
  commands.
- Use repo docs as the source of truth instead of inventing new policy.
- Preserve functional and visual parity expectations between `@carbon/react` and
  `@carbon/web-components` when relevant, but do not force shared implementation
  when framework-specific solutions are better.
- Respect package-specific guidance in nested `AGENTS.md` files.
