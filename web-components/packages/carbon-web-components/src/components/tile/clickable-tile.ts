/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import CDSLink from '../link/link';
import { TILE_COLOR_SCHEME } from './defs';
import styles from './tile.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

// To Do: Replace with an an icon from `@carbon/icons`
// since the hollow slug in `ClickableTile` is not interactive
const hollowSlugIcon = html` <svg
  class="${prefix}--tile--slug-icon"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <rect x="0.5" y="0.5" width="23" height="23" />
  <path
    d="M13.2436 16H11.5996L10.9276 13.864H7.95164L7.29164 16H5.68364L8.49164 7.624H10.4596L13.2436 16ZM10.5436 12.508L9.46364 9.064H9.40364L8.33564 12.508H10.5436ZM17.9341 16H14.1301V14.728H15.2341V8.896H14.1301V7.624H17.9341V8.896H16.8181V14.728H17.9341V16Z"
    fill="#161616" />
</svg>`;
/**
 * Clickable tile.
 *
 * @element cds-clickable-tile
 */
@customElement(`${prefix}-clickable-tile`)
class CDSClickableTile extends CDSLink {
  protected get _classes() {
    const { colorScheme, disabled, hasRoundedCorners, slug } = this;
    return classMap({
      [`${prefix}--link`]: true,
      [`${prefix}--link--disabled`]: disabled,
      [`${prefix}--tile`]: true,
      [`${prefix}--tile--clickable`]: true,
      [`${prefix}--tile--${colorScheme}`]: colorScheme,
      [`${prefix}--tile--slug-rounded`]: slug && hasRoundedCorners,
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

  /**
   * Specify if the `ClickableTile` component should be rendered with rounded corners.
   * Only valid when `slug` prop is present
   */
  @property({ type: Boolean, attribute: 'has-rounded-corners' })
  hasRoundedCorners = false;

  @property({ type: Boolean })
  slug = false;

  /**
   * @returns The inner content.
   */
  protected _renderInner() {
    return html` ${super._renderInner()} ${this.slug ? hollowSlugIcon : ''} `;
  }

  /**
   * A selector that will return the slug item.
   */
  static get slugItem() {
    return `${prefix}-slug`;
  }

  static styles = styles;
}

export default CDSClickableTile;
