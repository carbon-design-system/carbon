/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import styles from './fluid-select.scss?lit';
import CDSSelectSkeleton from '../select/select-skeleton';
/**
 * Fluid text area input.
 *
 * @element cds-fluid-select-skeleton
 */
class CDSFluidSelectSkeleton extends CDSSelectSkeleton {
  static is = `${prefix}-fluid-select-skeleton`;

  render() {
    return html`
      <div class="${prefix}--select--fluid__skeleton">${super.render()}</div>
    `;
  }

  static styles = [CDSSelectSkeleton.styles, styles];
}

export default CDSFluidSelectSkeleton;
