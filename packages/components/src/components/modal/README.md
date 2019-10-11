### SCSS

#### Modifiers

Use these modifiers with `.bx--modal` class.

| Name                 | Description                               |
| -------------------- | ----------------------------------------- |
| `.bx--modal--danger` | Selector for applying danger modal styles |

### JavaScript

#### Getting component class reference

##### ES2015

```javascript
import { Modal } from 'carbon-components';
```

##### With pre-build bundle (`carbon-components.min.js`)

```javascript
var Modal = CarbonComponents.Modal;
```

#### Instantiating

##### For one with a trigger button (a `<button>` with `data-modal-target` attribute)

```javascript
Modal.init();
```

##### For one without a trigger button

```javascript
// `#my-modal` is an element with `[data-modal]` attribute
Modal.create(document.getElementById('my-modal'));
```

#### Public methods

| Name      | Params | Description          |
| --------- | ------ | -------------------- |
| `release` |        | Deletes the instance |
| `show`    |        | Show the modal       |
| `hide`    |        | Hide the modal       |

##### Example - Showing modal

```javascript
// `#my-modal` is an element with `[data-modal]` attribute
var modalInstance = Modal.create(document.getElementById('my-modal'));
modalInstance.show();
```

#### Options

| Option                 | Default selector             | Description                                                                                                                          |
| ---------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `selectorInit`         | '[data-modal]'               | The css selector for root modal component                                                                                            |
| `selectorModalClose`   | '[data-modal-close]'         | The selector to find elements that close the modal                                                                                   |
| `selectorPrimaryFocus` | '[data-modal-primary-focus]' | The CSS selector to determine the element to put focus when modal gets open                                                          |
| `classVisible`         | 'is-visible'                 | Class to toggle visibility of modal                                                                                                  |
| `classBody`            | 'bx--body--with-modal-open'  | Class on `<body>` that toggles when a modal opens/closes                                                                             |
| `attribInitTarget`     | 'data-modal-target'          | The attribute on the launching element to target the modal                                                                           |
| `initEventNames`       | '['click']'                  | On specified events, if event matches the attribInitTarget, then initialize the component and run createdByLauncher if method exists |

##### Example - Putting focus on text box when modal gets open

```html
<div
  data-modal
  id="my-modal"
  class="bx--modal "
  role="dialog"
  aria-modal="true"
  aria-labelledby="my-modal-label"
  aria-describedby="my-modal-heading"
  tabindex="-1"
>
  <div class="bx--modal-container">
    <div class="bx--modal-header">
      <p class="bx--modal-header__heading bx--type-beta" id="my-modal-heading">
        Modal heading
      </p>
      <button
        class="bx--modal-close"
        type="button"
        data-modal-close
        aria-label="close modal"
      >
        (The close button image)
      </button>
    </div>
    <div class="bx--modal-content">
      <label for="my-text-input" class="bx--label">Text Input label</label>
      <input
        id="my-text-input"
        type="text"
        class="bx--text-input"
        placeholder="Optional placeholder text"
        data-modal-primary-focus
      />
    </div>
  </div>
</div>
```

#### Events

| Event option        | Event name          |
| ------------------- | ------------------- |
| `eventBeforeShown`  | 'modal-beingshown'  |
| `eventAfterShown`   | 'modal-shown'       |
| `eventBeforeHidden` | 'modal-beinghidden' |
| `eventAfterHidden`  | 'modal-hidden'      |

##### Example - Preventing modals from being closed in a certain condition

```javascript
document.addEventListener('modal-beinghidden', function(evt) {
  if (myApplication.shouldModalKeptOpen(evt.target)) {
    evt.preventDefault();
  }
});
```

##### Example - Notifying events of all modals being closed to an analytics library

```javascript
document.addEventListener('modal-hidden', function(evt) {
  myAnalyticsLibrary.send({
    action: 'Modal hidden',
    id: evt.target.id,
  });
});
```

### FAQ

#### How do I point multiple elements to the same modal?

To trigger the same modal, you need to add the `data-modal-target` attribute to
a element, and then point it to the same id. For example

```html
<button
  class="bx--btn bx-btn--primary"
  type="button"
  data-modal-target="#modal"
>
  A button
</button>
<button
  class="bx--btn bx-btn--secondary"
  type="button"
  data-modal-target="#modal"
>
  Another button
</button>
```

Both these buttons would trigger the modal with the id of `modal.`
