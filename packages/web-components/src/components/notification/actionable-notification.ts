/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import CheckmarkFilled20 from '@carbon/icons/lib/checkmark--filled/20.js';
import ErrorFilled20 from '@carbon/icons/lib/error--filled/20.js';
import InformationFilled20 from '@carbon/icons/lib/information--filled/20.js';
import InformationSquareFilled20 from '@carbon/icons/lib/information--square--filled/20.js';
import WarningFilled20 from '@carbon/icons/lib/warning--filled/20.js';
import WarningAltFilled20 from '@carbon/icons/lib/warning--alt--filled/20.js';
import { html, svg } from 'lit';
import { property, query } from 'lit/decorators.js';
import { prefix, selectorTabbable } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
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

// eslint-disable-next-line no-bitwise
const PRECEDING =
  Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS;
// eslint-disable-next-line no-bitwise
const FOLLOWING =
  Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY;

/**
 * Tries to focus on the given elements and bails out if one of them is successful.
 *
 * @param elems The elements.
 * @param reverse `true` to go through the list in reverse order.
 * @returns `true` if one of the attempts is successful, `false` otherwise.
 */
function tryFocusElems(elems: NodeListOf<HTMLElement>, reverse = false) {
  if (!reverse) {
    for (let i = 0; i < elems.length; ++i) {
      const elem = elems[i];
      elem.focus();
      const active = elem.ownerDocument!.activeElement;
      if (
        active === elem ||
        active?.contains(elem) ||
        active?.shadowRoot?.contains(elem)
      ) {
        return true;
      }
    }
  } else {
    for (let i = elems.length - 1; i >= 0; --i) {
      const elem = elems[i];
      elem.focus();
      const active = elem.ownerDocument!.activeElement;
      if (
        active === elem ||
        active?.contains(elem) ||
        active?.shadowRoot?.contains(elem)
      ) {
        return true;
      }
    }
  }
  return false;
}

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
   * Node to track focus going outside of actionable notification content.
   */
  @query('#start-sentinel')
  private _startSentinelNode!: HTMLAnchorElement;

  /**
   * Node to track focus going outside of actionable notification content.
   */
  @query('#end-sentinel')
  private _endSentinelNode!: HTMLAnchorElement;

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

  @HostListener('shadowRoot:focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleBlur = async ({ target, relatedTarget }: FocusEvent) => {
    const {
      open,
      _startSentinelNode: startSentinelNode,
      _endSentinelNode: endSentinelNode,
    } = this;
    const oldContains =
      target !== this &&
      (this.contains(target as Node) ||
        (this.shadowRoot?.contains(target as Node) &&
          target !== (startSentinelNode as Node) &&
          target !== (endSentinelNode as Node)));
    const currentContains =
      relatedTarget !== this &&
      (this.contains(relatedTarget as Node) ||
        (this.shadowRoot?.contains(relatedTarget as Node) &&
          relatedTarget !== (startSentinelNode as Node) &&
          relatedTarget !== (endSentinelNode as Node)));

    // Performs focus wrapping if _all_ of the following is met:
    // * This notification is open
    // * Notification role attribute is set to 'alertdialog'
    // * The viewport still has focus
    // * Notification body used to have focus but no longer has focus
    const { selectorTabbable: selectorTabbableForActionableNotification } = this
      .constructor as typeof CDSActionableNotification;
    if (
      open &&
      this.getAttribute('role') === 'alertdialog' &&
      relatedTarget &&
      !(relatedTarget instanceof CDSActionableNotification) &&
      oldContains &&
      !currentContains
    ) {
      const comparisonResult = (target as Node).compareDocumentPosition(
        relatedTarget as Node
      );
      // tabbable elements in Shadow root
      const shadowElems = this.shadowRoot!.querySelectorAll(
        selectorTabbableForActionableNotification
      );
      // tabbable elements in light DOM
      const lightElems = this.querySelectorAll(
        selectorTabbableForActionableNotification
      );
      // eslint-disable-next-line no-bitwise
      if (relatedTarget === startSentinelNode || comparisonResult & PRECEDING) {
        await (this.constructor as typeof CDSActionableNotification)._delay();
        if (
          !tryFocusElems(shadowElems as NodeListOf<HTMLElement>, true) &&
          !tryFocusElems(lightElems as NodeListOf<HTMLElement>, true) &&
          relatedTarget !== this
        ) {
          this.focus();
        }
      }
      // eslint-disable-next-line no-bitwise
      else if (
        relatedTarget === endSentinelNode ||
        comparisonResult & FOLLOWING
      ) {
        await (this.constructor as typeof CDSActionableNotification)._delay();
        if (
          !tryFocusElems(lightElems as NodeListOf<HTMLElement>) &&
          !tryFocusElems(shadowElems as NodeListOf<HTMLElement>)
        ) {
          this.focus();
        }
      }
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
      <a
        id="start-sentinel"
        class="${prefix}--visually-hidden"
        href="javascript:void 0"
        role="navigation"></a>
      <div class="${prefix}--${type}-notification__details">
        ${this._renderIcon()} ${this._renderText()}
      </div>
      <slot name="action"></slot>
      ${this._renderButton()}
      <a
        id="end-sentinel"
        class="${prefix}--visually-hidden"
        href="javascript:void 0"
        role="navigation"></a>
    `;
  }

  /**
   * @param ms The number of milliseconds.
   * @returns A promise that is resolves after the given milliseconds.
   */
  private static _delay(ms = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  /**
   * A selector selecting tabbable nodes.
   */
  static get selectorTabbable() {
    return selectorTabbable;
  }

  /**
   * A selector that will return the action button element
   */
  static get selectorActionButton() {
    return `${prefix}-actionable-notification-button`;
  }

  static styles = styles;
}

export default CDSActionableNotification;
