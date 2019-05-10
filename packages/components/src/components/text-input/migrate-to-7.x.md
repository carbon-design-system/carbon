### HTML

Text Input and all other form components now require the use of labels and form
validations that come from the Form component.

```html
<div class="bx--form-item">
  <label for="text-input-1" class="bx--label">Text field label</label>
  <input
    id="text-input-1"
    type="text"
    class="bx--text-input"
    placeholder="Hint text here"
  />
</div>
```

See Forms for more details on using labels and form validation.

### SCSS

The `_text-input.scss` file is now located at
`src/components/text-input/_text-input.scss`. You will need to update any
`@import` statements for this file to reflect this change.

**New**:

```scss
@import 'path_to_node_modules/carbon-components/src/components/text-input/text-input';
```

**Old**:

```scss
@import 'path_to_node_modules/@console/bluemix-components/src/components/text-input/text-input';
```

| Old Class         | New Class      | Note    |
| ----------------- | -------------- | ------- |
| bx--text\_\_input | bx--text-input | Changed |
