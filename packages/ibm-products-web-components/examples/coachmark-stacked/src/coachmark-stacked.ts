/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { POPOVER_ALIGNMENT } from '@carbon/web-components/es/components/popover/defs.js';
import '@carbon/web-components/es/components/button/button.js';
import { InitCarousel, initCarousel } from '@carbon/utilities';
import '@carbon/web-components/es/components/link/index.js';
import styles from './styles.scss?lit';
import '@carbon/ibm-products-web-components/es/components/coachmark/index.js';
import '@carbon/ibm-products-web-components/es/components/coachmark/coachmark-tagline/index.js'; 
import Idea20 from '@carbon/icons/es/idea/20.js';
import { iconLoader } from "@carbon/web-components/es/globals/internal/icon-loader.js";

// Parent coachmark items (buttons that trigger child coachmarks)
const parentItems = [
  { id: 1, label: 'Example 1' },
  { id: 2, label: 'Example 2' },
  { id: 3, label: 'Example 3' },
];

// Child coachmark content
const nestedItems = [
  {
    id: 1,
    title: 'Short Coachmark',
    text: 'As small as it gets.',
    type: 'simple',
  },
  {
    id: 2,
    type: 'carousel',
    pages: [
      {
        id: '1',
        title: 'Mid-height Coachmark',
        text: html`This should be about the same height as the base stack item.<br /><br />
          This is known as the enrichment phase. Enrichment supports you by emulating how an analyst 
          would evaluate a finding—for example, by adding context, such as whether a certain piece of 
          data is known to be malicious, or is linked...`,
        button: html`<cds-link href="https://www.ibm.com">Learn more</cds-link>`,
      },
      {
        id: '2',
        title: 'Hello World',
        text: 'Link opens in new tab.',
        button: html`<cds-link href="https://www.ibm.com" target="_blank">Learn more</cds-link>`,
      },
    ],
  },
  {
    id: 3,
    type: 'carousel',
    pages: [
      {
        id: '1',
        title: 'Tall Coachmark',
        text: 'These alerts contain data gathered from your connected security systems.',
      },
      {
        id: '2',
        title: 'Alerts contain evidence, known as artifacts',
        text: 'These help to determine whether the alert is good or bad. And as alerts are added to a case, they become findings.',
      },
      {
        id: '3',
        title: 'Findings are enriched with more information and context',
        text: html`This is known as the enrichment phase. Enrichment supports you by emulating how an analyst 
          would evaluate a finding—for example, by adding context, such as whether a certain piece of data 
          is known to be malicious, or is linked to a known threat.<br /><br />
          Lets<br /><br />make<br /><br />this<br /><br />one<br /><br />really<br /><br />tall.`,
      },
      {
        id: '4',
        title: 'Next, the correlation process takes place',
        text: 'Based on the results of the enrichment process, findings that are potentially related are grouped together, and then evaluated.',
      },
      {
        id: '5',
        title: 'Between enrichment and correlation, the severity of a case is determined',
        text: 'And once you know the severity, you can easily choose which case to pick up next.',
      },
    ],
  },
];

@customElement('coachmark-stacked-example')
export class CoachmarkStackedExample extends LitElement {
  static styles = styles;

  @state()
  private _parentOpen: boolean = true;

  @state()
  private _openChildId: number = 0;

  @state()
  private _currentViewIndex: number = 0;

  @state()
  private _lastViewIndex: number = 0;

  @state()
  private _parentHeight: number = 0;

  private carouselAPIs: Map<number, InitCarousel> = new Map();
  private parentButtonRefs: Map<number, HTMLElement> = new Map();
  private lastOpenChildId: number = 0;

  private get currentNestedItem() {
    return nestedItems.find((item) => item.id === this._openChildId);
  }

  private get showBack() {
    return this._currentViewIndex !== 0;
  }

  private get showNext() {
    const item = this.currentNestedItem;
    if (item?.type === 'carousel') {
      return this._currentViewIndex !== item.pages.length - 1;
    }
    return false;
  }

  private get showDone() {
    const item = this.currentNestedItem;
    if (item?.type === 'simple') return true;
    if (item?.type === 'carousel') {
      return this._currentViewIndex === item.pages.length - 1;
    }
    return false;
  }

  private handleParentClose() {
    this._parentOpen = false;
    
    // Focus tagline button after parent closes
    this.updateComplete.then(() => {
      const tagline = this.shadowRoot?.querySelector('#CoachmarkTagline') as any;
      
      if (tagline && tagline.updateComplete) {
        tagline.updateComplete.then(() => {
          // Wait for CSS transition to complete
          setTimeout(() => {
            const taglineButton = tagline.shadowRoot?.querySelector('.c4p--coachmark-tagline__cta') as HTMLElement;
            taglineButton?.focus();
          }, 100);
        });
      }
    });
  }

