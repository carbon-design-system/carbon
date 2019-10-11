### SCSS

#### Modifiers

Use these modifiers with `.bx--toggle` class.

| Selector                   | Description                               |
| -------------------------- | ----------------------------------------- |
| `.bx--toggle-input--small` | Selector for applying small toggle styles |

### FAQ

#### Best practice

`.bx--toggle-input__label` must always have a value for the `aria-label`
attribute. This makes it visible to screen readers.

The `.bx--toggle__text--off` and `.bx--toggle__text--on` elements are completely
optional. If they are present, they can be hidden from screen readers with
`aria-hidden="true"` since the `checked` state of the checkbox will indicate
this information already.
