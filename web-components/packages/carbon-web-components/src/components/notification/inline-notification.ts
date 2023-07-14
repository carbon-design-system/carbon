/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CheckmarkFilled20 from '@carbon/icons/lib/checkmark--filled/20';
import Close16 from '@carbon/icons/lib/close/16';
import ErrorFilled20 from '@carbon/icons/lib/error--filled/20';
import InformationFilled20 from '@carbon/icons/lib/information--filled/20';
import InformationSquareFilled20 from '@carbon/icons/lib/information--square--filled/20';
import WarningFilled20 from '@carbon/icons/lib/warning--filled/20';
import WarningAltFilled20 from '@carbon/icons/lib/warning--alt--filled/20';
import { LitElement, html, svg } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import { NOTIFICATION_KIND, NOTIFICATION_TYPE } from './defs';
import styles from './inline-notification.scss';

export { NOTIFICATION_KIND, NOTIFICATION_TYPE };

/**
 * The default icons, keyed by notification kind.
 */
const iconsForKinds = {
  [NOTIFICATION_KIND.SUCCESS]: CheckmarkFilled20,
  [NOTIFICATION_KIND.INFO]: InformationFilled20,
  [NOTIFICATION_KIND.INFO_SQUARE]: InformationSquareFilled20,
  [NOTIFICATION_KIND.WARNING]: WarningFilled20,
  [NOTIFICATION_KIND.WARNING_ALT]: WarningAltFilled20,
  [NOTIFICATION_KIND.ERROR]: ErrorFilled20,
};

/**
 * Inline notification.
 *
 * @element cds-inline-notification
 * @slot subtitle - The subtitle.
 * @slot title - The title.
 * @fires cds-notification-beingclosed
 *   The custom event fired before this notification is being closed upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of closing this notification.
 * @fires cds-notification-closed - The custom event fired after this notification is closed upon a user gesture.
 */
@customElement(`${prefix}-inline-notification`)
class CDSInlineNotification extends FocusMixin(LitElement) {
  /**
   * Current timeout identifier
   */
  protected _timeoutID: number | null = null;

  /**
   * Notification type.
   */
  protected _type = NOTIFICATION_TYPE.INLINE;

  /**
   * Cancels the current timeout configured for the notification
   *
   * @param timeoutID current timeout's identifier
   */
  protected _cancelTimeout(timeoutID: number) {
    clearTimeout(timeoutID);
    this._timeoutID = null;
  }

  /**
   * Overrides (if exists) the timeout to close the notification
   *
   * @param timeout the time in ms
   */
  protected _initializeTimeout(timeout: number) {
    if (this._timeoutID) {
      this._cancelTimeout(this._timeoutID);
    }
    this._timeoutID = setTimeout(
      this._handleUserOrTimerInitiatedClose.bind(this, null),
      timeout
    ) as unknown as number;
  }

  /**
   * Handles `click` event on the close button.
   *
   * @param event The event.
   */
  protected _handleClickCloseButton({ target }: MouseEvent) {
    this._handleUserOrTimerInitiatedClose(target);
  }

  /**
   * Handles user-initiated or through timer close request of this modal.
   *
   * @param triggeredBy The element that triggered this close request, if there is one.
   */
  protected _handleUserOrTimerInitiatedClose(triggeredBy: EventTarget | null) {
    if (this.open) {
      const init = {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          triggeredBy,
        },
      };
      if (
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSInlineNotification).eventBeforeClose,
            init
          )
        )
      ) {
        this.open = false;
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSInlineNotification).eventClose,
            init
          )
        );
      }
    }
  }

  /**
   * @returns The template part for the close button.
   */
  protected _renderButton() {
    const {
      ariaLabel,
      _type: type,
      _handleClickCloseButton: handleClickCloseButton,
    } = this;
    return html`
      <button
        type="button"
        class="${prefix}--${type}-notification__close-button"
        aria-label=${ifDefined(ariaLabel)}
        title=${ifDefined(ariaLabel)}
        @click="${handleClickCloseButton}">
        ${Close16({
          class: `${prefix}--${type}-notification__close-icon`,
        })}
      </button>
    `;
  }

  /**
   * @returns The template part for the text contents.
   */
  protected _renderText() {
    const { subtitle, title, _type: type } = this;
    return html`
      <div class="${prefix}--${type}-notification__text-wrapper">
        <p class="${prefix}--${type}-notification__title">
          ${title}<slot name="title"></slot>
        </p>
        <div class="${prefix}--${type}-notification__subtitle">
          ${subtitle}<slot name="subtitle"></slot>
        </div>
        <slot></slot>
      </div>
    `;
  }

  /**
   * @returns The template part for the icon.
   */
  protected _renderIcon() {
    const { statusIconDescription, kind, _type: type } = this;
    const { [kind]: icon } = iconsForKinds;
    return !icon
      ? undefined
      : icon({
          class: `${prefix}--${type}-notification__icon`,
          children: !statusIconDescription
            ? undefined
            : svg`<title>${statusIconDescription}</title>`,
        });
  }

  /**
   * Provide a description for "close" icon button that can be read by screen readers
   */
  @property({ attribute: 'aria-label' })
  ariaLabel!: string;

  /**
   * `true` to hide the close button.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-close-button' })
  hideCloseButton = false;

  /**
   * Provide a description for "status" icon that can be read by screen readers
   */
  @property({ attribute: 'status-icon-description' })
  statusIconDescription!: string;

  /**
   * Notification kind.
   */
  @property({ reflect: true })
  kind = NOTIFICATION_KIND.SUCCESS;

  /**
   * Low contrast mode
   */
  @property({ type: Boolean, reflect: true, attribute: 'low-contrast' })
  lowContrast = false;

  /**
   * `true` if the notification should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = true;

  /**
   * Specify an optional duration the notification should be closed in
   */
  @property({ type: Number, reflect: true })
  timeout: number | null = null;

  /**
   * The subtitle.
   */
  @property()
  subtitle = '';

  /**
   * The title.
   */
  @property()
  title = '';

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'alert');
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    const openChanged = changedProperties.has('open');
    const timeoutChanged = changedProperties.has('timeout');

    if (openChanged || timeoutChanged) {
      if (this.open && this.timeout) {
        this._initializeTimeout(this.timeout);
      } else if (!this.open && this._timeoutID) {
        this._cancelTimeout(this._timeoutID);
      }
    }
  }

  render() {
    const { _type: type } = this;
    return html`
      <div class="${prefix}--${type}-notification__details">
        ${this._renderIcon()}${this._renderText()}
      </div>
      ${this._renderButton()}
    `;
  }

  /**
   * The name of the custom event fired before this notification is being closed upon a user gesture.
   * Cancellation of this event stops the user-initiated action of closing this notification.
   */
  static get eventBeforeClose() {
    return `${prefix}-notification-beingclosed`;
  }

  /**
   * The name of the custom event fired after this notification is closed upon a user gesture.
   */
  static get eventClose() {
    return `${prefix}-notification-closed`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSInlineNotification;
