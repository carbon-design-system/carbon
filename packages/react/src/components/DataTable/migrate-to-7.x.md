## `<Table>`

- New prop: `sortable` applies styles for sortable tables (false by default)

## `<TableToolbarAction>`

| v6                                        | v7                                                                               |
| ----------------------------------------- | -------------------------------------------------------------------------------- |
| `icon`, icon name from `carbon-icons`     | `renderIcon`, which takes a React component, e.g. one from `@carbon/icons-react` |
| `iconName`, icon data from `carbon-icons` | `renderIcon`, which takes a React component, e.g. one from `@carbon/icons-react` |

## `v7` example

```javascript
import Download16 from '@carbon/icons-react/lib/download/16';

...

<TableToolbarAction renderIcon={Download16} />
```

---

## `<TableExpandedRow>`

- Now manages it's own TabelCell
- Expects `colSpan` prop to determine width
