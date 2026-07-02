/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { DROPDOWN_SIZE } from './defs';
import styles from './dropdown.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Skeleton version of dropdown.
 */
@customElement(`${prefix}-dropdown-skeleton`)
class CDSDropdownSkeleton extends LitElement {
  /**
   * Specify whether the label should be hidden, or not.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-label' })
  hideLabel = false;

  /**
   * Specify the size of the ListBox.
   */
  @property({ reflect: true })
  size = DROPDOWN_SIZE.MEDIUM;

  render() {
    const { hideLabel, size } = this;
    const classes = classMap({
      [`${prefix}--skeleton`]: true,
      [`${prefix}--dropdown`]: true,
      [`${prefix}--list-box--${size}`]: Boolean(size),
    });

    return html`
      ${!hideLabel
        ? html`<span class="${prefix}--label ${prefix}--skeleton"></span>`
        : null}
      <div class=${classes}></div>
    `;
  }

  static styles = styles;
}

export default CDSDropdownSkeleton;
