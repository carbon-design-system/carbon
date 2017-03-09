### Javascript

[For details on initializing and getting components, look here]

#### Attributes

| Name                | Param          | Description   |
|---------------------|-----------------|---------------|
| `data-tooltip-target`| Any unique CSS selector | The selector, typically an id, to find the tooltip corresponding to the trigger |
| `data-tooltip-direction`| Left, top, right, or bottom | Setting this attribute overrides the directions set by this.options.tooltipDirection |

#### Public Methods

| Name                | Params          | Description   |
|---------------------|-----------------|---------------|
| `show`       | | Shows the tooltip|
| `hide`       | | Hides the tooltip|
| `release`     | | Deletes the instance and removes document event listeners |

#### Options

| Option                   | Default Selector                | Description                                                                            |
|--------------------------|---------------------------------|----------------------------------------------------------------------------------------|
| `selectorInit`           | `[data-tooltip]`                   | The CSS selector to find the tooltip
| `selectorPlacementScope`           | `body`                | The CSS selector to find the element you wish the append the tooltip to
| `objMenuOffset`    | `{ top: 10, left: 0`        | An object containing the top and left offset values in px
| `tooltipDirection`         | `bottom`           | The direction you wish the tooltip to display. Left, top, right, and bottom are valid.
| `eventBeforeShown`         | `tooltip-beingshown`           |  The name of the custom event fired before a tooltip is shown |
| `eventAfterShown`         | `tooltip-shown`           |  The name of the custom event fired after a tooltip is shown |
| `eventBeforeHidden`         | `tooltip-beinghidden`           |  The name of the custom event fired before a tooltip is hidden |
| `eventAfterHidden`        | `tooltip-hidden`           |  The name of the custom event fired after a tooltip is hidden |

#### Events

| Event Name             | Description                                            |
|------------------------|--------------------------------------------------------|
| `eventBeforeShown`  | The name of the custom event fired before a tooltip is shown. Cancellation of this event stops it shown. |
| `eventAfterShown`   | The name of the custom event fired after a tooltip is shown |
| `eventBeforeHidden` | The name of the custom event fired before a tooltip is closed. Cancellation of this event stops it closing. |
| `eventAfterHidden`  | The name of the custom event fired after a tooltip is hidden |

### Simple tooltip

This tooltip variation does not use any javascript and is good for short single line of text. For anything more advanced please use the main variation.

| Selector                         | Description                        |
|----------------------------------|------------------------------------|
| .bx--tooltip--simple__top  | A simple tooltip that is displayed above the trigger |
| .bx--tooltip--simple__bottom  | A simple tooltip that is displayed below the trigger |

To set the content of the tooltip place your text in the `data-tooltip-text` attribute. Keep in mind that the simple tooltip does not support more than a single line of text and no other types of content.
