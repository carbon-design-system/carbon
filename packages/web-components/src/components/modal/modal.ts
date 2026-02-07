/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { MODAL_SIZE } from './defs';
import styles from './modal.scss?lit';
import { selectorTabbable } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import '../inline-loading';
import CDSModalFooter from './modal-footer';

export { MODAL_SIZE };

/**
 * Modal.
 *
 * @element cds-modal
 * @csspart dialog The dialog.
 * @fires cds-modal-beingclosed
 *   The custom event fired before this modal is being closed upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of closing this modal.
 * @fires cds-modal-closed - The custom event fired after this modal is closed upon a user gesture.
 */
@customElement(`${prefix}-modal`)
class CDSModal extends HostListenerMixin(LitElement) {
  /**
   * The element that had focus before this modal gets open.
   */
  private _launcher: Element | null = null;

  /**
   * The inline loading element that renders when `loading-status` is not `inactive`
   */
  private _loadingEl: HTMLElement | null = null;

  /**
   * MutationObserver that observes the modal-footer
   */
  private _footerObserver?: MutationObserver;

  /**
   * MutationObserver that observes the modal-header
   */
  private _headerObserver?: MutationObserver;

  /**
   * Loading statuses that are not `inactive`
   */
  private WORKING_LOADING_STATUSES = ['active', 'finished', 'error'];

  /**
   * Handles `click` event on this element.
   *
   * @param event The event.
   */
  @HostListener('click')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClick = (event: MouseEvent) => {
    if (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      event.composedPath().indexOf(this.shadowRoot!) < 0 &&
      !this.preventCloseOnClickOutside
    ) {
      this._handleUserInitiatedClose(event.target);
    }
  };

  /**
   * Handle the keydown event.
   * Trap the focus inside the side-panel by tracking keydown.key == `Tab`
   *
   * @param {KeyboardEvent} event The keyboard event object.
   */
  @HostListener('keydown')
  protected _handleHostKeydown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement | null;
    const { primaryButton } = this._getFooterElements();

