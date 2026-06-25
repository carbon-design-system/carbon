/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, nothing, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonPrefix, prefix } from '../../globals/settings';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import { classMap } from 'lit-html/directives/class-map.js';
import '@carbon/web-components/es/components/progress-indicator/index.js';
import styles from './interstitial-screen-header.scss?lit';
import { interstitialDetailsSignal } from './interstitial-screen-context';
import { SignalWatcher } from '@lit-labs/signals';
import { registerFocusableContainers } from '../../utilities/manageFocusTrap/manageFocusTrap';

const blockClass = `${prefix}--interstitial-screen`;
const headerBlockClass = `${blockClass}--internal-header`;

/**
 * interstitial-screen-header for header section
 * @element c4p-interstitial-screen-header
 */
@customElement(`${prefix}-interstitial-screen-header`)
class CDSInterstitialScreenHeader extends SignalWatcher(
  HostListenerMixin(LitElement)
) {
  /**
   * Provide an optional title to be applied to the header.
   */
  @property({ reflect: true, attribute: 'header-title' })
  headerTitle: string = '';
  @property({ reflect: true })
  slot = 'header';
  /**
   * Tooltip text and aria label for the Close button icon.
   */

  @property({ reflect: true, attribute: 'header-subtitle' })
  headerSubTitle: string = '';

  /**
   * Tooltip text and aria label for the Close button icon.
   */
  @property({ reflect: true })
  closeIconDescription: string = 'Close';

  /**
   * Optional parameter to hide the progress indicator when multiple steps are used.
   */
  @property({ type: Boolean, reflect: true })
  hideProgressIndicator: boolean = false;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    registerFocusableContainers(this.shadowRoot);
  }

  private getStepState = (index) => {
    const currentStep = interstitialDetailsSignal.get().currentStep;
    if (index === currentStep) {
      return 'current';
    } else if (index < currentStep) {
      return 'complete';
    } else if (index > currentStep) {
      return 'incomplete';
    }

    return 'invalid';
  };

  /**
   * Handles user-initiated close request of this tearsheet.
   *
   * @param triggeredBy The element that triggered this close request.
   */
  private _handleUserInitiatedClose(triggeredBy: EventTarget | null) {
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        triggeredBy,
      },
    };

    this.dispatchEvent(
      new CustomEvent(
        (
          this.constructor as typeof CDSInterstitialScreenHeader
        ).eventRequestClose,
        init
      )
    );
  }

  getElementForAriaLive = () => {
    const currentStep = interstitialDetailsSignal.get().currentStep;
    const stepDetails = interstitialDetailsSignal.get().stepDetails;
    return html` <div
      aria-live="polite"
      aria-atomic="true"
      class="${carbonPrefix}--visually-hidden"
    >
      Step ${currentStep + 1} of ${stepDetails.length}
    </div>`;
  };
  getProgressIndicatorContent(stepDetails) {
    return html`
      <div class="${blockClass}--progress">
        <cds-progress-indicator>
          ${stepDetails.map(
            (step, index) =>
              html` <cds-progress-step
                label="${step.stepTitle}"
                key="${step.id}"
                state="${this.getStepState(index)}"
              ></cds-progress-step>`
          )}
        </cds-progress-indicator>
        ${this.getElementForAriaLive()}
      </div>
    `;
  }

  getTitleContent() {
    return html` <div class="${blockClass}--titleContainer">
      ${this.headerTitle && html`<h1>${this.headerTitle}</h1>`}
      ${this.headerSubTitle && html`<h2>${this.headerSubTitle}</h2>`}
    </div>`;
  }

  getHeaderContent() {
    const stepDetails = interstitialDetailsSignal.get().stepDetails;

    return html`
     
      ${this.headerTitle || this.headerSubTitle ? this.getTitleContent() : nothing}

          <slot></slot>

          ${
            !this.hideProgressIndicator && stepDetails?.length > 0
              ? this.getProgressIndicatorContent(stepDetails)
              : nothing
          }
        </div>
      
    `;
  }

  render() {
    const { isFullScreen } = interstitialDetailsSignal.get();

    const classes = classMap({
      [`${headerBlockClass}`]: true,
      [`${headerBlockClass}--has-title`]:
        this.headerTitle || this.headerSubTitle, // add check for children
    });
    return isFullScreen
      ? html` <header class="${classes}">${this.getHeaderContent()}</header>`
      : html`<cds-modal-header class="${classes}">
          <cds-modal-close-button
            close-button-label=${this.closeIconDescription}
            @click="${this._handleUserInitiatedClose}"
          ></cds-modal-close-button>

          ${this.getHeaderContent()}
        </cds-modal-header>`;
  }

  static styles = styles;

  static get eventRequestClose() {
    return `${prefix}-request-close`;
  }
}
export default CDSInterstitialScreenHeader;
