/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../../globals/settings';
import { carbonElement as customElement } from '../../../globals/decorators/carbon-element';
import FormAssociatedMixin from '../../../globals/mixins/form-associated';
import CDSMultiSelect from '../multi-select';

/**
 * A form-associated v3 preview of `cds-multi-select`.
 *
 * Identical to `cds-multi-select` in markup, styling and events. The only
 * difference is that it participates in its form natively through
 * `ElementInternals` instead of the deprecated `formdata` event, so
 * `<label for>`, `form.elements`, `form.reset()` and `<fieldset disabled>` all
 * work as they do for a native control.
 *
 * Submits the same joined `value` string the v2 component does, so the
 * wire format is unchanged. Emitting one entry per selection would be a
 * deliberate API change and is tracked in the migration guide.
 *
 * @element cds-preview-multi-select
 */
@customElement(`${prefix}-preview-multi-select`)
class CDSPreviewMultiSelect extends FormAssociatedMixin(CDSMultiSelect) {
  static get is() {
    return `${prefix}-preview-multi-select`;
  }
}

export default CDSPreviewMultiSelect;
