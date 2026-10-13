/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import { property, state } from 'lit/decorators.js';
import styles from './page-header.scss?lit';
import { consume } from '@lit/context';
import { pageHeaderContext } from './context';
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
  @property({ reflect: true, type: Boolean })
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

  /**
   * Aria label for the page header actions toolbar.
   */
  @property({ type: String, attribute: 'actions-aria-label', reflect: true })
  actionsAriaLabel = 'Page header actions';

  @consume({ context: pageHeaderContext, subscribe: true })
  @state()
  context;

  connectedCallback() {
    super.connectedCallback();
    // Apply class on initial connection
    this.updateFixedClass();
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('context')) {
      this.updateFixedClass();
    }
  }

  private updateFixedClass() {
    if (this.context?.disableStickyTabBar) {
      this.classList.add(`${prefix}--page-header-breadcrumb--fixed`);
    } else {
      this.classList.remove(`${prefix}--page-header-breadcrumb--fixed`);
    }
  }

  render() {
    const { withinGrid, context } = this;
    const { contentActionsClipped, fullWidthGrid, narrowGrid } = context ?? {};
    const gridClasses = classMap({
      [`${prefix}--css-grid`]: !withinGrid,
      [`${prefix}--css-grid--full-width`]: !withinGrid && !!fullWidthGrid,
      [`${prefix}--css-grid--narrow`]: !withinGrid && !!narrowGrid,
      [`${prefix}--subgrid ${prefix}--subgrid--wide`]: withinGrid,
    });

    const contentActionClasses = classMap({
      [`${prefix}--page-header__breadcrumb__content-actions-with-global-actions`]:
        true,
      [`${prefix}--page-header__breadcrumb__content-actions-with-global-actions--show`]:
        contentActionsClipped,
    });

    return html`
      <div class="${gridClasses}">
        <div
          class="${prefix}--sm:col-span-4 ${prefix}--md:col-span-8 ${prefix}--lg:col-span-16 ${prefix}--css-grid-column">
          <div class="${prefix}--page-header__breadcrumb-container">
            <div class="${prefix}--page-header__breadcrumb-wrapper">
              <slot name="icon"></slot>
              <slot></slot>
            </div>
            <div
              class="${prefix}--page-header__breadcrumb__actions"
              role="toolbar"
              aria-label="${this.actionsAriaLabel}">
              <div class="${contentActionClasses}">
                <slot name="content-actions"></slot>
              </div>
              <slot name="page-actions"></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSPageHeaderBreadcrumb;
