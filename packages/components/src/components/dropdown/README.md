### SCSS

#### Modifiers

Use these modifiers with `.bx--dropdown` class.

| Name                        | Description                                                                                                                      |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `.bx--dropdown--auto-width` | Allows the width of the dropdown to be equal to the width of the content inside it instead of being 100% width of the container. |
| `.bx--dropdown--selected`   | Applies specific styles for a selected dropdown item.                                                                            |
| `.bx--dropdown--open`       | Applies specific styles when the dropdown is opened                                                                              |
| `.bx--dropdown--up`         | Applies style to have the dropdown slide up instead of down                                                                      |

### JavaScript

#### Getting component class reference

##### ES2015

```javascript
import { Dropdown } from 'carbon-components';
```

##### With pre-build bundle (`carbon-components.min.js`)

```javascript
var Dropdown = CarbonComponents.Dropdown;
```

#### Instantiating

```javascript
// `#my-dropdown` is an element with `[data-dropdown]` attribute
Dropdown.create(document.getElementById('my-dropdown'));
```

#### Public Methods

| Name                   | Params                 | Description                                                                                                                                                                      |
| ---------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `release`              |                        | Deletes the instance                                                                                                                                                             |
| `getCurrentNavigation` |                        | Returns the currently highlighted element                                                                                                                                        |
| `navigate`             | direction: `Number`    | Moves the focus up or down                                                                                                                                                       |
| `select`               | itemToSelect: `Object` | Handles clicking on the dropdown options, doing the following: Changing text to selected option, removing selected option from options when selected, and emitting custom events |
| `setCloseOnBlur`       |                        | Sets an event handler to document for "close on blue" behavior                                                                                                                   |

##### Example - Changing the active item

```javascript
// `#my-dropdown` is an element with `[data-dropdown]` attribute
var dropdownInstance = Dropdown.create(document.getElementById('my-dropdown'));
// `#my-dropdown-link-1` is one of the `<a>`s with `bx--dropdown-link` class
dropdownInstance.select(document.getElementById('my-dropdown-link-1'));
```

#### Options

| Option                 | Default Selector                | Description                                                                                      |
| ---------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------ |
| `selectorInit`         | `[data-dropdown]`               | The selector to find the dropdown component                                                      |
| `selectorItem`         | `.bx--dropdown-link`            | The selector to find the clickable area in the selected dropdown item                            |
| `selectorItemSelected` | `.bx--dropdown--selected`       | The selector to find the clickable area in the selected dropdown item                            |
| `selectorItemHidden`   | `[hidden],[aria-hidden="true"]` | The selector to find hidden dropdown items. Used to skip dropdown items for keyboard navigation. |
| `classSelected`        | `bx--dropdown--selected`        | The class for the selected dropdown item.                                                        |

#### Events

| Event Name               | Description                                           |
| ------------------------ | ----------------------------------------------------- |
| `dropdown-beingselected` | Custom event fired before a dropdown item is selected |
| `dropdown-selected`      | Custom event fired after a dropdown item is selected  |

##### Example - Preventing a dropdown item from being selected in a certain condition

```javascript
document.addEventListener('dropdown-beingselected', function(evt) {
  if (!myApplication.shouldDropdownItemBeSelected(evt.target)) {
    evt.preventDefault();
  }
});
```

##### Example - Notifying events of all dropdown items being selected to an analytics library

```javascript
document.addEventListener('dropdown-selected', function(evt) {
  myAnalyticsLibrary.send({
    action: 'Dropdown item selected',
    id: evt.target.id,
  });
});
```
