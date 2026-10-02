/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import CDSButton, { BUTTON_SIZE } from '../button/button';
import { property } from 'lit/decorators.js';
import styles from './actionable-notification.scss?lit';
import buttonStyles from '../button/button.scss?lit';

/**
 * Actionable notification action button.
 *
 * @element cds-actionable-notification-button
 */
class CDSActionableNotificationButton extends CDSButton {
  static is = `${prefix}-actionable-notification-button`;

  /**
   * Specify the size of the button. Defaults to `sm` in actionable notification.
   */
  @property({ type: String, reflect: true })
  size?: BUTTON_SIZE | string = BUTTON_SIZE.SMALL;

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.shadowRoot
      ?.getElementById('button')
      ?.classList.add(`${prefix}--actionable-notification__action-button`);
  }

  static styles = [buttonStyles, styles];
}

export default CDSActionableNotificationButton;
