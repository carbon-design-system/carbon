### SCSS

#### Modifiers

Use these modifiers with .bx--overflow-menu-options class.

| Selector                         | Description                                 |
| -------------------------------- | ------------------------------------------- |
| .bx--overflow-menu--flip         | Reverse the direction of the overflow menu. |
| .bx--overflow-menu-options--open | Displays the overflow menu options.         |

### JavaScript

#### Public Methods

| Name                 | Params          | Description                                                        |
| -------------------- | --------------- | ------------------------------------------------------------------ |
| shouldStateBeChanged | state: `String` | Return true if the given state is different from the current state |
| release              |                 | Deletes the instance and removes document event listeners          |

#### Options

| Option                   | Default Selector             | Description                                                                       |
| ------------------------ | ---------------------------- | --------------------------------------------------------------------------------- |
| `selectorInit`           | `[data-overflow-menu]`       | The CSS selector to find menu                                                     |
| `selectorPlacementScope` | `body`                       | The CSS selector to find the element you wish the append the menu contents to     |
| `selectorOptionMenu`     | `.bx--overflow-menu-options` | The CSS selector to find the contents of the menu                                 |
| `objMenuOffset`          | `{ top: 3, left: 61`         | An object containing the top and left offset values in px                         |
| `objMenuOffsetFlip`      | `{ top: 3, left: -61`        | An object containing the top and left offset values in px for the "flipped" state |
