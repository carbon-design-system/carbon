/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './ai-skeleton.scss';
import '../skeleton-text/skeleton-text';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * AI skeleton text.
 *
 * @element cds-ai-skeleton-text
 */
@customElement(`${prefix}-ai-skeleton-text`)
class CDSAISkeletonText extends LitElement {
  /**
   * Generates skeleton text at a larger size.
   */
  @property({ type: Boolean, reflect: true })
  heading = false;

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
    const { heading, width, lineCount, paragraph } = this;
    return html`<cds-skeleton-text
      type="${heading ? 'heading' : ''}"
      width="${width}"
      linecount="${lineCount}"
      ?paragraph="${paragraph}"
      optional-classes="${prefix}--skeleton__text--ai"></cds-skeleton-text>`;
  }

  static styles = styles;
}

export default CDSAISkeletonText;
