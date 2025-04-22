/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import { property, state } from 'lit/decorators.js';
import styles from './menu.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { classMap } from 'lit/directives/class-map.js';
import { MenuContext, menuDefaultState } from './menu-context';
import CDSmenuItem from './menu-item';
import { consume, provide } from '@lit/context';
import { MENU_SIZE } from './defs';

export { MENU_SIZE };

/**
 * Menu.
 *
 * @element cds-menu
 * @deprecated Menus now always support both icons as well as selectable items and nesting.
 */

type activeItemType = {
  item: CDSmenuItem;
  parent: HTMLElement | null;
};

@customElement(`${prefix}-menu`)
class CDSMenu extends HostListenerMixin(LitElement) {
  @provide({ context: MenuContext })
  @consume({ context: MenuContext })
  context = {
    ...menuDefaultState,
    updateFromChild: (updatedItem) => {
      this.context = {
        ...this.context,
        ...updatedItem,
      };
    },
  };

  readonly spacing: number = 8; // distance to keep to window edges, in px

  /**
   * Items.
   */
  @state()
  items: Element[] | undefined = [];

  /**
   * Active list Items.
   */
  @state()
  activeitems: activeItemType[] = [];

  /**
   * Label for the menu.
   */
  @property({ type: String })
  label;
  /**
   * Parent state.
   */
  @property({ type: Boolean })
  isChild = false;
  /**
   * Action button width.
   */
  @property()
  actionButtonWidth;
  /**
   * Checks if document direction is rtl.
   */
  @property({ type: Boolean })
  isRtl = false;
  /**
   * Checks if Menu is root menu or not.
   */
  @property({ type: Boolean })
  isRoot = true;

  /**
   * Document direction.
   */
  @property({ type: String })
  direction = 'ltr';
  /**
   * Open value for the menu .
   */
  @property({ type: Boolean, reflect: true })
  open = true;
  /**
   * Active element in the DOM .
   */
  @property({ type: HTMLElement })
  focusreturn;
  /**
   * Position of the Menu .
   */
  @property()
  position = [-1, -1];
  /**
   * Size attribute .
   */
  @property({ attribute: true })
  size = MENU_SIZE.SMALL;
  /**
   * Deprecated: Menus now always support both icons as well as selectable items and nesting. The mode of this menu. Defaults to full. full supports nesting and selectable menu items, but no icons. basic supports icons but no nesting or selectable menu items.

    This prop is not intended for use and will be set by the respective implementation (like useContextMenu, MenuButton, and ComboButton).
   */
  @property()
  mode;

  /**
   * Specify how the menu should align with the button element
   */
  @property({ type: String })
  menuAlignment;
  /**
   * Position of the Menu in X axis .
   */
  @property()
  x: number | number[] = 0;
  /**
   * Position of the Menu in Y axis .
   */
  @property()
  y: number | number[] = 0;

