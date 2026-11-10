/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../../globals/settings';
import { carbonElement as customElement } from '../../../globals/decorators/carbon-element';
import FormAssociatedMixin from '../../../globals/mixins/form-associated';
import CDSSearch from '../search';

/**
 * A form-associated v3 preview of `cds-search`.
 *
 * Identical to `cds-search` in markup, styling and events. The only
 * difference is that it participates in its form natively through
 * `ElementInternals` instead of the deprecated `formdata` event, so
 * `<label for>`, `form.elements`, `form.reset()` and `<fieldset disabled>` all
 * work as they do for a native control.
 *
 * @element cds-preview-search
 */
@customElement(`${prefix}-preview-search`)
class CDSPreviewSearch extends FormAssociatedMixin(CDSSearch) {
  static get is() {
    return `${prefix}-preview-search`;
  }
}

export default CDSPreviewSearch;
