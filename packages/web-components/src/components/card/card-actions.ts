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
  /** The data-action-id assigned to `el`, cached to avoid repeated dataset lookups. */
  id: string;
}

/**
 * Card actions
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

  private _offsetEl: HTMLDivElement | undefined;
  private _sentinelObserver: MutationObserver | undefined;

  disconnectedCallback() {
    super.disconnectedCallback();
    this._overflowHandler?.disconnect();
    this._overflowHandler = undefined;
    this._sentinelObserver?.disconnect();
    this._sentinelObserver = undefined;
    this._offsetEl?.remove();
    this._offsetEl = undefined;
  }

  private _ensureOffsetEl() {
    if (this._offsetEl) return;

    const div = document.createElement('div');
    div.setAttribute('data-offset', '');
    div.setAttribute('data-hidden', '');
    div.style.cssText = 'inline-size:32px; block-size:32px; flex-shrink:0;';
    this._offsetEl = div;
    this.appendChild(div);

    this._sentinelObserver = new MutationObserver(() => {
      div.style.display = div.hasAttribute('data-hidden') ? 'none' : 'block';
    });
    this._sentinelObserver.observe(div, {
      attributes: true,
      attributeFilter: ['data-hidden'],
    });
    div.style.display = 'none';
  }

  private async _handleSlotChange({ target }: Event) {
    const slot = target as HTMLSlotElement;
    const actions = slot
      .assignedElements({ flatten: true })
      .filter(
        (el) => el.localName === `${prefix}-card-action`
      ) as HTMLElement[];

    this._actionItems = this._resolveActionItems(actions);
    await this.updateComplete;
    this._attachOverflowHandler();
  }

  private _attachOverflowHandler() {
    this._overflowHandler?.disconnect();
    this._overflowHandler = undefined;

    if (this._actionItems.length === 0) return;

    this._ensureOffsetEl();

    this._overflowHandler = createOverflowHandler({
      container: this,
      gap: 8,
      onChange: (_, hidden: HTMLElement[]) => {
        this._hiddenIds = new Set(
          hidden.map((el) => el.dataset.actionId).filter(Boolean) as string[]
        );
      },
    });
  }

  private _resolveActionItems(actions: HTMLElement[]): ActionItem[] {
    return actions.map((action, index) => {
      const id = `card-action-${index}`;
      action.dataset.actionId = id;

      const actionLabel = action.getAttribute('label');
      if (actionLabel) return { el: action, label: actionLabel, id };

      const button = action.querySelector(
        `${prefix}-button, ${prefix}-icon-button`
      ) as HTMLElement | null;
      if (button) {
        const btnLabel =
          button.getAttribute('label') ||
          button.getAttribute('tooltip-text') ||
          button.getAttribute('tooltip-content');
        if (btnLabel) return { el: action, label: btnLabel, id };
      }

      const tooltipContent = action.querySelector(
        '[slot="tooltip-content"]'
      ) as HTMLElement | null;
      if (tooltipContent?.textContent?.trim()) {
        return { el: action, label: tooltipContent.textContent.trim(), id };
      }

      return { el: action, label: `Action ${index + 1}`, id };
    });
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
              ${iconLoader(OverflowMenuVertical16, {
                slot: 'icon',
                class: `${prefix}--overflow-menu__icon`,
              })}
              <cds-menu>
                ${hiddenItems.map(
                  ({ id, label }) => html`
                    <cds-menu-item
                      data-action-id=${id}
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
