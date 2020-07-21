## Changes

### HTML

No markup changes.

### SCSS

No changes to _existing_ selectors, but now has _new selectors_.

#### Usage

The import path remains unchanged at:

```scss
@import 'carbon-components/scss/components/breadcrumb/breadcrumb';
```

#### Selectors

| v9                                  | v10                                         | Note                                           |
| ----------------------------------- | ------------------------------------------- | ---------------------------------------------- |
| -                                   | `bx--breadcrumb-item--current`              | ✨ New; Used to target current page breadcrumb |
| -                                   | `bx--breadcrumb-item [aria-current='page']` | ✨ New; Used to target current page breadcrumb |
| `bx--breadcrumb`                    | No change                                   |                                                |
| `bx--breadcrumb-item`               | No change                                   |                                                |
| `bx--breadcrumb--no-trailing-slash` | No change                                   |                                                |
