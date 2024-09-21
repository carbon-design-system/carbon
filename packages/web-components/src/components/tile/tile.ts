/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { TILE_COLOR_SCHEME } from './defs';
import styles from './tile.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export { TILE_COLOR_SCHEME };

/**
 * Basic tile.
 *
 * @element cds-tile
 */
@customElement(`${prefix}-tile`)
class CDSTile extends LitElement {
  /**
   * `true` if there is a slug.
   */
  protected _hasSlug = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches !== undefined
          ? (elem as HTMLElement).matches(
              (this.constructor as typeof CDSTile).slugItem
            )
          : false
      );
    if (hasContent.length > 0) {
      this._hasSlug = Boolean(hasContent);
      (hasContent[0] as HTMLElement).setAttribute('size', 'xs');
    }
    this.requestUpdate();
  }

  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = TILE_COLOR_SCHEME.REGULAR;

  /**
   * Specify if the `Tile` component should be rendered with rounded corners.
   * Only valid when `slug` prop is present
   */
  @property({ type: Boolean, attribute: 'has-rounded-corners' })
  hasRoundedCorners = false;

  updated() {
    const anchorTag = this.querySelector('a');

    if (anchorTag) {
      anchorTag?.classList.add(`${prefix}--link`);
      anchorTag.before(document.createElement('br'));
      anchorTag.before(document.createElement('br'));
    }

    if (this._hasSlug) {
      this.setAttribute('slug', '');
    } else {
      this.removeAttribute('slug');
    }
  }

  render() {
    return html` <slot></slot
      ><slot name="slug" @slotchange="${this._handleSlotChange}"></slot>`;
  }

  /**
   * A selector that will return the slug item.
   */
  static get slugItem() {
    return `${prefix}-slug`;
  }

  static styles = styles;
}

export default CDSTile;
