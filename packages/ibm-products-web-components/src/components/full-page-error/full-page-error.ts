/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import { prefix, carbonPrefix } from '../../globals/settings';

import { error403SVG } from './assets/error403SVG';
import { error404SVG } from './assets/error404SVG';
import { errorGenericSVG } from './assets/errorGenericSVG';
import { Kind } from './types';

import styles from './full-page-error.scss?lit';

const componentName = 'full-page-error';
export const blockClass = `${prefix}--${componentName}`;
const elementName = `${prefix}-${componentName}`; // c4p-full-page-error

const errorData = {
  [Kind.Error403]: {
    svg: error403SVG,
  },
  [Kind.Error404]: {
    svg: error404SVG,
  },
  [Kind.Custom]: {
    svg: errorGenericSVG,
  },
};

/**
 * FullPageError.
 *
 * @element c4p-full-page-error
 */
@customElement(elementName)
class CDSFullPageError extends LitElement {
  static styles = styles;

  /**
   * Sets the label text
   */
  @property({ type: String, reflect: true })
  label: string = 'Error Label';

  /**
   * Sets the description text
   */
  @property({ type: String, reflect: true })
  description?: string;

  /**
   * Sets what kind of error it is. '404' | '403' | 'custom'
   */
  @property({ type: String, reflect: true })
  kind: Kind = Kind.Custom;

  /**
   * Sets the title text
   */
  @property({ type: String, reflect: true })
  title: string = 'Title';

  render() {
    return html` <div class=${blockClass} role="main">
      <div class=${`${blockClass}__container`}>
        <div class=${`${blockClass}__grid ${carbonPrefix}--css-grid `}>
          <div
            class=${`${blockClass}__column ${carbonPrefix}--css-grid-column ${carbonPrefix}--sm:col-span-4 ${carbonPrefix}--md:col-span-3 ${carbonPrefix}--lg:col-span-6`}
          >
            <h1 class=${`${blockClass}__title`}>
              <span class=${`${blockClass}__label`}>
                <span aria-hidden="true">↳ </span>
                ${this.label}
              </span>
              <span>${this.title}</span>
            </h1>
            <p class=${`${blockClass}__description`}>${this.description}</p>
            <div class=${`${blockClass}__body`}><slot></slot></div>
          </div>
          <div
            class=${`${carbonPrefix}--css-grid-column ${carbonPrefix}--sm:col-span-4 ${carbonPrefix}--md:col-span-5 ${carbonPrefix}--lg:col-span-10`}
          >
            <div class=${`${blockClass}__svg-container`}>
              ${errorData[this.kind].svg}
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [elementName]: CDSFullPageError;
  }
}

export default CDSFullPageError;
