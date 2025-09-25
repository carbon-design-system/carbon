/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import { html } from 'lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './fluid-text-input.scss?lit';
import CDSTextInputSkeleton from '../text-input/text-input-skeleton';

/**
 * Fluid text area input.
 *
 * @element cds-fluid-text-input-skeleton
 */
@customElement(`${prefix}-fluid-text-input-skeleton`)
class CDSFluidTextInputSkeleton extends CDSTextInputSkeleton {
  render() {
    return html` ${super.render()} `;
  }

  static styles = [CDSTextInputSkeleton.styles, styles];
}

export default CDSFluidTextInputSkeleton;
