### SCSS

#### Mixins

Mixins specific to button are located in
[src/components/button/\_mixins.scss]().

| Name           | Params                                                                   | Description                                                                            |
| -------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| `button-base`  |                                                                          | Base styles used in every button. Used in `@mixin button-theme` by default             |
| `button-theme` | `bg-color`, `border-color`, `font-color`, `hover-bg-color`, `icon-color` | Used to create variant styles for a button (Variations like, primary, secondary, etc.) |

#### Modifiers

Use these modifiers with `.bx--btn` class.

| Selector              | Description                                   |
| --------------------- | --------------------------------------------- |
| `.bx--btn--primary`   | Selector for applying primary button styles   |
| `.bx--btn--secondary` | Selector for applying secondary button styles |
| `.bx--btn--tertiary`  | Selector for applying tertiary button styles  |
| `.bx--btn--danger`    | Selector for applying danger button styles    |
| `.bx--btn--sm`        | Selector for applying small button styles     |
| `.bx--btn—ghost`      | Selector for applying ghost button styles     |
| `.bx--btn--icon-only` | Selector for applying icon button styles      |

### FAQ

#### Using icons with buttons

All buttons can use icons. It's recommended to inline SVG icons when possible.
Simply add the appropriate `<svg>` to the button HTML with the `bx--btn__icon`
class. You can also include `<title>` for better accessibility to describe what
the button does.

```html
<button class="bx--btn bx--btn--secondary" type="button">
  Secondary
  <svg
    class="bx--btn__icon"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill-rule="evenodd"
  >
    <title>add a new connection to your instance</title>
    <path
      d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm4 9H9v3H7V9H4V7h3V4h2v3h3v2z"
    ></path>
  </svg>
</button>
```

### Icon-only buttons

When using the icon-only button variant, tooltip styles must also be imported
for the component to display properly.
