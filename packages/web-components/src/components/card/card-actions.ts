/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import {
  createOverflowHandler,
  type OverflowHandler,
} from '@carbon/utilities/overflowHandler';
import { iconLoader } from '../../globals/internal/icon-loader';
import OverflowMenuVertical16 from '@carbon/icons/es/overflow-menu--vertical/16.js';
import '../overflow-menu/index';
import '../menu/index';
import styles from './card.scss?lit';

/**
 * Resolved item shape used for overflow menu population.
 */
interface ActionItem {
  /** The cds-card-action element itself, used as the handler's measured item. */
  el: HTMLElement;
  /** Resolved label for the overflow menu entry. */
  label: string;
}

/**
 * Card actions — header action icon-button group with overflow handling.
 *
 * # Architecture: Web Components vs React
 *
 * React wraps every `CardAction` child in `<div data-id>` at render time —
 * straightforward because all nodes live in the same JS tree.
 *
 * In Web Components, the `cds-card-action` children live in the **light DOM**
 * (outside the shadow root). We cannot move or wrap them in shadow-DOM divs;
 * slot projection is a reference mechanism, not a move.
 *
 * The correct Lit pattern is to **use the host element itself as the overflow
 * container**:
 *
 * 1. `cds-card-action` elements are direct children of the host in light DOM.
 * 2. `createOverflowHandler({ container: this })` reads `this.children`, which
 *    are those elements — exactly the nodes that need to be measured.
 * 3. A `[data-offset]` sentinel div is appended to the host's light DOM so
 *    the handler can find and size-measure the overflow trigger area.
 * 4. The `onChange` callback drives a `@state` update that re-renders the
 *    shadow-DOM overflow menu.
 *
 * The `::slotted(cds-card-actions)` CSS rule in `cds-card-header` already
 * makes the host an `inline-flex` container, so no additional display rule is
 * needed here; the host IS the flex row.
 *
 * Label resolution order for each hidden action:
 *  1. `cds-card-action[label]` attribute
 *  2. Direct child button `label` or `tooltip-text` or `tooltip-content`
 *  3. `[slot="tooltip-content"]` text
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

  /** data-action-id values of items currently hidden by the overflow handler. */
  @state()
  private _hiddenIds: Set<string> = new Set();

  /** Resolved metadata for all slotted actions (rebuilt on slotchange). */
  @state()
  private _actionItems: ActionItem[] = [];

  private _overflowHandler: OverflowHandler | undefined;

  /**
   * Sentinel appended to the host's light DOM.  Lives alongside the slotted
   * `cds-card-action` elements so `createOverflowHandler` can measure it as
   * part of `container.children`.  The handler sets/clears `data-hidden` on it
   * automatically; a `MutationObserver` on the sentinel syncs `display` so it
   * takes no flex space when hidden.
   */
  private _offsetEl: HTMLDivElement | undefined;
  private _sentinelObserver: MutationObserver | undefined;

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();
    this._ensureOffsetEl();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._overflowHandler?.disconnect();
    this._overflowHandler = undefined;
    this._sentinelObserver?.disconnect();
    this._sentinelObserver = undefined;
    this._offsetEl?.remove();
    this._offsetEl = undefined;
  }

  // ─── Sentinel ─────────────────────────────────────────────────────────────

  /**
   * Create (once) the `[data-offset]` sentinel in light DOM and append it.
   * A `MutationObserver` watches the `data-hidden` attribute toggled by the
   * overflow handler and mirrors it as `display:none` / `display:block` because
   * shadow-DOM `static styles` cannot reach light-DOM elements.
   */
  private _ensureOffsetEl() {
    if (this._offsetEl) return;

    const div = document.createElement('div');
    div.setAttribute('data-offset', '');
    div.setAttribute('data-hidden', '');
    // Sized to roughly match one icon-button so the handler reserves space.
    div.style.cssText = 'inline-size:32px; block-size:32px; flex-shrink:0;';
    this._offsetEl = div;
    this.appendChild(div);

    // Mirror data-hidden → display so the sentinel collapses when not needed.
    this._sentinelObserver = new MutationObserver(() => {
      if (!this._offsetEl) return;
      this._offsetEl.style.display = this._offsetEl.hasAttribute('data-hidden')
        ? 'none'
        : 'block';
    });
    this._sentinelObserver.observe(div, {
      attributes: true,
      attributeFilter: ['data-hidden'],
    });
    // Set initial display.
    div.style.display = 'none';
  }

  // ─── Slot handling ────────────────────────────────────────────────────────

  private _handleSlotChange({ target }: Event) {
    const slot = target as HTMLSlotElement;
    const actions = slot
      .assignedElements({ flatten: true })
      .filter(
        (el) => el.localName === `${prefix}-card-action`
      ) as HTMLElement[];

    this._actionItems = this._resolveActionItems(actions);
    this.updateComplete.then(() => this._attachOverflowHandler());
  }

  // ─── Overflow handler ─────────────────────────────────────────────────────

  private _attachOverflowHandler() {
    this._overflowHandler?.disconnect();
    this._overflowHandler = undefined;

    if (this._actionItems.length === 0) return;

    this._ensureOffsetEl();

    // The host IS the flex container; its .children are:
    //   [cds-card-action, cds-card-action, …, div[data-offset]]
    // gap: 8 matches the CSS `gap: $spacing-02` (0.5rem) so the handler
    // correctly accounts for inter-item space when computing overflow.
    this._overflowHandler = createOverflowHandler({
      container: this,
      gap: 8,
      onChange: (_visible, hidden) => {
        this._hiddenIds = new Set(
          hidden
            .map((el) => (el as HTMLElement).dataset.actionId)
            .filter(Boolean) as string[]
        );
      },
    });
  }

  // ─── Label resolution ─────────────────────────────────────────────────────

  private _resolveActionItems(actions: HTMLElement[]): ActionItem[] {
    return actions.map((action, index) => {
      // Stamp data-action-id so the onChange callback can identify hidden items.
      action.dataset.actionId = `card-action-${index}`;

      // 1. cds-card-action[label]
      const actionLabel = action.getAttribute('label');
      if (actionLabel) return { el: action, label: actionLabel };

      // 2. First child button's label / tooltip-text / tooltip-content attribute
      const button = action.querySelector(
        `${prefix}-button, ${prefix}-icon-button`
      ) as HTMLElement | null;
      if (button) {
        const btnLabel =
          button.getAttribute('label') ||
          button.getAttribute('tooltip-text') ||
          button.getAttribute('tooltip-content');
        if (btnLabel) return { el: action, label: btnLabel };
      }

      // 3. [slot="tooltip-content"] text
      const tooltipContent = action.querySelector(
        '[slot="tooltip-content"]'
      ) as HTMLElement | null;
      if (tooltipContent?.textContent?.trim()) {
        return { el: action, label: tooltipContent.textContent.trim() };
      }

      // 4. Ordinal fallback
      return { el: action, label: `Action ${index + 1}` };
    });
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  render() {
    const { _actionItems, _hiddenIds, overflowMenuLabel } = this;
    const hasHidden = _hiddenIds.size > 0;
    const hiddenItems = _actionItems.filter(({ el }) =>
      _hiddenIds.has(el.dataset.actionId ?? '')
    );

    return html`
      <!--
        Project cds-card-action children. The <slot> renders in shadow DOM but
        the assigned elements (cds-card-action nodes) remain in light DOM as
        direct children of the host — the overflow handler measures them there.
      -->
      <slot @slotchange=${this._handleSlotChange}></slot>

      <!--
        Overflow menu in shadow DOM. It is absolutely positioned to sit on top
        of the sentinel (the [data-offset] div in light DOM). The host has
        position:relative (from card.scss) to serve as the containing block.
      -->
      ${hasHidden
        ? html`
            <cds-overflow-menu
              size="sm"
              enable-v12-overflowmenu
              autoalign
              menu-alignment="bottom-end"
              label=${overflowMenuLabel}
              class="${prefix}--card__actions-overflow-menu">
              ${iconLoader(OverflowMenuVertical16, {
                slot: 'icon',
                class: `${prefix}--overflow-menu__icon`,
              })}
              <cds-menu>
                ${hiddenItems.map(
                  ({ el, label }) => html`
                    <cds-menu-item
                      data-action-id=${el.dataset.actionId ?? ''}
                      label=${label}></cds-menu-item>
                  `
                )}
              </cds-menu>
            </cds-overflow-menu>
          `
        : nothing}
    `;
  }

  static styles = styles;
}

export default CDSCardActions;
