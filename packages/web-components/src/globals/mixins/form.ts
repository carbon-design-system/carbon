/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import on from './on';
import Handle from '../internal/handle';

/**
 * @param Base The base class.
 * @returns A mix-in to handle `formdata` event on the containing form.
 *
 * @deprecated `FormMixin` is deprecated and will be removed in v3. It is a
 *   stop-gap from a time when form-associated custom elements were not yet
 *   available in every browser we support, and it can only emulate one part of
 *   being a form control — contributing a value on submit. It cannot make an
 *   element labelable, put it in `form.elements`, respond to `form.reset()`, or
 *   honor an ancestor `<fieldset disabled>`.
 *
 *   v3 replaces it with native form association through `ElementInternals`
 *   (`FormAssociatedMixin`). You can try that today on the `cds-preview-*`
 *   form components, which behave identically apart from participating in
 *   forms natively. See the v3 migration guide:
 *   https://github.com/carbon-design-system/carbon/blob/main/docs/guides/cwc-v3-migration.md#form-participation-moves-to-elementinternals
 */
const FormMixin = <T extends Constructor<HTMLElement>>(
  Base: T
): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): {
    _hFormdata: Handle | null;
    _handleFormdata(event: Event): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
  };
} & T => {
  /**
   * A mix-in class to handle `formdata` event on the containing form.
   */
  abstract class FormMixinImpl extends Base {
    /**
     * The handle for `formdata` event listener on the containing form.
     *
     * @private
     */
    _hFormdata: Handle | null = null; // Not using TypeScript `private` due to: microsoft/TypeScript#17744

    /**
     * Handles `formdata` event.
     *
     * @param event The event.
     */
    abstract _handleFormdata(event: Event): void;

    connectedCallback() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      super.connectedCallback();
      const form = this.closest('form');
      if (form) {
        this._hFormdata = on(form, 'formdata', this._handleFormdata.bind(this));
      }
    }

    disconnectedCallback() {
      if (this._hFormdata) {
        this._hFormdata = this._hFormdata.release();
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      super.disconnectedCallback();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return FormMixinImpl as any;
};

export default FormMixin;
