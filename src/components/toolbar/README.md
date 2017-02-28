### Javascript

[For details on initializing and getting components, look here]

#### Public Methods

| Name    | Params | Description                                               |
|---------|--------|-----------------------------------------------------------|
| release |        | Deletes the instance and removes document event listeners |


#### Options


| Option       | Default Selector     | Description                            |
|--------------|----------------------|----------------------------------------|
| selectorInit | [data-toolbar]       | The selector to find instances of the component |
| selectorSearch | [data-toolbar-search] | The selector to find the search field in the toolbar |
| selectorRowHeight | [data-row-height] | The selector to find the buttons to change the row height of table rows |
| classTallRows | bx--responsive-table--tall | The modifier class for tall table rows |
| classSearchActive | bx--toolbar-search--active | The class for the active state of the toolbar search input |

### FAQ

To bind a toolbar to a specific table add the table component's unique id to the `data-table-target` attribute of the toolbar.

```
<div class="bx--toolbar" data-table-target="unique-id"></div>
<table id="unique-id"></table>
```
