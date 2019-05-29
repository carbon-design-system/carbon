### SCSS

#### Modifiers

Modifiers are used with various classes for Tabs.

| Name                            | Description                                                              |
| ------------------------------- | ------------------------------------------------------------------------ |
| `.bx--tabs__nav--hidden`        | Applies specific styles to hide the narrow tab menu options              |
| `.bx--tabs__nav-item--selected` | Applies specific styles to the currently selected tab item               |
| `.bx--tabs--light`              | Selector for applying light dropdown styles when tabs are in mobile view |

### JavaScript

#### Getting component class reference

##### ES2015

```javascript
import { Tab } from 'carbon-components';
```

##### With pre-build bundle (`carbon-components.min.js`)

```javascript
var Tab = CarbonComponents.Tab;
```

#### Instantiating

```javascript
// `#my-tabs` is an element with `[data-tabs]` attribute
Tabs.create(document.getElementById('my-tabs'));
```

#### Public Methods

| Name        | Params                                        | Description                                                                                                                                                                                                       |
| ----------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setActive` | `item`: `HTMLElement`, `callback`: `Function` | Uses `data-target` attribute to show a content panel using the given CSS selector. Non-active targets will be hidden. You can also pass in an optional callback function, see FAQ in Content Switcher for details |
| `release`   |                                               | Deletes the instance and removes document event listeners                                                                                                                                                         |

##### Example - Changing the active item

```javascript
// `#my-tabs` is an element with `[data-tabs]` attribute
var tabsInstance = Tabs.create(document.getElementById('my-tabs'));
// `#my-tab-item-1` is one of the `<li>`s with `bx--tabs__nav-item` class
tabsInstance.setActive(document.getElementById('my-tab-item-1'));
```

#### Options

| Option                   | Default Selector                                         | Description                                                                            |
| ------------------------ | -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `selectorInit`           | `[data-tabs]`                                            | The CSS selector to find tab containers                                                |
| `selectorMenu`           | `.bx--tabs__nav`                                         | The CSS selector to find the drop down menu used in narrow mode                        |
| `selectorTrigger`        | `.bx--tabs-trigger`                                      | The CSS selector to find the button to open the drop down menu used in narrow mode     |
| `selectorTriggerText`    | `.bx--tabs-trigger-text`                                 | The CSS selector to find the element used in narrow mode showing the selected tab item |
| `selectorButton`         | `.bx--tabs__nav-item`                                    | The CSS selector to find tab containers                                                |
| `selectorButtonEnabled`  | `.bx--tabs__nav-item:not(.bx--tabs__nav-item--disabled)` | The CSS selector to find tab containers that are not disabled                          |
| `selectorButtonSelected` | `.bx--tabs__nav-item--selected`                          | The CSS selector to find the selected tab                                              |
| `selectorLink`           | `.bx--tabs__nav-link`                                    | The CSS selector to find the links in tabs                                             |
| `classActive`            | `bx--tabs__nav-item--selected`                           | The CSS class for tab's selected state                                                 |
| `classHidden`            | `bx--tabs__nav--hidden`                                  | The CSS class for the drop down menu's hidden state used in narrow mode                |
| `classOpen`              | `bx--tabs-trigger--open`                                 | The CSS class for the drop down menu motion on open and close                          |
| `eventBeforeSelected`    | `tab-beingselected`                                      | The name of the custom event fired before a tab is selected                            |
| `eventAfterSelected`     | `tab-selected`                                           | The name of the custom event fired after a tab is selected                             |

#### Events

| Event Name          | Description                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| `tab-beingselected` | The name of the custom event fired before a tab is selected. Cancellation of this event stops selection of tab. |
| `tab-selected`      | The name of the custom event fired after a tab is selected                                                      |

##### Example - Preventing a tab from being selected in a certain condition

```javascript
document.addEventListener('tab-beingselected', function(evt) {
  if (!myApplication.shouldTabItemBeSelected(evt.target)) {
    evt.preventDefault();
  }
});
```

##### Example - Notifying events of all tab items being selected to an analytics library

```javascript
document.addEventListener('tab-selected', function(evt) {
  myAnalyticsLibrary.send({
    action: 'Tab selected',
    id: evt.target.id,
  });
});
```
