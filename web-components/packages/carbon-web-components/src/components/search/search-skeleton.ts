/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { INPUT_SIZE } from '../input/input';
import styles from './search.scss';

/**
 * Skeleton of search.
 */
@customElement(`${prefix}-search-skeleton`)
class BXSearchSkeleton extends LitElement {
  /**
   * The search box size. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  size = INPUT_SIZE.MEDIUM;

  render() {
    return html`
      <span class="${prefix}--label"></span>
      <div class="${prefix}--search-input"></div>
    `;
  }

  static styles = styles;
}

export default BXSearchSkeleton;
