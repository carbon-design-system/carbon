/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../../globals/settings';
import { carbonElement as customElement } from '../../../globals/decorators/carbon-element';
import FormAssociatedMixin from '../../../globals/mixins/form-associated';
import CDSTimePicker from '../time-picker';

/**
 * A form-associated preview of `cds-time-picker`.
 *
 * Identical to `cds-time-picker` in markup, styling and events. The only
 * difference is that it participates in its form natively through
 * `ElementInternals` instead of the deprecated `formdata` event, so
 * `<label for>`, `form.elements`, `form.reset()` and `<fieldset disabled>` all
 * work as they do for a native control.
 *
 * A `cds-time-picker-select` inside it is a separate form control that
 * submits its own entry, as in v2.
 *
 * @element cds-preview-time-picker
 */
@customElement(`${prefix}-preview-time-picker`)
class CDSPreviewTimePicker extends FormAssociatedMixin(CDSTimePicker) {
  static get is() {
    return `${prefix}-preview-time-picker`;
  }
}

export default CDSPreviewTimePicker;
