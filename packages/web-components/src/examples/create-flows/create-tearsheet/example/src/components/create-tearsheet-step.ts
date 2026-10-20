/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '@carbon/web-components/es/components/grid/index.js';
import styles from '../create-tearsheet.scss?lit';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const blockClass = 'c4p--create-tearsheet';
const stepBlockClass = `${blockClass}__step`;

/**
 * CreateTearsheetStep component for web components
 */
@customElement('create-tearsheet-step')
export class CreateTearsheetStep extends LitElement {
  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  @property({ type: String })
  description = '';

  @property({ type: Boolean, attribute: 'has-fieldset' })
  hasFieldset = false;

  @property({ type: String, attribute: 'fieldset-legend-text' })
  fieldsetLegendText = '';

  @property({ type: Boolean, attribute: 'intro-layout' })
  introLayout = false;

  render() {
    return html`
      <section class="${stepBlockClass}">
        <div class="${blockClass}__step-header">
          <h2 class="${blockClass}__step-title">${this.title}</h2>
          ${this.subtitle
            ? html`
                <p class="${blockClass}__step-subtitle">${this.subtitle}</p>
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
        </div>

        <div class="${blockClass}__step-body">
          ${this.hasFieldset
            ? html`
                <fieldset class="${blockClass}__step-fieldset">
                  <legend>${this.fieldsetLegendText}</legend>
                  <div class="${blockClass}__step-item">
                    <slot></slot>
                  </div>
                </fieldset>
              `
            : html`
                <div
                  class="${blockClass}__step-content${
                    this.introLayout
                      ? ` ${blockClass}__step-content--intro-layout`
                      : ''
                  }">
                  <div
                    class="${blockClass}__step-item${
                      this.introLayout
                        ? ` ${blockClass}__step-item--intro-layout`
                        : ''
                    }">
                    <slot></slot>
                  </div>
                </div>
              `}
        </div>
      </section>
    `;
  }

  static styles = styles;
}

export default CreateTearsheetStep;

