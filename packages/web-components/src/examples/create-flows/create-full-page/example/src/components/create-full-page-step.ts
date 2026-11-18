/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '@carbon/web-components/es/components/grid/index';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';
import styles from './create-full-page.scss?lit';

const blockClass = 'create-full-page-pattern';
const stepBlockClass = `${blockClass}__step`;

/**
 * CreateFullPageStep component for web components
 */
@customElement('create-full-page-step')
export class CreateFullPageStep extends LitElement {
  /**
   * Step title
   */
  @property({ type: String })
  title = '';

  /**
   * Step subtitle
   */
  @property({ type: String })
  subtitle = '';

  /**
   * Step description
   */
  @property({ type: String })
  description = '';

  /**
   * Whether to wrap content in a fieldset
   */
  @property({ type: Boolean, attribute: 'has-fieldset' })
  hasFieldset = false;

  /**
   * Fieldset legend text
   */
  @property({ type: String, attribute: 'fieldset-legend-text' })
  fieldsetLegendText = '';

  /**
   * Secondary label for the step
   */
  @property({ type: String, attribute: 'secondary-label' })
  secondaryLabel = '';

  /**
   * Whether to disable submit on this step
   */
  @property({ type: Boolean, attribute: 'disable-submit', reflect: true })
  disableSubmit = false;

  /**
   * Whether this step is in an invalid/error state
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * Callback for next action
   */
  @property({ attribute: false })
  onNext?: () => void | Promise<void>;

  /**
   * Callback for previous action
   */
  @property({ attribute: false })
  onPrevious?: () => void | Promise<void>;

  firstUpdated() {
    this.reorganizeContent();
  }

  private reorganizeContent() {
    // Save the original children before we render
    const originalChildren = Array.from(this.children);
    
    // After render, move the original children to the slot location
    requestAnimationFrame(() => {
      const slotContainer = this.hasFieldset
        ? this.querySelector(`.${blockClass}__step-fieldset`)
        : this.querySelector(`.${blockClass}__step-content`);
      
      if (slotContainer) {
        originalChildren.forEach(child => {
          slotContainer.appendChild(child);
        });
      }
    });
  }

  render() {

    return html`
      <section class="${stepBlockClass}">
            <cds-grid>
              <cds-column lg="8" md="4">
                <h2 class="${blockClass}__step-title">
                  ${this.title}
                </h2>
              ${this.subtitle
                ? html`
                      <p class="${blockClass}__step-subtitle">
                        ${this.subtitle}
                      </p>
                  `
                : ''}
              ${this.description
                ? html`
                      <p class="${blockClass}__step-description">
                        ${this.description}
                      </p>
                  `
                : ''}
              <div class="${blockClass}__step-description">
                <slot name="description"></slot>
              </div>
                 </cds-column>
        </cds-grid>

        ${this.hasFieldset
          ? html`
              <fieldset class="${blockClass}__step-fieldset">
                <legend>${this.fieldsetLegendText}</legend>
                <slot></slot>
              </fieldset>
            `
          : html`<div class="${blockClass}__step-content"><slot></slot></div>`}
      </section>
    `;
  }

  static styles = styles;
}


