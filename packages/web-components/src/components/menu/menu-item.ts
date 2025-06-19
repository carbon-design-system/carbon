/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, PropertyValues, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './menu-item.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import CaretLeft16 from '@carbon/icons/lib/caret--left/16';
import CaretRight16 from '@carbon/icons/lib/caret--right/16';
import { consume } from '@lit/context';
import { MenuContext } from './menu-context';
import Checkmark16 from '@carbon/icons/lib/checkmark/16';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { MENU_ITEM_KIND, MENU_SIZE } from './defs';

export { MENU_ITEM_KIND, MENU_SIZE };

/**
 * Menu Item.
 *
 * @element cds-menu-item
 */
@customElement(`${prefix}-menu-item`)
class CDSmenuItem extends HostListenerMixin(HostListenerMixin(LitElement)) {
  @consume({ context: MenuContext })
  context;

  readonly hoverIntentDelay = 150; // in ms
  hoverIntentTimeout;
  /**
   * Label for the menu item.
   */
  @property({ type: String })
  label;
  /**
   * Shortcut for the menu item.
   */
  @property({ type: String })
  shortcut;
  /**
   * Disabled property for the menu item.
   */
  @property({ type: Boolean })
  disabled;

  /**
   * Whether the menu submen for an item is open or not.
   */
  @property({ type: Boolean })
  submenuOpen = false;

  @property()
  kind = MENU_ITEM_KIND.DEFAULT;
  /**
   * Menu boundaries.
   */
  @property()
  boundaries: {
    x: number | [number, number];
    y: number | [number, number];
  } = { x: -1, y: -1 };

  @property({ attribute: 'aria-checked' })
  ariaChecked: string | null = this.getAttribute('selected') ?? 'false';

  /**
   * Entrypoint.
   */
  @state()
  submenuEntry;
  /**
   * Checks if document direction is rtl.
   */
  @state()
  isRtl = false;
  /**
   * Checks if document direction is rtl.
   */
  @state()
  hasSubmenu = false;

  async dispatchIconDetect() {
    const hasRenderIcon = !!this.querySelector('[slot="render-icon"]');
    if (hasRenderIcon) {
      await undefined; // this is used to replace setTimeout with 0 time out, which is much fater.
      this.dispatchEvent(
        new CustomEvent('icon-detect', {
          bubbles: true, // Allows event to bubble up the DOM
          composed: true, // Allows event to cross shadow DOM boundary
        })
      );
    }
  }

  private _updateAttributes() {
    if (this.disabled && !this.hasSubmenu) {
      this.setAttribute('aria-disabled', this.disabled);
    } else {
      this.removeAttribute('aria-disabled');
    }
    if (this.hasSubmenu) {
      this.setAttribute('aria-haspopup', this.hasSubmenu + '');
    } else {
      this.removeAttribute('aria-haspopup');
    }
    if (this.closest(`${prefix}-menu-item-radio-group`)) {
      this.setAttribute('role', 'menuitemradio');
      this.setAttribute('aria-checked', this.ariaChecked + '');
    } else if (!this.getAttribute('role')) {
      this.setAttribute('role', 'menuitem');
    }

    this.setAttribute('tabindex', '-1');
  }

  firstUpdated() {
    this.hasSubmenu = !!this.querySelector('[slot="submenu"]');

    this.dispatchIconDetect();
    this.isRtl = document.dir === 'rtl';
    this._registerSubMenuItems();

    this._updateAttributes();

    this.addEventListener(`${prefix}-menu-closed`, () => {
      this.focus();
      this._closeSubmenu();
    });
  }

  updated(_changedProperties: PropertyValues): void {
    if (this.hasSubmenu) {
      this.setAttribute('aria-expanded', this.hasSubmenu + '');
    } else {
      this.removeAttribute('aria-expanded');
    }
    if (this.kind === MENU_ITEM_KIND.DANGER)
      this.classList.toggle(`${prefix}--menu-item--danger`);
  }

  @HostListener('click', { capture: true })
  handleClick(event: MouseEvent) {
    this._handleClick(event);
  }

  @HostListener('mouseenter')
  handleMouseEnter() {
    if (this.hasSubmenu) {
      this._handleMouseEnter();
    }
  }

