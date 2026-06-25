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
import '@carbon/web-components/es/components/link/index.js';
import styles from './styles.scss?lit';
//import '../../../src/components/coachmark/index.js';
//import '../../../src/components/coachmark/coachmark-tagline/index.js';
import '@carbon/ibm-products-web-components/es/components/coachmark/index.js';
import '@carbon/ibm-products-web-components/es/components/coachmark/coachmark-tagline/index.js'; 


// Animation styles to inject into shadow DOM
const COACHMARK_ANIMATION_STYLES = `
  [part="content"] {
    translate: 0 120px;
    transition: translate 0.24s cubic-bezier(0.2, 0, 0.38, 0.9);
    will-change: translate;
  }
  [part="content"].is-visible {
    translate: 0 0;
  }
`;

// Carousel story data
const items = [
  {
    id: 1,
    title: 'Hello World',
    text: 'Link opens in new tab.',
    button: html`<cds-link href="https://www.ibm.com" target="_blank">Learn more</cds-link>`
  },
  {
    id: 2,
    title: 'Hello World',
    text: 'Link opens on this page.',
    button: html`<cds-link href="https://www.ibm.com">Learn more</cds-link>`
  },
];

@customElement('coachmark-fixed-example')
export class CoachmarkFixedExample extends LitElement {
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
    console.log("next");
    
    this.carouselAPI?.next();
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
        
        // Set initial inert state for inactive slides
        setTimeout(() => {
          this.updateAriaHiddenTabIndex(0);
        }, 50);
      }
    }, 100);
    
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
      // Get shadow DOM elements (used for both opening and closing)
      const coachmark = this.shadowRoot?.querySelector('c4p-coachmark') as any;
      const popoverContent = coachmark?.shadowRoot?.querySelector('cds-popover cds-popover-content') as any;
      const shadowRoot = popoverContent?.shadowRoot;
      const contentPart = shadowRoot?.querySelector('[part="content"]');
      
      if (this._open) {
        // Trigger slide-up transition
        if (shadowRoot && contentPart) {
         
          if (!shadowRoot.querySelector('#coachmark-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'coachmark-animation-styles';
            style.textContent = COACHMARK_ANIMATION_STYLES;
            shadowRoot.appendChild(style);
          }
          
          // Trigger transition by adding class after a brief delay
          requestAnimationFrame(() => {
            contentPart.classList.add('is-visible');
          });
        }
        
        // When coachmark opens, initialize tabIndex and focus Next button
        this.updateAriaHiddenTabIndex(0);
        setTimeout(() => {
          const nextBtn = this.shadowRoot?.querySelector('.next-btn') as HTMLElement;
          nextBtn?.focus();
        }, 100);
      } else {
        // Remove is-visible class when closing
        if (contentPart) {
          contentPart.classList.remove('is-visible');
        }
        
        // When coachmark closes, return focus to tagline trigger (same as React)
        setTimeout(() => {
          // Try to find by ID first (same as React)
          let taglineButton = document.getElementById('CoachmarkTagline');
          
          // Fallback: query from shadowRoot if ID doesn't work
          if (!taglineButton) {
            taglineButton = this.shadowRoot?.querySelector('c4p-coachmark-tagline') as HTMLElement;
          }
          
          taglineButton?.focus();
        }, 100);
      }
    }
  }

  render() {
    return html`
        <c4p-coachmark
          ?open=${this._open}
          align=${POPOVER_ALIGNMENT.TOP}
          .highContrast=${true}
          .caret=${false}
        >
          <c4p-coachmark-tagline
            id="CoachmarkTagline"
            title="Why are there two types of severity scores?"
            close-icon-description="close"
            ?open=${this._open}
            @c4p-coachmark-tagline-cta-click=${this.handleBeaconClick}
            slot="trigger"
          >
          </c4p-coachmark-tagline>
          <c4p-coachmark-header
            closeIconDescription="Close"
          ></c4p-coachmark-header>
          <c4p-coachmark-body class="coachmark-body">
            <div class="exampleCarouselWrapper">
              ${items.map(
                (item) => html`
                  <div>
                    <h2>${item.title}</h2>
                    <p>${item.text}</p>
                    ${item.button}
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

export default CoachmarkFixedExample;