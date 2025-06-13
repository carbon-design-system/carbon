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
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './page-header.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Page header content.
 * @element cds-page-header-content
 */
@customElement(`${prefix}-page-header-content`)
class CDSPageHeaderContent extends LitElement {
  /**
   * Set to `true` if there are contextual actions
   */
  private _hasContextualActions = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    this._hasContextualActions = Boolean(
      (target as HTMLSlotElement).assignedNodes()
    );
    if (this._hasContextualActions) {
      this.setAttribute('contextual-actions', 'true');
    } else {
      this.removeAttribute('contextual-actions');
    }
    this.requestUpdate();
  }

  /**
   * Title text of the page-header-content
   */
  @property()
  title = '';

  /**
   * Set to `true` if the tag text has ellipsis applied
   */
  @state()
  _hasEllipsisApplied = false;

  /**
   * Set to `true` if the breadcrumb bar is sitting within a grid
   * (ie. when used in tandem with page-header-hero-image)
   */
  @property({ attribute: 'within-grid', type: Boolean })
  withinGrid = false;

  updated() {
    const textContainer = this.shadowRoot?.querySelector(
      `.${prefix}--page-header__content__title`
    );

    if (!textContainer || this._hasEllipsisApplied === true) return;

    this._hasEllipsisApplied =
      textContainer.scrollHeight > textContainer.clientHeight;
  }

  render() {
    const {
      title,
      withinGrid,
      _hasEllipsisApplied: hasEllipsisApplied,
      _handleSlotChange: handleSlotChange,
    } = this;

    const gridClasses = classMap({
      [`${prefix}--css-grid`]: !withinGrid,
      [`${prefix}--subgrid ${prefix}--subgrid--wide`]: withinGrid,
    });

    return html` <div class="${gridClasses}">
      <div
        class="${prefix}--sm:col-span-4 ${prefix}--md:col-span-8 ${prefix}--lg:col-span-16 ${prefix}--css-grid-column">
        <div class="${prefix}--page-header__content__title-wrapper">
          <div class="${prefix}--page-header__content__start">
            <div class="${prefix}--page-header__content__title-container">
              <slot name="icon"></slot>
              ${hasEllipsisApplied
                ? html`
                    <cds-definition-tooltip>
                      <span slot="definition">${title}</span>
                      <h4 class="${prefix}--page-header__content__title">
                        ${title}
                      </h4>
                    </cds-definition-tooltip>
                  `
                : html`
                    <h4 class="${prefix}--page-header__content__title">
                      ${title}
                    </h4>
                  `}
            </div>
            <slot
              name="contextual-actions"
              @slotchange=${handleSlotChange}></slot>
          </div>
          <div class="${prefix}--page-header__content__page-actions">
            <slot name="page-actions"></slot>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>`;
  }

  static styles = styles;
}

export default CDSPageHeaderContent;
