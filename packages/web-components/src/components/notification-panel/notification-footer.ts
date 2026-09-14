/**
 * Copyright IBM Corp. 2023, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { selectorTabbable } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import Settings16 from '@carbon/icons/es/settings/16';
import { iconLoader } from '../../globals/internal/icon-loader';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './notification-footer.scss?lit';

const blockClass = `${prefix}--notifications-panel`;

/**
 * Notification Footer.
 *
 * @element cds-notification-footer
 * @csspart dialog The dialog.
 * @fires cds-notification-view-all
 *   The custom event is fired when a user clicks on View All button.
 * @fires cds-notification-settings - The custom event is fired when User clicks on settings button.
 */
@customElement(`${prefix}-notification-footer`)
class CDSNotificationFooter extends HostListenerMixin(LitElement) {
  /**
   * Label for View All Text
   */
  @property({ reflect: true, type: String, attribute: 'view-all-label' })
  viewAllLabel = 'View All';

  render() {
    const {
      viewAllLabel,
      _viewAllNotification: viewAllNotification,
      _onClickSettings: onClickSettings,
    } = this;
    return html`
      <cds-button
        kind="ghost"
        class="${blockClass}__view-all-button"
        @click=${viewAllNotification}>
        ${viewAllLabel}
      </cds-button>
      <cds-button
        kind="ghost"
        size="sm"
        tooltip-text="Settings"
        class="${blockClass}__settings-button"
        @click=${onClickSettings}>
        ${iconLoader(Settings16, { slot: 'icon' })}
      </cds-button>
    `;
  }

  private _viewAllNotification(event: Event) {
    const triggeredBy = event.target;
    event.stopPropagation();
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        triggeredBy,
      },
    };
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSNotificationFooter).notificationViewAll,
        init
      )
    );
  }

  private _onClickSettings(event: Event) {
    const triggeredBy = event.target;
    event.stopPropagation();
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        triggeredBy,
      },
    };
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSNotificationFooter).notificationSettings,
        init
      )
    );
  }

  /**
   * A selector selecting tabbable nodes.
   */
  static get selectorTabbable() {
    return selectorTabbable;
  }

  /**
   * The custom event is fired when a notification is clicked or when the Enter key is pressed on it.
   */
  static get notificationViewAll() {
    return `${prefix}-notification-view-all`;
  }

  /**
   * The custom event is fired when the notification is closed by a user gesture.
   */
  static get notificationSettings() {
    return `${prefix}-notification-settings`;
  }
  static styles = styles;
}

export default CDSNotificationFooter;
