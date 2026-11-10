/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import styles from './number-input.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { INPUT_SIZE } from '../text-input/text-input';

/**
 * Skeleton of number input.
 */
@customElement(`${prefix}-number-input-skeleton`)
class CDSNumberInputSkeleton extends LitElement {
  /**
   * `true` if the label should be hidden. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-label' })
  hideLabel = false;

  /**
   * Specify the size of the Number Input skeleton.
   */
  @property({ reflect: true })
  size?: INPUT_SIZE;

  render() {
    const { hideLabel, size } = this;
    const classes = classMap({
      [`${prefix}--number`]: true,
      [`${prefix}--skeleton`]: true,
      [`${prefix}--number--${size}`]: size !== undefined, // TODO V12 - remove this class
      [`${prefix}--layout--size-${size}`]: size !== undefined,
    });
    return html`
      ${hideLabel
        ? ''
        : html` <span class="${prefix}--label ${prefix}--skeleton"></span> `}
      <div class="${classes}"></div>
    `;
  }

  static styles = styles;
}

export default CDSNumberInputSkeleton;
