# Props

`<Button>`

| v9                                                 | v10                                                                              |
| -------------------------------------------------- | -------------------------------------------------------------------------------- |
| `icon`, icon name or icon data from `carbon-icons` | `renderIcon`, which takes a React component, e.g. one from `@carbon/icons-react` |
| `danger--primary` value in `kind`                  | Removed                                                                          |
| `inputRef`                                         | `ref`                                                                            |

## `v10` example

```javascript
import AddFilled16 from '@carbon/icons-react/lib/add--filled/16';

...

<Button renderIcon={AddFilled16} />
```
