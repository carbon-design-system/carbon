/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { classMap } from 'lit-html/directives/class-map';
import { property } from 'lit-element';
import BXLink from '../link/link';
import { TILE_COLOR_SCHEME } from './defs';
import styles from './tile.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

const { prefix } = settings;

/**
 * Clickable tile.
 *
 * @element bx-clickable-tile
 */
@customElement(`${prefix}-clickable-tile`)
class BXClickableTile extends BXLink {
  protected get _classes() {
    const { colorScheme, disabled } = this;
    return classMap({
      [`${prefix}--link`]: true,
      [`${prefix}--link--disabled`]: disabled,
      [`${prefix}--tile`]: true,
      [`${prefix}--tile--clickable`]: true,
      [`${prefix}--tile--${colorScheme}`]: colorScheme,
    });
  }

  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = TILE_COLOR_SCHEME.REGULAR;

  /**
   * The a11y role for `<a>`.
   */
  @property({ attribute: 'link-role' })
  linkRole = 'button';

  static styles = styles;
}

export default BXClickableTile;
