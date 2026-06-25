/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import ChevronIcon16 from '@carbon/icons/es/chevron--up/16';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
import '@carbon/web-components/es/components/icon-button/index.js';
import '@carbon/web-components/es/components/link/index.js';

import { prefix } from '../../globals/settings';
import styles from './checklist.scss?lit';
import './checklist-chart';
import './checklist-icon';

const blockClass = `${prefix}--checklist`;

/**
 * @element c4p-checklist
 * @slot checklist-header - Header area which includes the title and the progress indicator.
 * @slot default - Contains one or more `c4p-checklist-group` components to organize tasks into logical groups.
 * @slot checklist-footer - Optional footer area for actions like buttons, links, or additional notes.
 * @fires c4p-checklist-view-all - The custom event which is fired when a user clicks on View All button in checklist footer.
 * @fires c4p-checklist-toggle - The custom event which is fired when user clicks on toggle button in checklist header.
 */
@customElement(`${prefix}-checklist`)
class CDSChecklist extends LitElement {
  /**
   * Specifies whether the component is opened or closed.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * The title of the component.
   */
  @property({ type: String })
  title;

  /**
   * The label for progress indicator chart
   */
  @property({ type: String, attribute: 'chart-label' })
  chartLabel;

  /**
   * A number between 0 and 1 which indicates the progress of checklist
   */
  @property({ type: Number, attribute: 'chart-value' })
  chartValue;

  /**
   * Whether or not to show the open/close toggle.
   */
  @property({ type: Boolean, attribute: 'disable-toggle' })
  disableToggle = false;

  /**
   * The label for the toggle's tooltip.
   */
  @property({ type: String, attribute: 'toggle-label' })
  toggleLabel;

  /**
   * The alignment of the toggle's tooltip.
   */
  @property({ type: String, attribute: 'toggle-label-align' })
  toggleLabelAlign;

  /**
   * Aria-label for the Checklist's toggle component.
   */
  @property({ type: String, attribute: 'toggle-aria-label' })
  toggleAriaLabel;

  /**
   * If defined, will show and enable the "View all (#)" button in the checklist footer.
   */
  @property({ type: String, attribute: 'view-all-label' })
  viewAllLabel;

  private _viewAll(event: Event) {
    const triggeredBy = event.target;
    event.stopPropagation();
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        triggeredBy,
      },
    };
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSChecklist).checklistViewAll,
        init
      )
    );
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this._viewAll(event);
    }
  }

  private _onToggle(event: Event) {
    this.open = !this.open;
    // Fire custom event
    const triggeredBy = event.target;
    event.stopPropagation();
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        triggeredBy,
      },
    };
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSChecklist).checklistToggle,
        init
      )
    );
  }

  render() {
    const {
      open,
      chartLabel,
      chartValue,
      title,
      disableToggle,
      toggleLabel,
      toggleLabelAlign,
      toggleAriaLabel,
      viewAllLabel,
      _viewAll: viewAll,
      _onToggle: onToggle,
      _handleKeyDown: handleKeyDown,
    } = this;

    const classes = classMap({
      [`${blockClass}`]: true,
      [`${blockClass}__closed`]: !open,
    });

    return html`
      <aside class=${classes} aria-label="Checklist">
        <!-- Header -->
        <header class="${blockClass}__header">
          <slot name="checklist-header">
            <slot name="header-chart">
              <c4p-checklist-chart value=${chartValue}></c4p-checklist-chart>
            </slot>
            <div class="${blockClass}__titles">
              <!-- checklist title -->
              <slot name="header-title">
                ${title && html`<h2 class="${blockClass}__title">${title}</h2>`}
              </slot>
              <!-- chart label -->
              <slot name="header-chartLabel">
                ${chartLabel &&
                html`<p class="${blockClass}__chart-label">${chartLabel}</p>`}
              </slot>
            </div>
          </slot>
          <!-- Checklist toggle button -->
          ${!disableToggle &&
          html`<cds-icon-button
            kind="ghost"
            size="sm"
            align=${toggleLabelAlign}
            aria-label=${toggleAriaLabel}
            class="${blockClass}__toggle"
            @click=${onToggle}
          >
            ${iconLoader(ChevronIcon16, {
              slot: 'icon',
              class: `${blockClass}__chevron`,
            })}
            <span slot="tooltip-content">${toggleLabel}</span>
          </cds-icon-button>`}
        </header>
        <div class="${blockClass}__content-outer">
          <div class="${blockClass}__content-inner">
            <!-- Checklist body -->
            <!-- This is where you add c4p-checklist-group elements-->
            <slot></slot>

            <!-- Checklist footer -->
            <div class="${blockClass}__footer">
              <slot name="checklist-footer">
                ${viewAllLabel &&
                html`<cds-link
                  role="link"
                  @click=${viewAll}
                  @keydown=${handleKeyDown}
                >
                  ${viewAllLabel}
                </cds-link>`}
              </slot>
            </div>
          </div>
        </div>
      </aside>
    `;
  }

  /**
   * The custom event which is fired when the  view all button in checklist footer is clicked or when the Enter key is pressed on it.
   */
  static get checklistViewAll() {
    return `${prefix}-checklist-view-all`;
  }

  /**
   * The custom event which is fired when the checklist toggle button is clicked or when the Enter key is pressed on it.
   */
  static get checklistToggle() {
    return `${prefix}-checklist-toggle`;
  }

  static styles = styles;
}

export default CDSChecklist;
