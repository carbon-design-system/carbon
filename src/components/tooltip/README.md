### JavaScript

#### Attributes

| Name                   | Param                       | Description                                                                          |
|------------------------|-----------------------------|--------------------------------------------------------------------------------------|
| data-tooltip-target    | Any unique CSS selector     | The selector, typically an id, to find the tooltip corresponding to the trigger.     |
| data-tooltip-direction | Left, top, right, or bottom | Setting this attribute overrides the directions set by this.options.tooltipDirection |

#### Public Methods

| Name    | Params | Description                                                |
|---------|--------|------------------------------------------------------------|
| show    |        | Shows the tooltip.                                         |
| hide    |        | Hides the tooltip.                                         |
| release |        | Deletes the instance and removes document event listeners. |

#### Options

| Option                   | Default Selector                | Description                                                                            |
|--------------------------|---------------------------------|----------------------------------------------------------------------------------------|
| `selectorInit`           | `[data-tooltip-trigger]`        | The CSS selector to find the tooltip.
| `objMenuOffset`          | `{ top: 10, left: 0 }`          | An object containing the top and left offset values in px

### Interactive tooltip

| Selector                     | Description                        |
|------------------------------|------------------------------------|
| .bx--tooltip__trigger--bold  | Modifier class to make label bold. |

#### HTML

By default, the tooltip (`.bx--tooltip`) goes right under `<body>`. You can change the behavior by adding `data-floating-menu-container` to one of the DOM ancestors of the tooltip's original location. For example, if you have HTML structure like below, the menu body will go under the second `<div>`:

```html
<body>
  <div>
    <div data-floating-menu-container>
      <div>
        <div class="bx--tooltip__label" ...>
          Tooltip label
          <div tabindex="0" data-tooltip-trigger data-tooltip-target="#unique-tooltip" class="bx--tooltip__trigger" ...>
            ...
          </div>
        </div>
        <div id="unique-tooltip" data-floating-menu-direction="bottom" class="bx--tooltip" ...>
          <span class="bx--tooltip__caret"></span>
          ...
        </div>
      </div>
    </div>
  </div>
</body>
```

### Definition tooltip

This tooltip variation does not use any JavaScript and should be used to define a word. For anything more advanced please use the main variation.

| Selector                        | Description                                            |
|---------------------------------|--------------------------------------------------------|
| .bx--tooltip--definition__top    | A simple tooltip that is displayed above the trigger. |
| .bx--tooltip--definition__bottom | A simple tooltip that is displayed below the trigger. |


### Icon tooltip

This tooltip variation does not use any JavaScript and is good for short single line of text describing an icon. No label should be added to this variation.

| Selector                     | Description                                           |
|------------------------------|-------------------------------------------------------|
| .bx--tooltip--icon__top      | A simple tooltip that is displayed above the trigger. |
| .bx--tooltip--icon__bottom   | A simple tooltip that is displayed below the trigger. |


### Links & Resources

- [Tooltips & Toggletips](https://inclusive-components.design/tooltips-toggletips/)

