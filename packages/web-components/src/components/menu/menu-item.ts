/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './menu-item.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { classMap } from 'lit/directives/class-map.js';
import CaretLeft16 from '@carbon/icons/lib/caret--left/16';
import CaretRight16 from '@carbon/icons/lib/caret--right/16';
import { consume } from '@lit/context';
import { MenuContext } from './menu-context';
import Checkmark16 from '@carbon/icons/lib/checkmark/16';

/**
 * Menu Item.
 *
 * @element cds-menu-item
 */
@customElement(`${prefix}-menu-item`)
class CDSmenuItem extends LitElement {
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
   * Children - Sub menu items.
   */
  @property({ type: Array })
  childElements: Element[] | undefined;
  /**
   * Child context.
   */
  @property()
  childContext;
  /**
   * Shortcut for the menu item.
   */
  @property({ type: String })
  shortcut;
  /**
   * Sets the menu item's icon.
   */
  @property()
  renderIcon?: () => void;
  /**
   * Disabled property for the menu item.
   */
  @property({ type: Boolean })
  disabled;
  /**
   * Whether the menu item is disabled or not.
   */
  @property({ type: Boolean })
  isDisabled;
  /**
   * Whether the menu submen for an item is open or not.
   */
  @property({ type: Boolean })
  submenuOpen = false;
  /**
   * Whether the menu submen for an item is open or not.
   */
  @property({ type: Array })
  submenuList;
  /**
   * Entrypoint.
   */
  @property()
  submenuEntry;
  /**
   * Document direction.
   */
  @property({ type: String })
  direction = 'ltr';
  /**
   * Checks if document direction is rtl.
   */
  @property({ type: Boolean })
  isRtl = false;
  /**
   * Checks if document direction is rtl.
   */
  @property()
  kind: 'default' | 'danger' = 'default';
  /**
   * check if the menu item has children or not.
   */
  @property({ type: String })
  hasChildren;
  /**
   * check if the menu item kind is Danger.
   */
  @property({ type: Boolean })
  isDanger;

  /**
   * Menu boundaries.
   */
  @property()
  boundaries: {
    x: number | [number, number];
    y: number | [number, number];
  } = { x: -1, y: -1 };
  /**
   * Checks if document direction is rtl.
   */
  @property()
  onKeyDown?: (e: KeyboardEvent) => void;

  @property({ attribute: 'aria-checked' })

  /**
   * Provide an optional function to be called when the MenuItem is clicked.
   */
  @property()
  onClick?: (event: KeyboardEvent | MouseEvent) => void;

  private hasSubmenu = false;
  private hasRenderIcon = false;

  async dispatchIconDetect() {
    if (this.hasRenderIcon) {
      await undefined; // this is used to replace setTimeout with 0 time out, which is much fater.
      this.dispatchEvent(
        new CustomEvent('icon-detect', {
          bubbles: true, // Allows event to bubble up the DOM
          composed: true, // Allows event to cross shadow DOM boundary
        })
      );
    }
  }

  firstUpdated() {
    this.hasSubmenu = !!this.querySelector('[slot="submenu"]');
    this.hasRenderIcon = !!this.querySelector('[slot="render-icon"]');
    this.dispatchIconDetect();
    this.hasChildren = this.childNodes.length > 0;
    this.isDisabled = this.disabled && !this.hasSubmenu;
    this.direction = document.dir;
    this.isRtl = this.direction === 'rtl';
    this.isDanger = this.kind === 'danger';
    setTimeout(() => {
      this.childElements = Object.values(this.children);
    });
    this._registerSubMenuItems();
  }

