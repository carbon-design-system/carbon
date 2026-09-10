/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../../globals/settings';
import { carbonElement as customElement } from '../../../globals/decorators/carbon-element';
import FormAssociatedMixin, {
  type FormValue,
} from '../../../globals/mixins/form-associated';
import CDSCheckbox from '../checkbox';

/**
 * A form-associated v3 preview of `cds-checkbox`.
 *
 * Identical to `cds-checkbox` in markup, styling and events. The only
 * difference is that it participates in its form natively through
 * `ElementInternals` instead of the deprecated `formdata` event, so
 * `<label for>`, `form.elements`, `form.reset()` and `<fieldset disabled>` all
 * work as they do for a native control.
 *
 * @element cds-preview-checkbox
 * @fires cds-checkbox-changed - The custom event fired after this checkbox changes its checked state
 * @csspart input The checkbox
 * @csspart label The label
 */
@customElement(`${prefix}-preview-checkbox`)
class CDSPreviewCheckbox extends FormAssociatedMixin(CDSCheckbox) {
  /**
   * A checkbox contributes its `value` only while checked, defaulting to `on`
   * the way a native checkbox does.
   */
  _getFormValue(): FormValue {
    if (this.disabled || !this.checked) {
      return null;
    }
    return this.value ?? 'on';
  }

  /**
   * The restorable state is the check, not the value — an unchecked
   * checkbox submits nothing, so the value alone cannot describe it.
   */
  _getFormState(): FormValue {
    return String(this.checked);
  }

  /**
   * Restores the default checked state, which the content attributes define.
   */
  formResetCallback() {
    this.checked = this.hasAttribute('checked');
    this.indeterminate = this.hasAttribute('indeterminate');
    this._syncFormValue();
  }

  /**
   * Restores checkedness the browser preserved across a session restore.
   */
  formStateRestoreCallback(state: FormValue) {
    this.checked = state === 'true';
  }

  static get is() {
    return `${prefix}-preview-checkbox`;
  }
}

export default CDSPreviewCheckbox;
