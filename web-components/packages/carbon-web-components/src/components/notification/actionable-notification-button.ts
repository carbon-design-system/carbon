/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import CDSButton from '../button/button';
import styles from './actionable-notification.scss?lit';

/**
 * Actionable notification action button.
 *
 * @element cds-actionable-notification-button
 */
@customElement(`${prefix}-actionable-notification-button`)
class CDSActionableNotificationButton extends CDSButton {
  update(changedProperties) {
    super.update(changedProperties);
    this.shadowRoot!.getElementById('button')?.classList.add(
      `${prefix}--actionable-notification__action-button`
    );

    this.setAttribute('size', 'sm');
  }

  static styles = styles;
}

export default CDSActionableNotificationButton;
