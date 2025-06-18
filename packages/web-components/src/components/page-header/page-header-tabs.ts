/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './page-header.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Page header Tabs Bar.
 * @element cds-page-header-tabs
 */
@customElement(`${prefix}-page-header-tabs`)
class CDSPageHeaderTabs extends LitElement {
  render() {
    const {} = this;
    return html` <div class="${prefix}--css-grid">
      <div
        class="${prefix}--sm:col-span-4 ${prefix}--md:col-span-8 ${prefix}--lg:col-span-16 ${prefix}--css-grid-column">
        <div class="${prefix}--page-header__tab-bar--tablist">
          <slot></slot>
          <slot name="tags"></slot>
        </div>
      </div>
    </div>`;
  }

  static styles = styles;
}

export default CDSPageHeaderTabs;
