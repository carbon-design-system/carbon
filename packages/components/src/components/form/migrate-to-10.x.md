### HTML

Icons from [`carbon-elements`](https://github.com/IBM/carbon-elements) package
are now used. Additionally, some internal changes involves re-ordering the
markup.

Vanilla markup should be migrated to one shown in
[carbondesignsystem.com](https://next.carbondesignsystem.com/components/form/code)
site. React and other framework variants should reflect the change
automatically.

**Things to note**:

- Submit button structure remains the same.
- Label now goes above inputs.
- For specific form input changes, view the migration doc for said component
  (i.e. select, textarea, etc).

**New Structure**:

```bash
bx--form-item
├── bx--label
├── bx--form__helper-text (optional)
├── input
└── bx--form-requirement (invalid use only)
```

**Old Structure**:

```bash
bx--form-item
├── input
├── bx--label
└── bx--form-requirement (invalid use only)
```

### SCSS

One new selector; no changes to existing classes.

| v9                     | v10                     | Note  |
| ---------------------- | ----------------------- | ----- |
| -                      | `bx--form__helper-text` | ✨New |
| `bx--form-item`        | No change               |       |
| `bx—label`             | No change               |       |
| `bx--form-requirement` | No change               |       |
| `.bx--label—disabled`  | No change               |       |
