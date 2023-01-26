/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import settings from 'carbon-components/es/globals/js/settings';
import { SKELETON_TEXT_TYPE } from './defs';
import styles from './skeleton-text.scss';

export { SKELETON_TEXT_TYPE };

const { prefix } = settings;

/**
 * Skeleton text.
 *
 * @element bx-skeleton-text
 */
@customElement(`${prefix}-skeleton-text`)
class BXSkeletonText extends LitElement {
  /**
   * The type of skeleton text.
   */
  @property({ reflect: true })
  type = SKELETON_TEXT_TYPE.REGULAR;

  render() {
    const { type } = this;
    const classes = classMap({
      [`${prefix}--skeleton__text`]: true,
      [`${prefix}--skeleton__heading`]: type === SKELETON_TEXT_TYPE.HEADING,
    });
    return html` <p class="${classes}"></p> `;
  }

  static styles = styles;
}

export default BXSkeletonText;
