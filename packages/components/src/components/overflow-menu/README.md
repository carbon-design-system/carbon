### SCSS

#### Modifiers

Use these modifiers with .bx--overflow-menu-options class.

| Selector                           | Description                                 |
| ---------------------------------- | ------------------------------------------- |
| `.bx--overflow-menu--flip`         | Reverse the direction of the overflow menu. |
| `.bx--overflow-menu-options--open` | Displays the overflow menu options.         |

### JavaScript

#### Getting component class reference

##### ES2015

```javascript
import { OverflowMenu } from 'carbon-components';
```

##### With pre-build bundle (`carbon-components.min.js`)

```javascript
var OverflowMenu = CarbonComponents.OverflowMenu;
```

#### Instantiating

```javascript
// `#my-overflow-menu` is an element with `[data-overflow-menu]` attribute
OverflowMenu.create(document.getElementById('my-overflow-menu'));
```

#### Public Methods

| Name                   | Params            | Description                                                        |
| ---------------------- | ----------------- | ------------------------------------------------------------------ |
| `shouldStateBeChanged` | `state`: `String` | Return true if the given state is different from the current state |
| `release`              |                   | Deletes the instance and removes document event listeners          |

#### Options

| Option                   | Default Selector             | Description                                                                       |
| ------------------------ | ---------------------------- | --------------------------------------------------------------------------------- |
| `selectorInit`           | `[data-overflow-menu]`       | The CSS selector to find menu                                                     |
| `selectorPlacementScope` | `body`                       | The CSS selector to find the element you wish the append the menu contents to     |
| `selectorOptionMenu`     | `.bx--overflow-menu-options` | The CSS selector to find the contents of the menu                                 |
| `objMenuOffset`          | `{ top: 3, left: 61 }`       | An object containing the top and left offset values in px                         |
| `objMenuOffsetFlip`      | `{ top: 3, left: -61 }`      | An object containing the top and left offset values in px for the "flipped" state |

##### Example - Changing menu position by 8 pixels vertically

```javascript
// `#my-overflow-menu` is an element with `[data-overflow-menu]` attribute
OverflowMenu.create(document.getElementById('my-overflow-menu'), {
  objMenuOffset(menuBody, direction) {
    const { objMenuOffset: offset } = OverflowMenu.options;
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

##### Example - Preventing menu from being closed in a certain condition

```javascript
document.addEventListener('floating-menu-beinghidden', function(evt) {
  if (myApplication.shouldMenuKeptOpen(evt.target)) {
    evt.preventDefault();
  }
});
```

##### Example - Notifying events of all overflow menus being closed to an analytics library

```javascript
document.addEventListener('floating-menu-hidden', function(evt) {
  myAnalyticsLibrary.send({
    action: 'Overflow menu closed',
    id: evt.target.id,
  });
});
```

### HTML

By default, the menu body (`ul.bx--overflow-menu-options`) goes right under
`<body>`. To ensure the proper accessibility experience, add
`data-floating-menu-container` to one of the DOM ancestors of the root element
(`div[data-overflow-menu]`). For example, if you have HTML structure like below,
the menu body will go under the second `<div>`:

```html
<body>
  <div>
    <div data-floating-menu-container>
      <div>
        <div data-overflow-menu class="bx--overflow-menu" ...>
          ...
          <ul class="bx--overflow-menu-options" ...>
            ...
          </ul>
        </div>
      </div>
    </div>
  </div>
</body>
```
