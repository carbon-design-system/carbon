### SCSS

#### Modifiers

Use these modifiers with `.bx--pagination__button` class.

| Selector                            | Description                        |
| ----------------------------------- | ---------------------------------- |
| `.bx--pagination__button--backward` | Applies styles for backward button |
| `.bx--pagination__button--forward`  | Applies styles for forward button  |
| `.bx--pagination__button--no-index` | Applies styles for disabled button |

### JavaScript

#### Options

| Option                      | Default Selector           | Description                                                                  |
| --------------------------- | -------------------------- | ---------------------------------------------------------------------------- |
| `selectorInit`              | `[data-pagination]`        | The selector to find the pagination                                          |
| `selectorItemsPerPageInput` | `[data-items-per-page]`    | The selector to find the input that determines the number of items per page. |
| `selectorPageNumberInput`   | `[data-page-number-input]` | The selector to find the input that changes the page displayed.              |
| `selectorPageBackward`      | `[data-page-backward]`     | The selector to find the button that goes back a page.                       |
| `selectorPageForward`       | `[data-page-forward]`      | The selector to find the button that goes forward a page.                    |

#### Events

| Name                | Default Value  | Description                                                                                                                                        |
| ------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eventItemsPerPage` | `itemsPerPage` | Custom event fired when a user changes the number of items per page. event.detail.value contains the number of items a user wishes to see.         |
| `eventPageNumber`   | `pageNumber`   | The name of the custom event fired when a user inputs a specific page number. event.detail.value contains the value that the user input.           |
| `eventPageChange`   | `pageChange`   | The name of the custom event fired when a user goes forward or backward a page. event.detail.direction contains the direction a user wishes to go. |
