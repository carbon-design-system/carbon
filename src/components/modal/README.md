### JavaScript

#### Public Methods

| Name              | Params           | Description          |
|-------------------|------------------|----------------------|
| release           |                  | Deletes the instance |
| show              |                  | Show the modal       |
| hide              |                  | Hide the modal       |

#### Options

| Option             | Default Selector     | Description                                                                                                                           |
|--------------------|----------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| selectorInit       | '[data-modal]'       | The css selector for root modal component                                                                                             |
| selectorModalClose | '[data-modal-close]' | The selector to find elements that close the modal                                                                                    |
| classVisible       | 'is-visible'         | Class to toggle visibility of modal                                                                                                   |
| attribInitTarget   | 'data-modal-target'  | The attribute on the launching element to target the modal                                                                            |
| initEventNames     | '['click']'          | On specified events, if event matches the attribInitTarget, then initialize the component and run createdByLauncher if method exists  |

#### Events

| Event Option      | Event Name          |
|-------------------|---------------------|
| eventBeforeShown  | 'modal-beingshown'  |
| eventAfterShown   | 'modal-shown'       |
| eventBeforeHidden | 'modal-beinghidden' |
| eventAfterHidden  | 'modal-hidden'      |

### FAQ

#### How do I point multiple elements to the same modal?

To trigger the same modal, you need to add the `data-modal-target` attribute to a element, and then point it to the same id. For example

```html
<button class="bx--btn bx-btn--primary" type="button" data-modal-target="#modal">A button</button>
<button class="bx--btn bx-btn--secondary" type="button" data-modal-target="#modal">Another button</button>
```

Both these buttons would trigger the modal with the id of `modal.`
