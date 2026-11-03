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
import { property, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { prefix } from '../../globals/settings';
import styles from './page-header.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSPageHeader from './page-header';
import { pageHeaderContext } from './context';

/**
 * Page header Tabs Bar.
 * @element cds-page-header-tabs
 */
@customElement(`${prefix}-page-header-tabs`)
class CDSPageHeaderTabs extends LitElement {
  /**
   * Disable sticky positioning for the tab bar
   */
  @property({ type: Boolean, attribute: 'disable-sticky-tab-bar' })
  disableStickyTabBar = false;

  @consume({ context: pageHeaderContext, subscribe: true })
  @state()
  context;

  connectedCallback() {
    super.connectedCallback();
    this.updateContext();
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('disableStickyTabBar')) {
      this.updateContext();
    }
  }

  private updateContext() {
    const pageHeader = this.closest(`${prefix}-page-header`) as CDSPageHeader;
    if (pageHeader) {
      // Create a new object to trigger reactivity
      pageHeader.context = {
        ...pageHeader.context,
        disableStickyTabBar: this.disableStickyTabBar,
      };
      // Force update
      pageHeader.requestUpdate('context');
    }
  }

  render() {
    const { fullWidthGrid, narrowGrid } = this.context ?? {};
    const gridClasses = classMap({
      [`${prefix}--css-grid`]: true,
      [`${prefix}--css-grid--full-width`]: !!fullWidthGrid,
      [`${prefix}--css-grid--narrow`]: !!narrowGrid,
    });
    return html`
      <div class="${gridClasses}">
        <div
          class="${prefix}--sm:col-span-4 ${prefix}--md:col-span-8 ${prefix}--lg:col-span-16 ${prefix}--css-grid-column">
          <div class="${prefix}--page-header__tab-bar--tablist">
            <slot></slot>
            <slot name="tags"></slot>
          </div>
        </div>
        <slot name="scroller"></slot>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSPageHeaderTabs;
