/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListener from '../../globals/decorators/host-listener';
import FocusMixin from '../../globals/mixins/focus';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { find } from '../../globals/internal/collection-helpers';
import CDSFloatingMenuTrigger from '../floating-menu/floating-menu-trigger';
import { OVERFLOW_MENU_SIZE } from './defs';
import CDSOverflowMenuBody from './overflow-menu-body';
import styles from './overflow-menu.scss';
import CDSIconButton from '../icon-button/icon-button';

export { OVERFLOW_MENU_SIZE };

/**
 * Overflow menu.
 *
 * @element cds-overflow-menu
 * @slot icon - The icon for the trigger button.
 */
@customElement(`${prefix}-overflow-menu`)
class CDSOverflowMenu
  extends HostListenerMixin(FocusMixin(CDSIconButton))
  implements CDSFloatingMenuTrigger
{
  /**
   * The menu body.
   */
  private _menuBody: CDSOverflowMenuBody | null = null;

  /**
   * Handles user-initiated toggling of the menu.
   */
  private async _handleUserInitiatedToggle() {
    this.open = !this.open;
    const { index, open, updateComplete } = this;
    if (open) {
      await updateComplete;
      const { _menuBody: menuBody } = this;
      const menuItem = menuBody?.querySelector(
        `${prefix}-overflow-menu-item:nth-of-type(${index})`
      ) as HTMLElement;
      menuItem?.focus();
    }
  }

  /**
   * Handles `click` event on the trigger button.
   */
  @HostListener('click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClickTrigger = async () => {
    this._handleUserInitiatedToggle();
  };

  /**
   * Handles `keydown` event on the trigger button.
   */
  @HostListener('keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydownTrigger = async (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      this._handleUserInitiatedToggle();
      event.preventDefault();
    }
  };

  /**
   * `true` if this tooltip is in a data table row
   */
  @property({ type: Boolean, reflect: true, attribute: 'data-table' })
  dataTable = false;

  /**
   * `true` if this overflow menu should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `true` if this overflow menu body should be flipped.
   */
  @property({ type: Boolean, reflect: true })
  flipped = false;

  /**
   * `true` if the dropdown should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Index (starting at 1) of overflow menu item to focus on open.
   */
  @property()
  index = 1;

  /**
   * Overflow menu size.
   */
  @property({ reflect: true })
  size = OVERFLOW_MENU_SIZE.MEDIUM;

  /**
   * `true` if this menu is a toolbar action
   */
  @property({ type: Boolean, attribute: 'toolbar-action', reflect: true })
  toolbarAction = false;

  /**
   * @returns The position of the trigger button in the viewport.
   */
  get triggerPosition() {
    return this.getBoundingClientRect();
  }

  connectedCallback() {
    if (!this.hasAttribute('aria-haspopup')) {
      this.setAttribute('aria-haspopup', 'true');
    }
    if (!this.hasAttribute('aria-expanded')) {
      this.setAttribute('aria-expanded', 'false');
    }
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    const button = this.shadowRoot
      ?.querySelector(`${prefix}-tooltip`)
      ?.querySelector('button');
    button?.classList.add(
      `${prefix}--btn--icon-only`,
      `${prefix}--overflow-menu`
    );

    if (changedProperties.has('open')) {
      const { open } = this;
      if (open && !this._menuBody) {
        this._menuBody = find(
          this.childNodes,
          (elem) =>
            (elem.constructor as typeof CDSOverflowMenuBody).FLOATING_MENU
        );
      }
      const { _menuBody: menuBody } = this;
      if (menuBody) {
        menuBody.open = open;
        this.setAttribute('aria-expanded', String(Boolean(open)));
      }
    }

    if (changedProperties.has('dataTable')) {
      const tooltip = this.shadowRoot?.querySelector(`${prefix}-tooltip`);
      tooltip?.setAttribute('data-table', '');
    }

    if (changedProperties.has('flipped')) {
      (
        this.querySelector(
          `${prefix}-overflow-menu-body`
        ) as CDSOverflowMenuBody
      ).flipped = true;
    }

    if (changedProperties.has('size')) {
      const { size } = this;
      const { _menuBody: menuBody } = this;
      if (menuBody) {
        menuBody.size = size;
      }

      button?.classList.forEach((item) => {
        if (item.startsWith(`${prefix}--overflow-menu--`)) {
          button?.classList.remove(item);
        }
      });
      button?.classList.add(`${prefix}--overflow-menu--${this.size}`);

      const tooltip = this.shadowRoot?.querySelector(`${prefix}-tooltip`);
      tooltip?.setAttribute('size', this.size);
    }

    if (changedProperties.has('toolbarAction') && this.toolbarAction) {
      this.shadowRoot
        ?.querySelector(`${prefix}-tooltip`)
        ?.setAttribute('toolbar-action', '');
    }

    super.updated(changedProperties);
  }

  render() {
    return html` ${super.render()} `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSOverflowMenu;
