/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import '../modal/index';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import HostListener from '../../globals/decorators/host-listener';

import styles from './interstitial-screen.scss?lit';
import { ContextProvider } from '@lit/context';
import {
  interstitialContext,
  InterstitialContextValue,
  InterstitialState,
  defaultInterstitialState,
} from './interstitial-screen-context';
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
 * @element cds-interstitial-screen
 * @fires cds-interstitial-opened -  The custom event triggered after loading the component.
 * Its event.detail will provide you with carousal api methods for step navigation and method to disable any action button
 * * @fires cds-interstitial-beingclosed - The name of the custom event fired before interstitial is being closed upon a user gesture.
 * Cancellation of this event stops the user-initiated action of closing the interstitial.
 * @fires cds-interstitial-closed - The name of the custom event fired after this tearsheet is closed upon a user gesture.

 */

@customElement(`${prefix}-interstitial-screen`)
class CDSInterstitialScreen extends HostListenerMixin(LitElement) {
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

  /** Lit context provider — scoped to this element instance */
  private _contextProvider = new ContextProvider(this, {
    context: interstitialContext,
    initialValue: {
      state: { ...defaultInterstitialState },
      setState: (patch) => this._updateState(patch),
    } satisfies InterstitialContextValue,
  });

  private _updateState(patch: Partial<InterstitialState>) {
    const current = this._contextProvider.value ?? {
      state: { ...defaultInterstitialState },
      setState: (p) => this._updateState(p),
    };
    this._contextProvider.setValue({
      ...current,
      state: { ...current.state, ...patch },
    });
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(`${prefix}-request-close`, this._handleClose);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    const { carouselAPI } = this._contextProvider.value?.state ?? {};
    carouselAPI?.destroyEvents?.();
    this._trapFocusAPI?.cleanup();
    clearFocusableContainers();
  }

  firstUpdated() {
    this.requestUpdate(); // Ensure re-render
    this._updateState({
      ...defaultInterstitialState,
      isFullScreen: this.isFullScreen,
    });
  }

  updated(changedProps: Map<string | number | symbol, unknown>) {
    if (changedProps.has('open')) {
      const wasOpen = this._wasOpen;
      const isOpen = this.open;

      // Sync open state into context
      this._updateState({ open: isOpen });

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
      const { carouselAPI } = this._contextProvider.value?.state ?? {};
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
                    goToStep: carouselAPI.goToIndex,
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
  // @ts-expect-error: The decorator refers to this method but TS thinks this method is not referred to
  private _handleOutsideClick = (event: MouseEvent) => {
    const modal = this.shadowRoot?.querySelector(`${prefix}-modal`);
    const modalContent = modal?.shadowRoot?.querySelector(
      `.${prefix}--modal-container`
    );
    const path = event.composedPath();
    if (modalContent && !path.includes(modalContent)) {
      this._handleClose(event);
    }
  };

  private setDisableActionButtons = (config: disableButtonConfigType) => {
    this._updateState({ disableActions: config });
  };

  _handleClose(e: Event) {
    this.open = false;
    e.stopPropagation();

    // e may be a CustomEvent (fired by footer/header with detail.triggeredBy)
    // or a raw MouseEvent (fired by _handleOutsideClick — no .detail).
    const triggeredBy = (e as CustomEvent)?.detail?.triggeredBy ?? e.target;

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
      const { carouselAPI } = this._contextProvider.value?.state ?? {};
      if (carouselAPI) {
        carouselAPI.reset();
      }

      // Reset the current step to 0
      this._updateState({ currentStep: 0 });
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
      ?open="${this.open}">
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

  /**
   * The name of the custom event fired after the interstitial is opened.
   */
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
