# Having components participate in form

Though form elements in `carbon-web-components` (e.g. `<bx-input>`) are not native form elements like `<input>`, form elements in `carbon-web-components` have some extra APIs that align well to web/framework standards that allow those form elements to participate in form.

## `formdata` event

Browsers supporting [`formdata` event](https://www.chromestatus.com/feature/5662230242656256) fire that event when the user clicks on `<button type="submit">` in `<form>`. Our form components listen to that event to add their values to the `<form>`.

To support other browsers, you can use a regular `<button>` and manually fire a custom event with the same name (`formdata`), like below:

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
  // Now `formData` is populated with the data in `<bx-input>`, etc. in the `<form>`.
  // You can use `formData` with `fetch()`/XHR instead of letting `<form>` submit the data
});
```

[![Edit carbon-web-components with formdata event](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/carbon-design-system/carbon-web-components/tree/main/examples/codesandbox/form/basic)

## Angular two-way binding

Our form components can be used for Angular two-way binding syntax (`[(ngModel)]`), like below, by using Angular directives for them:

```html
<bx-input [(ngModel)]="model.username" #username="ngModel" type="text" name="username"></bx-input>
```

Such Angular directives can be used by importing `BXFormAccessorModule` from `carbon-web-components/es/directives-angular/esm2015` or `carbon-web-components/es/directives-angular/esm5` into your Angular module:

```javascript
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BXFormAccessorsModule } from 'carbon-web-components/es/directives-angular/esm2015';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, BXFormAccessorsModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

[![Edit carbon-web-components with Angular form directives](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/carbon-design-system/carbon-web-components/tree/main/examples/codesandbox/form/angular)

## Redux Form

You can use our form components with Redux Form by creating a React component that wraps our form components:

```javascript
import { Field } from 'redux-form';
import BXFormItem from 'carbon-web-components/es/components-react/form/form-item';
import BXInput from 'carbon-web-components/es/components-react/input/input';

...

// A React component that wraps form components from `carbon-web-components`
const FieldImpl = ({ input, label, type, meta: { touched, error } }) => {
  const validityMessage = !touched ? undefined : error;
  return (
    <BXFormItem>
      <BXInput
        {...input}
        invalid={Boolean(validityMessage)}
        label-text={label}
        type={type}
        placeholder={label}
        validityMessage={validityMessage}
      />
    </BXFormItem>
  );
};

...

<Field name="username" type="text" component={FieldImpl} label="Username" />
```

[![Edit carbon-web-components with Redux Form](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/carbon-design-system/carbon-web-components/tree/main/examples/codesandbox/form/redux-form)
