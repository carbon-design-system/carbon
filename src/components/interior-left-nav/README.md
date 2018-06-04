### SCSS

#### Modifiers

Use these modifiers with `.bx--interior-left-nav` class.

| Selector                           | Description                        |
|------------------------------------|------------------------------------|
| .left-nav-list--nested             | Applied to nested nav lists        |
| .left-nav-list__item--expanded     | Applied to expanded nav list items |
| .left-nav-list__item--active       | Applied to active nav list items   |
| .bx--interior-left-nav__header--link | Applied to links in nav header     |


### JavaScript

#### Public Methods

| Name                  | Params                 | Description                                                                                                                           |
|-----------------------|------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| addActiveListItem     | item: `HTMLElement`    | add active list item                                                                                                                  |
| handleNestedListClick | listItem, evt: `Event` | Handles click on a list item that contains a nested list in the left navigation. The nested list is expanded and the icon is rotated. |
| release               |                        | Deletes the instance                                                                                                                  |

#### Options

| Option                             | Default Selector                     | Description                                   |
|------------------------------------|--------------------------------------|-----------------------------------------------|
| selectorInit                       | [data-interior-left-nav]               | Selector to find interior left nav              |
| selectorLeftNavList                | [data-interior-left-nav-list]          | Selector to find nav list                     |
| selectorLeftNavNestedList          | [data-interior-left-nav-nested-list]   | Selector to find nested nav list              |
| selectorLeftNavListItemLink        | [data-interior-left-nav-item-link]     | Selector to find nav list item link           |
| selectorLeftNavNestedListItem      | [data-interior-left-nav-nested-item]   | Selector to find nested nav list item         |
| selectorLeftNavListItemHasChildren | [data-interior-left-nav-with-children] | Selector to find nav list items with children |
| classActiveLeftNavListItem         | left-nav-list__item--active          | Class for active nav list item                |
| classExpandedLeftNavListItem       | left-nav-list__item--expanded        | Class for expanded nav list items             |

#### Classes

| Name                         | Description                       |
|------------------------------|-----------------------------------|
| classActiveLeftNavListItem   | Class for active nav list item    |
| classExpandedLeftNavListItem | Class for expanded nav list items |
