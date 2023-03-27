/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CheckmarkFilled20 from '@carbon/icons/lib/checkmark--filled/20';
import Close20 from '@carbon/icons/lib/close/20';
import ErrorFilled20 from '@carbon/icons/lib/error--filled/20';
import WarningFilled20 from '@carbon/icons/lib/warning--filled/20';
import settings from 'carbon-components/es/globals/js/settings';
import { html, LitElement, property, svg } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import FocusMixin from '../../globals/mixins/focus';
import { NOTIFICATION_KIND, NOTIFICATION_TYPE } from './defs';
import styles from './inline-notification.scss';

export { NOTIFICATION_KIND, NOTIFICATION_TYPE };

const { prefix } = settings;

/**
 * The default icons, keyed by notification kind.
 */
const iconsForKinds = {
  [NOTIFICATION_KIND.SUCCESS]: CheckmarkFilled20,
  [NOTIFICATION_KIND.INFO]: undefined,
  [NOTIFICATION_KIND.WARNING]: WarningFilled20,
  [NOTIFICATION_KIND.ERROR]: ErrorFilled20,
};

/**
 * Inline notification.
 *
 * @element bx-inline-notification
 * @slot subtitle - The subtitle.
 * @slot title - The title.
 * @fires bx-notification-beingclosed
 *   The custom event fired before this notification is being closed upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of closing this notification.
 * @fires bx-notification-closed - The custom event fired after this notification is closed upon a user gesture.
 */
@customElement(`${prefix}-inline-notification`)
class BXInlineNotification extends FocusMixin(LitElement) {
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
            (this.constructor as typeof BXInlineNotification).eventBeforeClose,
            init
          )
        )
      ) {
        this.open = false;
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof BXInlineNotification).eventClose,
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
      closeButtonLabel,
      _type: type,
      _handleClickCloseButton: handleClickCloseButton,
    } = this;
    return html`
      <button
        type="button"
        class="${prefix}--${type}-notification__close-button"
        aria-label=${ifDefined(closeButtonLabel)}
        title=${ifDefined(closeButtonLabel)}
        @click="${handleClickCloseButton}">
        ${Close20({
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
    const { iconLabel, kind, _type: type } = this;
    const { [kind]: icon } = iconsForKinds;
    return !icon
      ? undefined
      : icon({
          class: `${prefix}--${type}-notification__icon`,
          children: !iconLabel ? undefined : svg`<title>${iconLabel}</title>`,
        });
  }

  /**
   * The a11y text for the close button.
   */
  @property({ attribute: 'close-button-label' })
  closeButtonLabel!: string;

  /**
   * `true` to hide the close button.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-close-button' })
  hideCloseButton = false;

  /**
   * The a11y text for the icon.
   */
  @property({ attribute: 'icon-label' })
  iconLabel!: string;

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
   * Notification time in ms until gets closed.
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

export default BXInlineNotification;
