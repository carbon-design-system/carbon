#### Public Methods

| Name                   | Params                                                        | Description                                                            |
| ---------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `show`/`hide`          | `evt`: `Event` or `Element`, `callback`: `Function`           | Shows/hides the menu.                                                  |
| `changeState`          | `state`: `string`, `detail`: `Object`, `callback`: `Function` | Changes the shown/hidden state.                                        |
| `shouldStateBeChanged` | `state`: `string`                                             | Returns `true` if the given state is different from the current state. |
| `release`              |                                                               | Deletes the instance and removes resize event listeners.               |

#### Options

| Option              | Default value                    | Description                                                                                               |
| ------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `selectorContainer` | `[data-floating-menu-container]` | The CSS selector to find the element you wish the append the menu contents to.                            |
| `attribDirection`   | `data-floating-menu-direction`   | The attribute name to specify menu placement direction (top/right/bottom/left).                           |
| `classShown`        | None                             | The CSS class for shown state, for the menu. Should be provided via component creation options.           |
| `classRefShown`     | None                             | The CSS class for shown state, for the trigger button. Should be provided via component creation options. |
| `eventBeforeShown`  | `floating-menu-beingshown`       | The name of the custom event fired before a menu is opened.                                               |
| `eventAfterShown`   | `floating-menu-shown`            | The name of the custom event fired after a menu is opened.                                                |
| `eventBeforeHidden` | `floating-menu-beinghidden`      | The name of the custom event fired before a menu is closed.                                               |
| `eventAfterHidden`  | `floating-menu-hidden`           | The name of the custom event fired after a menu is closed.                                                |
| `refNode`           | None                             | The trigger button. Should be provided via component creation options.                                    |
| `offset`            | `{ top: 0, left: 0}`             | An object containing the top and left offset values in px.                                                |

#### Events

| Event Name                  | Description                                                                                              |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| `floating-menu-beingshown`  | The name of the custom event fired before a menu is opened. Cancellation of this event stops it opening. |
| `floating-menu-shown`       | The name of the custom event fired after a menu is opened.                                               |
| `floating-menu-beinghidden` | The name of the custom event fired before a menu is closed. Cancellation of this event stops it closing. |
| `floating-menu-hidden`      | The name of the custom event fired after a menu is closed.                                               |
