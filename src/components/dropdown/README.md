### SCSS

#### Modifiers

Use these modifiers with `.bx--dropdown` class.

| Name                    | Description                                           |
|-------------------------|-------------------------------------------------------|
| .bx--dropdown--selected | Applies specific styles for a selected dropdown item. |
| .bx--dropdown--open     | Applies specific styles when the dropdown is opened   |

### JavaScript

#### Public Methods

| Name                 | Params                 | Description                                                                                                                                                                      |
|----------------------|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| release              |                        | Deletes the instance                                                                                                                                                             |
| getCurrentNavigation |                        | Returns the currently highlighted element                                                                                                                                        |
| navigate             | direction: `Number`    | Moves the focus up or down                                                                                                                                                       |
| select               | itemToSelect: `Object` | Handles clicking on the dropdown options, doing the following: Changing text to selected option, removing selected option from options when selected, and emitting custom events |
| setCloseOnBlur       |                        | Sets an event handler to document for "close on blue" behavior                                                                                                                   |

#### Options

| Option               | Default Selector        | Description                                                           |
|----------------------|-------------------------|-----------------------------------------------------------------------|
| selectorInit         | [data-dropdown]         | The selector to find the dropdown component                           |
| selectorItem         | .bx--dropdown-link      | The selector to find the clickable area in the selected dropdown item |
| selectorItemSelected | .bx--dropdown--selected | The selector to find the clickable area in the selected dropdown item |
| classSelected        | bx--dropdown--selected  | The class for the selected dropdown item.                             |

#### Events

| Event Name             | Description                                            |
|------------------------|--------------------------------------------------------|
| dropdown-beingselected | Custom event fired before a dropdown item is selected |
| dropdown-selected      | Custom event fired after a dropdown item is selected  |
