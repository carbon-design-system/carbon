# `multi-select`

### SCSS

#### Classes

| Name                | Description                                          |
| :------------------ | :--------------------------------------------------- |
| `.bx--multi-select` | Used on a container node to specify its control type |

#### Using Form Validation

Carbon Components provides HTML attributes and CSS to enable form validation for
each input or control.

For example, here's a **Multiselect** that provides a message if an option is
not selected.

```html
<div
  role="listbox"
  tabindex="0"
  class="bx--multi-select bx--list-box"
  data-invalid="true"
>
  <div
    role="button"
    class="bx--list-box__field"
    tabindex="0"
    type="button"
    aria-label="open menu"
    aria-expanded="false"
    aria-haspopup="true"
    data-toggle="true"
  >
    <span class="bx--list-box__label">MultiSelect Label</span>
    <div class="bx--list-box__menu-icon">
      <svg
        fill-rule="evenodd"
        height="5"
        role="img"
        viewBox="0 0 10 5"
        width="10"
        alt="Open menu"
        aria-label="Open menu"
      >
        <title>Open menu</title>
        <path d="M0 0l5 4.998L10 0z"></path>
      </svg>
    </div>
  </div>
</div>
<div class="bx--form-requirement">Please select an option.</div>
```

The `bx--form-requirement` element will be hidden until `data-invalid` attribute
gets added to the `bx--multi-select`. Validate the multiselect on your own and
then use JavaScript to add the attribute if the multiselect value is invalid.
