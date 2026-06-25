/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import '@carbon/web-components/es/components/modal/index.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import styles from './interstitial-screen-body.scss?lit';
import { InitCarousel, initCarousel } from '@carbon/utilities';
import { ref, createRef } from 'lit/directives/ref.js';
import { SignalWatcher } from '@lit-labs/signals';
import {
  interstitialDetailsSignal,
  updateInterstitialDetailsSignal,
} from './interstitial-screen-context';

const blockClass = `${prefix}--interstitial-screen`;

/**
 * interstitial-screen-body for body section
 * @element c4p-interstitial-screen-body
 * @fires c4p-on-before-step-change - The name of the custom event fired at the start of  the step change.
 * @fires c4p-on-after-step-change -  The name of the custom event fired at the end of  the step change.
 */
@customElement(`${prefix}-interstitial-screen-body`)
class CDSInterstitialScreenBody extends SignalWatcher(
  HostListenerMixin(LitElement)
) {
  @property({ reflect: true })
  slot = 'body';

  @state()
  stepType: 'single' | 'multi' = 'multi';

  private carouselAPI!: InitCarousel;
  private carouselElement = createRef<HTMLElement>();

  firstUpdated(): void {
    const bodyItems = this.querySelectorAll(
      `${prefix}-interstitial-screen-body-item`
    );

    if (bodyItems.length === 1) {
      this.stepType = 'single';
    } else if (bodyItems.length > 1) {
      this.stepType = 'multi';
    }
  }

  updated(changedProps: Map<string | number | symbol, unknown>) {
    super.updated(changedProps);

    // Watch for the open signal
    const { open } = interstitialDetailsSignal.get();

    // Initialize carousel when opened for the first time
    if (open && !this.carouselAPI && this.stepType === 'multi') {
      // Use requestAnimationFrame to ensure the element is fully rendered
      requestAnimationFrame(() => {
        this._initCarousel();
      });
    }
  }

  private _initCarousel() {
    this.carouselAPI = initCarousel(this.carouselElement.value as HTMLElement, {
      onViewChangeEnd: this.onViewChangeEnd,
      onViewChangeStart: this.onViewChangeStart,
      excludeSwipeSupport: true,
      useMaxHeight: true,
    });
    interstitialDetailsSignal.set({
      ...interstitialDetailsSignal.get(),
      carouselAPI: this.carouselAPI,
    });

    this.updateAriaHiddenTabIndex(0);
  }

  private onViewChangeStart = ({ currentIndex, lastIndex, totalViews }) => {
    this.dispatchEvent(
      new CustomEvent(
        (
          this.constructor as typeof CDSInterstitialScreenBody
        ).eventOnViewChangeStart,
        {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            currentStep: currentIndex,
            totalStepCount: totalViews,
            lastStep: lastIndex,
          },
        }
      )
    );
  };
  private onViewChangeEnd = ({ currentIndex, lastIndex, totalViews }) => {
    this.updateAriaHiddenTabIndex(currentIndex);

    updateInterstitialDetailsSignal({
      name: 'currentStep',
      detail: currentIndex,
    });

    this.dispatchEvent(
      new CustomEvent(
        (
          this.constructor as typeof CDSInterstitialScreenBody
        ).eventOnViewChangeEnd,
        {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            currentStep: currentIndex,
            totalStepCount: totalViews,
            lastStep: lastIndex,
          },
        }
      )
    );
  };

  private updateAriaHiddenTabIndex = (itemNumber: number) => {
    const allViews = this.carouselAPI?.allViews;

    allViews &&
      Object.values(allViews)?.forEach((item, idx) => {
        const isActive = idx === itemNumber;

        if (item) {
          // Set aria-hidden based on active state
          item.setAttribute('aria-hidden', String(!isActive));

          if (!isActive) {
            item.setAttribute('inert', ''); // Disable interactivity
          } else {
            item.removeAttribute('inert'); // Re-enable interactivity
          }

          item.removeAttribute('tabindex');
        }
      });
  };

  render() {
    return html`
      <div class="${blockClass}--body">
        ${this.stepType === 'multi'
          ? html`<div
              ${ref(this.carouselElement)}
              class="${blockClass}__carousel"
            >
              <slot></slot>
            </div>`
          : html`<div class="${blockClass}__contentWrapper">
              <slot></slot>
            </div>`}
      </div>
    `;
  }
  static styles = styles;

  /**
   * The name of the custom event fired at the start of  the step change.
   */
  static get eventOnViewChangeStart() {
    return `${prefix}-on-before-step-change`;
  }
  /**
   * The name of the custom event fired at the end of  the step change.
   */
  static get eventOnViewChangeEnd() {
    return `${prefix}-on-after-step-change`;
  }
}

export default CDSInterstitialScreenBody;
