/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { LitElement, html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import formStyles from '../form/form.scss?lit';
import checkboxStyles from '../checkbox/checkbox.scss?lit';
import textInputStyles from '../text-input/text-input.scss?lit';
import dropdownStyles from '../dropdown/dropdown.scss?lit';
import styles from './fluid-multi-select.scss?lit';

/**
 * Fluid multi select skeleton.
 *
 * @element cds-fluid-multi-select-skeleton
 */
@customElement(`${prefix}-fluid-multi-select-skeleton`)
class CDSFluidMultiSelectSkeleton extends LitElement {
  render() {
    return html`
      <div class="${prefix}--list-box__wrapper--fluid">
        <div class="${prefix}--skeleton ${prefix}--list-box">
          <span class="${prefix}--list-box__label"></span>
          <div class="${prefix}--list-box__field"></div>
        </div>
      </div>
    `;
  }
  static styles = [
    formStyles,
    checkboxStyles,
    textInputStyles,
    dropdownStyles,
    styles,
  ];
}

export default CDSFluidMultiSelectSkeleton;
