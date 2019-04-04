# Props

`<TableToolbarAction>`

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
