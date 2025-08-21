/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './slider.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Skeleton of slider.
 */
@customElement(`${prefix}-slider-skeleton`)
class CDSSliderSkeleton extends LitElement {
  /**
   * `Turn the slider into a range slider.
   */
  @property({ type: Boolean, reflect: true })
  twoHandles = false;

  render() {
    const { twoHandles } = this;
    const containerClasses = classMap({
      [`${prefix}--slider-container`]: true,
      [`${prefix}--skeleton`]: true,
      [`${prefix}--slider-container--two-handles`]: twoHandles,
    });
    const lowerThumbClasses = classMap({
      [`${prefix}--slider__thumb`]: true,
      [`${prefix}--slider__thumb--lower`]: twoHandles,
    });
    const upperThumbClasses = classMap({
      [`${prefix}--slider__thumb`]: true,
      [`${prefix}--slider__thumb--upper`]: twoHandles,
    });
    const lowerThumbWrapperClasses = classMap({
      [`${prefix}--slider__thumb-wrapper`]: true,
      [`${prefix}--slider__thumb-wrapper--lower`]: twoHandles,
    });
    const upperThumbWrapperClasses = classMap({
      [`${prefix}--slider__thumb-wrapper`]: true,
      [`${prefix}--slider__thumb-wrapper--upper`]: twoHandles,
    });
    return html`
      <span class="${prefix}--label ${prefix}--skeleton"></span>
      <div class="${containerClasses}">
        <span class="${prefix}--slider__range-label"></span>
        <div class="${prefix}--slider">
          <div class="${prefix}--slider__track"></div>
          <div class="${prefix}--slider__filled-track"></div>
          ${twoHandles
            ? html`
                <div class="${lowerThumbWrapperClasses}">
                  <div class="${lowerThumbClasses}">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 24"
                      class="${prefix}--slider__thumb-icon ${prefix}--slider__thumb-icon--lower">
                      <path
                        d="M15.08 6.46H16v11.08h-.92zM4.46 17.54c-.25 0-.46-.21-.46-.46V6.92a.465.465 0 0 1 .69-.4l8.77 5.08a.46.46 0 0 1 0 .8l-8.77 5.08c-.07.04-.15.06-.23.06Z"></path>
                      <path fill="none" d="M-4 0h24v24H-4z"></path>
                    </svg>
                  </div>
                </div>
              `
            : html` <div class="${lowerThumbClasses}"></div> `}
          ${twoHandles
            ? html` <div class="${upperThumbWrapperClasses}">
                <div class="${upperThumbClasses}">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 24"
                    class="${prefix}--slider__thumb-icon ${prefix}--slider__thumb-icon--upper">
                    <path
                      d="M0 6.46h.92v11.08H0zM11.54 6.46c.25 0 .46.21.46.46v10.15a.465.465 0 0 1-.69.4L2.54 12.4a.46.46 0 0 1 0-.8l8.77-5.08c.07-.04.15-.06.23-.06Z"></path>
                    <path fill="none" d="M-4 0h24v24H-4z"></path>
                  </svg>
                </div>
              </div>`
            : undefined}
        </div>
        <span class="${prefix}--slider__range-label"></span>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSSliderSkeleton;