  @HostListener('mouseleave')
  handleMouseLeave() {
    if (this.hasSubmenu) {
      this._handleMouseLeave();
    }
  }

  @HostListener('keydown')
  handleKeyDown(event: KeyboardEvent) {
    this._handleKeyDown(event);
  }

  render() {
    const { label, shortcut, submenuOpen, boundaries, isRtl } = this;

    const menuClassName = this.context?.hasSelectableItems
      ? `${prefix}--menu--with-selectable-items`
      : '';

    return html`
      <div class="${prefix}--menu-item__selection-icon">
        ${this.ariaChecked === 'true' ? Checkmark16() : undefined}
      </div>

      <div class="${prefix}--menu-item__icon">
        <slot name="render-icon"></slot>
      </div>
      <div class="${prefix}--menu-item__label">${label}</div>
      ${shortcut && !this.hasSubmenu
        ? html` <div class="${prefix}--menu-item__shortcut">${shortcut}</div> `
        : html``}
      ${this.hasSubmenu
        ? html`
            <div class="${prefix}--menu-item__shortcut">
              ${isRtl ? CaretLeft16() : CaretRight16()}
            </div>
            <cds-menu
              className=${menuClassName}
              size=${this.parentElement?.getAttribute('size') ??
              MENU_SIZE.LARGE}
              ?isChild="${this.hasSubmenu}"
              label="${label}"
              .open="${submenuOpen}"
              .x="${boundaries.x}"
              .y="${boundaries.y}">
              <slot name="submenu"></slot>
            </cds-menu>
          `
        : html``}
    `;
  }

  _handleClick = (e: MouseEvent | KeyboardEvent): void => {
    if (this.hasSubmenu) {
      this._openSubmenu();
    } else if (e.type === 'keydown') {
      this.click();
    }
  };
  _handleMouseEnter = () => {
    this.hoverIntentTimeout = setTimeout(() => {
      this._openSubmenu();
    }, this.hoverIntentDelay);
  };
  _handleMouseLeave = () => {
    if (this.hoverIntentTimeout) {
      clearTimeout(this.hoverIntentTimeout);
      this._closeSubmenu();
      this.focus();
    }
  };
  _openSubmenu = () => {
    const { x, y, width, height } = this.getBoundingClientRect();
    if (this.isRtl) {
      this.boundaries = {
        x: [-x, x - width],
        y: [y, y + height],
      };
    } else {
      this.boundaries = {
        x: [x, x + width],
        y: [y, y + height],
      };
    }
    this.submenuOpen = true;
  };
  _registerSubMenuItems = () => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const submenuSlot = this.shadowRoot?.querySelector(
            'slot[name="submenu"]'
          ) as HTMLSlotElement;

          const item = submenuSlot?.assignedElements?.()?.[0];
          if (item) {
            switch (item.tagName) {
              case 'CDS-MENU-ITEM-RADIO-GROUP':
                this.submenuEntry = item.querySelector(`${prefix}-menu-item`);
                break;
              case 'CDS-MENU-ITEM-GROUP': {
                const slotElements = item.shadowRoot
                  ?.querySelector('slot')
                  ?.assignedElements();
                const firstElement = slotElements?.length && slotElements[0];
                this.submenuEntry = firstElement;
                break;
              }
              case 'CDS-MENU-ITEM':
                this.submenuEntry = item;
                break;
            }
          }
        }
      }
    });
    observer.observe(this.shadowRoot as Node, {
      childList: true,
      subtree: true,
    });
  };
  _closeSubmenu = () => {
    this.boundaries = {
      x: -1,
      y: -1,
    };
    this.submenuOpen = false;
    (
      this.shadowRoot?.querySelector(`.${prefix}--menu-item`) as HTMLLIElement
    )?.focus();
  };
  _handleKeyDown = (e: KeyboardEvent) => {
    if (this.hasSubmenu && ['ArrowRight', 'Enter', ' '].includes(e.key)) {
      this._openSubmenu();
      setTimeout(() => {
        this.submenuEntry.focus();
      });
      e.stopPropagation();
    } else if (e.key === 'Enter' || e.key === ' ') {
      this._handleClick(e);
    }
  };

  static styles = styles;
}
export default CDSmenuItem;
