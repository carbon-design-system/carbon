/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { BREADCRUMB_SIZE } from './defs';
import styles from './breadcrumb.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
/**
 * Breadcrumb.
 *
 * @element cds-breadcrumb
 */
@customElement(`${prefix}-breadcrumb`)
class CDSBreadcrumb extends LitElement {
  /**
   * Optional prop to omit the trailing slash for the breadcrumbs
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-trailing-slash' })
  noTrailingSlash = false;

  /**
   * Specify the size of the Breadcrumb. Currently
   * supports the following: `sm` & `md` (default: 'md')
   */
  @property({ type: BREADCRUMB_SIZE, reflect: true })
  size = BREADCRUMB_SIZE.MEDIUM;

  /**
   * Handles `slotchange` event.
   */
  private _handleSlotChange({ target }: Event) {
    const items = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(
        (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
    items.forEach((item) => {
      (item as HTMLElement).setAttribute('size', this.size);
    });
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'navigation');
    }
    if (!this.hasAttribute('aria-label')) {
      this.setAttribute('aria-label', 'Breadcrumb');
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('size')) {
      const items = this.querySelectorAll(`${prefix}-breadcrumb-item`);
      items?.forEach((item) => {
        const link = item.querySelector(`${prefix}-breadcrumb-link`);
        link?.setAttribute('size', this.size);
      });
    }
  }

  render() {
    const classes = classMap({
      [`${prefix}--breadcrumb`]: true,
      [`${prefix}--breadcrumb--no-trailing-slash`]: this.noTrailingSlash,
      [`${prefix}--breadcrumb--sm`]: this.size === BREADCRUMB_SIZE.SMALL,
    });
    return html`
      <ol class="${classes}">
        <slot @slotchange="${this._handleSlotChange}"></slot>
      </ol>
    `;
  }

  static styles = styles;
}

export default CDSBreadcrumb;
