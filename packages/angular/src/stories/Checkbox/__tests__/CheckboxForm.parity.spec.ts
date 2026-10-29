/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parity port of the web component tests.
 *
 * Source : packages/web-components/src/components/checkbox/__tests__/checkbox-form-test.js
 * Guide  : packages/angular/docs/porting-web-component-tests.md
 *
 * Every test in this file depends on form association
 * (`static formAssociated` + `ElementInternals.setFormValue`, `.form`,
 * `.labels`, `.validity`, the form `reset` and disabled-fieldset callbacks).
 * jsdom does not implement form-associated custom elements: measured against
 * the wrapper, `new FormData(form)` is empty, `form.elements` does not contain
 * the control, `el.form` is `null` and `:disabled` never matches. `jest.setup.ts`
 * shims `ElementInternals` with no-ops so the components can render, which means
 * a ported test would pass or fail for the shim's reasons, not the component's.
 *
 * So each title is kept as an `it.todo`, and the behavior is covered in a real
 * browser in `Checkbox.e2e.ts` ("form association", story
 * `components-checkbox--form-association`).
 */

describe('cds-ng-checkbox form association', () => {
  it.todo('should submit its value when checked');
  it.todo('should default the submitted value to `on`');
  it.todo('should submit nothing when unchecked or disabled');
  it.todo('should submit exactly one entry, not one per mechanism');
  it.todo('should submit under a name set as a property');
  it.todo('should keep the submitted value in step synchronously');
  it.todo('should appear in form.elements');
  it.todo('should associate with a <label for>');
  it.todo('should restore the default checked state on form.reset()');
  it.todo('should not submit from inside a disabled fieldset');
  it.todo(
    'should distinguish its own disabled state from an ancestor fieldset'
  );
  it.todo('should report a valid state');
});
