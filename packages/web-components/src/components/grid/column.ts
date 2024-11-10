/**
 * @license
 *
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';

@customElement(`${prefix}-column`)
class CDSColumn extends LitElement {
  /**
   * Specify grid alignment. Default is center
   */
  @property({ reflect: true, attribute: 'sm' })
  sm = '1';

  createRenderRoot() {
    return this;
  }
}

export default CDSColumn;
