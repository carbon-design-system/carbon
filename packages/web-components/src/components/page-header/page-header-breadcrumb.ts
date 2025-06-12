/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import { property } from 'lit/decorators.js';
import styles from './page-header.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Page header Breadcrumb Bar.
 * @element cds-page-header-breadcrumb
 */
@customElement(`${prefix}-page-header-breadcrumb`)
class CDSPageHeaderBreadcrumb extends LitElement {
  /**
   * Specify if breadcrumb bar has bottom border.
   */
  @property({ reflect: true })
  border = true;

  /**
   * Set to `true` if the breadcrumb bar is sitting within a grid
   * (ie. when used in tandem with page-header-hero-image)
   */
  @property({ attribute: 'within-grid', type: Boolean })
  withinGrid = false;

  /**
   * Set to `true` if page actions should be flush (no padding)
   */
  @property({ attribute: 'page-actions-flush', type: Boolean })
  pageActionsFlush = false;

  /**
   * Set to `true` if content actions should be flush (no padding)
   */
  @property({ attribute: 'content-actions-flush', type: Boolean })
  contentActionsFlush = false;

  render() {
    const { withinGrid } = this;
    const gridClasses = classMap({
      [`${prefix}--css-grid`]: !withinGrid,
      [`${prefix}--subgrid ${prefix}--subgrid--wide`]: withinGrid,
    });

    return html`
      <div class="${prefix}--page-header__breadcrumb-bar">
        <div class="${gridClasses}">
          <div
            class="${prefix}--sm:col-span-4 ${prefix}--md:col-span-8 ${prefix}--lg:col-span-16 ${prefix}--css-grid-column">
            <div class="${prefix}--page-header__breadcrumb-container">
              <div class="${prefix}--page-header__breadcrumb-wrapper">
                <slot name="icon"></slot>
                <slot></slot>
              </div>
              <div class="${prefix}--page-header__breadcrumb__actions">
                <slot name="content-actions"></slot>
                <slot name="page-actions"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSPageHeaderBreadcrumb;
