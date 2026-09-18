/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './card.scss?lit';

/**
 * Card title media — media slot positioned to the left of the card title.
 *
 * @element cds-card-title-media
 * @slot - Default slot for an icon, avatar, or pictogram.
 */
class CDSCardTitleMedia extends LitElement {
  static is = `${prefix}-card-title-media`;

  render() {
    return html`<div class="${prefix}--card__title-media"><slot></slot></div>`;
  }

  static styles = styles;
}

export default CDSCardTitleMedia;
