### SCSS

#### Modifiers

Modifiers are used with various classes for Tabs.

| Name                            | Description                                                   | 
|---------------------------------|---------------------------------------------------------------|
| .bx--tabs__nav--hidden          | Applies specific styles to hide the narrow tab menu options   |
| .bx--tabs__nav-item--selected   | Applies specific styles to the currently selected tab item    |

### JavaScript

#### Options

| Option                 | Default Selector              | Description                                                                            |
|------------------------|-------------------------------|----------------------------------------------------------------------------------------|
| selectorInit           | [data-tabs]                   | The CSS selector to find tab containers                                                |
| selectorMenu           | .bx--tabs__nav                | The CSS selector to find the drop down menu used in narrow mode                        |
| selectorTrigger        | .bx--tabs-trigger             | The CSS selector to find the button to open the drop down menu used in narrow mode     |
| selectorTriggerText    | .bx--tabs-trigger-text        | The CSS selector to find the element used in narrow mode showing the selected tab item |
| selectorButton         | .bx--tabs__nav-item           | The CSS selector to find tab containers                                                |
| selectorButtonSelected | .bx--tabs__nav-item--selected | The CSS selector to find the selected tab                                              |
| selectorLink           | .bx--tabs__nav-link           | The CSS selector to find the links in tabs                                             |
| classActive            | bx--tabs__nav-item--selected  | The CSS class for tab's selected state                                                 |
| classHidden            | bx--tabs__nav--hidden         | The CSS class for the drop down menu's hidden state used in narrow mode                |
| eventBeforeSelected    | tab-beingselected             | The name of the custom event fired before a tab is selected                            |
| eventAfterSelected     | tab-selected                  | The name of the custom event fired after a tab is selected                             |

#### Events

| Event Name          | Description                                                                                                     |
|---------------------|-----------------------------------------------------------------------------------------------------------------|
| tab-beingselected   | The name of the custom event fired before a tab is selected. Cancellation of this event stops selection of tab. |
| tab-selected        | The name of the custom event fired after a tab is selected                                                      |
