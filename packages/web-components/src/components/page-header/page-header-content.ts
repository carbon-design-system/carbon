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
import { property, query, state } from 'lit/decorators.js';
import { consume } from '@lit/context';
import { unsafeStatic, html as staticHtml } from 'lit/static-html.js';
import { prefix } from '../../globals/settings';
import '../tooltip/index';
import styles from './page-header.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { pageHeaderContext } from './context';

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
   * Set to `true` if there is custom title slot content
   */
  @state()
  private _hasTitleSlotContent = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    this._hasContextualActions =
      (target as HTMLSlotElement).assignedNodes().length > 0;
    if (this._hasContextualActions) {
      this.setAttribute('contextual-actions', 'true');
    } else {
      this.removeAttribute('contextual-actions');
    }
    this.requestUpdate();
  }

  /**
   * Handles `slotchange` for the title slot.
   */
  protected _handleTitleSlotChange({ target }: Event) {
    this._hasTitleSlotContent =
      (target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  }

  /**
   * Title text of the page-header-content
   */
  @property()
  title = '';

  /**
   * Heading level for the title (h1-h6).
   */
  @property({ type: String, attribute: 'title-level' })
  titleLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';

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

  @consume({ context: pageHeaderContext, subscribe: true })
  context;

  /**
   * The page-actions wrapper element. Observed by the root for contentActionsClipped.
   */
  @query(`.${prefix}--page-header__content__page-actions`)
  private _pageActionsEl: HTMLElement | undefined;

  firstUpdated() {
    // Notify the root page-header of the page-actions container element so it
    // can observe it with IntersectionObserver instead of the full content element.
    this.dispatchEvent(
      new CustomEvent(`${prefix}-page-header-content-actions-registered`, {
        bubbles: true,
        composed: true,
        detail: { actionsEl: this._pageActionsEl },
      })
    );
  }

  updated() {
    const textContainer = this.shadowRoot?.querySelector(
      `.${prefix}--page-header__content__title`
    );

    if (!textContainer || this._hasEllipsisApplied === true) {
      return;
    }

    this._hasEllipsisApplied =
      textContainer.scrollHeight > textContainer.clientHeight;
  }

  render() {
    const {
      title,
      withinGrid,
      _hasEllipsisApplied: hasEllipsisApplied,
      _handleSlotChange: handleSlotChange,
      context,
    } = this;

    const { contentActionsClipped, fullWidthGrid, narrowGrid } = context ?? {};

    const gridClasses = classMap({
      [`${prefix}--css-grid`]: !withinGrid,
      [`${prefix}--css-grid--full-width`]: !withinGrid && !!fullWidthGrid,
      [`${prefix}--css-grid--narrow`]: !withinGrid && !!narrowGrid,
      [`${prefix}--subgrid ${prefix}--subgrid--wide`]: withinGrid,
    });

    const contentActionClasses = classMap({
      [`${prefix}--page-header__content__page-actions`]: true,
      [`${prefix}--page-header__content__page-actions--clipped`]:
        contentActionsClipped,
    });

    const titleTag = unsafeStatic(this.titleLevel);
    const { _hasTitleSlotContent: hasTitleSlotContent } = this;

    return html` <div class="${gridClasses}">
      <div
        class="${prefix}--sm:col-span-4 ${prefix}--md:col-span-8 ${prefix}--lg:col-span-16 ${prefix}--css-grid-column">
        <div class="${prefix}--page-header__content__title-wrapper">
          <div class="${prefix}--page-header__content__start">
            <div class="${prefix}--page-header__content__title-container">
              <slot name="icon"></slot>
              <slot
                name="title"
                @slotchange=${this._handleTitleSlotChange}></slot>
              ${!hasTitleSlotContent
                ? hasEllipsisApplied
                  ? html`
                      <cds-definition-tooltip>
                        <span slot="definition">${title}</span>
                        ${staticHtml`<${titleTag} class="${prefix}--page-header__content__title">
                              ${title}
                            </${titleTag}>`}
                      </cds-definition-tooltip>
                    `
                  : staticHtml`
                      <${titleTag} class="${prefix}--page-header__content__title">
                        ${title}
                      </${titleTag}>
                    `
                : null}
            </div>
            <slot
              name="contextual-actions"
              @slotchange=${handleSlotChange}></slot>
          </div>
          <div class="${contentActionClasses}">
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
