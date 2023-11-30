/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './layer.scss';

/**
 * Basic layer
 *
 * @element cds-layer
 * @slot children - The elements contained within the component.
 */
@customElement(`${prefix}-layer`)
class CDSLayer extends LitElement {
  /**
   * Specify the layer level and override any existing levels based on hierarchy
   */
  @property({ type: Number, reflect: true })
  level = 0;

  @property()
  layers;

  updated() {
    if (!this.layers) {
      this.layers = this.querySelectorAll(
        (this.constructor as typeof CDSLayer).selectorLayer
      );
    }

    this.layers.forEach((item) => {
      (item as HTMLElement).setAttribute(
        'level',
        ((this.level + 1) % 3).toString()
      );
    });

    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof CDSLayer).eventUseLayer, {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          layer: this,
          level: this.level,
        },
      })
    );
  }

  render() {
    return html` <slot></slot> `;
  }

  /**
   * A selector that selects a layer component.
   */
  static get selectorLayer() {
    return `${prefix}-layer`;
  }

  /**
   * A selector that selects a layer component.
   */
  static get eventUseLayer() {
    return `${prefix}-use-layer`;
  }

  static styles = styles;
}

export default CDSLayer;
