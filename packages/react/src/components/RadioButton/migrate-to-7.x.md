# Properties

`<RadioButton>`

| Propperty                                   | v9                                       | v10                 |
| ------------------------------------------- | ---------------------------------------- | ------------------- |
| `ref`                                       | Grabs the React class instance reference | Grabs the `<input>` |
| `top`/`bottom` for `labelPosition` property |                                          | Removed             |

# CSS

`<RadioButtonSkeleton>`

No longer adds `radioButtonWrapper` class to the top-level element. Please use
`bx--radio-button-wrapper` for style overrides.
