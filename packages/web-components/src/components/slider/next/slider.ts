/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../../globals/settings';
import { carbonElement as customElement } from '../../../globals/decorators/carbon-element';
import FormAssociatedMixin from '../../../globals/mixins/form-associated';
import CDSSlider from '../slider';

/**
 * A form-associated v3 preview of `cds-slider`.
 *
 * Identical to `cds-slider` in markup, styling and events. The only
 * difference is that it participates in its form natively through
 * `ElementInternals` instead of the deprecated `formdata` event, so
 * `<label for>`, `form.elements`, `form.reset()` and `<fieldset disabled>` all
 * work as they do for a native control.
 *
 * Unlike the v2 component, a slider with no `value` submits no entry
 * rather than the string `"undefined"`.
 *
 * @element cds-preview-slider
 */
@customElement(`${prefix}-preview-slider`)
class CDSPreviewSlider extends FormAssociatedMixin(CDSSlider) {
  /**
   * Restores the default value, coercing it to a number as the property expects.
   */
  formResetCallback() {
    const fallback = this.getAttribute('value');
    this.value = fallback === null ? 0 : Number(fallback);
    this._syncFormValue();
  }

  static get is() {
    return `${prefix}-preview-slider`;
  }
}

export default CDSPreviewSlider;
