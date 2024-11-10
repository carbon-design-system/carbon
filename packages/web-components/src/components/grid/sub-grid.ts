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
import styles from './sub-grid.scss?lit';
import { SUB_GRID_MODE } from './defs';
export { SUB_GRID_MODE } from './defs';

@customElement(`${prefix}-sub-grid`)
class CDSSubGrid extends LitElement {
  /**
   * Remove the default max width that the grid has set
   */
  @property({ reflect: true, attribute: 'mode' })
  mode = SUB_GRID_MODE.WIDE;

  render() {
    // Grid styling added to contained components, allowing CSS Grid
    // to affect the it's own slot content.
    return html`<div class="${prefix}--grid-part" part="grid">
      <slot></slot>
    </div> `;
  }

  static styles = styles;
}

export default CDSSubGrid;
