/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
   * The search box size. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  size = SEARCH_SIZE.MEDIUM;

  render() {
    return html`
      <span class="${prefix}--label ${prefix}--skeleton"></span>
      <div class="${prefix}--text-input ${prefix}--skeleton"></div>
    `;
  }

  static styles = styles;
}

export default CDSSearchSkeleton;
