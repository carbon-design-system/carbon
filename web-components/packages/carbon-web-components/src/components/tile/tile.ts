/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { TILE_COLOR_SCHEME } from './defs';
import styles from './tile.scss';

export { TILE_COLOR_SCHEME };

/**
 * Basic tile.
 *
 * @element cds-tile
 */
@customElement(`${prefix}-tile`)
class BXTile extends LitElement {
  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = TILE_COLOR_SCHEME.REGULAR;

  updated() {
    const anchorTag = this.querySelector('a');

    if (anchorTag) {
      anchorTag?.classList.add(`${prefix}--link`);
      anchorTag.before(document.createElement('br'));
      anchorTag.before(document.createElement('br'));
    }
  }

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}

export default BXTile;
