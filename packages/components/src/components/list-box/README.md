# `list-box`

> A generic UI component used to build selection menus like Dropdowns,
> Comboboxes, and more.

### SCSS

#### Classes

| Name                                    | Description                                                                                                                                                         |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.bx--list-box`                         | The containing element for a `list-box`                                                                                                                             |
| `.bx--list-box--inline`                 | The `inline` variant of a `list-box`                                                                                                                                |
| `.bx--list-box--disabled`               | The `disabled` state of a `list-box` control                                                                                                                        |
| `.bx--list-box__field`                  | A descendant of a `list-box` responsible for showing label information, selections, and current input                                                               |
| `.bx--list-box__label`                  | A descendant of a `list-box` field responsible for displaying the label of the control                                                                              |
| `.bx--list-box__menu-icon`              | A descendant of a `list-box` field responsible for displaying the open status of the menu of options for the control                                                |
| `.bx--list-box__menu-icon--open`        | A modifier of `.bx--list-box__menu-icon` that updates the orientation of the icon for when the menu of options for the control is visible                           |
| `.bx--list-box__selection`              | A descendant of a `list-box` field responsbile for showing a selection has been made, in addition to providing a way to clear the current selection for the control |
| `.bx--list-box__selection--multi`       | A modifier of `.bx--list-box__selection` when the control is able to have multiple selections                                                                       |
| `.bx--list-box__menu`                   | A descendant of a `list-box` that provides a list of options that the user can select for the control                                                               |
| `.bx--list-box__menu-item`              | A descendant of a `list-box__menu` that is a selectable option                                                                                                      |
| `.bx--list-box__menu-item--highlighted` | A modifier for `list-box__menu-item` that indicates the item is being interacted with by a user                                                                     |
