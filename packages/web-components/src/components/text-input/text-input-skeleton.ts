/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import styles from './text-input.scss?lit';
import { INPUT_SIZE } from './defs';

/**
 * @element cds-text-input-skeleton
 *
 * Skeleton of text input.
 */
@customElement(`${prefix}-text-input-skeleton`)
class CDSTextInputSkeleton extends LitElement {
  /**
   * Specify whether the label should be hidden, or not
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-label' })
  hideLabel = false;

  /**
   * The text-input-skeleton size.
   */
  @property({ reflect: true })
  size?: INPUT_SIZE;

  render() {
    const { hideLabel, size } = this;

    const skeletonClasses = classMap({
      [`${prefix}--form-item`]: true,
      [`${prefix}--layout--size-${size}`]: size !== undefined,
    });

    return html`
      <div class=${skeletonClasses}>
        ${hideLabel
          ? ''
          : html`<span class="${prefix}--label ${prefix}--skeleton"></span>`}
        <div class="${prefix}--text-input ${prefix}--skeleton"></div>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSTextInputSkeleton;
