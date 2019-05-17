### SCSS

#### Modifiers

| Name                              | Description                                                  |
| --------------------------------- | ------------------------------------------------------------ |
| `.bx--content-switcher--selected` | Applies the "selected" styles to the content-switcher button |

### Javascript

#### Getting component class reference

##### ES2015

```javascript
import { ContentSwitcher } from 'carbon-components';
```

##### With pre-build bundle (`carbon-components.min.js`)

```javascript
var ContentSwitcher = CarbonComponents.ContentSwitcher;
```

#### Instantiating

```javascript
// `#my-content-switcher` is an element with `[data-content-switcher]` attribute
ContentSwitcher.create(document.getElementById('my-content-switcher'));
```

#### Public Methods

| Name        | Params                                        | Description                                                                                                                                                                                   |
| ----------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setActive` | `item`: `HTMLElement`, `callback`: `Function` | Uses `data-target` attribute to show a content panel using the given CSS selector. Non-active targets will be hidden. You can also pass in an optional callback function, see FAQ for details |
| `release`   |                                               | Deletes the instance and removes document event listeners                                                                                                                                     |

##### Example - Changing the active item

```javascript
// `#my-content-switcher` is an element with `[data-content-switcher]` attribute
var contentSwitcherInstance = ContentSwitcher.create(
  document.getElementById('my-content-switcher')
);
// `#my-content-switcher-btn-1` is one of the `<button>`s with `bx--content-switcher-btn` class
contentSwitcherInstance.setActive(
  document.getElementById('my-content-switcher-btn-1')
);
```

#### Options

| Option                | Default Selector                                 | Description                                                        |
| --------------------- | ------------------------------------------------ | ------------------------------------------------------------------ |
| `selectorInit`        | `[data-content-switcher]`                        | The CSS selector to find content-switcher                          |
| `selectorButton`      | `input[type="radio"], .bx--content-switcher-btn` | The CSS selector to find the content-switcher buttons              |
| `classActive`         | `bx--content-switcher--selected`                 | The className for a selected button                                |
| `eventBeforeSelected` | `content-switcher-beingselected`                 | Custom event fired before a button is selected in content-switcher |
| `eventAfterSelected`  | `content-switcher-selected`                      | Custom event fired after a button is selected in content-switcher  |

#### Events

| Event Name                       | Description                                                        |
| -------------------------------- | ------------------------------------------------------------------ |
| `content-switcher-beingselected` | Custom event fired before a button is selected in content-switcher |
| `content-switcher-selected`      | Custom event fired after a button is selected in content-switcher  |

##### Example

Preventing a content switcher item from being selected in a certain condition

```javascript
document.addEventListener('content-switcher-beingselected', function(evt) {
  if (!myApplication.shouldContentSwitcherItemBeSelected(evt.target)) {
    evt.preventDefault();
  }
});
```

##### Example

Notifying events of all content switcher items being selected to an analytics
library

```javascript
document.addEventListener('content-switcher-selected', function(evt) {
  myAnalyticsLibrary.send({
    action: 'Content switcher item selected',
    id: evt.target.id,
  });
});
```

#### Classes

| Name                             | Description                         |
| -------------------------------- | ----------------------------------- |
| `bx--content-switcher--selected` | The className for a selected button |

### FAQ

#### Preset an active button and panel with HTML

While SCSS and JS are setup, you can configure Content Switcher and its
associated content through the HTML.

Each `bx--content-switcher-btn` has a `data-target` value with a selector for a
panel element. When one of these buttons is clicked, then it will show the panel
that the `data-target` is pointing to.

For example,

The first button has a `data-target` pointing to `.demo-panel--opt-1`. When
clicking the first button, the JavaScript will find the DOM element using the
given `data-target` selector and display it while hiding all other panels using
the `hidden` attribute.

Below is an HTML setup for Content Switcher that will do the following:

- Select the first button by default (as indicated by
  `bx--content-switcher--selected` class)
- Show the `<div class="demo--panel--opt-1">` element
- Hide the other elements

```html
<div data-content-switcher class="bx--content-switcher">
  <button
    class="bx--content-switcher-btn bx--content-switcher--selected"
    data-target=".demo--panel--opt-1"
  >
    Option 1
  </button>
  <button class="bx--content-switcher-btn" data-target=".demo--panel--opt-2">
    Option 2
  </button>
  <button class="bx--content-switcher-btn" data-target=".demo--panel--opt-3">
    Option 3
  </button>
</div>
<div class="demo--panel--opt-1">Show Option 1</div>
<div class="demo--panel--opt-2" hidden>Show Option 2</div>
<div class="demo--panel--opt-3" hidden>Show Option 3</div>
```

#### Preset an active button and panel with JavaScript

Use `setActive` class method to preset the selection on a Content Switcher;
doing this will avoid manually adding `bx--content-switcher--selected` modifier
class and `hidden` attributes on HTML.

```html
<div
  data-content-switcher
  id="my-content-switcher"
  class="bx--content-switcher"
>
  <button class="bx--content-switcher-btn" data-target=".demo--panel--opt-1">
    Option 1
  </button>
  <button class="bx--content-switcher-btn" data-target=".demo--panel--opt-2">
    Option 2
  </button>
  <button class="bx--content-switcher-btn" data-target=".demo--panel--opt-3">
    Option 3
  </button>
</div>
<div class="demo--panel--opt-1">Show Option 1</div>
<div class="demo--panel--opt-2">Show Option 2</div>
<div class="demo--panel--opt-3">Show Option 3</div>
```

```js
// Get HTMLelement for button to preselect it with setActive
const button = document.querySelector('[data-target=".demo--panel--opt-2"]');
// Initialize an instance of ContentSwitcher with init(), create(element) or new ContentSwitcher(element)
ContentSwitcher.init();
// Grab an ContentSwitcher instance
const instance = ContentSwitcher.components.get(
  document.getElementById('my-content-switcher')
);
// Use setActive
instance.setActive(button);
```

The `setActive` method also takes an optional `callback` function parameter. The
most typical example of using this is acting on a newly selected
content-switcher button.

```js
contentSwitcher.setActive(button, function(error, item) {
  if (!error) {
    // Having no error means that content switching is not canceled, so go on…
    item.ownerDocument
      .querySelector(item.dataset.target)
      .querySelector('input')
      .focus(); // `item` is the newly selected button
  }
});
```

#### Using buttons or anchor elements are both fine

Content Switcher can be implemented with either `<button>` or `<a>` elements for
its click targets. Both uses of HTML will render the same visual styles and
interactions.

```html
<div data-content-switcher class="bx--content-switcher">
  <a
    href="javascript:void(0)"
    class="bx--content-switcher-btn bx--content-switcher--selected"
    data-target=".demo--panel--opt-1"
    >Option 1</a
  >
  <a
    href="javascript:void(0)"
    class="bx--content-switcher-btn"
    data-target=".demo--panel--opt-2"
    >Option 2</a
  >
  <a
    href="javascript:void(0)"
    class="bx--content-switcher-btn"
    data-target=".demo--panel--opt-3"
    >Option 3</a
  >
</div>
<div data-content-switcher class="bx--content-switcher">
  <button
    class="bx--content-switcher-btn bx--content-switcher--selected"
    data-target=".demo--panel--opt-1"
  >
    Option 1
  </button>
  <button class="bx--content-switcher-btn" data-target=".demo--panel--opt-2">
    Option 2
  </button>
  <button class="bx--content-switcher-btn" data-target=".demo--panel--opt-3">
    Option 3
  </button>
</div>
```
