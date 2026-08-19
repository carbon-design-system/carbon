/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, nothing } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import {
  createOverflowHandler,
  type OverflowHandler,
} from '@carbon/utilities/overflowHandler';
import '../overflow-menu/index';
import '../menu/index';
import styles from './card.scss?lit';

/**
 * Resolved item shape used for overflow menu population.
 */
interface ActionItem {
  /** Mirrors the wrapper div's data-id attribute. */
  id: string;
  /** Resolved label for the overflow menu entry. */
  label: string;
}

/**
 * Card actions — header action icon-button group with overflow handling.
 *
 * When actions exceed available space a `cds-overflow-menu` is shown
 * automatically. Hidden actions are tracked by
 * `createOverflowHandler` from `@carbon/utilities`.
 *
 * Label resolution order for each hidden action:
 *  1. `cds-card-action[label]` attribute
 *  2. Direct child button `label` attribute
 *  3. Direct child button `tooltip-content` slot text
 *  4. Ordinal fallback: "Action N"
 *
 * @element cds-card-actions
 * @slot - Default slot for cds-card-action elements.
 */
@customElement(`${prefix}-card-actions`)
class CDSCardActions extends LitElement {
  /** Label for the overflow menu trigger button. */
  @property({ attribute: 'overflow-menu-label', reflect: true })
  overflowMenuLabel = 'More actions';

  /** IDs of action items currently hidden due to overflow. */
  @state()
  private _hiddenIds: Set<string> = new Set();

  /** Resolved metadata for all slotted actions. */
  @state()
  private _actionItems: ActionItem[] = [];

  private _overflowHandler: OverflowHandler | undefined;

  @query('.cds-ce--card__actions-container')
  private _container?: HTMLElement;

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  disconnectedCallback() {
    super.disconnectedCallback();
    this._overflowHandler?.disconnect();
    this._overflowHandler = undefined;
  }

  // ─── Slot handling ────────────────────────────────────────────────────────

  /**
   * Rebuild action item metadata whenever slotted children change,
   * then re-initialise the overflow handler.
   */
  private _handleSlotChange() {
    this._actionItems = this._resolveActionItems();
    // Re-attach handler after the DOM settles so wrapper divs are rendered.
    this.updateComplete.then(() => this._attachOverflowHandler());
  }

  // ─── Overflow handler ─────────────────────────────────────────────────────

  private _attachOverflowHandler() {
    this._overflowHandler?.disconnect();
    this._overflowHandler = undefined;

    if (!this._container || this._actionItems.length === 0) return;

    this._overflowHandler = createOverflowHandler({
      container: this._container,
      onChange: (_visible, hidden) => {
        this._hiddenIds = new Set(
          hidden.map((el) => el.dataset.id).filter(Boolean) as string[]
        );
      },
    });
  }

  // ─── Label resolution ─────────────────────────────────────────────────────

  /**
   * Walk slotted `cds-card-action` elements and resolve a label for each.
   */
  private _resolveActionItems(): ActionItem[] {
    const actions = this.querySelectorAll(`${prefix}-card-action`);
    return Array.from(actions).map((action, index) => {
      const id = `card-action-${index}`;

      // 1. cds-card-action[label]
      const actionLabel = (action as HTMLElement).getAttribute('label');
      if (actionLabel) return { id, label: actionLabel };

      // 2. First child button's `label` or `tooltip-text` attribute
      const button = action.querySelector(
        `${prefix}-button, ${prefix}-icon-button`
      ) as HTMLElement | null;
      if (button) {
        const btnLabel =
          button.getAttribute('label') ||
          button.getAttribute('tooltip-text') ||
          button.getAttribute('tooltip-content');
        if (btnLabel) return { id, label: btnLabel };
      }

      // 3. tooltip-content slot text inside the child button
      const tooltipContent = action.querySelector(
        '[slot="tooltip-content"]'
      ) as HTMLElement | null;
      if (tooltipContent?.textContent?.trim()) {
        return { id, label: tooltipContent.textContent.trim() };
      }

      // 4. Ordinal fallback
      return { id, label: `Action ${index + 1}` };
    });
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  render() {
    const { _actionItems, _hiddenIds, overflowMenuLabel } = this;
    const hasHidden = _hiddenIds.size > 0;

    return html`
      <div class="${prefix}--card__actions cds-ce--card__actions-container">
        <!-- Slotted actions — each wrapped in a div carrying data-id for the
             overflow handler to track. The slot itself is hidden; the wrapper
             divs are the measured children. -->
        ${_actionItems.map(
          ({ id }) => html`
            <div data-id=${id}>
              <slot name=${id} @slotchange=${this._handleSlotChange}></slot>
            </div>
          `
        )}

        <!-- Catch-all default slot to pick up un-named cds-card-action children
             and trigger the initial slotchange. -->
        <slot style="display:none" @slotchange=${this._handleSlotChange}></slot>

        <!-- Overflow menu — data-offset / data-hidden are required by
             createOverflowHandler to locate and toggle this element. -->
        <div data-offset ?data-hidden=${!hasHidden} style="position:relative">
          ${hasHidden
            ? html`
                <cds-overflow-menu size="sm" aria-label=${overflowMenuLabel}>
                  ${_actionItems
                    .filter(({ id }) => _hiddenIds.has(id))
                    .map(
                      ({ id, label }) => html`
                        <cds-menu-item
                          data-action-id=${id}
                          label=${label}></cds-menu-item>
                      `
                    )}
                </cds-overflow-menu>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSCardActions;
