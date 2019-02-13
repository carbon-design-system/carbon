### SCSS

#### Modifiers

Use these modifiers with `.bx--search` class.

| Name                 | Description                                  |
| -------------------- | -------------------------------------------- |
| `.bx--search--sm`    | Selector for applying small search styles    |
| `.bx--search--lg`    | Selector for applying standard search styles |
| `.bx--search--light` | Selector for applying light search styles    |

### JavaScript

#### Public Methods

| Name           | Params                              | Description                              |
| -------------- | ----------------------------------- | ---------------------------------------- |
| `toggleLayout` | `element`: `Object`                 | Toggles between the grid and list layout |
| `showClear`    | `value`: `String`, `icon`: `Object` | Toggles the clear icon visibility        |
| `release`      |                                     | Deletes the instance                     |

#### Options

| Option                  | Default Selector                         | Description                                                 |
| ----------------------- | ---------------------------------------- | ----------------------------------------------------------- |
| `selectorInit`          | `[data-search]`                          | The selector to find the Search element.                    |
| `selectorSearchView`    | `[data-search-view]`                     | The selector to find the search view icon containers.       |
| `selectorSearchInput`   | `.bx--search-input`                      | The selector to find the search input.                      |
| `selectorClearIcon`     | `.bx--search-close`                      | The selector for the clear icon that clears the search box. |
| `selectorIconContainer` | `.bx--search-button[data-search-toggle]` | The data attribute selector for the icon layout container.  |
| `classClearHidden`      | `bx--search-close--hidden`               | The class used to hide the clear icon.                      |
| `classLayoutHidden`     | `bx--search-view--hidden`                | The class used to hide the non-selected layout view.        |
