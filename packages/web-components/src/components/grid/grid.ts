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
import styles from './grid.scss?lit';
import { GRID_ALIGNMENT } from './defs';

export { GRID_ALIGNMENT } from './defs';

@customElement(`${prefix}-grid`)
class CDSGrid extends LitElement {
  /**
   * Specify grid alignment. Default is center
   */
  @property({ attribute: 'align' })
  align = GRID_ALIGNMENT.CENTER;

  /**
   * Collapse the gutter to 1px. Useful for fluid layouts.
   * Rows have 1px of margin between them to match gutter.
   */
  @property({ attribute: 'condensed' })
  condensed = false;

  /**
   * Container hangs 16px into the gutter. Useful for
   * typographic alignment with and without containers.
   */
  @property({ attribute: 'narrow' })
  narrow = false;

  /**
   * Grid is nested within another grid
   */
  @property({ attribute: 'sub-grid' })
  subGrid = false;

  /**
   * Remove the default max width that the grid has set
   */
  @property({ reflect: true, attribute: 'wide' })
  wide = false;

  render() {
    const classes = 'cds--css-grid';

    // Grid styling added to contained components, allowing CSS Grid
    // to affect the it's own slot content.
    return html`<div class="${classes}" part="grid">
      <slot></slot>
    </div> `;
  }

  static styles = styles;
}

export default CDSGrid;
