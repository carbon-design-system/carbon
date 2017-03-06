#### CSS Modifiers

Use these modifiers with `.bx--overflow-menu` class.

| Selector                         | Description                        |
|----------------------------------|------------------------------------|
| .bx--overflow-menu--flip  | Reverse the direction of the overflow menu. Default is bottom right. |
| .bx--overflow-menu--open | Displays the overflow menu options. |

### Javascript

[For details on initializing and getting components, look here]

#### Public Methods

| Name                | Params          | Description                                                               |
|---------------------|-----------------|---------------------------------------------------------------------------|
| `shouldStateBeChanged`       | state: `string` | Return true if the given state is different from the current state |
| `release`     | | Deletes the instance and removes document event listeners |

#### Options

| Option                   | Default Selector                | Description                                                                            |
|--------------------------|---------------------------------|----------------------------------------------------------------------------------------|
| `selectorInit`           | `[data-overflow-menu]`                   | The CSS selector to find menu
| `selectorPlacementScope`           | `body`                | The CSS selector to find the element you wish the append the menu contents to
| `selectorOptionMenu`        | `.bx--overflow-menu-options`             | The CSS selector to find the contents of the menu
| `objMenuOffset`    | `{ top: 3, left: -30`        | An object containing the top and left offset values in px
| `menuDirection`         | `overflow-menu-beingshown`           | The direction you wish the menu to open. Left, top, right, and bottom are valid.
| `eventBeforeShown`         | `overflow-menu-beingshown`           |  The name of the custom event fired before a menu is opened |
| `eventAfterShown`         | `overflow-menu-shown`           |  The name of the custom event fired after a menu is opened |
| `eventBeforeHidden`         | `overflow-menu-beinghidden`           |  The name of the custom event fired before a menu is opened |
| `eventAfterHidden`        | `overflow-menu-hidden`           |  The name of the custom event fired after a menu is opened |
#### Events

| Event Name             | Description                                            |
|------------------------|--------------------------------------------------------|
| `eventBeforeShown`  | The name of the custom event fired before a menu is opened. Cancellation of this event stops it opening. |
| `eventAfterShown`   | The name of the custom event fired after a menu is opened |
| `eventBeforeHidden` | The name of the custom event fired before a menu is closed. Cancellation of this event stops it closing. |
| `eventAfterHidden`  | The name of the custom event fired after a menu is opened |
