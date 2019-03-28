# Props

`<Tooltip>`

| v9                                             | v10                                                                              |
| ---------------------------------------------- | -------------------------------------------------------------------------------- |
| `icon`, icon name from `carbon-icons`          | `renderIcon`, which takes a React component, e.g. one from `@carbon/icons-react` |
| `iconName`, icon data from `carbon-icons`      | `renderIcon`, which takes a React component, e.g. one from `@carbon/icons-react` |
| `ref` grabs the React class instance reference | `ref` grabs the trigger button                                                   |

## `v10` example

```javascript
import Information16 from '@carbon/icons-react/lib/information/16';

...

<Tooltip renderIcon={Information16}>
  My tooltip content...
</Tooltip>
```
