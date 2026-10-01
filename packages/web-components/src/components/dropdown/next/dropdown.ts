/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../../globals/settings';
import { carbonElement as customElement } from '../../../globals/decorators/carbon-element';
import FormAssociatedMixin from '../../../globals/mixins/form-associated';
import CDSDropdown from '../dropdown';

/**
 * A form-associated v3 preview of `cds-dropdown`.
 *
 * Identical to `cds-dropdown` in markup, styling and events. The only
 * difference is that it participates in its form natively through
 * `ElementInternals` instead of the deprecated `formdata` event, so
 * `<label for>`, `form.elements`, `form.reset()` and `<fieldset disabled>` all
 * work as they do for a native control.
 *
 * v2 `cds-dropdown-item` children work unchanged — only the container
 * participates in the form.
 *
 * @element cds-preview-dropdown
 */
@customElement(`${prefix}-preview-dropdown`)
class CDSPreviewDropdown extends FormAssociatedMixin(CDSDropdown) {
  static get is() {
    return `${prefix}-preview-dropdown`;
  }
}

export default CDSPreviewDropdown;