  private handleTaglineClick() {
    const nextParentOpen = !this._parentOpen;
    this._parentOpen = nextParentOpen;

    if (nextParentOpen) {
      requestAnimationFrame(() => {
        (this.shadowRoot?.querySelector('#parent-button-1') as HTMLElement)?.focus();
      });
    }
  }

  private handleChildButtonClick(id: number, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    const button = event.target as HTMLElement;
    this.parentButtonRefs.set(id, button);
    this.lastOpenChildId = id;
    this._openChildId = id;
    this._currentViewIndex = 0;
  }

  private handleChildClose(event?: Event) {
    event?.stopPropagation();
    event?.preventDefault();
    
    const childId = this._openChildId;
    
    // Reset carousel if it exists
    const carousel = this.carouselAPIs.get(childId);
    if (carousel) {
      carousel.reset();
      this.carouselAPIs.delete(childId);
    }

    // Close the child first
    this._openChildId = 0;
    this._currentViewIndex = 0;
    
    // Ensure parent stays open
    setTimeout(() => {
      this._parentOpen = true;
      
      // Return focus to parent button
      const button = this.parentButtonRefs.get(childId);
      button?.focus();
    }, 50);
  }

  private onViewChangeEnd = (childId: number) => ({ currentIndex, lastIndex }: { currentIndex: number; lastIndex: number }) => {
    this._currentViewIndex = currentIndex;
    this._lastViewIndex = lastIndex;
    
    // Update inert attributes
    this.updateAriaHiddenTabIndex(childId, currentIndex);
    
    // Focus appropriate button
    setTimeout(() => {
      const container = this.shadowRoot?.querySelector(`#child-${childId}`);
      if (currentIndex === lastIndex) {
        const doneBtn = container?.querySelector('.done-btn') as HTMLElement;
        doneBtn?.focus();
      } else {
        const nextBtn = container?.querySelector('.next-btn') as HTMLElement;
        nextBtn?.focus();
      }
    }, 50);
  };

  private updateAriaHiddenTabIndex(childId: number, activeIndex: number) {
    const carousel = this.carouselAPIs.get(childId);
    const allViews = carousel?.allViews;

    if (allViews) {
      Object.values(allViews).forEach((item, idx) => {
        const isActive = idx === activeIndex;
        if (item) {
          item.setAttribute('aria-hidden', String(!isActive));
          if (!isActive) {
            item.setAttribute('inert', '');
          } else {
            item.removeAttribute('inert');
          }
          item.removeAttribute('tabindex');
        }
      });
    }
  }

  private handleNext(childId: number, event?: Event) {
    event?.stopPropagation();
    event?.preventDefault();
    const carousel = this.carouselAPIs.get(childId);
    carousel?.next();
  }

  private handlePrev(childId: number, event?: Event) {
    event?.stopPropagation();
    event?.preventDefault();
    const carousel = this.carouselAPIs.get(childId);
    carousel?.prev();
  }

  firstUpdated() {
    this.captureParentHeight();
    requestAnimationFrame(() => {
      (this.shadowRoot?.querySelector('#parent-button-1') as HTMLElement)?.focus();
    });
  }

