/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { carbonPrefix, prefix } from '../../globals/settings';
import '@carbon/web-components/es/components/modal/index.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

import styles from './interstitial-screen.scss?lit';
import { SignalWatcher } from '@lit-labs/signals';
import {
  interstitialDetailsSignal,
  resetInterstitialDetailsSignal,
  updateInterstitialDetailsSignal,
} from './interstitial-screen-context';
import HostListener from '@carbon/web-components/es/globals/decorators/host-listener';
import {
  trapFocus,
  clearFocusableContainers,
} from '../../utilities/manageFocusTrap/manageFocusTrap';

export const blockClass = `${prefix}--interstitial-screen`;

export type disableButtonConfigType = {
  skip?: boolean;
  back?: boolean;
  next?: boolean;
  start?: boolean;
};
/**
 * interstitial-screen main component
 * @element c4p-interstitial-screen
 * @fires c4p-interstitial-opened -  The custom event triggered after loading the component.
 * Its event.detail will provide you with carousal api methods for step navigation and method to disable any action button
 * * @fires c4p-interstitial-beingclosed - The name of the custom event fired before interstitial is being closed upon a user gesture.
 * Cancellation of this event stops the user-initiated action of closing the interstitial.
 * @fires c4p-interstitial-closed - The name of the custom event fired after this tearsheet is closed upon a user gesture.

 */

@customElement(`${prefix}-interstitial-screen`)
class CDSInterstitialScreen extends SignalWatcher(
  HostListenerMixin(LitElement)
) {
  /**
   * Specifies whether the component is shown as a full-screen
   * experience, else it is shown as a modal by default.
   */

  @property({ type: Boolean, reflect: true, attribute: 'fullscreen' })
  isFullScreen: boolean = false;
  /**
   * Specifies whether the component is currently open.
   */
  @property({ type: Boolean, reflect: true })
  open: boolean = false;

  @state()
  stepDetails: Array<{ stepTitle: string; name?: string }> = [];
  /**
   * @ignore
   */
  @query('cds-modal-body') modalBody!: HTMLElement;

  private _wasOpen = false;
  private _trapFocusAPI: { cleanup: () => void } | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(`${prefix}-request-close`, this._handleClose);
  }
  disconnectedCallback(): void {
    const { carouselAPI } = interstitialDetailsSignal.get();
    carouselAPI?.destroyEvents?.();
    this._trapFocusAPI?.cleanup();
    clearFocusableContainers();
  }
  firstUpdated() {
    this.requestUpdate(); // Ensure re-render
    resetInterstitialDetailsSignal();

    updateInterstitialDetailsSignal({
      name: 'isFullScreen',
      detail: this.isFullScreen,
    });
  }

  updated(changedProps: Map<string | number | symbol, unknown>) {
    if (changedProps.has('open')) {
      const wasOpen = this._wasOpen;
      const isOpen = this.open;

      // Update the signal with the open state
      updateInterstitialDetailsSignal({
        name: 'open',
        detail: isOpen,
      });

      if (!wasOpen && isOpen) {
        this.dispatchInItializeEvent();
        // `focusableContainers` holds the containers where we can query DOM elements.
        // Our strategy here is to let child/slotted components register their containers,
        // which are then passed to `trapFocus`. This allows the utility to query elements
        // directly without being blocked by shadow DOM boundaries.

        this._trapFocusAPI = trapFocus();
      }

      this._wasOpen = isOpen;
    }
  }

  private dispatchInItializeEvent = () => {
    setTimeout(() => {
      const { carouselAPI } = interstitialDetailsSignal.get();
      this.dispatchEvent(
        new CustomEvent(
          (
            this.constructor as typeof CDSInterstitialScreen
          ).eventOnInterstitialOpened,
          {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
              carouselAPI: carouselAPI
                ? {
                    next: carouselAPI.next,
                    prev: carouselAPI.prev,
                    reset: carouselAPI.reset,
                    gotToStep: carouselAPI.goToIndex,
                  }
                : undefined,
              setDisableActionButtons: this.setDisableActionButtons,
            },
          }
        )
      );
    });
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
      this._handleClose(event);
    }
  };

  private setDisableActionButtons = (config: disableButtonConfigType) => {
    updateInterstitialDetailsSignal({ name: 'disableActions', detail: config });
  };

  _handleClose(e) {
    this.open = false;
    e.stopPropagation();

    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        triggeredBy: e.detail.triggeredBy,
      },
    };
    if (
      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSInterstitialScreen).eventBeforeClose,
          init
        )
      )
    ) {
      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSInterstitialScreen).eventClose,
          init
        )
      );

      // Reset carousel and step after close event is dispatched
      const { carouselAPI } = interstitialDetailsSignal.get();
      if (carouselAPI) {
        carouselAPI.reset();
      }

      // Reset the current step to 0
      updateInterstitialDetailsSignal({
        name: 'currentStep',
        detail: 0,
      });
    }
  }

  //template methods

  renderFullScreen() {
    return html`
      <div class="${blockClass}--container">
        <slot name="header"></slot>
        <slot name="body"></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }

  renderModal() {
    return html`<cds-modal
      key=${this.open}
      ?prevent-close-on-click-outside="true"
      class=${blockClass}
      size="lg"
      ?open="${this.open}"
    >
      <slot name="header"></slot>
      <cds-modal-body class="${blockClass}__body-container">
        <slot name="body"></slot>
      </cds-modal-body>
      <cds-modal-footer>
        <slot name="footer"></slot>
      </cds-modal-footer>
    </cds-modal>`;
  }

  render() {
    return this.open
      ? this.isFullScreen
        ? html`${this.renderFullScreen()}`
        : html`${this.renderModal()}`
      : nothing;
  }

  static styles = styles;

  static get eventOnInterstitialOpened() {
    return `${prefix}-interstitial-opened`;
  }
  /**
   
   * The name of the custom event fired before interstitial is being closed upon a user gesture.
   * Cancellation of this event stops the user-initiated action of closing the interstitial.
   */
  static get eventBeforeClose() {
    return `${prefix}-interstitial-beingclosed`;
  }

  /**
   * The name of the custom event fired after this tearsheet is closed upon a user gesture.
   */
  static get eventClose() {
    return `${prefix}-interstitial-closed`;
  }
}

export default CDSInterstitialScreen;
