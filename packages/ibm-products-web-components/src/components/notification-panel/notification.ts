/**
 * @license
 *
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { selectorTabbable } from '@carbon/web-components/es/globals/settings.js';
import { dateTimeFormat } from '@carbon/utilities';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import { consume } from '@lit/context';
import { dateTimeLocaleContext } from './date-time-context';
import styles from './notification.scss?lit';
import '@carbon/web-components/es/components/button/index.js';
import Close16 from '@carbon/icons/es/close/16';
import ErrorFilled16 from '@carbon/icons/es/error--filled/16';
import CheckmarkFilled16 from '@carbon/icons/es/checkmark--filled/16';
import WarningAltFilled16 from '@carbon/icons/es/warning--alt--filled/16';
import InformationSquareFilled16 from '@carbon/icons/es/information--square--filled/16';
import { getSupportedLocale } from '../../globals/js/utils/getSupportedLocale';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';

const blockClass = `${prefix}--notifications-panel__notification`;
const DefaultLocale = 'en-US';
type DateTimeStyles = 'long' | 'short' | 'narrow';
const dateTimeStyle = 'long' as DateTimeStyles;
/**
 * Notification.
 * @element c4p-notification
 * @slot title - The Title for the notification.
 * @slot description - The description for the notification.
 * @csspart dialog The dialog.
 *   The custom event is fired when a notification is clicked or when the Enter key is pressed on it.
 * @fires c4p-notification-dismiss - The custom event is fired when the notification is closed by a user gesture.
 */
@customElement(`${prefix}-notification`)
class CDSNotification extends HostListenerMixin(LitElement) {
  /**
   * Sets the type of notification to display: 'error', 'warning', 'success', or 'informational'
   */
  @property({ reflect: true })
  type?: 'error' | 'warning' | 'success' | 'informational';
  /**
   * Sets the timestamp for the notification, typically used to indicate when it was received
   */
  @property()
  timestamp?: Date;

  @consume({ context: dateTimeLocaleContext, subscribe: true })
  dateTimeLocale: string | undefined = undefined;

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      this.click();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    this.addEventListener('keydown', this._handleKeyDown);
  }
  render() {
    const {
      type,
      timestamp,
      dateTimeLocale,
      _dismissSingleNotification: dismissSingleNotification,
      _fetchIcon: fetchIcon,
    } = this;
    const supportedLocale = getSupportedLocale(dateTimeLocale, DefaultLocale);
    const icon = fetchIcon(type);
    return html`
      ${icon}
      <div class="${blockClass}-content">
        <p class="${blockClass}-time-label">
          ${dateTimeFormat.relative.format(timestamp as Date, {
            locale: supportedLocale as string,
            style: dateTimeStyle,
          })}
        </p>
        <slot name="title"></slot>
        <div class="${blockClass}-description">
          <slot name="description"></slot>
        </div>
      </div>
      <cds-button
        tooltip-text=""
        align="left"
        kind="ghost"
        size="sm"
        class="${blockClass}__dismiss-single-button"
        @click=${dismissSingleNotification}
      >
        ${iconLoader(Close16, { slot: 'icon' })}
      </cds-button>
    `;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
  }
  /**
   * Handles user-initiated dismiss request of the Notification.
   *
   * @param event The event that triggered the click.
   */
  private _dismissSingleNotification(event: Event) {
    const triggeredBy = event.target;
    event.preventDefault();
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
        (this.constructor as typeof CDSNotification).notificationDismiss,
        init
      )
    );
  }

  private _fetchIcon(type) {
    let icon;
    switch (type) {
      case 'error':
        icon = iconLoader(ErrorFilled16, {
          class: `${blockClass}-status-icon ${blockClass}-status-icon-error`,
        });
        break;
      case 'success':
        icon = iconLoader(CheckmarkFilled16, {
          class: `${blockClass}-status-icon ${blockClass}-status-icon-success`,
        });
        break;
      case 'warning':
        icon = iconLoader(WarningAltFilled16, {
          class: `${blockClass}-status-icon ${blockClass}-status-icon-warning`,
        });
        break;
      case 'informational':
        icon = iconLoader(InformationSquareFilled16, {
          class: `${blockClass}-status-icon ${blockClass}-status-icon-informational`,
        });
        break;
      default:
        icon = null;
    }
    return icon;
  }

  /**
   * A selector selecting tabbable nodes.
   */
  static get selectorTabbable() {
    return selectorTabbable;
  }

  /**
   * The custom event is fired when the notification is closed by a user gesture.
   */
  static get notificationDismiss() {
    return `${prefix}-notification-dismiss`;
  }
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSNotification;
