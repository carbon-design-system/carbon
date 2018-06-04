#### Inline Select width

The width of the inline select box should be the width of the default placeholder text + 16px/1rem of padding.
There should be 10px of padding between the placeholder text and the caret.

#### Using Form Validation

Carbon Components provides HTML attributes and CSS to enable form validation for each input or control.

For example, here's a __Select__ that provides a message if an option is not selected.

```html
<div class="bx--form-item">
  <label for="select-id" class="bx--label">Select</label>
  <div data-invalid class="bx--select">
    <select id="select-id" class="bx--select-input">...</select>
    ...
  </div>
  <div class="bx--form-requirement">
    Please select an option.
  </div>
</div>
```

The `bx--form-requirement` element will be hidden until `data-invalid` attribute gets added to `bx--select`.
Validate the select on your own and then use JavaScript to add the attribute if the select value is invalid.
