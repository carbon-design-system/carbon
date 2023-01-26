/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './slider.scss';

const { prefix } = settings;

/**
 * Skeleton of slider.
 */
@customElement(`${prefix}-slider-skeleton`)
class BXSliderSkeleton extends LitElement {
  render() {
    return html`
      <span class="${prefix}--label ${prefix}--skeleton"></span>
      <div class="${prefix}--slider-container ${prefix}--skeleton">
        <span class="${prefix}--slider__range-label"></span>
        <div class="${prefix}--slider">
          <div class="${prefix}--slider__track"></div>
          <div class="${prefix}--slider__filled-track"></div>
          <div class="${prefix}--slider__thumb"></div>
        </div>
        <span class="${prefix}--slider__range-label"></span>
      </div>
    `;
  }

  static styles = styles;
}

export default BXSliderSkeleton;
