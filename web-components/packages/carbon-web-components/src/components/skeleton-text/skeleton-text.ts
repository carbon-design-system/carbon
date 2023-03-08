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
import { prefix } from '../../globals/settings';
import { SKELETON_TEXT_TYPE } from './defs';
import styles from './skeleton-text.scss';

export { SKELETON_TEXT_TYPE };

function getRandomInt(min: number, max: number, n: number) {
  const randoms = [0.973051493507435, 0.15334737213558558, 0.5671034553053769];
  return Math.floor(randoms[n % 3] * (max - min + 1)) + min;
}

/**
 * Skeleton text.
 *
 * @element cds-skeleton-text
 */
@customElement(`${prefix}-skeleton-text`)
class BXSkeletonText extends LitElement {
  /**
   * The type of skeleton text.
   */
  @property({ reflect: true })
  type = SKELETON_TEXT_TYPE.REGULAR;

  /**
   * width (in px or %) of single line of text or max-width of paragraph lines
   */
  @property({ reflect: true })
  width = '100%';

  /**
   * will generate multiple lines of text
   */

  @property({ type: Boolean, reflect: true })
  paragraph = false;

  /**
   * the number of lines in a paragraph
   */
  @property({ type: Number, reflect: true })
  lineCount = 3;

  render() {
    const { paragraph, lineCount, type, width } = this;
    const classes = classMap({
      [`${prefix}--skeleton__text`]: true,
      [`${prefix}--skeleton__heading`]: type === SKELETON_TEXT_TYPE.HEADING,
    });
    if (paragraph) {
      const widthNum = parseInt(this.width, 10);
      const widthPx = this.width.includes('px');
      const widthPercent = this.width.includes('%');
      const lines = Array.apply(null, Array(lineCount));
      return html`${lines.map((_, i) => {
        const randomWidth =
          (widthPercent && `${getRandomInt(0, 75, i)}px`) ||
          (widthPx && `${getRandomInt(0, widthNum, i)}px`);
        const style =
          (widthPercent && `width: calc(${width} - ${randomWidth})`) ||
          (widthPx && `width: ${randomWidth}`) ||
          '';
        return html`<p class="${classes}" style="${style}"></p>`;
      })}`;
    }

    return html`<p class="${classes}" style="width:${width}"></p>`;
  }

  static styles = styles;
}

export default BXSkeletonText;
