### SCSS

#### Modifiers

Use these modifiers with `.bx--pagination-nav` class.

| Selector                               | Description                                                     |
| -------------------------------------- | --------------------------------------------------------------- |
| `.bx--pagination-nav--active`          | Applies active styles to page element                           |
| `.bx--pagination-nav--disabled`        | Applies disabled styles to page element when using anchor links |
| `.bx--pagination-nav__page--select`    | Applies select override styles to page element                  |
| `.bx--pagination-nav__page--direction` | Applies previous/next button styles to page element             |

### JavaScript

#### Options

| Option                 | Default Selector                     | Description                                               |
| ---------------------- | ------------------------------------ | --------------------------------------------------------- |
| `selectorInit`         | `[data-pagination-nav]`              | The selector to find the pagination nav.                  |
| `selectorPageElement`  | `[data-page]`                        | The data attribute to find page elements.                 |
| `selectorPageButton`   | `[data-page-button]`                 | The data attribute to find page ui elements.              |
| `selectorPagePrevious` | `[data-page-previous]`               | The selector to find the 'previous' ui element.           |
| `selectorPageNext`     | `[data-page-next]`                   | The selector to find the 'next' ui element.               |
| `selectorPageSelect`   | `[data-page-select]`                 | The selector to find the overflow select element.         |
| `selectorPageActive`   | `[data-page-active="true"]`          | The data attribute to find active page element.           |
| `attribPage`           | `data-page`                          | The data attribute key for accessing page number.         |
| `attribActive`         | `data-page-active`                   | The data attribute key for accessing active page element. |
| `classActive`          | `bx--pagination-nav__page--active`   | The CSS class for pages's selected state.                 |
| `classDisabled`        | `bx--pagination-nav__page--disabled` | The CSS class for pages's disabled state.                 |
