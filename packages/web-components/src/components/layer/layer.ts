/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';
import styles from './layer.scss?lit';

/**
 * Layer level constants
 */
export const MIN_LEVEL = 0;
export const MAX_LEVEL = 2;
export const levels = ['zero', 'one', 'two'];
export type LayerLevel = 0 | 1 | 2;

/**
 * Basic layer
 *
 * @element cds-layer
 * @fires cds-use-layer
 *   The custom event that returns the layer level and the layer element.
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
      const nextLevel = Math.max(
        MIN_LEVEL,
        Math.min(this.level + 1, MAX_LEVEL)
      );
      (item as HTMLElement).setAttribute('level', nextLevel.toString());
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
