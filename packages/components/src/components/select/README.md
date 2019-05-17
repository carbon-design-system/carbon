### SCSS

#### Modifiers

Use these modifiers with `.bx--select` class.

| Name                  | Description                                |
| --------------------- | ------------------------------------------ |
| `.bx--select--inline` | Selector for applying inline select styles |
| `.bx--select--light`  | Selector for applying light select styles  |

#### Inline Select width

The width of the inline select box should be the width of the default
placeholder text + 16px/1rem of padding. There should be 10px of padding between
the placeholder text and the caret.

#### Using Form Validation

Carbon Components provides HTML attributes and CSS to enable form validation for
each input or control.

For example, here's a **Select** that provides a message if an option is not
selected.

```html
<div class="bx--form-item">
  <div class="bx--select">
    <select data-invalid id="select-id" class="bx--select-input"
      >...</select
    >
    ...
  </div>
  <svg
    class="bx--select__arrow"
    width="10"
    height="5"
    viewBox="0 0 10 5"
    fill-rule="evenodd"
  >
    <path d="M10 0L5 5 0 0z"></path>
  </svg>
  <label for="select-id" class="bx--label">Select</label>
  <div class="bx--form-requirement">Please select an option.</div>
</div>
```

The `bx--form-requirement` element will be hidden until `data-invalid` attribute
gets added to the `select` child of `bx--select`. Validate the select on your
own and then use JavaScript to add the attribute if the select value is invalid.