    if (
      this.open &&
      this.shouldSubmitOnEnter &&
      event.key === 'Enter' &&
      target &&
      document.activeElement !== primaryButton
    ) {
      const closeButton = (this.constructor as typeof CDSModal)
        .selectorCloseButton;

      const targetIsCloseButton =
        !!target.closest(closeButton) ||
        !!document.activeElement?.closest?.(closeButton);

      if (!targetIsCloseButton) {
        primaryButton?.click();
        return;
      }
    }
    if (event.key === 'Tab') {
      const { first: _firstElement, last: _lastElement } = this.getFocusable();

      if (
        event.shiftKey &&
        (this.shadowRoot?.activeElement === _firstElement ||
          document.activeElement === _firstElement)
      ) {
        event.preventDefault();

        _lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === _lastElement) {
        event.preventDefault();

        _firstElement?.focus();
      }
    }
  };

  @HostListener('document:keydown')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = ({ key, target }: KeyboardEvent) => {
    if (key === 'Esc' || key === 'Escape') {
      this._handleUserInitiatedClose(target);
    }
  };

  /**
   * Get focusable elements.
   *
   * Querying all tabbable items.
   *
   * @returns {{first: HTMLElement, last: HTMLElement, all: HTMLElement[]}} Returns an object with various elements.
   */
  private getFocusable(): {
    first: HTMLElement | undefined;
    last: HTMLElement | undefined;
    all: HTMLElement[];
  } {
    const elements: HTMLElement[] = [];

    // Add tabbable elements inside light DOM
    const tabbableItems = this.querySelectorAll<HTMLElement>(selectorTabbable);
    if (tabbableItems?.length) {
      elements.push(...tabbableItems);
    }

    // Flatten NodeList arrays and filter for focusable items
    const all = elements?.filter(
      (el): el is HTMLElement => typeof el?.focus === 'function'
    );

    return {
      first: all[0],
      last: all[all.length - 1],
      all,
    };
  }

  /**
   * Handles `click` event on the modal container.
   *
   * @param event The event.
   */
  private _handleClickContainer(event: MouseEvent) {
    if (
      (event.target as Element).matches(
        (this.constructor as typeof CDSModal).selectorCloseButton
      ) &&
      !this.preventClose
    ) {
      this._handleUserInitiatedClose(event.target);
    }
  }

  /**
   * Handles user-initiated close request of this modal.
   *
   * @param triggeredBy The element that triggered this close request.
   */
  private _handleUserInitiatedClose(triggeredBy: EventTarget | null) {
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
            (this.constructor as typeof CDSModal).eventBeforeClose,
            init
          )
        )
      ) {
        this.open = false;
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSModal).eventClose,
            init
          )
        );
      }
    }
  }

  /**
   * Handles `slotchange` event.
   */
  private _handleSlotChange() {
    if (this.querySelector(`${prefix}-modal-footer`)) {
      this.setAttribute('has-footer', '');
    } else {
      this.removeAttribute('has-footer');
    }
  }

  /**
   * Specify whether the Modal is displaying an alert, error or warning.
   * Should go hand in hand with the danger prop.
   */
  @property({ type: Boolean, reflect: true })
  alert = false;

  /**
   * Specify text for the accessibility label of the header
   */
  @property({ attribute: 'aria-label' })
  ariaLabel = '';

  /**
   * The additional CSS class names for the container <div> of the element.
   */
  @property({ attribute: 'container-class' })
  containerClass = '';

  /**
   * Specify whether or not the Modal content should have any inner padding.
   */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  /**
   * Specify whether the modal contains scrolling content
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'has-scrolling-content',
  })
  hasScrollingContent = false;

  /**
   * `true` if the modal should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Modal size.
   */
  @property({ reflect: true })
  size = MODAL_SIZE.MEDIUM;

  /**
   * Prevent closing on click outside of modal
   */
  @property({ type: Boolean, attribute: 'prevent-close-on-click-outside' })
  preventCloseOnClickOutside = false;

  /**
   * Specify the loading status
   */
  @property({ reflect: true, attribute: 'loading-status' })
  loadingStatus: 'inactive' | 'active' | 'finished' | 'error' = 'inactive';

  /**
   * Specify the description for the loading text
   */
  @property({ type: String, attribute: 'loading-description' })
  loadingDescription = '';

  /**
   * Provide a delay for the setTimeout for success
   */
  @property({ type: Number, attribute: 'loading-success-delay' })
  loadingSuccessDelay = 1500;

  /**
   * Specify the description for the loading icon
   */
  @property({ type: String, attribute: 'loading-icon-description' })
  loadingIconDescription = 'Loading';

  /**
   * Specify if Enter key should be used as "submit" action that clicks the primary footer button
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'should-submit-on-enter',
  })
  shouldSubmitOnEnter = false;

  /**
   * Prevent the modal from closing after clicking the close button
   */
  @property({ type: Boolean, attribute: 'prevent-close' })
  preventClose = false;

  // Initializes the inline-loading element
  private _initializeLoadingEl(footer: CDSModalFooter) {
    if (!footer) return null;

    if (
      !this._loadingEl &&
      this.WORKING_LOADING_STATUSES.includes(this.loadingStatus)
    ) {
      const el = document.createElement(`${prefix}-inline-loading`);
      el.setAttribute('controlled', '');
      el.setAttribute('aria-live', 'off');
      footer.appendChild(el);
      this._loadingEl = el as HTMLElement;
    }
    return this._loadingEl;
  }

  private _getFooterElements() {
    const footer = this.querySelector(`${prefix}-modal-footer`);

    const primaryButton =
      this.querySelector<HTMLElement>(
        `${prefix}-modal-footer-button[kind="primary"]`
      ) ||
      this.querySelector<HTMLElement>(
        `${prefix}-modal-footer-button[kind="danger"]`
      ) ||
      null;

    const secondaryButtons = Array.from(
      this.querySelectorAll<HTMLElement>(
        `${prefix}-modal-footer-button[kind="secondary"]`
      )
    );

    return { footer, primaryButton, secondaryButtons };
  }

  // Updates the inline loading element in the modal footer
  private _updateLoadingElement() {
    const { footer, primaryButton, secondaryButtons } =
      this._getFooterElements();

    const loader = this._initializeLoadingEl(footer as CDSModalFooter);
    if (!footer || !loader || !primaryButton) return;

    if (this.WORKING_LOADING_STATUSES.includes(this.loadingStatus)) {
      loader.style.display = 'inline-flex';
      loader.setAttribute('status', String(this.loadingStatus));
      loader.setAttribute('aria-live', 'assertive');
      loader.setAttribute(
        'icon-description',
        String(this.loadingIconDescription)
      );
      loader.textContent = this.loadingDescription;
      primaryButton.style.display = 'none';

      if (secondaryButtons[0]) {
        if (!footer.hasAttribute('has-three-buttons')) {
          secondaryButtons[0].setAttribute('disabled', '');
        } else {
          secondaryButtons.forEach((b) => b.removeAttribute('disabled'));
        }
      }

      if (this.loadingStatus === 'finished') {
        // fire event for successful load
        setTimeout(() => {
          this.dispatchEvent(
            new CustomEvent(
              (this.constructor as typeof CDSModal).eventOnLoadingSuccess,
              {
                bubbles: true,
                cancelable: true,
                composed: true,
              }
            )
          );
        }, this.loadingSuccessDelay);
      }
    } else if (this.loadingStatus === 'inactive') {
      loader.style.display = 'none';
      loader.setAttribute('aria-live', 'off');

      if (primaryButton) primaryButton.style.display = '';
      if (secondaryButtons)
        secondaryButtons.forEach((b) => b.removeAttribute('disabled'));
    }
  }

  async firstUpdated() {
    const body = this.querySelector(
      (this.constructor as typeof CDSModal).selectorModalBody
    );

    if (!body) {
      const bodyElement = document.createElement(
        (this.constructor as typeof CDSModal).selectorModalBody
      );
      this.appendChild(bodyElement);
    }
  }

  /**
   * Computes the aria-label of the modal based on (in order of highest to lowest precedence):
   * - `modal-label`
   * - `aria-label`
   * - `modal-heading`
   */
  private _computeAriaLabel(): string {
    const labelEl = this.querySelector(`${prefix}-modal-label`);
    const label = labelEl?.textContent?.trim();
    if (label) return label;

    const ariaLabel = this.ariaLabel?.trim();
    if (ariaLabel) return ariaLabel;

    const headingEl = this.querySelector(`${prefix}-modal-heading`);
    const heading = headingEl?.textContent?.trim();
    return heading || '';
  }

  /**
   * Observes the modal footer's `has-three-buttons` attribute to account for cases
   * where the loading status and the amount of footer-buttons
   * are being changed dynamically
   */
  private _observeFooter() {
    const footer = this.querySelector(`${prefix}-modal-footer`);
    if (!footer) return;

    this._footerObserver = new MutationObserver(() => {
      this._updateLoadingElement();
    });
    this._footerObserver.observe(footer, {
      attributes: true,
      childList: true,
      attributeFilter: ['has-three-buttons'],
    });
  }

  /**
   * Observes the modal header to account for cases where the modal-heading,
   * modal-label, and/or `aria-label` are dynamically changing
   * to update the `aria-label` put on the modal
   */
  private _observeHeader() {
    const header = this.querySelector(`${prefix}-modal-header`);
    if (!header) return;

    this._headerObserver = new MutationObserver(() => {
      this.requestUpdate('ariaLabel');
    });
    this._headerObserver.observe(header, {
      subtree: true,
      characterData: true,
      childList: true,
    });
  }

  connectedCallback() {
    super.connectedCallback?.();
    this._observeFooter();
    this._observeHeader();
  }

  disconnectedCallback() {
    this._footerObserver?.disconnect();
    this._headerObserver?.disconnect();
    super.disconnectedCallback?.();
  }

  render() {
    const { alert, size, hasScrollingContent } = this;
    const containerClass = this.containerClass
      .split(' ')
      .filter(Boolean)
      .reduce((acc, item) => ({ ...acc, [item]: true }), {});
    const containerClasses = classMap({
      [`${prefix}--modal-container`]: true,
      [`${prefix}--modal-container--${size}`]: size,
      ...containerClass,
    });
    return html`
      <div
        aria-label=${this._computeAriaLabel()}
        part="dialog"
        class=${containerClasses}
        aria-modal=${true}
        role="${alert ? 'alert' : 'dialog'}"
        tabindex="-1"
        @click=${this._handleClickContainer}>
        <slot @slotchange="${this._handleSlotChange}"></slot>
        ${hasScrollingContent
          ? html` <div class="cds--modal-content--overflow-indicator"></div> `
          : ``}
      </div>
    `;
  }

  async updated(changedProperties) {
    if (changedProperties.has('open')) {
      if (this.open) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        this._launcher = this.ownerDocument!.activeElement;
        const primaryFocusNode = this.querySelector(
          (this.constructor as typeof CDSModal).selectorPrimaryFocus
        );
        await (this.constructor as typeof CDSModal)._delay();
        if (primaryFocusNode) {
          // For cases where a `carbon-web-components` component (e.g. `<cds-button>`) being `primaryFocusNode`,
          // where its first update/render cycle that makes it focusable happens after `<cds-modal>`'s first update/render cycle
          (primaryFocusNode as HTMLElement).focus();
        } else {
          const { primaryButton, secondaryButtons } = this._getFooterElements();

          if (primaryButton) {
            const kind = primaryButton?.getAttribute('kind');

            if (kind === 'danger' && secondaryButtons[0]) {
              secondaryButtons[0].focus();
            } else {
              primaryButton.focus();
            }
          } else {
            const { first } = this.getFocusable();

            first?.focus();
          }
        }
      } else if (
        this._launcher &&
        typeof (this._launcher as HTMLElement).focus === 'function'
      ) {
        (this._launcher as HTMLElement).focus();
        this._launcher = null;
      }
    }
    if (
      changedProperties.has('loadingStatus') ||
      changedProperties.has('loadingDescription') ||
      changedProperties.has('loadingSuccessDelay') ||
      changedProperties.has('loadingIconDescription')
    ) {
      await (this.constructor as typeof CDSModal)._delay();
      this._updateLoadingElement();
    }
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
   * A selector selecting buttons that should close this modal.
   */
  static get selectorCloseButton() {
    return `[data-modal-close],${prefix}-modal-close-button`;
  }

  /**
   * A selector selecting tabbable nodes.
   */
  static get selectorTabbable() {
    return selectorTabbable;
  }

  /**
   * A selector selecting the nodes that should be focused when modal gets open.
   */
  static get selectorPrimaryFocus() {
    return `[data-modal-primary-focus],${prefix}-modal-footer ${prefix}-button[kind="primary"]`;
  }

  /**
   * A selector selecting the modal body component
   */
  static get selectorModalBody() {
    return `${prefix}-modal-body`;
  }

  /**
   * The name of the custom event fired before this modal is being closed upon a user gesture.
   * Cancellation of this event stops the user-initiated action of closing this modal.
   */
  static get eventBeforeClose() {
    return `${prefix}-modal-beingclosed`;
  }

  /**
   * The name of the custom event fired after this modal is closed upon a user gesture.
   */
  static get eventClose() {
    return `${prefix}-modal-closed`;
  }

  /**
   * The name of the custom event fired when this modal reaches a `finished` loading state
   */
  static get eventOnLoadingSuccess() {
    return `${prefix}-modal-on-loadingsuccess`;
  }

  static styles = styles;
}

export default CDSModal;
