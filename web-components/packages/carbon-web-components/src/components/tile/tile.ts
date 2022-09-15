/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { html, property, customElement, LitElement } from 'lit-element';
import { TILE_COLOR_SCHEME } from './defs';
import styles from './tile.scss';

export { TILE_COLOR_SCHEME };

const { prefix } = settings;

/**
 * Basic tile.
 * @element bx-tile
 */
@customElement(`${prefix}-tile`)
class BXTile extends LitElement {
  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = TILE_COLOR_SCHEME.REGULAR;

  render() {
    return html`<slot></slot>`;
  }

  static styles = styles;
}

export default BXTile;
