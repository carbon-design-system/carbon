### SCSS

#### Mixins

Mixins specific to button are located in [src/components/button/_mixins.scss]().

| Name         | Params                                                        | Description                                                                            |
|--------------|---------------------------------------------------------------|----------------------------------------------------------------------------------------|
| button-base  |                                                               | Base styles used in every button. Used in `@mixin button-theme` by default             |
| button-theme | bg-color, boder-color, font-color, hover-bg-color, icon-color | Used to create variant styles for a button (Variations like, primary, secondary, etc.) |


#### Modifiers

Use these modifiers with `.bx--btn` class.

| Selector            | Description                                   |
|---------------------|-----------------------------------------------|
| .bx--btn--primary   | Selector for applying primary button styles   |
| .bx--btn--secondary | Selector for applying secondary button styles |
| .bx--btn--danger    | Selector for applying danger button styles    |
| .bx--btn--sm        | Selector for applying small button styles     |


### FAQ

#### Using icons with buttons

All buttons can use icons. 
Simply add the appropriate `<svg>` to the button HTML with the `bx--btn__icon` class.
Be aware that only `--glyph` icons should be used with buttons.

```html
<button class="bx--btn bx--btn--secondary" type="button">
  Secondary
  <svg class="bx--btn__icon">
    <use xlink:href="/@console/bluemix-icons/bluemix-icons.svg#add--glyph"></use>
  </svg>
</button>
```
