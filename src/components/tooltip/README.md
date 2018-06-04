### JavaScript

#### Attributes

| Name                     | Param                       | Description                                                                          |
|--------------------------|-----------------------------|--------------------------------------------------------------------------------------|
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

### Simple tooltip

This tooltip variation does not use any JavaScript and is good for short single line of text. For anything more advanced please use the main variation.

| Selector                     | Description                                           |
|------------------------------|-------------------------------------------------------|
| .bx--tooltip--simple__top    | A simple tooltip that is displayed above the trigger. |
| .bx--tooltip--simple__bottom | A simple tooltip that is displayed below the trigger. |

To set the content of the tooltip place your text in the `data-tooltip-text` attribute. Keep in mind that the simple tooltip does not support more than a single line of text and no other types of content.
