/**
 * @license
 *
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { consume } from '@lit/context';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';
import styles from './sub-grid.scss?lit';
import { SUB_GRID_MODE } from './defs';
import { GridContext, gridContext } from './grid-context';
export { SUB_GRID_MODE } from './defs';

@customElement(`${prefix}-sub-grid`)
class CDSSubGrid extends LitElement {
  @consume({ context: gridContext, subscribe: true })
  @property({ attribute: false })
  public gridContext?: GridContext;

  /**
   * Remove the default max width that the grid has set
   */
  @property({ reflect: true, attribute: 'mode' })
  mode = SUB_GRID_MODE.WIDE;

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
   * Wide reset to default grid styling.
   */
  @property({ reflect: true, attribute: 'wide', type: Boolean })
  wide = false;

  render() {
    if (this.narrow) {
      this.mode = SUB_GRID_MODE.NARROW;
    } else if (this.condensed) {
      this.mode = SUB_GRID_MODE.CONDENSED;
    } else if (this.wide) {
      this.mode = SUB_GRID_MODE.WIDE;
    } else if (this.gridContext?.narrow) {
      this.mode = SUB_GRID_MODE.NARROW;
    } else if (this.gridContext?.condensed) {
      this.mode = SUB_GRID_MODE.CONDENSED;
    } else {
      this.mode = SUB_GRID_MODE.WIDE;
    }

    // Grid styling added to contained components, allowing CSS Grid
    // to affect the it's own slot content.
    return html`<div class="${prefix}--grid-part" part="grid">
      <slot></slot>
    </div> `;
  }

  static styles = styles;
}

export default CDSSubGrid;