  /**
   * The name of the custom event fired when the the Menu should be closed.
   */
  static get eventOnClose() {
    return `${prefix}-menu-closed`;
  }
  /**
   * The name of the custom event fired when the the Menu should be opened.
   */
  static get eventOnOpen() {
    return `${prefix}-menu-opened`;
  }
  updated(changedProperties) {
    if (changedProperties.has('open') && this.open) {
      this._handleOpen();
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('icon-detect', () => {
      this.shadowRoot
        ?.querySelector('.cds--menu')
        ?.classList.add(`${prefix}--menu--with-icons`);
    });
  }
  async firstUpdated() {
    this.isRtl = this.direction === 'rtl';
    this.isRoot = this.context.isRoot;

    if (this.isChild) {
      this._newContextCreate();
    }
    await this.updateComplete;
    this._registerMenuItems();
    this._setActiveItems();
  }
  render() {
    const {
      open,
      menuAlignment,
      label,
      position,
      _handleKeyDown: handleKeyDown,
    } = this;
    const menuClasses = classMap({
      [`${prefix}--menu`]: true,
      [`${prefix}--menu--${this.size}`]: this.size,
      [`${prefix}--menu--box-shadow-top`]:
        menuAlignment && menuAlignment.slice(0, 3) === 'top',
      [`${prefix}--menu--open`]: open,
      [`${prefix}--menu--shown`]: position[0] >= 0 && position[1] >= 0,
      [`${prefix}--menu--with-selectable-items`]:
        this.context.hasSelectableItems,
    });
    return html`
      <ul
        class="${menuClasses}"
        aria-label="${label}"
        tabindex="-1"
        @keydown="${handleKeyDown}"
        role="menu">
        <slot></slot>
      </ul>
    `;
  }

  _handleKeyDown = (e: KeyboardEvent) => {
    const { isRoot } = this.context;
    e.stopPropagation();
    // if the user presses escape or this is a submenu
    // and the user presses ArrowLeft, close it

    if (e.key === 'Escape' || (!isRoot && e.key === 'ArrowLeft')) {
      this.dispatchCloseEvent(e);
    } else {
      this._focusItem(e);
    }
  };

  _focusItem = (e: KeyboardEvent | undefined) => {
    let currentItem: number;
    if (document.activeElement?.tagName !== 'CDS-MENU') {
      currentItem = this.activeitems?.findIndex((activeItem) => {
        if (
          activeItem.parent === null ||
          activeItem.parent.tagName === 'CDS-MENU-ITEM-RADIO-GROUP'
        ) {
          let shadowRootActiveEl =
            this._findActiveElementInShadowRoot(document);
          return shadowRootActiveEl === activeItem.item;
        } else {
          let shadowRootActiveEl =
            this._findActiveElementInShadowRoot(document);
          if (activeItem.parent.tagName === 'CDS-MENU-ITEM-SELECTABLE') {
            return shadowRootActiveEl === activeItem.item;
          } else {
            return activeItem.parent.contains(document.activeElement);
          }
        }
      });
    } else {
      currentItem = 0;
    }

    let indexToFocus = currentItem;
    // if currentItem is -1, no menu item is focused yet.
    // in this case, the first item should receive focus.
    if (currentItem === -1) {
      indexToFocus = 0;
    } else if (e) {
      if (e.key === 'ArrowUp') {
        indexToFocus = indexToFocus - 1;
      }
      if (e.key === 'ArrowDown') {
        indexToFocus = indexToFocus + 1;
      }
    }
    if (indexToFocus < 0) {
      indexToFocus = this.activeitems.length - 1;
    }
    if (indexToFocus >= this.activeitems.length) {
      indexToFocus = 0;
    }

    if (indexToFocus !== currentItem) {
      this.activeitems[indexToFocus]?.item?.focus();
    }
  };
  _findActiveElementInShadowRoot = (shadowRoot) => {
    if (shadowRoot === null) return null;

    let activeElement = shadowRoot.activeElement;
    while (
      activeElement &&
      activeElement.shadowRoot &&
      activeElement.shadowRoot.activeElement
    ) {
      activeElement = activeElement.shadowRoot.activeElement;
    }
    return activeElement;
  };

  _notEmpty = (value: number | null | undefined) => {
    return value !== null && value !== undefined;
  };
  _fitValue = (range: number[], axis: 'x' | 'y') => {
    const { isRoot } = this.context;

    // const isRoot =  false
    const { width, height } = this.getBoundingClientRect();
    const alignment = isRoot ? 'vertical' : 'horizontal';
    const axes = {
      x: {
        max: window.innerWidth,
        size: width,
        anchor: alignment === 'horizontal' ? range[1] : range[0],
        reversedAnchor: alignment === 'horizontal' ? range[0] : range[1],
        offset: 0,
      },
      y: {
        max: window.innerHeight,
        size: height,
        anchor: alignment === 'horizontal' ? range[0] : range[1],
        reversedAnchor: alignment === 'horizontal' ? range[1] : range[0],
        offset: isRoot ? 0 : 4, // top padding in menu, used to align the menu items
      },
    };

    // Avoid that the Menu render incorrectly when the postion is set in the right side of the screen
    if (
      this.actionButtonWidth &&
      this.actionButtonWidth < axes.x.size &&
      (this.menuAlignment === 'bottom' || this.menuAlignment === 'top')
    ) {
      axes.x.size = this.actionButtonWidth;
    }

    // if 'axes.x.anchor' is lower than 87px dynamically switch render side
    if (
      this.actionButtonWidth &&
      (this.menuAlignment === 'bottom-end' ||
        this.menuAlignment === 'top-end') &&
      axes.x.anchor >= 87 &&
      this.actionButtonWidth < axes.x.size
    ) {
      const diff = axes.x.anchor + axes.x.reversedAnchor;
      axes.x.anchor = axes.x.anchor + diff;
    }

    const { max, size, anchor, reversedAnchor, offset } = axes[axis];

    // get values for different scenarios, set to false if they don't work
    const options = [
      // towards max (preferred)
      max - this.spacing - size - anchor >= 0 ? anchor - offset : false,

      // towards min / reversed (first fallback)
      reversedAnchor - size >= 0 ? reversedAnchor - size + offset : false,

      // align at max (second fallback)
      max - this.spacing - size,
    ];
    const topAlignment =
      this.menuAlignment === 'top' ||
      this.menuAlignment === 'top-end' ||
      this.menuAlignment === 'top-start';
    // If the tooltip is not visible in the top, switch to the bototm
    if (
      typeof options[0] === 'number' &&
      topAlignment &&
      options[0] >= 0 &&
      !options[1] &&
      axis === 'y'
    ) {
      this.style.transform = 'translate(0)';
    } else if (topAlignment && !options[0] && axis === 'y') {
      options[0] = anchor - offset;
    }

    // Previous array `options`, has at least one item that is a number (the last one - second fallback).
    // That guarantees that the return of `find()` will always be a number
    // and we can safely add the numeric casting `as number`.
    const bestOption = options.find((option) => option !== false) as number;

    return bestOption >= this.spacing ? bestOption : this.spacing;
  };
  _getPosition = (x: number | (number | null | undefined)[]) => {
    if (Array.isArray(x)) {
      // has to be of length 2
      const filtered = x.filter(this._notEmpty);
      if (filtered.length === 2) {
        return filtered;
      } else {
        return;
      }
    } else {
      return [x, x];
    }
  };
  _calculatePosition = () => {
    const ranges = {
      x: this._getPosition(this.x),
      y: this._getPosition(this.y),
    };

    if (!ranges.x || !ranges.y) {
      return [-1, -1];
    }
    return [
      this._fitValue(ranges.x as number[], 'x') ?? -1,
      this._fitValue(ranges.y as number[], 'y') ?? -1,
    ];
  };
  _handleOpen = async () => {
    const pos = this._calculatePosition();
    if (this.isRtl) {
      this.style.insetInlineStart = `initial`;
      this.style.insetInlineEnd = `${pos[0]}px`;
    } else {
      this.style.insetInlineStart = `${pos[0]}px`;
      this.style.insetInlineEnd = `initial`;
    }
    this.style.insetBlockStart = `${pos[1]}px`;
    this.position = pos;

    await this.updateComplete;
    this._registerMenuItems();
    this._setActiveItems();

    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
    };
    if (
      this.dispatchEvent(
        new CustomEvent((this.constructor as typeof CDSMenu).eventOnOpen, init)
      )
    ) {
      this.dispatchEvent(
        new CustomEvent((this.constructor as typeof CDSMenu).eventOnOpen, init)
      );
    }
  };
  dispatchCloseEvent = (e) => {
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        triggeredBy: e.target,
      },
    };
    if (
      this.dispatchEvent(
        new CustomEvent((this.constructor as typeof CDSMenu).eventOnClose, init)
      )
    ) {
      this.dispatchEvent(
        new CustomEvent((this.constructor as typeof CDSMenu).eventOnClose, init)
      );
    }
  };
  _newContextCreate = () => {
    this.context = {
      ...this.context,
      isRoot: false,
      size: this.size,
    };
  };
  _registerMenuItems = () => {
    let items;
    if (this.isChild) {
      items = (
        this.querySelector('slot[name="submenu"]') as HTMLSlotElement
      ).assignedElements();
    } else {
      items = this.shadowRoot?.querySelector('slot')?.assignedElements();
    }
    this.items = items?.filter((item) => {
      if (item.tagName === 'CDS-MENU-ITEM') {
        return !(item as CDSmenuItem).disabled;
      }
      return item.tagName !== 'CDS-MENU-ITEM-DIVIDER';
    });
  };
  _setActiveItems = () => {
    this.items?.map((item) => {
      let activeItem: activeItemType;
      switch (item.tagName) {
        case 'CDS-MENU-ITEM-RADIO-GROUP': {
          let slotElements = item.querySelectorAll(`${prefix}-menu-item`);
          if (slotElements?.length) {
            for (const entry of slotElements.entries()) {
              activeItem = {
                item: entry[1] as CDSmenuItem,
                parent: item as HTMLElement,
              };
              this.activeitems = [...this.activeitems, activeItem];
            }
          }
          break;
        }
        case 'CDS-MENU-ITEM-GROUP': {
          let slotElements = item.shadowRoot
            ?.querySelector('slot')
            ?.assignedElements();
          slotElements?.map((el) => {
            activeItem = {
              item: el as CDSmenuItem,
              parent: el as HTMLElement,
            };
            this.activeitems = [...this.activeitems, activeItem];
          });
          break;
        }
        case 'CDS-MENU-ITEM-SELECTABLE': {
          activeItem = {
            item: item.shadowRoot?.querySelector(
              `${prefix}-menu-item`
            ) as CDSmenuItem,
            parent: item as HTMLElement,
          };
          this.activeitems = [...this.activeitems, activeItem];
          break;
        }
        default: {
          activeItem = {
            item: item as CDSmenuItem,
            parent: null,
          };
          this.activeitems = [...this.activeitems, activeItem];
        }
      }
    });
    const activeEl = this.activeitems[0]?.item ?? document.activeElement;
    activeEl.focus();
  };
  static styles = styles;
}
export default CDSMenu;
