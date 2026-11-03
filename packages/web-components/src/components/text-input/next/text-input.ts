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
import CDSTextInput from '../text-input';

/**
 * A form-associated v3 preview of `cds-text-input`.
 *
 * Identical to `cds-text-input` in markup, styling and events. The only
 * difference is that it participates in its form natively through
 * `ElementInternals` instead of the deprecated `formdata` event, so
 * `<label for>`, `form.elements`, `form.reset()` and `<fieldset disabled>` all
 * work as they do for a native control.
 *
 * @element cds-preview-text-input
 */
@customElement(`${prefix}-preview-text-input`)
class CDSPreviewTextInput extends FormAssociatedMixin(CDSTextInput) {
  /**
   * Restores a value the browser preserved across a session restore.
   */
  formStateRestoreCallback(state: FormValue) {
    if (typeof state === 'string') {
      this.value = state;
    }
  }

  static get is() {
    return `${prefix}-preview-text-input`;
  }
}

export default CDSPreviewTextInput;
