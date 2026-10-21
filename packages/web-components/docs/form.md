# Using components in a form

In v2, Carbon form components add their values to a form when it emits the
`formdata` event. This behavior is deprecated and will be removed in v3.

Native form association through `ElementInternals` is available as a preview.
See the
[v3 migration guide](../../../docs/guides/cwc-v3-migration.md#form-participation-moves-to-elementinternals)
for details.

## The `formdata` event

Browsers fire the
[`formdata` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/formdata_event)
when the user submits a `<form>`. Carbon form components listen for the event
and add their values to the form.

You can also fire the event yourself to collect the values without submitting
the form:

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
  // `formData` contains the values from components such as `<cds-text-input>`
  // and `<cds-dropdown>` in the form. You can pass it to `fetch()` or XHR.
});
```
