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
import styles from './combo-button.scss?lit';
import '../button/index';
import '../menu/index';
import '../icon-button/index';
import ChevronDown16 from '@carbon/icons/lib/chevron--down/16.js';
import CDSMenu from '../menu/menu';
import CDSButton from '../button/button';
import { COMBO_BUTTON_SIZE, COMBO_BUTTON_TOOLTIP_ALIGNMENT } from './defs';
import { POPOVER_ALIGNMENT } from '../popover/defs';
import { ICON_BUTTON_TOOLTIP_ALIGNMENT } from '../icon-button/defs';
import FloatingUIController from '../../globals/controllers/floating-controller';

export { COMBO_BUTTON_SIZE, COMBO_BUTTON_TOOLTIP_ALIGNMENT };

/**
 * Combo button.
 * @element cds-combo-button
 */
@customElement(`${prefix}-combo-button`)
class CDSComboButton extends HostListenerMixin(LitElement) {
  private _menuController = new FloatingUIController(this);

  @query(`${prefix}-icon-button`)
  _triggerNode!: CDSButton;

  @query(`${prefix}-menu`)
  _menuNode!: CDSMenu;

  @property({ type: Boolean, reflect: true })
  private _open = false;

  /**
   * Specify whether the ComboButton should be disabled, or not.
   */
  @property({ type: Boolean, reflect: true })
  disabled?;

  /**
   * Provide the label to be rendered on the primary action button.
   */
  @property()
  label!: string;

  /**
   * Experimental property. Specify how the menu should align with the button element
   */
  @property({ reflect: true, type: String, attribute: 'menu-alignment' })
  menuAlignment = POPOVER_ALIGNMENT.TOP;

  /**
   * Provide an optional function to be called when the primary action element is clicked.
   */
  @property({ type: Function })
  onClick?: (event: Event) => void;

  /**
   * Specify the size of the button and menu.
   */
  @property({ type: COMBO_BUTTON_SIZE, reflect: true })
  size = COMBO_BUTTON_SIZE.LARGE;

  /**
   * Specify how the trigger tooltip should be aligned.
   */
  @property({ reflect: true, attribute: 'tooltip-alignment' })
  tooltipAlignment = ICON_BUTTON_TOOLTIP_ALIGNMENT.TOP;

  /**
   * Provide the tooltip content for the icon button.
   */
  @property({ type: String, attribute: 'tooltip-content' })
  tooltipContent = 'Additional actions';

  @HostListener('click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClick = (event: Event) => {
    const path = event.composedPath();
    if (path.includes(this._triggerNode)) {
      this._open = !this._open;
    } else if (this._open) {
      this._open = false;
    }
    if ((event.target as HTMLElement).tagName === 'CDS-MENU-ITEM') {
      this.onClick?.(event);
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
          trigger: this,
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
    const { size, disabled, label, tooltipAlignment, menuAlignment, onClick } =
      this;
    return html`
      <cds-button size=${size} ?disabled=${disabled} @click=${onClick}>
        ${label}
      </cds-button>
      <cds-icon-button
        size=${size}
        ?disabled=${disabled}
        align=${tooltipAlignment}
        menu-alignment=${menuAlignment}
        part="trigger">
        ${ChevronDown16({ slot: 'icon' })}
        <span slot="tooltip-content">${this.tooltipContent}</span>
      </cds-icon-button>
      <slot></slot>
    `;
  }

  static styles = styles;
}

export default CDSComboButton;
