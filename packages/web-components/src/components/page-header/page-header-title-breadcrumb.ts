/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { consume, ContextConsumer } from '@lit/context';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CDSBreadcrumbItem from '../breadcrumb/breadcrumb-item';
import { prefix } from '../../globals/settings';
import styles from './page-header.scss?lit';
import { pageHeaderContext } from './context';
import { pageHeaderContextType } from './page-header';

/**
 * Page header Title Breadcrumb
 * @element cds-page-header-title-breadcrumb
 */
@customElement(`${prefix}-page-header-title-breadcrumb`)
class CDSPageHeaderTitleBreadcrumb extends CDSBreadcrumbItem {
  @consume({ context: pageHeaderContext, subscribe: true })
  context;

  constructor() {
    super();
    // Use inert (not aria-hidden) to hide the element from both focus and
    // the accessibility tree when it is visually hidden (opacity: 0).
    // aria-hidden was removed: it causes a violation when focusable
    // descendants exist inside shadow DOM (inert alone is sufficient).
    this.setAttribute('inert', '');
    new ContextConsumer(this, {
      context: pageHeaderContext,
      subscribe: true,
      callback: (state) => {
        const isVisible = (state as pageHeaderContextType).titleClipped;

        if (isVisible) {
          this.classList.add(
            `${prefix}--page-header-title-breadcrumb-show__fallback`
          );
          this.removeAttribute('inert');
        } else {
          this.classList.remove(
            `${prefix}--page-header-title-breadcrumb-show__fallback`
          );
          this.setAttribute('inert', '');
        }
        if ((state as pageHeaderContextType).withContent) {
          this.classList.add(
            `${prefix}--page-header-title-breadcrumb-show__with-content`
          );
          this.classList.remove(
            `${prefix}--page-header-title-breadcrumb-show__by-default`
          );
        } else {
          this.classList.remove(
            `${prefix}--page-header-title-breadcrumb-show__with-content`
          );
          this.classList.add(
            `${prefix}--page-header-title-breadcrumb-show__by-default`
          );
          // When showing by default it is always visible — remove inert
          this.removeAttribute('inert');
        }
      },
    });
  }
  render() {
    return html`
      <cds-breadcrumb-item
        class="${prefix}--page-header-title-breadcrumb"
        role="presentation">
        <slot></slot>
      </cds-breadcrumb-item>
    `;
  }

  static styles = styles;
}

export default CDSPageHeaderTitleBreadcrumb;
