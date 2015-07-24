# Buttons

A button is a standard HTML `<button>` element.

Buttons uses text and/or an image to express what action will occur when the user clicks or touches it.

# Basic use

*This is some text on basic use of this pattern*

# Examples

A button with text.
```html
<button class="bx-btn--primary">submit</button>
```

A button with text and an icon.
```html
<button class="bx-btn--primary icon-cancel">cancel</button>
```

A disabled button with text.
```html
<button disabled class="bx-btn--primary">Disabled Button</button>
```

# Classes

| Class | Effect | Remarks |
|-----------|--------|---------|
|`bx-btn--primary`| Defines a button that is the primary call-to-action | Required |
|`bx-btn--secondary` | Defines a button that is the secondary call-to-action | Required, should appear with a primary button |
|`bx-btn--tertiary` | Defines a button that is the secondary call-to-action | Required, should appear with a primary and secondary button |
|`bx-btn--warning` | Defines a warning button | Required |
|`bx-btn--danger` | Defines a danger button | Required, this is more dangerous than warning ;) |
|`bx-btn--close` | Defines a close button | Required, the expected action from this button is to close something, like a pop-up, or a dialog box. |
|`icon-{icon-name}` | Defines an icon to be used in a button | Optional, [see icons](add link to icons) |
