/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './fluid-number-input.scss?lit';
import CDSNumberInputSkeleton from '../number-input/number-input-skeleton';

/**
 * Fluid number input.
 *
 * @element cds-fluid-number-input-skeleton
 */
@customElement(`${prefix}-fluid-number-input-skeleton`)
class CDSFluidNumberInputSkeleton extends CDSNumberInputSkeleton {
  render() {
    return html` ${super.render()} `;
  }

  static styles = [CDSNumberInputSkeleton.styles, styles];
}

export default CDSFluidNumberInputSkeleton;
