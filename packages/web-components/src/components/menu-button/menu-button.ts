/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './menu-button.scss?lit';
import '../button/index';
import '../menu/index';
import ChevronDown16 from '@carbon/icons/es/chevron--down/16.js';
import { iconLoader } from '../../globals/internal/icon-loader';
import { POPOVER_ALIGNMENT } from '../popover/defs';
import CDSMenu from '../menu/menu';
import CDSButton from '../button/button';
import { MENU_BUTTON_KIND, MENU_BUTTON_SIZE } from './defs';
import { MENU_BACKGROUND_TOKEN } from '../menu/defs';
import FloatingUIController from '../../globals/controllers/floating-controller';

export { MENU_BUTTON_KIND, MENU_BUTTON_SIZE };

/**
 * Menu button.
 * @element cds-menu-button
 */
@customElement(`${prefix}-menu-button`)
class CDSMenuButton extends HostListenerMixin(LitElement) {
  private _menuController = new FloatingUIController(this);

  @query(`${prefix}-button`)
  _triggerNode!: CDSButton;

  @property({ type: Boolean, reflect: true })
  private _open = false;

  /**
   * Specify whether the MenuButton should be disabled, or not.
   */
  @property({ type: Boolean, reflect: true })
  disabled;

  /**
   * Specify the type of button to be used as the base for the trigger button.
   */
  @property({ type: MENU_BUTTON_KIND, reflect: true })
  kind = MENU_BUTTON_KIND.PRIMARY;

  /**
   * Provide the label to be rendered on the trigger button.
   */ @property({ type: String })
  label;

  /**
   * Experimental property. Specify how the menu should align with the button element
   */
  @property({ reflect: true, type: String, attribute: 'menu-alignment' })
  menuAlignment = POPOVER_ALIGNMENT.BOTTOM;

  /**
   * Specify whether the menu should have a border.
   */
  @property({ type: Boolean, reflect: true, attribute: 'menu-border' })
  menuBorder = false;

  /**
   * Specify the background token to use for the menu. Default is 'layer'.
   */
  @property({ type: String, reflect: true, attribute: 'menu-background-token' })
  menuBackgroundToken = MENU_BACKGROUND_TOKEN.LAYER;

  /**
   * Specify the size of the button and menu.
   */
  @property({ type: MENU_BUTTON_SIZE, reflect: true })
  size = MENU_BUTTON_SIZE.LARGE;

  /**
   * Specify the tabIndex of the button.
   */
  @property({ type: Number, attribute: 'tab-index', reflect: true })
  tabIndex = 0;

  @HostListener('click')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClick = (event: Event) => {
    const { _triggerNode: trigger } = this;
    if (!trigger) {
      return;
    }

    // Handle clicks on trigger only, other listeners handle clicks on menu items
    const path = event.composedPath();
    if (path.includes(trigger)) {
      if (this._open) {
        this._closeMenu({ restoreFocus: true });
      } else {
        this._open = true;
      }
    }
  };

  @HostListener('mousedown')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleMousedown = (event: MouseEvent) => {
    const { _triggerNode: trigger } = this;
    if (!trigger) {
      return;
    }

    const path = event.composedPath();
    if (path.includes(trigger)) {
      event.preventDefault();
    }
  };

  @HostListener('focusout')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleBlur = ({ relatedTarget }: FocusEvent) => {
    // Close the menu if the focus moves outside the menu button or menu
    if (!this.contains(relatedTarget as Node)) {
      this._closeMenu();
    }
  };

  @HostListener('keydown')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = (event: KeyboardEvent) => {
    if (!this._open || event.key !== 'Escape') {
      return;
    }

    const { _triggerNode: trigger } = this;
    if (!trigger) {
      return;
    }

    const path = event.composedPath();
    if (path.includes(trigger)) {
      event.stopPropagation();
      event.preventDefault();
      this._closeMenu({ restoreFocus: true });
    }
  };

  @HostListener(`${prefix}-menu-closed`)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleMenuClosed = (
    event: CustomEvent<{ triggerEventType?: string }>
  ) => {
    const menu = this.querySelector(`${prefix}-menu`);
    if (!menu || event.target !== menu || !this._open) {
      return;
    }

    const shouldRestoreFocus = event.detail?.triggerEventType !== 'focusout';
    this._closeMenu({ restoreFocus: shouldRestoreFocus });
  };

  updated(changedProperties) {
    const menu = this.querySelector(`${prefix}-menu`) as CDSMenu;

    if (
      changedProperties.has('_open') ||
      changedProperties.has('menuAlignment')
    ) {
      this.updateComplete.then(() => {
        const styleElement = menu.shadowRoot?.querySelector(
          `.${prefix}--menu`
        ) as HTMLElement;

        menu.open = this._open;

        this._menuController.setPlacement({
          trigger: this._triggerNode,
          target: menu,
          alignment: this.menuAlignment,
          styleElement,
          matchWidth: true,
          open: this._open,
        });
      });
    }

    if (changedProperties.has('size')) {
      menu.setAttribute('size', this.size);
    }

    if (changedProperties.has('menuBorder')) {
      menu.toggleAttribute('border', this.menuBorder);
    }

    if (changedProperties.has('menuBackgroundToken')) {
      menu.backgroundToken = this.menuBackgroundToken;
    }
  }

  render() {
    const { kind, size, disabled, tabIndex, label } = this;
    return html`
      <cds-button
        kind=${kind}
        size=${size}
        ?disabled=${disabled}
        tab-index=${tabIndex}>
        ${label} ${iconLoader(ChevronDown16, { slot: 'icon' })}
      </cds-button>
      <slot></slot>
    `;
  }

  static styles = styles;

  private _closeMenu({
    restoreFocus = false,
  }: { restoreFocus?: boolean } = {}) {
    if (!this._open) {
      return;
    }

    this._open = false;

    if (restoreFocus) {
      this._focusTrigger();
    }
  }

  private _focusTrigger() {
    if (!this._triggerNode || typeof this._triggerNode.focus !== 'function') {
      return;
    }

    this._triggerNode.focus();
  }
}

export default CDSMenuButton;
