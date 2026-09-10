/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './card.scss?lit';

/**
 * Card header media — full-width icon/image slot rendered above the title row.
 *
 * @element cds-card-header-media
 * @slot - Default slot for an icon, image, or pictogram.
 */
@customElement(`${prefix}-card-header-media`)
class CDSCardHeaderMedia extends LitElement {
  render() {
    return html`<div class="${prefix}--card__header-media"><slot></slot></div>`;
  }

  static styles = styles;
}

export default CDSCardHeaderMedia;
