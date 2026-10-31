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
  getSize,
  type OverflowHandler,
} from '@carbon/utilities/overflowHandler';
import { iconLoader } from '../../globals/internal/icon-loader';
import OverflowMenuVertical16 from '@carbon/icons/es/overflow-menu--vertical/16.js';
import '../overflow-menu/index';
import '../menu/index';
import styles from './card.scss?lit';

const _overflowIcon = iconLoader(OverflowMenuVertical16, {
  slot: 'icon',
  class: `${prefix}--overflow-menu__icon`,
});

/**
 * Resolved item shape used for overflow menu population.
 */
interface ActionItem {
  /** The cds-card-action element itself, used as the handler's measured item. */
  el: HTMLElement;
  /** Resolved label for the overflow menu entry. */
  label: string;
  /** The data-action-id assigned to `el`, cached to avoid repeated dataset lookups. */
  id: string;
  /** Whether the underlying button is disabled. */
  disabled: boolean;
}

/** Custom property the actions publish so the header slot can size itself. */
const ACTIONS_INLINE_SIZE_PROPERTY = `--${prefix}--card--actions-inline-size`;

/**
 * Card actions
 *
 * Place in the `actions` slot of `cds-card-header`. The element publishes the
 * width needed to show every action as `--cds--card--actions-inline-size`, so
 * the slot is as wide as the actions need (capped at 50% of the header) and the
 * title uses all remaining space. When the actions exceed the cap, the
 * overflow menu is shown.
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
  private _pendingAttach = false;

  private _offsetEl: HTMLDivElement | undefined;

  disconnectedCallback() {
    super.disconnectedCallback();
    this._overflowHandler?.disconnect();
    this._overflowHandler = undefined;
    this.style.removeProperty(ACTIONS_INLINE_SIZE_PROPERTY);
    this._offsetEl?.remove();
    this._offsetEl = undefined;
    this._pendingAttach = false;
    this._hiddenIds = new Set();
    this._actionItems = [];
  }

  private _ensureOffsetEl() {
    if (this._offsetEl) return;

    const div = document.createElement('div');
    div.setAttribute('data-offset', '');
    div.style.inlineSize = `var(--${prefix}-spacing-07, 2rem)`;
    div.style.blockSize = `var(--${prefix}-spacing-07, 2rem)`;
    div.style.flexShrink = '0';
    div.style.display = 'none';
    this._offsetEl = div;
    this.appendChild(div);
  }

  private _handleSlotChange({ target }: Event) {
    const slot = target as HTMLSlotElement;
    const actions = slot
      .assignedElements({ flatten: true })
      .filter(
        (el): el is HTMLElement =>
          el instanceof HTMLElement && el.localName === `${prefix}-card-action`
      );

    this._assignActionIds(actions);
    this._actionItems = this._resolveActionItems(actions);
    if (!this._pendingAttach) {
      this._pendingAttach = true;
      void this.updateComplete.then(() => {
        this._pendingAttach = false;
        if (this.isConnected) {
          this._attachOverflowHandler();
        }
      });
    }
  }

  /**
   * Publishes the width needed to show every action. It is measured from all
   * items, including collapsed ones, so it never depends on the current
   * overflow state and the slot width stays stable for the overflow handler.
   */
  private _publishNaturalSize(gap: number) {
    const items = Array.from(this.children).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement && !el.hasAttribute('data-offset')
    );
    const natural = items.reduce(
      (sum, el) => sum + getSize(el, 'width', gap),
      -gap
    );
    this.style.setProperty(
      ACTIONS_INLINE_SIZE_PROPERTY,
      `${Math.ceil(Math.max(natural, 0))}px`
    );
  }

  private _attachOverflowHandler() {
    this._overflowHandler?.disconnect();
    this._overflowHandler = undefined;

    if (this._actionItems.length === 0) {
      this.style.removeProperty(ACTIONS_INLINE_SIZE_PROPERTY);
      return;
    }

    this._ensureOffsetEl();

    const idByEl = new Map(this._actionItems.map(({ el, id }) => [el, id]));
    const offsetEl = this._offsetEl;
    const gap = parseFloat(getComputedStyle(this).columnGap) || 0;

    this._publishNaturalSize(gap);
    void document.fonts?.ready?.then(() => {
      if (this.isConnected) {
        this._publishNaturalSize(gap);
      }
    });

    this._overflowHandler = createOverflowHandler({
      container: this,
      gap: 0,
      onChange: (_, hidden: HTMLElement[]) => {
        if (offsetEl) {
          offsetEl.style.display = hidden.length > 0 ? 'block' : 'none';
        }
        this._hiddenIds = new Set(
          hidden
            .map((el) => idByEl.get(el))
            .filter((id): id is string => id !== undefined)
        );
      },
    });
  }

  private _assignActionIds(actions: HTMLElement[]) {
    actions.forEach((action, index) => {
      action.dataset.actionId = `card-action-${index}`;
    });
  }

  /** The interactive element wrapped by a cds-card-action, of any button type. */
  private _getButton(action: HTMLElement) {
    return action.querySelector<HTMLElement>(
      `${prefix}-button, ${prefix}-icon-button, button`
    );
  }

  private _resolveActionItems(actions: HTMLElement[]): ActionItem[] {
    return actions.map((action, index) => {
      const id = `card-action-${index}`;
      const button = this._getButton(action);

      // Label resolution hierarchy for any button type:
      // 1. label on the cds-card-action
      // 2. label / tooltip-text / tooltip-content on the button
      // 3. aria-label on the button or the cds-card-action
      // 4. title on the button or the cds-card-action
      // 5. slotted tooltip content
      // 6. text content of the button
      // 7. "Action {index + 1}"
      const label =
        action.getAttribute('label') ||
        button?.getAttribute('label') ||
        button?.getAttribute('tooltip-text') ||
        button?.getAttribute('tooltip-content') ||
        button?.getAttribute('aria-label') ||
        action.getAttribute('aria-label') ||
        button?.getAttribute('title') ||
        action.getAttribute('title') ||
        action.querySelector('[slot="tooltip-content"]')?.textContent?.trim() ||
        button?.textContent?.trim() ||
        `Action ${index + 1}`;

      const disabled = Boolean(
        action.hasAttribute('disabled') ||
          button?.hasAttribute('disabled') ||
          (button as HTMLButtonElement | null)?.disabled
      );

      return { el: action, label, id, disabled };
    });
  }

  /** Forwards a click on an overflow menu item to the action's own button. */
  private _handleMenuItemClick(el: HTMLElement) {
    this._getButton(el)?.click();
  }

  render() {
    const { _actionItems, _hiddenIds, overflowMenuLabel } = this;
    const hasHidden = _hiddenIds.size > 0;
    const hiddenItems = _actionItems.filter(({ id }) => _hiddenIds.has(id));

    return html`
      <slot @slotchange=${this._handleSlotChange}></slot>

      ${hasHidden
        ? html`
            <cds-overflow-menu
              size="sm"
              enable-v12-overflowmenu
              autoalign
              menu-alignment="bottom-end"
              label=${overflowMenuLabel}
              class="${prefix}--card__actions-overflow-menu">
              ${_overflowIcon}
              <cds-menu>
                ${hiddenItems.map(
                  ({ id, label, el, disabled }) => html`
                    <cds-menu-item
                      data-action-id=${id}
                      label=${label}
                      ?disabled=${disabled}
                      @click=${() =>
                        this._handleMenuItemClick(el)}></cds-menu-item>
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
