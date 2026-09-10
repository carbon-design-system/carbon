/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { selectorTabbable } from '../../globals/settings';
import CDSModalFooter from './modal-footer';
import '../inline-loading';

/**
 * Base class for Modal and Dialog components.
 */
export class CDSModalBase extends HostListenerMixin(LitElement) {
  /**
   * The element that had focus before this modal gets open.
   */
  protected _launcher: Element | null = null;

  /**
   * The inline loading element that renders when `loading-status` is not `inactive`
   */
  protected _loadingEl: HTMLElement | null = null;

  /**
   * Loading statuses that are not `inactive`
   */
  protected WORKING_LOADING_STATUSES = ['active', 'finished', 'error'];

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
   * `true` if the modal should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Specify whether the Modal is displaying an alert, error or warning.
   * Should go hand in hand with the danger prop.
   */
  @property({ type: Boolean, reflect: true })
  alert = false;

  /**
   * Prevent closing on click outside of modal
   */
  @property({ type: Boolean, attribute: 'prevent-close-on-click-outside' })
  preventCloseOnClickOutside = false;

  /**
   * Prevent the modal from closing after clicking the close button
   */
  @property({ type: Boolean, attribute: 'prevent-close' })
  preventClose = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange() {
    if (this.querySelector(`${prefix}-modal-footer`)) {
      this.setAttribute('has-footer', '');
    } else {
      this.removeAttribute('has-footer');
    }
  }

  /**
   * Handles `click` event on the modal container.
   *
   * @param event The event.
   */
  protected _handleClickContainer(event: MouseEvent) {
    const { selectorCloseButton } = this.constructor as typeof CDSModalBase;
    if (
      (event.target as Element).matches?.(selectorCloseButton) &&
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
  protected _handleUserInitiatedClose(triggeredBy: EventTarget | null) {
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
            (this.constructor as typeof CDSModalBase).eventBeforeClose,
            init
          )
        )
      ) {
        this.open = false;
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSModalBase).eventClose,
            init
          )
        );
      }
    }
  }

  /**
   * Get focusable elements.
   *
   * Querying all tabbable items.
   *
   * @returns {{first: HTMLElement, last: HTMLElement, all: HTMLElement[]}} Returns an object with various elements.
   */
  protected getFocusable(): {
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

  protected _getFooterElements() {
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

  // Initializes the inline-loading element
  protected _initializeLoadingEl(footer: CDSModalFooter) {
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

  // Updates the inline loading element in the modal footer
  protected _updateLoadingElement() {
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
              (this.constructor as typeof CDSModalBase).eventOnLoadingSuccess,
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

  /**
   * @param ms The number of milliseconds.
   * @returns A promise that is resolves after the given milliseconds.
   */
  protected static _delay(ms = 0) {
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
}

export default CDSModalBase;
