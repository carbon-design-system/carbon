/**
 * @license
 *
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { provide } from '@lit/context';
import { GridContext, gridContext } from './grid-context';
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
  @property({ reflect: true, attribute: 'condensed', type: Boolean })
  condensed = false;

  /**
   * Container hangs 16px into the gutter. Useful for
   * typographic alignment with and without containers.
   */
  @property({ reflect: true, attribute: 'narrow', type: Boolean })
  narrow = false;

  /**
   * Remove the default max width that the grid has set
   */
  @property({ reflect: true, attribute: 'full-width', type: Boolean })
  fullWidth = false;

  @provide({ context: gridContext })
  @property({ attribute: false })
  public gridContext: GridContext = {
    subgrid: false,
  };

  render() {
    this.gridContext = { subgrid: true };

    // Grid styling added to contained components, allowing CSS Grid
    // to affect the it's own slot content.
    return html`<div class="${prefix}--grid-part" part="grid">
      <slot></slot>
    </div> `;
  }

  static styles = styles;
}

export default CDSGrid;
