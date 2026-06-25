/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, PropertyValues } from 'lit';
import { prefix } from '../../globals/settings';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

import styles from './interstitial-screen-body-item.scss?lit';
import { property } from 'lit/decorators.js';
import {
  interstitialDetailsSignal,
  updateInterstitialDetailsSignal,
} from './interstitial-screen-context';
import { registerFocusableContainers } from '../../utilities/manageFocusTrap/manageFocusTrap';

/**
 * interstitial-screen-body-item for body children
 * @element c4p-interstitial-screen-body-item
 */
@customElement(`${prefix}-interstitial-screen-body-item`)
class CDSInterstitialScreenBodyItem extends HostListenerMixin(LitElement) {
  /**
   * This will serve the labels for each step
   */
  @property({ reflect: true })
  stepTitle: string = '';

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.updateStepDetails();
    registerFocusableContainers(this);
  }

  private updateStepDetails() {
    const randomId = crypto?.randomUUID();
    const stepKey = `${this.stepTitle?.replace(/\s+/g, '') || randomId}`;
    const newStep = {
      stepTitle: this.stepTitle,
      id: this.id ?? stepKey,
    };

    const exists = interstitialDetailsSignal
      .get()
      .stepDetails?.some((step) => step.stepTitle === newStep.stepTitle);

    if (!exists && newStep.stepTitle) {
      updateInterstitialDetailsSignal({ name: 'stepDetails', detail: newStep });
    }
  }

  render() {
    return html` <slot @slotchange=${this.updateStepDetails}></slot> `;
  }

  static styles = styles;
}
export default CDSInterstitialScreenBodyItem;
