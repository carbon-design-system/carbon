/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { POPOVER_ALIGNMENT } from '@carbon/web-components/es/components/popover/defs.js';
import '@carbon/web-components/es/components/button/button.js';
import { InitCarousel, initCarousel } from '@carbon/utilities';
import sampleImage from './_story-assets/sample-image.png';
import styles from './styles.scss?lit';

// Import coachmark components
import '@carbon/ibm-products-web-components/es/components/coachmark/index.js';
import '@carbon/ibm-products-web-components/es/components/coachmark/coachmark-beacon/index.js';

// Carousel story data
const items = [
  {
    id: 1,
    title: 'Example 1',
    text: 'This is an example description.',
  },
  {
    id: 2,
    title: 'Example 2',
    text: 'This is an example description.',
  },
];

@customElement('coachmark-overlay-elements-example')
export class CoachmarkOverlayElementsExample extends LitElement {
  static styles = styles;

  @state()
  private _open: boolean = true;

  @state()
  private _currentViewIndex: number = 0;

  @state()
  private _lastViewIndex: number = items.length - 1;

  private carouselAPI: InitCarousel | null = null;

  private get showBack() {
    return this._currentViewIndex !== 0;
  }

  private get showNext() {
    return this._currentViewIndex !== this._lastViewIndex;
  }

  private get showDone() {
    return this._currentViewIndex === this._lastViewIndex;
  }

  private onViewChangeEnd = ({ currentIndex, lastIndex }: { currentIndex: number; lastIndex: number }) => {
    this._currentViewIndex = currentIndex;
    this._lastViewIndex = lastIndex;
 
    // Update inert attributes after view change
    this.updateAriaHiddenTabIndex(currentIndex);
    
    // Focus the appropriate button after carousel navigation
    setTimeout(() => {
      if (currentIndex === lastIndex) {
        // On last slide, focus the Done button
        const doneBtn = this.shadowRoot?.querySelector('.done-btn') as HTMLElement;
        doneBtn?.focus();
      } else {
        // On other slides, focus the Next button
        const nextBtn = this.shadowRoot?.querySelector('.next-btn') as HTMLElement;
        nextBtn?.focus();
      }
    }, 10);
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

  private handleNext() {
    this.carouselAPI?.next();
        
    // Set initial inert state for inactive slides
    setTimeout(() => {
      this.updateAriaHiddenTabIndex(0);
    }, 50);
   // Listen for coachmark close (when close button is clicked)
    const coachmark = this.shadowRoot?.querySelector('c4p-coachmark') as any;
    if (coachmark) {
      // Watch the coachmark's open property directly
      const checkOpen = () => {
        if (this._open !== coachmark.open) {
          this._open = coachmark.open;
        }
      };
      
      // Check periodically or on property change
      setInterval(checkOpen, 100);
    }
  }

  updated(changedProperties: Map<string, any>) {
    // Watch for _open state changes (similar to React's useEffect)
    if (changedProperties.has('_open')) {
      if (this._open) {
        // When coachmark opens, initialize tabIndex and focus Next button
        this.updateAriaHiddenTabIndex(0);
        setTimeout(() => {
          const nextBtn = this.shadowRoot?.querySelector('.next-btn') as HTMLElement;
          nextBtn?.focus();
        }, 100);
      } else {
        // When coachmark closes, return focus to tagline trigger (same as React)
        setTimeout(() => {
          // Try to find by ID first (same as React)
          let beacon = document.getElementById('CoachmarkBeacon');
          
          // Fallback: query from shadowRoot if ID doesn't work
          if (!beacon) {
            beacon = this.shadowRoot?.querySelector('c4p-coachmark-beacon') as HTMLElement;
          }
          
          beacon?.focus();
        }, 100);
      }
    }
  }

  private handlePrev() {
    this.carouselAPI?.prev();
  }

  private handleClose() {
    this._open = false;
    this.carouselAPI?.reset();
    this._currentViewIndex = 0;
  }

  private handleBeaconClick() {
    this._open = !this._open;
  }

  firstUpdated() {
    // Initialize carousel after first render
    setTimeout(() => {
      const carouselContainer = this.shadowRoot?.querySelector('.exampleCarouselWrapper') as HTMLElement;

      if (carouselContainer && !this.carouselAPI) {
        this.carouselAPI = initCarousel(carouselContainer, {
          onViewChangeEnd: this.onViewChangeEnd,
          excludeSwipeSupport: true,
        });
      }
    }, 100);
  }

  render() {
    return html`
        <c4p-coachmark
          ?open=${this._open}
          align=${POPOVER_ALIGNMENT.TOP}
          .position=${{ x: 150, y: 150 }}
          .highContrast=${true}
        >
          <c4p-coachmark-beacon
            label="Show information"
            ?expanded=${this._open}
            id="CoachmarkBeacon"
            @c4p-coachmark-beacon-clicked=${this.handleBeaconClick}
            slot="trigger"
          >
          </c4p-coachmark-beacon>
          <c4p-coachmark-header
            closeIconDescription="Close"
          ></c4p-coachmark-header>
          <c4p-coachmark-body class="coachmark-body">
            <div>
              <img
                src=${sampleImage}
                style="width: 100%; margin-bottom: 1rem;"
                alt="Sample"
              />
            </div>

            <div class="exampleCarouselWrapper">
              ${items.map(
                (item) => html`
                  <div>
                    <h2>${item.title}</h2>
                    <p>${item.text}</p>
                  </div>
                `
              )}
            </div>

            <div class="carouselControlWrapper__footer">
              <div class="carouselControlWrapper--controls-progress">
                <span class="carousel-progress">${this._currentViewIndex + 1} / ${items.length}</span>
              </div>
              <div class="carouselControlWrapper--buttons">
                ${this.showBack ? html`
                  <cds-button
                    class="back-btn"
                    size="sm"
                    kind="ghost"
                    @click=${this.handlePrev}
                  >
                    Back
                  </cds-button>
                ` : ''}
                ${this.showNext ? html`
                  <cds-button
                    class="next-btn"
                    size="sm"
                    @click=${this.handleNext}
                  >
                    Next
                  </cds-button>
                ` : ''}
                ${this.showDone ? html`
                  <cds-button
                    class="done-btn"
                    size="sm"
                    @click=${this.handleClose}
                  >
                    Done
                  </cds-button>
                ` : ''}
              </div>
            </div>
          </c4p-coachmark-body>
        </c4p-coachmark>
    `;
  }
}

export default CoachmarkOverlayElementsExample;