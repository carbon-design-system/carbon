/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import { TAG_SIZE } from './defs';
import styles from './tag.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Skeleton of tag.
 *
 * @element cds-tag-skeleton
 */
@customElement(`${prefix}-tag-skeleton`)
export default class CDSTagSkeleton extends LitElement {
  /**
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  @property({ reflect: true, type: String })
  size = TAG_SIZE.SMALL;

  render() {
    const tagClasses = classMap({
      [`${prefix}--tag`]: true,
      [`${prefix}--skeleton`]: true,
      [`${prefix}--layout--size-${this.size}`]: this.size,
    });
    return html` <span class="${tagClasses}"></span> `;
  }

  static styles = styles;
}
