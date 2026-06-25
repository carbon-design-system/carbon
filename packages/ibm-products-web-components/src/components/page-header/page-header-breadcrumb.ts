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
import { prefix, carbonPrefix } from '../../globals/settings';
import { property, state } from 'lit/decorators.js';
import styles from './page-header.scss?lit';
import { consume } from '@lit/context';
import { pageHeaderContext } from './context';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

/**
 * Page header Breadcrumb Bar.
 * @element c4p-page-header-breadcrumb
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
   * Aria label for the page header actions navigation.
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

  updated(changedProperties: Map<string, any>) {
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
    const { contentActionsClipped } = context ?? {};
    const gridClasses = classMap({
      [`${carbonPrefix}--css-grid`]: !withinGrid,
      [`${carbonPrefix}--subgrid ${carbonPrefix}--subgrid--wide`]: withinGrid,
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
          class="${carbonPrefix}--sm:col-span-4 ${carbonPrefix}--md:col-span-8 ${carbonPrefix}--lg:col-span-16 ${carbonPrefix}--css-grid-column"
        >
          <div class="${prefix}--page-header__breadcrumb-container">
            <div class="${prefix}--page-header__breadcrumb-wrapper">
              <slot name="icon"></slot>
              <slot></slot>
            </div>
            <div
              class="${prefix}--page-header__breadcrumb__actions"
              role="navigation"
              aria-label="${this.actionsAriaLabel}"
            >
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
