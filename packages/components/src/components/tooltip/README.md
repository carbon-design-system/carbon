### JavaScript (Applied _only_ to click-to-open tooltip)

#### Getting component class reference

##### ES2015

```javascript
import { Tooltip } from 'carbon-components';
```

##### With pre-build bundle (`carbon-components.min.js`)

```javascript
var Tooltip = CarbonComponents.Tooltip;
```

#### Instantiating

```javascript
// `#my-tooltip-trigger` is an element with `[data-tooltip-trigger]` attribute
Tooltip.create(document.getElementById('my-tooltip-trigger'));
```

#### Attributes

| Name                     | Param                               | Description                                                                          |
| ------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------ |
| `data-tooltip-target`    | Any unique CSS selector             | The selector, typically an id, to find the tooltip corresponding to the trigger.     |
| `data-tooltip-direction` | `left`, `top`, `right`, or `bottom` | Setting this attribute overrides the directions set by this.options.tooltipDirection |

#### Public Methods

| Name      | Params | Description                                                |
| --------- | ------ | ---------------------------------------------------------- |
| `show`    |        | Shows the tooltip.                                         |
| `hide`    |        | Hides the tooltip.                                         |
| `release` |        | Deletes the instance and removes document event listeners. |

##### Example - Showing tooltip

```javascript
// `#my-tooltip-trigger` is an element with `[data-tooltip-trigger]` attribute
var tooltipInstance = Tooltip.create(
  document.getElementById('my-tooltip-trigger')
);
tooltipInstance.show();
```

#### Options

| Option          | Default Selector         | Description                                               |
| --------------- | ------------------------ | --------------------------------------------------------- |
| `selectorInit`  | `[data-tooltip-trigger]` | The CSS selector to find the tooltip.                     |
| `objMenuOffset` | `{ top: 10, left: 0 }`   | An object containing the top and left offset values in px |

##### Example - Changing menu position by 8 pixels vertically

```javascript
// `#my-tooltip-trigger` is an element with `[data-tooltip-trigger]` attribute
Tooltip.create(document.getElementById('my-tooltip-trigger'), {
  objMenuOffset(menuBody, direction) {
    const { objMenuOffset: offset } = Tooltip.options;
    const { top, left } =
      typeof offset !== 'function' ? offset : offset(menuBody, direction);
    return {
      top: top + 8,
      left,
    };
  },
});
```

#### Events

| Event Name                  | Description                                         |
| --------------------------- | --------------------------------------------------- |
| 'floating-menu-beingshown'  | The custom event fired before the menu gets open.   |
| 'floating-menu-shown'       | The custom event fired after the menu gets open.    |
| 'floating-menu-beinghidden' | The custom event fired before the menu gets closed. |
| 'floating-menu-hidden'      | The custom event fired after the menu gets closed.  |

##### Example - Preventing click-to-open tooltip from being closed in a certain condition

```javascript
document.addEventListener('floating-menu-beinghidden', function(evt) {
  if (myApplication.shouldTooltipKeptOpen(evt.target)) {
    evt.preventDefault();
  }
});
```

##### Example - Notifying events of all click-to-open tooltips being hidden to an analytics library

```javascript
document.addEventListener('floating-menu-hidden', function(evt) {
  myAnalyticsLibrary.send({
    action: 'Tooltip hidden',
    id: evt.target.id,
  });
});
```

### Interactive tooltip

Interactive tooltip should be used if there are actions a user can take in the
tooltip (e.g. a link or a button). For more regular use case, e.g. giving the
user more text information about something, use definition tooltip or icon
tooltip.

| Selector                      | Description                        |
| ----------------------------- | ---------------------------------- |
| `.bx--tooltip__trigger--bold` | Modifier class to make label bold. |

#### HTML

By default, the tooltip (`.bx--tooltip`) goes right under `<body>`. You can
change the behavior by adding `data-floating-menu-container` to one of the DOM
ancestors of the tooltip's original location. For example, if you have HTML
structure like below, the menu body will go under the second `<div>`:

```html
<body>
  <div>
    <div data-floating-menu-container>
      <div>
        <div class="bx--tooltip__label" ...>
          Tooltip label
          <div
            tabindex="0"
            data-tooltip-trigger
            data-tooltip-target="#unique-tooltip"
            class="bx--tooltip__trigger"
            ...
          >
            ...
          </div>
        </div>
        <div
          id="unique-tooltip"
          data-floating-menu-direction="bottom"
          class="bx--tooltip"
          ...
        >
          <span class="bx--tooltip__caret"></span> ...
        </div>
      </div>
    </div>
  </div>
</body>
```

### Definition tooltip

Definition tooltip is for regular use case of tooltip, e.g. giving the user more
text information about something, like defining a word. This works better than
the interactive tooltip in regular use cases because the info icon used in
interactive tooltip can be repetitive when it’s shown several times on a page.
Definition tooltip does not use any JavaScript. If there are actions a user can
take in the tooltip (e.g. a link or a button), use interactive tooltip.

| Selector               | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| `.bx--tooltip--top`    | A simple tooltip that is displayed above the trigger. |
| `.bx--tooltip--bottom` | A simple tooltip that is displayed below the trigger. |

### Icon tooltip

Icon tooltip is for short single line of text describing an icon. Icon tooltip
does not use any JavaScript. No label should be added to this variation. If
there are actions a user can take in the tooltip (e.g. a link or a button), use
interactive tooltip.

| Selector               | Description                                                     |
| ---------------------- | --------------------------------------------------------------- |
| `.bx--tooltip--top`    | A simple tooltip that is displayed above the trigger.           |
| `.bx--tooltip--right`  | A simple tooltip that is displayed to the right of the trigger. |
| `.bx--tooltip--bottom` | A simple tooltip that is displayed below the trigger.           |
| `.bx--tooltip--left`   | A simple tooltip that is displayed to the left of the trigger.  |

### Links & Resources

- [Tooltips & Toggletips](https://inclusive-components.design/tooltips-toggletips/)