  render() {
    const {
      label,
      shortcut,
      renderIcon,
      isDisabled,
      hasChildren,
      submenuOpen,
      _handleClick: handleClick,
      _handleMouseEnter: handleMouseEnter,
      _handleMouseLeave: handleMouseLeave,
      _handleKeyDown: handleKeyDown,
      _closeSubmenu: closeSubmenu,
      isDanger,
      boundaries,
      childElements,
      isRtl,
    } = this;
    const menuItemClasses = classMap({
      [`${prefix}--menu-item`]: true,
      [`${prefix}--menu-item--disabled`]: isDisabled,
      [`${prefix}--menu-item--danger`]: isDanger,
    });
    const menuClassName = this.context.hasSelectableItems
      ? `${prefix}--menu--with-selectable-items`
      : '';

    return html`
      <li
        part="menuitem"
        role="menuitem"
        tabindex="0"
        class="${menuItemClasses}"
        aria-disabled="${isDisabled ?? undefined}"
        aria-haspopup="${this.hasSubmenu ?? undefined}"
        aria-expanded="${this.hasSubmenu ? submenuOpen : undefined}"
        @click="${handleClick}"
        @mouseenter="${this.hasSubmenu ? handleMouseEnter : undefined}"
        @mouseleave="${this.hasSubmenu ? handleMouseLeave : undefined}"
        @keydown="${handleKeyDown}">
        <div class="${prefix}--menu-item__selection-icon">
          ${this.getAttribute('aria-checked') === 'true'
            ? Checkmark16()
            : undefined}
        </div>

        <div class="${prefix}--menu-item__icon">
          <slot name="render-icon"></slot>
        </div>
        <div class="${prefix}--menu-item__label">${label}</div>
        ${shortcut && !this.hasSubmenu
          ? html`
              <div class="${prefix}--menu-item__shortcut">${shortcut}</div>
            `
          : html``}
        ${this.hasSubmenu
          ? html`
              <div class="${prefix}--menu-item__shortcut">
                ${isRtl ? CaretLeft16() : CaretRight16()}
              </div>
              <cds-menu
                className=${menuClassName}
                ?isChild="${this.hasSubmenu}"
                label="${label}"
                .open="${submenuOpen}"
                .onClose="${closeSubmenu}"
                .x="${boundaries.x}"
                .y="${boundaries.y}">
                <slot
                  name="submenu"
                  @slotchange="${this.handleSlotChange}"></slot>
              </cds-menu>
            `
          : html``}
      </li>
    `;
  }

  _handleClick = (e: MouseEvent | KeyboardEvent): void => {
    if (!this.isDisabled) {
      if (this.hasSubmenu) {
        this._openSubmenu();
      } else {
        if (this.onClick) {
          this.onClick(e);
        }
      }
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
          const item = this.childElements?.length && this.childElements[0];
          if (item) {
            switch (item.tagName) {
              case 'CDS-MENU-ITEM-RADIO-GROUP':
                this.submenuEntry = item.shadowRoot
                  ?.querySelector(`${prefix}-menu-item`)
                  ?.shadowRoot?.querySelector(`.${prefix}--menu-item`);
                break;
              case 'CDS-MENU-ITEM-GROUP': {
                const slotElements = item.shadowRoot
                  ?.querySelector('slot')
                  ?.assignedElements();
                const firstElement =
                  slotElements?.length &&
                  slotElements[0].shadowRoot?.querySelector(
                    `${prefix}-menu-item`
                  );
                this.submenuEntry =
                  firstElement &&
                  firstElement.shadowRoot?.querySelector(
                    `.${prefix}--menu-item`
                  );
                break;
              }
              case 'CDS-MENU-ITEM':
                this.submenuEntry = item.shadowRoot?.querySelector(
                  `.${prefix}--menu-itemz`
                );
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
    if (this.hasSubmenu && e.key === 'ArrowRight') {
      this._openSubmenu();
      setTimeout(() => {
        this.submenuEntry.focus();
      });
      e.stopPropagation();
    }
    if (e.key === 'Enter' || e.key === 'Space') {
      this._handleClick(e);
    }
    if (this.onKeyDown) {
      this.onKeyDown(e);
    }
  };

  static styles = styles; // `styles` here is a `CSSResult` generated by custom Vite loader
}
export default CDSmenuItem;
