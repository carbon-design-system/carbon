### SCSS

#### Modifiers

Use these modifiers with `.bx--form-item[data-text-input]` class.

| Default Selector                   | Description                                               |
| ---------------------------------- | --------------------------------------------------------- |
| `.bx--text-input-password-visible` | The className for a password field that is revealing text |

### JavaScript

#### Public Methods

| Name      | Params | Description          |
| --------- | ------ | -------------------- |
| `release` |        | Deletes the instance |

#### Options

| Option                              | Default Selector                                                      | Description                                                 |
| ----------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| `selectorInit`                      | `[data-text-input]`                                                   | The selector to find the text input form groups             |
| `selectorPasswordField`             | `.bx--text-input[data-toggle-password-visibility]`                    | The selector to find the input field                        |
| `selectorPasswordVisibilityButton`  | `.bx--text-input--password__visibility__toggle`                       | The selector to find the password visibility toggle         |
| `selectorPasswordVisibilityTooltip` | `.bx--text-input--password__visibility__toggle > .bx--assistive-text` | The selector to find the password visibility toggle tooltip |
| `passwordIsVisible`                 | `.bx--text-input--password-visible`                                   | The className for a field with visible passwords            |

#### Classes

| Default Selector                   | Description                                               |
| ---------------------------------- | --------------------------------------------------------- |
| `.bx--text-input-password-visible` | The className for a password field that is revealing text |
