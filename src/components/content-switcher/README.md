### CSS Modifiers

| Name                          | Description                                                 |
|-------------------------------|-------------------------------------------------------------|
| `.bx--content-switcher--selected`        | Applies the "selected" styles to the content-switcher button |


### Javascript

[For details on initializing and getting components, look here]

#### Public Methods

| Name                | Params          | Description                                                               |
|---------------------|-----------------|---------------------------------------------------------------------------|
| `setActive`   |item: `HTMLElement`, callback|Uses `data-target` attribute to show a content panel using the given CSS selector. Non-active targets will be hidden. |

#### Options

| Option                   | Default Selector        | Description |
|--------------------------|-------------------------|-------------|
| `selectorInit`  | `[data-content-switcher]` | The CSS selector to find content-switcher|
| `selectorButton`  | `input[type="radio"], .bx--content-switcher-btn` | The CSS selector to find the content-switcher buttons |
| `classActive`        | `bx--content-switcher--selected`             | The className for a selected button     |
| `eventBeforeSelected`    | `content-switcher-beingselected`        | Custom event fired before a button is selected in content-switcher |
| `eventAfterSelected`    | `content-switcher-selected`        | Custom event fired after a button is selected in content-switcher |


#### Events

| Event Name             | Description                                            |
|------------------------|--------------------------------------------------------|
`content-switcher-beingselected`        | Custom event fired before a button is selected in content-switcher |
`content-switcher-selected`        | Custom event fired after a button is selected in content-switcher |


### HTML

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
