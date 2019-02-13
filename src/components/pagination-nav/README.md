### SCSS

#### Modifiers

Use these modifiers with `.bx--pagination-nav` class.

| Selector                            | Description                                                     |
| ----------------------------------- | --------------------------------------------------------------- |
| .bx--pagination-nav--active         | Applies active styles to page element                           |
| .bx--pagination-nav--disabled       | Applies disabled styles to page element when using anchor links |
| .bx--pagination-nav\_\_page--select | Applies select override styles to page element                  |

### JavaScript

#### Options

| Option                | Default Selector                     | Description                                         |
| --------------------- | ------------------------------------ | --------------------------------------------------- |
| selectorInit          | [data-pagination-nav]                | The selector to find the pagination nav.            |
| selectorPageElement   | [data-page]                          | The selector to find the page ui elements.          |
| selectorPageDirection | [data-page-direction]                | The selector to find the previous/next ui elements. |
| selectorPageSelect    | [data-page-select]                   | The selector to find the overflow select element.   |
| classActive           | bx--pagination-nav\_\_page--active   | The CSS class for pages's selected state.           |
| classDisabled         | bx--pagination-nav\_\_page--disabled | The CSS class for pages's disabled state.           |