  private captureParentHeight() {
    const parentCoachmark = this.shadowRoot?.querySelector('.parent-coachmark c4p-coachmark') as any;
    if (parentCoachmark) {
      const popover = parentCoachmark.shadowRoot?.querySelector('cds-popover');
      const popoverContent = popover?.querySelector('cds-popover-content');
      const contentPart = popoverContent?.shadowRoot?.querySelector('[part="content"]');
      if (contentPart) {
        const height = (contentPart as HTMLElement).clientHeight;
        if (height > 0 && this._parentHeight === 0) {
          this._parentHeight = height;
        }
      }
    }
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('_openChildId')) {
      this.handleParentScaling();
      this.initializeChildCarousel();
    }
  }

  private handleParentScaling() {
    const parentCoachmark = this.shadowRoot?.querySelector('.parent-coachmark c4p-coachmark') as any;
    if (!parentCoachmark) return;

    const popover = parentCoachmark.shadowRoot?.querySelector('cds-popover');
    const popoverContent = popover?.querySelector('cds-popover-content');
    const parentWrapper = this.shadowRoot?.querySelector('.parent-coachmark c4p-coachmark')?.shadowRoot?.querySelector('.c4p--coachmark--wrapper') as HTMLElement;

    if (this._parentHeight === 0 && parentWrapper) {
      const height = parentWrapper.clientHeight;
      if (height > 0) this._parentHeight = height;
    }

    if (!popoverContent || !parentWrapper) return;

    if (this._openChildId > 0 && this._parentOpen !== false) {
      this.scaleParentForChild(parentCoachmark, parentWrapper, popoverContent);
    } else {
      this.restoreParentScale(parentWrapper, popoverContent);
    }
  }

  private scaleParentForChild(parentCoachmark: any, parentWrapper: HTMLElement, popoverContent: HTMLElement) {
    this._parentOpen = true;
    
    this.updateComplete.then(() => {
      const childCoachmark = this.shadowRoot?.querySelector(`#child-${this._openChildId}`) as any;
      const childContentPart = childCoachmark?.shadowRoot
        ?.querySelector('cds-popover cds-popover-content')
        ?.shadowRoot?.querySelector('[part="content"]') as HTMLElement;
      
      if (childContentPart) {
        childContentPart.style.insetInlineStart = '0px';
      }
      
      setTimeout(() => {
        if (childContentPart && parentWrapper) {
          const childWrapper = childCoachmark?.shadowRoot?.querySelector('.c4p--coachmark--wrapper') as HTMLElement;
          const childHeight = childWrapper?.clientHeight || childContentPart.clientHeight;
          
          parentWrapper.style.setProperty('height', `${childHeight + 16}px`);
          parentCoachmark.open = true;
          
          setTimeout(() => {
            requestAnimationFrame(() => {
              this.applyScaleAnimation(popoverContent, false);
            });
          }, 0);
        }
      }, 150);
    });
  }

  private restoreParentScale(parentWrapper: HTMLElement, popoverContent: HTMLElement) {
    this.updateComplete.then(() => {
      requestAnimationFrame(() => {
        parentWrapper.style.setProperty('height', `${this._parentHeight}px`);
        this.applyScaleAnimation(popoverContent, true);
      });
    });
  }

  private applyScaleAnimation(element: HTMLElement, restore: boolean) {
    const transition = 'transform 240ms cubic-bezier(0.2, 0, 0.38, 0.9), opacity 240ms cubic-bezier(0.2, 0, 0.38, 0.9)';
    
    element.style.setProperty('opacity', restore ? '1' : '0.8');
    element.style.setProperty('transform', restore ? 'scale(1)' : 'scaleX(0.9)');
    element.style.setProperty('transform-origin', 'top center');
    element.style.setProperty('transition', transition);
    element.style.pointerEvents = restore ? 'auto' : 'none';
  }

  private initializeChildCarousel() {
    if (this._openChildId <= 0) return;

    const nestedItem = nestedItems.find((item) => item.id === this._openChildId);
    const buttonSelector = nestedItem?.type === 'carousel' ? '.next-btn' : '.done-btn';

    setTimeout(() => {
      if (nestedItem?.type === 'carousel') {
        const carouselContainer = this.shadowRoot?.querySelector(
          `#child-${this._openChildId} .exampleCarouselWrapper`
        ) as HTMLElement;

        if (carouselContainer) {
          let carousel = this.carouselAPIs.get(this._openChildId);
          if (!carousel) {
            carousel = initCarousel(carouselContainer, {
              onViewChangeEnd: this.onViewChangeEnd(this._openChildId),
              useMaxHeight: true,
            });
            this.carouselAPIs.set(this._openChildId, carousel);
          } else {
            carousel.reset();
          }
          
          this.updateComplete.then(() => {
            this.updateAriaHiddenTabIndex(this._openChildId, 0);
            requestAnimationFrame(() => {
              (this.shadowRoot?.querySelector(`#child-${this._openChildId} ${buttonSelector}`) as HTMLElement)?.focus();
            });
          });
        }
      } else {
        (this.shadowRoot?.querySelector(`#child-${this._openChildId} ${buttonSelector}`) as HTMLElement)?.focus();
      }
    }, 100);
  }

  render() {
    return html`
      <!-- Parent Coachmark -->
      <div class="parent-coachmark">
        <c4p-coachmark
          ?open=${this._parentOpen}
          align=${POPOVER_ALIGNMENT.TOP}
          .highContrast=${true}
          .caret=${false}
          @c4p-coachmark-request-close=${this.handleParentClose}
        >
          <c4p-coachmark-tagline
            id="CoachmarkTagline"
            title="Why are there two types of severity scores?"
            close-icon-description="close"
            ?open=${this._parentOpen}
            @c4p-coachmark-tagline-cta-click=${this.handleTaglineClick}
            slot="trigger"
          >
          </c4p-coachmark-tagline>
          <c4p-coachmark-header closeIconDescription="Close"></c4p-coachmark-header>
          <c4p-coachmark-body class="coachmark-stacked-home__body">
            <div class="coachmark-stacked-home-element">
              ${iconLoader(Idea20, { class: 'coachmark-stacked-home__icon-idea' })}
            </div>
            <div class="coachmark-stacked-home__content">
              <h2 class="coachmark-stacked-home__title">Example title</h2>
              <p class="coachmark-stacked-home__body">This is an example of a description</p>
            </div>
            <ul class="coachmark-stacked-home__nav-links">
              ${parentItems.map((item) => html`
                <li key=${item.id}>
                  <cds-button
                    id="parent-button-${item.id}"
                    kind="ghost"
                    size="sm"
                    class="nav-button"
                    @click=${(e: Event) => this.handleChildButtonClick(item.id, e)}
                  >
                    ${item.label}
                  </cds-button>
                </li>
              `)}
            </ul>
            <cds-button
              size="sm"
              @click=${this.handleParentClose}
              class="coachmark-stacked-home__footer"
            >
              Close
            </cds-button>
          </c4p-coachmark-body>
        </c4p-coachmark>
      </div>

      <!-- Child Coachmarks with their trigger buttons -->
      ${parentItems.map((item) => {
        const isOpen = this._openChildId === item.id;
        const nestedItem = nestedItems.find((nested) => nested.id === item.id);
        
        if (!nestedItem) return '';

        return html`
          <c4p-coachmark
            id="child-${item.id}"
            class="stacked_element_content"
            ?open=${isOpen}
            align=${POPOVER_ALIGNMENT.TOP}
            .highContrast=${true}
            .caret=${false}
            @c4p-coachmark-request-close=${(e: Event) => {
              e.stopPropagation();
              this.handleChildClose(e);
            }}
          >
            <!-- Use the button as the trigger -->
            <cds-button
              slot="trigger"
              id="coachmark-trigger-${item.id}"
              kind="ghost"
              size="sm"
              class="coachmark-stacked-home__nav-link"
              @click=${(e: Event) => this.handleChildButtonClick(item.id, e)}
            >
            </cds-button>
            <c4p-coachmark-header closeIconDescription="Close"></c4p-coachmark-header>
            <c4p-coachmark-body>
              ${nestedItem.type === 'simple' ? html`
                <div class="stacked-coachmark__content">
                  <h2 class="stacked-coachmark__title">${nestedItem.title}</h2>
                  <p class="stacked-coachmark__body">${nestedItem.text}</p>
                  <div class="stacked-coachmark__button">
                    <cds-button
                      class="done-btn"
                      size="sm"
                      @click=${this.handleChildClose}
                    >
                      Done
                    </cds-button>
                  </div>
                </div>
              ` : ''}
              
              ${nestedItem.type === 'carousel' ? html`
                <div class="exampleCarouselWrapper">
                  ${nestedItem.pages.map((page) => html`
                    <div>
                      <h2>${page.title}</h2>
                      <p>${page.text}</p>
                      ${page.button ? html`<p>${page.button}</p>` : ''}
                    </div>
                  `)}
                </div>

                <div class="carouselControlWrapper__footer">
                  <div class="carouselControlWrapper--controls-progress">
                    <span>${this._currentViewIndex + 1} / ${nestedItem.pages.length}</span>
                  </div>
                  <div class="carouselControlWrapper--buttons">
                    ${this.showBack ? html`
                      <cds-button
                        class="back-btn"
                        size="sm"
                        kind="ghost"
                        @click=${(e: Event) => this.handlePrev(item.id, e)}
                      >
                        Back
                      </cds-button>
                    ` : ''}
                    ${this.showNext ? html`
                      <cds-button
                        class="next-btn"
                        size="sm"
                        @click=${(e: Event) => this.handleNext(item.id, e)}
                      >
                        Next
                      </cds-button>
                    ` : ''}
                    ${this.showDone ? html`
                      <cds-button
                        class="done-btn"
                        size="sm"
                        @click=${(e: Event) => this.handleChildClose(e)}
                      >
                        Done
                      </cds-button>
                    ` : ''}
                  </div>
                </div>
              ` : ''}
            </c4p-coachmark-body>
          </c4p-coachmark>
        `;
      })}
    `;
  }
}

export default CoachmarkStackedExample;


