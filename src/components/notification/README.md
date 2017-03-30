### SCSS

#### Mixins

| Name                       | Params         | Description                             |
|----------------------------|----------------|-----------------------------------------|
| inline-notification--color | $color: String | Applies given $color to border and icon |
| notification--color        | $color: String | Applies given $color to left border     |


#### Modifiers

Use these modifiers with `.bx--inline-notification` class.

| Selector                         | Description                        |
|----------------------------------|------------------------------------|
| .bx--toast-notification--error   | Apply error color to border and icon   |
| .bx--toast-notification--success | Apply success color to border and icon |
| .bx--toast-notification--info    | Apply info color to border and icon    |
| .bx--toast-notification--warning | Apply warning color to border and icon |
| .bx--toast-notification--error   | Apply error color on left border   |
| .bx--toast-notification--success | Apply success color on left border |
| .bx--toast-notification--info    | Apply info color on left border    |
| .bx--toast-notification--warning | Apply warning color on left border |

### JavaScript

#### Public Methods

| Name    | Params | Description                                                                       |
|---------|--------|-----------------------------------------------------------------------------------|
| remove  |        | Removes the component, deletes the instance, and removes document event listeners |
| release |        | Delete the instance                                                               |


#### Options

| Option                        | Default Selector             | Description                                               |
|-------------------------------|------------------------------|-----------------------------------------------------------|
| selectorInit                  | `[data-notification]`        | The selector to find instances of the component           |
| selectorButton                | `[data-notification-btn]`    | The selector to find the close button in the component    |
| eventBeforeDeleteNotification | `notification-before-delete` | Event before deleting the notification                    |
| eventAfterDeleteNotification  | `notification-after-delete`  | Event after deleting the notification                     |
