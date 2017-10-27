### SCSS

#### Modifiers

| Name                            | Description                                                  |
|---------------------------------|--------------------------------------------------------------|
| .bx--content-switcher--selected | Applies the "selected" styles to the content-switcher button |


### Javascript

#### Public Methods

| Name      | Params                        | Description                                                                                                           |
|-----------|-------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| setActive | item: `HTMLElement`, callback: `Function` | Uses `data-target` attribute to show a content panel using the given CSS selector. Non-active targets will be hidden. You can also pass in an optional callback function, see FAQ for details |
| release   |                               | Deletes the instance and removes document event listeners                                                             |

#### Options

| Option              | Default Selector                               | Description                                                        |
|---------------------|------------------------------------------------|--------------------------------------------------------------------|
| selectorInit        | [data-content-switcher]                        | The CSS selector to find content-switcher                          |
| selectorButton      | input[type="radio"], .bx--content-switcher-btn | The CSS selector to find the content-switcher buttons              |
| classActive         | bx--content-switcher--selected                 | The className for a selected button                                |
| eventBeforeSelected | content-switcher-beingselected                 | Custom event fired before a button is selected in content-switcher |
| eventAfterSelected  | content-switcher-selected                      | Custom event fired after a button is selected in content-switcher  |


#### Events

| Event Name                     | Description                                                        |
|--------------------------------|--------------------------------------------------------------------|
| content-switcher-beingselected | Custom event fired before a button is selected in content-switcher |
| content-switcher-selected      | Custom event fired after a button is selected in content-switcher  |

#### Classes

| Name                           | Description                         |
|--------------------------------|-------------------------------------|
| bx--content-switcher--selected | The className for a selected button |


### FAQ

#### Preset an active button and panel with HTML

While SCSS and JS are setup, you can configure Content Switcher and its associated content through the HTML.

Each `bx--content-switcher-btn` has a `data-target` value with a selector for a panel element.
When one of these buttons is clicked, then it will show the panel that the `data-target` is pointing to.

For example, 

The first button has a `data-target` pointing to `.demo-panel--opt-1`. 
When clicking the first button, the JavaScript will find the DOM element using the given `data-target` selector and display it while hiding all other panels using the `hidden` attribute.

Below is an HTML setup for Content Switcher that will do the following: 

- Select the first button by default (as indicated by `bx--content-switcher--selected` class)
- Show the `<div class="demo--panel--opt-1">` element
- Hide the other elements

```html
<div data-content-switcher class="bx--content-switcher">
  <button class="bx--content-switcher-btn bx--content-switcher--selected" data-target=".demo--panel--opt-1">Option 1</button>
  <button class="bx--content-switcher-btn" data-target=".demo--panel--opt-2">Option 2</button>
  <button class="bx--content-switcher-btn" data-target=".demo--panel--opt-3">Option 3</button>
</div>
<div class="demo--panel--opt-1">
  Show Option 1
</div>
<div class="demo--panel--opt-2" hidden>
  Show Option 2
</div>
<div class="demo--panel--opt-3" hidden>
  Show Option 3
</div>
```

#### Preset an active button and panel with JavaScript

Use `setActive` class method to preset the selection on a Content Switcher; doing this will avoid manually adding `bx--content-switcher--selected` modifier class and `hidden` attributes on HTML.

```html
<div data-content-switcher class="bx--content-switcher">
  <button class="bx--content-switcher-btn" data-target=".demo--panel--opt-1">Option 1</button>
  <button class="bx--content-switcher-btn" data-target=".demo--panel--opt-2">Option 2</button>
  <button class="bx--content-switcher-btn" data-target=".demo--panel--opt-3">Option 3</button>
</div>
<div class="demo--panel--opt-1">
  Show Option 1
</div>
<div class="demo--panel--opt-2">
  Show Option 2
</div>
<div class="demo--panel--opt-3">
  Show Option 3
</div>
```

```js
// Get HTMLelement for button to preselect it with setActive
const button = document.querySelector('[data-target=".demo--panel--opt-2"]');
// Initialize an instance of ContentSwitcher with init(), create() or new ContentSwitcher(element)
const instance = ContentSwitcher.init();
// Use setActive
instance.setActive(button);
```

The `setActive` method also takes an optional `callback` function parameter. The most typical example of using this is acting on a newly selected content-switcher button. 
 ```js
 contentSwitcher.setActive(button, function (error, item) {
  if (!error) {
    // Having no error means that content switching is not canceled, so go on…
    item.ownerDocument.querySelector(item.dataset.target).querySelector('input').focus(); // `item` is the newly selected button
  }
});
```

#### Using buttons or anchor elements are both fine

Content Switcher can be implemented with either `<button>` or `<a>` elements for its click targets.
Both uses of HTML will render the same visual styles and interactions.

```html
<div data-content-switcher class="bx--content-switcher">
  <a href="javascript:void(0)" class="bx--content-switcher-btn bx--content-switcher--selected" data-target=".demo--panel--opt-1">Option 1</a>
  <a href="javascript:void(0)" class="bx--content-switcher-btn" data-target=".demo--panel--opt-2">Option 2</a>
  <a href="javascript:void(0)" class="bx--content-switcher-btn" data-target=".demo--panel--opt-3">Option 3</a>
</div>
<div data-content-switcher class="bx--content-switcher">
  <button class="bx--content-switcher-btn bx--content-switcher--selected" data-target=".demo--panel--opt-1">Option 1</button>
  <button class="bx--content-switcher-btn" data-target=".demo--panel--opt-2">Option 2</button>
  <button class="bx--content-switcher-btn" data-target=".demo--panel--opt-3">Option 3</button>
</div>
```
