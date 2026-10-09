/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, PropertyValues } from 'lit';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

import styles from './interstitial-screen-body-item.scss?lit';
import { property, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import {
  interstitialContext,
  InterstitialContextValue,
} from './interstitial-screen-context';
import { registerFocusableContainers } from '../../utilities/manageFocusTrap/manageFocusTrap';

/**
 * interstitial-screen-body-item for body children
 * @element cds-interstitial-screen-body-item
 */
@customElement(`${prefix}-interstitial-screen-body-item`)
class CDSInterstitialScreenBodyItem extends HostListenerMixin(LitElement) {
  @property({ reflect: true })
  stepTitle: string = '';

  @consume({ context: interstitialContext, subscribe: true })
  @state()
  private _interstitialCtx?: InterstitialContextValue;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected firstUpdated(_changedProperties?: PropertyValues): void {
    this.updateStepDetails();
    registerFocusableContainers(this);
  }

  private updateStepDetails() {
    const randomId = crypto?.randomUUID();
    const stepKey = `${this.stepTitle?.replace(/\s+/g, '') || randomId}`;
    const newStep = {
      stepTitle: this.stepTitle,
      id: this.id || stepKey,
    };

    const currentStepDetails = this._interstitialCtx?.state?.stepDetails ?? [];
    const exists = currentStepDetails.some(
      (step) => step.stepTitle === newStep.stepTitle
    );

    if (!exists && newStep.stepTitle) {
      // Append to the existing stepDetails array
      this._interstitialCtx?.setState({
        stepDetails: [...currentStepDetails, newStep],
      });
    }
  }

  render() {
    return html`<slot @slotchange=${this.updateStepDetails}></slot>`;
  }

  static styles = styles;
}
export default CDSInterstitialScreenBodyItem;
