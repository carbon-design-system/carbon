# Buttons

A button is a standard HTML `<button>` element -- sometimes it's an anchor `<a href="#">` that *looks* like a button.

Buttons uses text and/or an image to express what action will occur when the user clicks or touches it.

# Basic use

*This is some text on basic use of this pattern*

## Examples

A button with text.
```html
<button class="btn--primary" type="button">do something</button>
<a href="#" class="btn--primary" role="button">do something</a>
```

A button with text and an icon.
```html
<button class="btn--primary icon--cancel" type="button">cancel</button>
<a href="#" class="btn--primary icon--cancel" role="button">cancel</a>
```

A disabled button with text.
```html
<button disabled class="btn--primary">Disabled Button</button>
```

## Classes

| Class | Effect | Remarks |
|-----------|--------|---------|
|`btn--primary`| Defines a button that is the primary call-to-action | - |
|`btn--secondary` | Defines a button that is the secondary call-to-action | Should appear with a primary button |
|`btn--tertiary` | Defines a button that is the secondary call-to-action | Required, should appear with a primary and secondary button |
|`btn--warning` | Defines a warning button | Required |
|`btn--danger` | Defines a danger button | Required, this is more dangerous than warning ;) |
|`btn--close` | Defines a close button | Required, the expected action from this button is to close something, like a pop-up, or a dialog box. |
|`icon-{icon-name}` | Defines an icon to be used in a button | Optional, [see icons](add link to icons) |

## Attributes

| Attribute | Effect | Remarks |
|-----------|--------|---------|
|`role`| Defines the role of an anchor tag | **Must be used with anchor tags** -- for links that look like buttons, the role will always equal button. |
|`type` | Defines the usage of a button tag | **Must be used with button tags** -- type can equal button, submit or reset |
|`disabled`| Defines a disabled button | **Must be used with button tags** |
