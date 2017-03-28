### CSS Modifiers

Use these classes inside `.bx--card-footer`.

| Selector                                  | Description                  |
|-------------------------------------------|------------------------------|
| .bx--card-footer__app-status--running     | Class for running status     |
| .bx--card-footer__app-status--not-running | Class for not running status |
| .bx--card-footer__app-status--stopped     | Class for stopped status     |
| .bx--card-footer__app-status--limited     | Class for limited status     |

Use the class of `active` to display the status classes above.

### JavaScript

#### Public Methods

| Name    | Params | Description          |
|---------|--------|----------------------|
| release |        | Deletes the instance |

#### Options

| Option        | Default Selector  | Description                                   |
|---------------|-------------------|-----------------------------------------------|
| selectorInit  | [data-card-list]  | The data attribute to find the accordion      |
| selectorCard  | .bx--card         | The css class to find the card item component |
