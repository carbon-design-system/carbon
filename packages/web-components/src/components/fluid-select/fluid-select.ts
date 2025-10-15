/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSSelect from '../select/select';
import styles from './fluid-select.scss?lit';

/**
 * Fluid text select.
 *
 * @element cds-fluid-select
 */
@customElement(`${prefix}-fluid-select`)
class CDSFluidSelect extends CDSSelect {
  connectedCallback() {
    this.setAttribute('isFluid', 'true');
    super.connectedCallback();
  }

  render() {
    return html` <div class="${prefix}--select--fluid">${super.render()}</div>`;
  }

  static styles = [CDSSelect.styles, styles];
}

export default CDSFluidSelect;
