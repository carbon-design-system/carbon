/**
 * Copyright IBM Corp. 2019, 2024
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
import styles from './tile.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import AILabel24 from '@carbon/icons/lib/ai-label/24.js';
/**
 * Clickable tile.
 *
 * @element cds-clickable-tile
 */
@customElement(`${prefix}-clickable-tile`)
class CDSClickableTile extends CDSLink {
  protected get _classes(): any {
    const { colorScheme, disabled, hasRoundedCorners, aiLabel, slug } = this;
    return classMap({
      [`${prefix}--link`]: true,
      [`${prefix}--link--disabled`]: disabled,
      [`${prefix}--tile`]: true,
      [`${prefix}--tile--clickable`]: true,
      [`${prefix}--tile--${colorScheme}`]: colorScheme,
      [`${prefix}--tile--slug-rounded`]: (aiLabel || slug) && hasRoundedCorners,
    });
  }

  /**
   * The color scheme.
   *
   * @default
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
   * Only valid when `ai-label` prop is present
   */
  @property({ type: Boolean, attribute: 'has-rounded-corners' })
  hasRoundedCorners = false;

  @property({ type: Boolean, attribute: 'ai-label' })
  aiLabel = false;

  /**
   * deprecated - remove in v12
   */
  @property({ type: Boolean })
  slug = false;

  /**
   * If using `slug`, set `ai-label` attribute to true so
   * the styles are applied for slug as well
   *
   * remove in v12
   */
  connectedCallback() {
    if (this.slug) {
      this.setAttribute('ai-Label', '');
      this.aiLabel = true;
    }
    super.connectedCallback();
  }

  /**
   * @returns The inner content.
   */
  protected _renderInner() {
    return html`
      ${super._renderInner()}
      ${this.aiLabel || this.slug
        ? AILabel24({ class: `${prefix}--tile--ai-label-icon` })
        : ''}
      <slot name="decorator"></slot>
    `;
  }

  /**
   * A selector that will return the slug item.
   *
   * remove in v12
   */
  static get slugItem() {
    return `${prefix}-slug`;
  }

  /**
   * A selector that will return the AI Label item.
   */
  static get aiLabelItem() {
    return `${prefix}-ai-label`;
  }

  static styles = styles;
}

export default CDSClickableTile;
