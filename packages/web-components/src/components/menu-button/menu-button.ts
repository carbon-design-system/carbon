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
import ChevronDown16 from '@carbon/icons/lib/chevron--down/16.js';
import { POPOVER_ALIGNMENT } from '../popover/defs';
import CDSMenu from '../menu/menu';
import CDSButton from '../button/button';
import { MENU_BUTTON_KIND, MENU_BUTTON_SIZE } from './defs';
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

  @query(`${prefix}-menu`)
  _menuNode!: CDSMenu;

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
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClick = (event: Event) => {
    const path = event.composedPath();
    if (path.includes(this._triggerNode)) {
      this._open = !this._open;
    } else if (this._open) {
      this._open = false;
    }
  };

  @HostListener('focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleBlur = ({ relatedTarget }: FocusEvent) => {
    // Close the menu if the focus moves outside the menu button or menu
    if (!this.contains(relatedTarget as Node)) {
      this._open = false;
    }
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
  }

  render() {
    const { kind, size, disabled, tabIndex, label } = this;
    return html`
      <cds-button
        kind=${kind}
        size=${size}
        ?disabled=${disabled}
        tab-index=${tabIndex}>
        ${label} ${ChevronDown16({ slot: 'icon' })}
      </cds-button>
      <slot></slot>
    `;
  }

  static styles = styles;
}

export default CDSMenuButton;
