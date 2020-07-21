# Props

`<OverflowMenu>`

| v9                                             | v10                                                                              |
| ---------------------------------------------- | -------------------------------------------------------------------------------- |
| `floatingMenu`                                 | Removed - `<OverflowMenu>` always works as a floating menu                       |
| `icon`, icon name from `carbon-icons`          | `renderIcon`, which takes a React component, e.g. one from `@carbon/icons-react` |
| `iconName`, icon data from `carbon-icons`      | `renderIcon`, which takes a React component, e.g. one from `@carbon/icons-react` |
| `ref` grabs the React class instance reference | `ref` grabs the trigger button                                                   |

## `v10` example

```javascript
import OverflowMenuVertical16 from '@carbon/icons-react/lib/overflow-menu--vertical/16';

...

<OverflowMenu renderIcon={OverflowMenuVertical16}>
  <OverflowMenuItem itemText="Option 1" />
  <OverflowMenuItem itemText="Option 2" />
  ...
</OverflowMenu>
```
