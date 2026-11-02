/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { keyed } from 'lit/directives/keyed.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';
import '@carbon/web-components/es/components/progress-indicator/index.js';
import styles from './create-full-page.scss?lit';

const blockClass = 'create-influencer';

export interface StepData {
  introStep?: boolean;
  secondaryLabel?: string;
  shouldIncludeStep?: boolean;
  title?: string;
  invalid?: boolean;
  disableSubmit?: boolean;
}

/**
 * CreateInfluencer component for web components
 */
@customElement('create-influencer')
export class CreateInfluencer extends LitElement {
  /**
   * Current step index (1-based)
   */
  @property({ type: Number, attribute: 'current-step' })
  currentStep = 1;

  /**
   * Step data array
   */
  @property({ type: Array, attribute: 'step-data' })
  stepData: StepData[] = [];

  /**
   * Influencer title
   */
  @property({ type: String })
  title = '';

  /**
   * Callback when a step is clicked
   */
  @property({ attribute: false })
  onClickStep?: (step: number) => void;

  private getNumberOfDynamicStepsBeforeCurrentStep(
    array: StepData[],
    key: keyof StepData
  ): number {
    const dynamicSteps: StepData[] = [];
    array.forEach((item, index) => {
      if (item[key] === false && index <= this.currentStep - 1) {
        dynamicSteps.push(item);
      }
    });
    return dynamicSteps.length;
  }

  private handleStepChange(event: CustomEvent) {
    const newIndex = event.detail.index;
    if (this.onClickStep) {
      this.onClickStep(newIndex);
    }
  }

  private renderProgressSteps() {
    const extractedSteps = this.stepData?.filter((item) => !item?.introStep);
    const progressSteps = extractedSteps?.filter(
      (item) => item?.shouldIncludeStep !== false
    );

    // To get the ProgressIndicator's `currentIndex`, accounting for dynamic steps,
    // we need to subtract the number of !shouldIncludeStep/s before the current step
    const totalDynamicSteps =
      this.getNumberOfDynamicStepsBeforeCurrentStep(
        this.stepData,
        'shouldIncludeStep'
      ) || 0;

    const currentIndex =
      this.stepData[0]?.introStep
        ? this.currentStep - totalDynamicSteps - 2 // minus 2 because we need to account for the intro step
        : this.currentStep - totalDynamicSteps - 1; // minus 1 because ProgressIndicator currentIndex prop is 0 index based

    // Use step count as a key to force complete re-render when steps change
    const stepCountKey = progressSteps.length;
    
    return html`
      <div class="${blockClass}__left-nav">
        ${this.title
          ? html`<h2 class="${blockClass}__title">${this.title}</h2>`
          : ''}
        ${this.currentStep === 1 && this.stepData[0]?.introStep
          ? ''
          : keyed(
              stepCountKey,
              html`
                <cds-progress-indicator
                  class="${blockClass}__progress-indicator"
                  vertical
                  space-equally
                  current-index="${currentIndex}"
                  @cds-progress-indicator-changed="${this.handleStepChange}"
                >
                  ${progressSteps.map(
                    (step: StepData, stepIndex: number) => html`
                      <cds-progress-step
                        label="${step?.title || ''}"
                        secondary-label="${step.secondaryLabel || ''}"
                        ?invalid="${step.invalid}"
                        ?complete="${stepIndex < currentIndex}"
                      ></cds-progress-step>
                    `
                  )}
                </cds-progress-indicator>
              `
            )}
      </div>
    `;
  }

  render() {
    const classes = {
      [blockClass]: true,
    };

    return html`
      <div class="${classMap(classes)}">${this.renderProgressSteps()}</div>
    `;
  }

  static styles = styles;
}
