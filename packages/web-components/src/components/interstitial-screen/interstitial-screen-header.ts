/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, nothing, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { classMap } from 'lit/directives/class-map.js';
import '../progress-indicator/index';
import styles from './interstitial-screen-header.scss?lit';
import { consume } from '@lit/context';
import {
  interstitialContext,
  InterstitialContextValue,
} from './interstitial-screen-context';
import { registerFocusableContainers } from '../../utilities/manageFocusTrap/manageFocusTrap';

const blockClass = `${prefix}--interstitial-screen`;
const headerBlockClass = `${blockClass}--internal-header`;

/**
 * interstitial-screen-header for header section
 * @element cds-interstitial-screen-header
 */
@customElement(`${prefix}-interstitial-screen-header`)
class CDSInterstitialScreenHeader extends HostListenerMixin(LitElement) {
  @property({ reflect: true, attribute: 'header-title' })
  headerTitle: string = '';
  @property({ reflect: true })
  slot = 'header';
  @property({ reflect: true, attribute: 'header-subtitle' })
  headerSubTitle: string = '';
  @property({ reflect: true })
  closeIconDescription: string = 'Close';
  @property({ type: Boolean, reflect: true })
  hideProgressIndicator: boolean = false;

  @consume({ context: interstitialContext, subscribe: true })
  @state()
  private _interstitialCtx?: InterstitialContextValue;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected firstUpdated(_changedProperties?: PropertyValues): void {
    registerFocusableContainers(this.shadowRoot);
  }

  private getStepState = (index) => {
    const currentStep = this._interstitialCtx?.state?.currentStep ?? 0;
    if (index === currentStep) return 'current';
    if (index < currentStep) return 'complete';
    if (index > currentStep) return 'incomplete';
    return 'invalid';
  };

  private _handleUserInitiatedClose(triggeredBy: EventTarget | null) {
    this.dispatchEvent(
      new CustomEvent(
        (
          this.constructor as typeof CDSInterstitialScreenHeader
        ).eventRequestClose,
        {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: { triggeredBy },
        }
      )
    );
  }

  getElementForAriaLive = () => {
    const currentStep = this._interstitialCtx?.state?.currentStep ?? 0;
    const stepDetails = this._interstitialCtx?.state?.stepDetails ?? [];
    return html`<div
      aria-live="polite"
      aria-atomic="true"
      class="${prefix}--visually-hidden">
      Step ${currentStep + 1} of ${stepDetails.length}
    </div>`;
  };

  getProgressIndicatorContent(stepDetails) {
    return html`
      <div class="${blockClass}--progress">
        <cds-progress-indicator>
          ${stepDetails.map(
            (step, index) =>
              html`<cds-progress-step
                label="${step.stepTitle}"
                key="${step.id}"
                state="${this.getStepState(index)}"></cds-progress-step>`
          )}
        </cds-progress-indicator>
        ${this.getElementForAriaLive()}
      </div>
    `;
  }

  getTitleContent() {
    return html`<div class="${blockClass}--titleContainer">
      ${this.headerTitle && html`<h1>${this.headerTitle}</h1>`}
      ${this.headerSubTitle && html`<h2>${this.headerSubTitle}</h2>`}
    </div>`;
  }

  getHeaderContent() {
    const stepDetails = this._interstitialCtx?.state?.stepDetails ?? [];
    return html`
      ${this.headerTitle || this.headerSubTitle
        ? this.getTitleContent()
        : nothing}
      <slot></slot>
      ${!this.hideProgressIndicator && stepDetails?.length > 0
        ? this.getProgressIndicatorContent(stepDetails)
        : nothing}
    `;
  }

  render() {
    const isFullScreen = this._interstitialCtx?.state?.isFullScreen ?? false;
    const classes = classMap({
      [`${headerBlockClass}`]: true,
      [`${headerBlockClass}--has-title`]:
        this.headerTitle || this.headerSubTitle,
    });
    return isFullScreen
      ? html`<header class="${classes}">${this.getHeaderContent()}</header>`
      : html`<cds-modal-header class="${classes}">
          <cds-modal-close-button
            close-button-label=${this.closeIconDescription}
            @click="${(e: MouseEvent) =>
              this._handleUserInitiatedClose(e.target)}">
          </cds-modal-close-button>
          ${this.getHeaderContent()}
        </cds-modal-header>`;
  }

  static styles = styles;

  static get eventRequestClose() {
    return `${prefix}-request-close`;
  }
}
export default CDSInterstitialScreenHeader;
