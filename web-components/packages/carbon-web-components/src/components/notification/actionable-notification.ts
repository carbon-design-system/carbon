/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import CheckmarkFilled20 from '@carbon/icons/lib/checkmark--filled/20';
import ErrorFilled20 from '@carbon/icons/lib/error--filled/20';
import InformationFilled20 from '@carbon/icons/lib/information--filled/20';
import InformationSquareFilled20 from '@carbon/icons/lib/information--square--filled/20';
import WarningFilled20 from '@carbon/icons/lib/warning--filled/20';
import WarningAltFilled20 from '@carbon/icons/lib/warning--alt--filled/20';
import { html, svg } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { NOTIFICATION_TYPE, NOTIFICATION_KIND } from './defs';
import CDSInlineNotification from './inline-notification';
import styles from './actionable-notification.scss?lit';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';

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
 * Actionable notification.
 *
 * @element cds-actionable-notification
 * @slot subtitle - The subtitle.
 * @slot title - The title.
 * @fires cds-notification-beingclosed
 *   The custom event fired before this notification is being closed upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of closing this notification.
 * @fires cds-notification-closed - The custom event fired after this notification is closed upon a user gesture.
 */
@customElement(`${prefix}-actionable-notification`)
class CDSActionableNotification extends HostListenerMixin(
  CDSInlineNotification
) {
  protected _type = NOTIFICATION_TYPE.ACTIONABLE;

  /**
   * Inline notification type.
   */
  @property({ type: Boolean, reflect: true })
  inline = false;

  /**
   * Pass in the action button label that will be rendered within the ActionableNotification.
   */
  @property({ type: String, reflect: true, attribute: 'action-button-label' })
  actionButtonLabel = '';

  /**
   * Specify if pressing the escape key should close notifications
   */
  @property({ type: Boolean, reflect: true, attribute: 'close-on-escape' })
  closeOnEscape = true;

  /**
   * Specify if focus should be moved to the component when the notification contains actions
   */
  @property({ type: Boolean, reflect: true, attribute: 'has-focus' })
  hasFocus = true;

  /**
   * Handles `keydown` event on this event.
   * Escape will close the notification if `closeOnEscape` is true
   */
  @HostListener('keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeyDown = async (event: KeyboardEvent) => {
    const { key } = event;
    if (this.closeOnEscape && key === 'Escape') {
      this.open = false;
    }
  };

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'alertdialog');
    }
    super.connectedCallback();
  }

  protected _renderIcon() {
    const { statusIconDescription, kind, inline } = this;
    const { [kind]: icon } = iconsForKinds;
    return !icon
      ? undefined
      : icon({
          class: `${prefix}--${inline ? 'inline' : 'toast'}-notification__icon`,
          children: !statusIconDescription
            ? undefined
            : svg`<title>${statusIconDescription}</title>`,
        });
  }

  protected _renderText() {
    const { subtitle, title, _type: type } = this;
    return html`
      <div class="${prefix}--${type}-notification__text-wrapper">
        <div class="${prefix}--${type}-notification__content">
          <div class="${prefix}--${type}-notification__title">
            ${title}<slot name="title"></slot>
          </div>
          <div class="${prefix}--${type}-notification__subtitle">
            ${subtitle}<slot name="subtitle"></slot>
          </div>
          <slot></slot>
        </div>
      </div>
    `;
  }

  /**
   * The caption.
   */
  @property()
  caption = '';

  updated(changedProperties) {
    super.updated(changedProperties);
    const button = this.querySelector(
      (this.constructor as typeof CDSActionableNotification)
        .selectorActionButton
    );
    if (changedProperties.has('inline')) {
      button?.setAttribute('kind', this.inline ? 'ghost' : 'tertiary');
    }
    if (changedProperties.has('lowContrast')) {
      if (this.lowContrast) {
        button?.setAttribute('low-contrast', 'true');
      } else {
        button?.removeAttribute('low-contrast');
      }
    }
    if (changedProperties.has('hideCloseButton')) {
      if (this.hideCloseButton) {
        button?.setAttribute('hide-close-button', 'true');
      } else {
        button?.removeAttribute('hide-close-button');
      }
    }
    if (changedProperties.has('hasFocus')) {
      if (this.hasFocus) {
        this.focus();
      }
    }
  }

  render() {
    const { _type: type } = this;
    return html`
      <div class="${prefix}--${type}-notification__details">
        ${this._renderIcon()} ${this._renderText()}
      </div>
      <slot name="action"></slot>
      ${this._renderButton()}
    `;
  }

  /**
   * A selector that will return the action button element
   */
  static get selectorActionButton() {
    return `${prefix}-actionable-notification-button`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom Vite loader
}

export default CDSActionableNotification;
