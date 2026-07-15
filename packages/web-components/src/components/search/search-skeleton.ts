/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { SEARCH_SIZE } from './defs';
import styles from './search.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Skeleton of search.
 */
@customElement(`${prefix}-search-skeleton`)
class CDSSearchSkeleton extends LitElement {
  /**
   * The search skeleton size.
   */
  @property({ reflect: true })
  size?: SEARCH_SIZE;

  render() {
    const { size } = this;
    const searchClasses = classMap({
      [`${prefix}--skeleton`]: true,
      [`${prefix}--layout--size-${size}`]: size !== undefined,
    });
    return html`
      <div class="${searchClasses}">
        <div class="${prefix}--search-input"></div>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSSearchSkeleton;
