# Props

`<TableToolbarAction>`

| v9                                        | v10                                                                              |
| ----------------------------------------- | -------------------------------------------------------------------------------- |
| `icon`, icon name from `carbon-icons`     | `renderIcon`, which takes a React component, e.g. one from `@carbon/icons-react` |
| `iconName`, icon data from `carbon-icons` | `renderIcon`, which takes a React component, e.g. one from `@carbon/icons-react` |

## `v10` example

```javascript
import Download16 from '@carbon/icons-react/lib/download/16';

...

<TableToolbarAction renderIcon={Download16} />
```
