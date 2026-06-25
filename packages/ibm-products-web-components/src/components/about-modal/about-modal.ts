/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { prefix, carbonPrefix } from '../../globals/settings';
import HostListener from '@carbon/web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import '@carbon/web-components/es/components/modal/index.js';
import styles from './about-modal.scss?lit';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
export const blockClass = `${prefix}--about-modal`;

/**
 * About Modal.
 *
 * @element c4p-about-modal
 * @csspart dialog The dialog.
 *   The custom event fired before this about modal is being closed upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of closing this about modal.
 * @fires c4p-about-modal-beingclosed
 *   The custom event fired before this about modal is being closed upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of closing this about modal.
 * @fires c4p-about-modal-closed - The custom event fired after this about modal is closed upon a user gesture.
 */
@customElement(`${prefix}-about-modal`)
class CDSAboutModal extends HostListenerMixin(LitElement) {
  /**
   * Determines if About Modal is open or not.
   */
  @property({ reflect: true, type: Boolean })
  open = true;

  /**
   * Determines if About Modal is open or not.
   */
  @property({ type: String })
  closeIconDescription = 'close';

  /**
   * Determines if About Modal is open or not.
   */
  @property({ type: String })
  copyrightText;

  /**
   * A visual symbol used to represent the product.
   */
  @property()
  logo;

  /**
   * Text that provides information on the version number of your product.
   */
  @property({ type: String })
  version;

  /**
   * Header text that provides the product name. The IBM Services logo consists of two discrete, but required, elements: the iconic IBM 8-bar logo represented alongside the IBM Services logotype. Please follow these guidelines to ensure proper execution.
   */
  @property()
  title;

  /**
   * If you are legally required to display logos of technologies used to build your product you can provide this in the additionalInfo. Additional information will be displayed in the footer.
   */
  @property()
  additionalInfo;

  /**
   * Subhead text providing any relevant product disclaimers including legal information (optional)
   */
  @property()
  content;

  /**
   * An array of Carbon `Link` component if there are additional information to call out within the card. The about modal should be used to display the product information and not where users go to find help (optional)
   */
  @property()
  links;
  /**
   * To check if the modal body is overflowing or not.
   */
  @state() private isOverflowing = false;

  @query('cds-modal-body') private container!: HTMLElement;

  firstUpdated() {
    this._checkOverflow();
  }

  updated() {
    this._checkOverflow();
  }
  render() {
    const {
      open,
      closeIconDescription,
      _handleClose: handleClose,
      logo,
      title,
      version,
      additionalInfo,
      content,
      links,
      copyrightText,
    } = this;
    return html`
      <cds-modal ?open=${open}>
        <div class=${`${blockClass}__logo`}>${logo}</div>
        <cds-modal-header>
          <cds-modal-close-button
            @click=${handleClose}
            close-button-label=${closeIconDescription}
          ></cds-modal-close-button>
          <cds-modal-heading>${title}</cds-modal-heading>
        </cds-modal-header>
        <cds-modal-body
          class="${this.isOverflowing
            ? `${carbonPrefix}--modal-scroll-content`
            : ''}"
          tabindex="0"
          role="region"
          aria-label="Modal content"
        >
          <div class=${`${blockClass}__body-content`}>
            <div class=${`${blockClass}__version`}>${version}</div>
            ${links &&
            links.length > 0 &&
            html` <div class=${`${blockClass}__links-container`}>
              ${links.map((link) => link)}
            </div>`}
            ${content &&
            html`<p class=${`${blockClass}__content`}>${content}</p>`}
            ${copyrightText &&
            html`
              <p class=${`${blockClass}__copyright-text`}>${copyrightText}</p>
            `}
          </div>
        </cds-modal-body>
        ${additionalInfo &&
        html` <cds-modal-footer> ${additionalInfo} </cds-modal-footer> `}
      </cds-modal>
    `;
  }

  @HostListener('document:keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = ({ key, target }: KeyboardEvent) => {
    if (key === 'Esc' || key === 'Escape') {
      this._handleClose(target);
    }
  };
  /**
   * Handles `click` event on this element.
   *
   * @param event The event.
   */
  @HostListener('click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleOutsideClick = (event: MouseEvent) => {
    const modal = this.shadowRoot?.querySelector(`${carbonPrefix}-modal`);
    const modalContent = modal?.shadowRoot?.querySelector(
      `.${carbonPrefix}--modal-container`
    );
    const path = event.composedPath();
    if (modalContent && !path.includes(modalContent)) {
      this._handleClose(event.target);
    }
  };

  /**
   * Handles user-initiated close request of this About Modal.
   *
   * @param triggeredBy The element that triggered this close request.
   */
  private _handleClose = (triggeredBy: EventTarget | null) => {
    this.open = false;
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
          (this.constructor as typeof CDSAboutModal).eventBeforeClose,
          init
        )
      )
    ) {
      this.open = false;
      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSAboutModal).eventClose,
          init
        )
      );
    }
  };

  private _checkOverflow() {
    if (this.container) {
      this.isOverflowing =
        this.container.scrollHeight > this.container.clientHeight;
    }
  }

  /**
   * The name of the custom event fired after this About Modal is closed upon a user gesture.
   */

  static get eventClose() {
    return `${prefix}-about-modal-closed`;
  }
  /**
   * The name of the custom event fired before this About modal is being closed upon a user gesture.
   * Cancellation of this event stops the user-initiated action of closing this About modal.
   */
  static get eventBeforeClose() {
    return `${prefix}-about-modal-beingclosed`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSAboutModal;
