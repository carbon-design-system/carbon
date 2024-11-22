# Using components in a form

Though form elements in `@carbon/web-components` (e.g. `<cds-text-input>`) are
not native form elements like `<input>`, they have some extra APIs that align
well with web/framework standards.

## `formdata` event

Browsers supporting
[`formdata` event](https://www.chromestatus.com/feature/5662230242656256) fire
that event when the user clicks on `<button type="submit">` in `<form>`. Our
form components listen to that event to add their values to the `<form>`.

To support other browsers, you can use a regular `<button>` and manually fire a
custom event with the same name (`formdata`), like below:

```javascript
const form = document.querySelector('form');
const button = form.querySelector('button');
button.addEventListener('click', () => {
  const formData = new FormData(form);
  const event = new CustomEvent('formdata', {
    bubbles: true,
    cancelable: false,
    composed: false,
  });
  event.formData = formData;
  form.dispatchEvent(event);
  // `formData` is populated with the data in components such as `<cds-text-input>` or `<cds-dropdown>`, etc. in the `<form>`.
  // You can use `formData` with `fetch()`/XHR instead of letting `<form>` submit the data
});
```
