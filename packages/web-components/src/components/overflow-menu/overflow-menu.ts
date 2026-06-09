/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { adoptStyles, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { find } from '../../globals/internal/collection-helpers';
import CDSFloatingMenuTrigger from '../floating-menu/floating-menu-trigger';
import { OVERFLOW_MENU_SIZE } from './defs';
import CDSOverflowMenuBody from './overflow-menu-body';
import '../menu/index';
import CDSMenu from '../menu/menu';
import { MENU_SIZE } from '../menu/defs';
import { isFeatureFlagEnabled } from '../feature-flags/index';
import FloatingUIController from '../../globals/controllers/floating-controller';

import iconButtonStyles from '../icon-button/icon-button.scss?lit';
import styles from './overflow-menu.scss?lit';
import CDSIconButton from '../icon-button/icon-button';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export { OVERFLOW_MENU_SIZE };

const menuItemTagPrefix = `${prefix}-menu-item`.toUpperCase();

// Migration support for existing child structure.
const deprecatedOverflowMenuTagNames = new Set([
  `${prefix}-overflow-menu-body`.toUpperCase(),
  `${prefix}-overflow-menu-item`.toUpperCase(),
]);

const bottomFirstFallbackPlacements = [
  'bottom-start',
  'bottom-end',
  'top-start',
  'top-end',
] as const;

const topFirstFallbackPlacements = [
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
] as const;

const warnInDev = (message: string) => {
  if (process.env.NODE_ENV === 'development') {
    globalThis.console?.warn(message);
  }
};

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
  private _menuController = new FloatingUIController(this);

  /**
   * The menu body.
   */
  private _menuBody: CDSOverflowMenuBody | null = null;

  /**
   * The identifier used by the popup surface.
   */
  private _menuId = `${prefix}-overflow-menu-${Math.random()
    .toString(16)
    .slice(2)}`;

  /**
   * Ensures the deprecated-child warning only fires once.
   */
  private _didWarnDeprecatedChildren = false;

  /**
   * Ensures the invalid menu composition warning only fires once.
   */
  private _didWarnInvalidComposition = false;

  /**
   * Monotonic token used to ignore stale async menu sync callbacks.
   */
  private _menuSyncToken = 0;

  /**
   * Handles user-initiated toggling of the menu.
   */
  private async _handleUserInitiatedToggle() {
    if (this.disabled) {
      return;
    }

    this.open = !this.open;
    const { index, open, updateComplete } = this;
    if (open) {
      await updateComplete;

      if (this._isMenuCompositionEnabled()) {
        await this._focusManagedMenuItem(index);
        return;
      }

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
  private _handleClickTrigger = async (event: MouseEvent) => {
    if (this._isTriggerEvent(event)) {
      this._handleUserInitiatedToggle();
      return;
    }

    if (
      !this._isMenuCompositionEnabled() &&
      this._isDeprecatedOverflowMenuItemEvent(event)
    ) {
      this.open = false;
    }
  };

  /**
   * Handles `keydown` event on the trigger button.
   */
  private _handleKeydownTrigger = async (event: KeyboardEvent) => {
    if (!this._isTriggerEvent(event)) {
      return;
    }

    if (event.key === ' ' || event.key === 'Enter') {
      this._handleUserInitiatedToggle();
      event.preventDefault();
    }
  };

  /**
   * Prevents the trigger click from immediately re-opening the menu after blur.
   */
  private _handleMousedownTrigger = (event: MouseEvent) => {
    if (this._isMenuCompositionEnabled() && this._isTriggerEvent(event)) {
      event.preventDefault();
    }
  };

  /**
   * Handles close requests emitted by the managed menu.
   */
  private _handleManagedMenuClose = (
    event: CustomEvent<{ triggerEventType?: string }>
  ) => {
    const menu = this._getMenuChild();
    if (
      !this._isMenuCompositionEnabled() ||
      !menu ||
      event.composedPath()[0] !== menu
    ) {
      return;
    }

    this.open = false;

    if (event.detail?.triggerEventType !== 'focusout') {
      requestAnimationFrame(() => {
        this._getTriggerButton()?.focus();
      });
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
   * Enables the menu-composition OverflowMenu implementation leveraging `cds-menu`.
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'enable-v12-overflowmenu',
  })
  enableV12Overflowmenu = false;

  /**
   * `true` if this overflow menu body should be flipped.
   */
  @property({ type: Boolean, reflect: true })
  flipped = false;

  /**
   * Experimental property. Enables automatic menu placement flipping to avoid clipping.
   */
  @property({ type: Boolean, reflect: true })
  autoalign = false;

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
   * A label describing the menu options. Used for the trigger tooltip and the menu's accessible label.
   */
  @property({ type: String })
  label = '';

  /**
   * Specify how the menu should align with the trigger button.
   * Valid values: 'bottom-start', 'bottom-end', 'top-start', 'top-end'
   */
  @property({ type: String, attribute: 'menu-alignment' })
  menuAlignment: string = 'bottom-start';

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
   * `true` if this overflow menu use inside breadcrumb.
   */
  @property({ type: Boolean, reflect: true })
  breadcrumb = false;

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
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    super.connectedCallback();

    adoptStyles(this.renderRoot as ShadowRoot, [iconButtonStyles, styles]);

    this.addEventListener(
      CDSMenu.eventOnClose,
      this._handleManagedMenuClose as EventListener
    );
    this.addEventListener('click', this._handleClickTrigger);
    this.addEventListener('keydown', this._handleKeydownTrigger);
    this.addEventListener('mousedown', this._handleMousedownTrigger);
  }

  disconnectedCallback() {
    this.removeEventListener(
      CDSMenu.eventOnClose,
      this._handleManagedMenuClose as EventListener
    );
    this.removeEventListener('click', this._handleClickTrigger);
    this.removeEventListener('keydown', this._handleKeydownTrigger);
    this.removeEventListener('mousedown', this._handleMousedownTrigger);
    super.disconnectedCallback();
  }

  protected _renderTooltipContent() {
    const tooltipLabel = this._getLabelText();

    if (this.label || !this.querySelector('[slot=tooltip-content]')) {
      return html`
        <cds-tooltip-content ?hidden=${this.disabled || this.open}>
          ${tooltipLabel}
        </cds-tooltip-content>
      `;
    }

    return super._renderTooltipContent();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    const menuCompositionEnabled = this._isMenuCompositionEnabled();

    const button = this.shadowRoot
      ?.querySelector(`${prefix}-tooltip`)
      ?.querySelector('button');
    button?.classList.add(
      `${prefix}--btn--icon-only`,
      `${prefix}--overflow-menu`
    );

    if (changedProperties.has('open')) {
      if (!menuCompositionEnabled) {
        this._menuController.hostDisconnected();
        this._resetMenuChildFloatingStyles();
        const { open } = this;
        if (open && !this._menuBody) {
          this._menuBody = find(
            this.childNodes,
            (elem) =>
              (elem.constructor as typeof CDSOverflowMenuBody).FLOATING_MENU
          );
        }
        const { _menuBody: menuBody, size } = this;
        if (menuBody) {
          menuBody.id ||= this._menuId;
          menuBody.setAttribute('breadcrumb', String(this.breadcrumb));
          menuBody.open = open;
          menuBody.size = size;
        }
      }
    }

    if (
      changedProperties.has('enableV12Overflowmenu') &&
      !menuCompositionEnabled
    ) {
      this._menuController.hostDisconnected();
      this._resetMenuChildFloatingStyles({ closeMenu: true });
    }

    if (changedProperties.has('dataTable')) {
      const tooltip = this.shadowRoot?.querySelector(`${prefix}-tooltip`);
      tooltip?.toggleAttribute('data-table', this.dataTable);
    }

    if (changedProperties.has('size')) {
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

    const labelText = this._getLabelText();
    const popupId = menuCompositionEnabled
      ? (this._getMenuChild()?.id ?? this._menuId)
      : this._menuBody?.id;

    button?.setAttribute('aria-haspopup', 'menu');
    button?.setAttribute('aria-expanded', String(this.open));
    button?.setAttribute('aria-label', labelText);

    if (this.open && popupId) {
      button?.setAttribute('aria-controls', popupId);
    } else {
      button?.removeAttribute('aria-controls');
    }

    const shouldSyncMenuChild =
      menuCompositionEnabled &&
      (changedProperties.has('open') ||
        changedProperties.has('label') ||
        changedProperties.has('autoalign') ||
        changedProperties.has('menuAlignment') ||
        changedProperties.has('size') ||
        changedProperties.has('enableV12Overflowmenu'));

    if (shouldSyncMenuChild) {
      this._syncMenuChild();
    }

    if (changedProperties.has('open') || changedProperties.has('disabled')) {
      this._syncTriggerTooltipState();
    }
  }

  render() {
    return html`${super.render()} `;
  }

  private _getLabelText() {
    if (this.label) return this.label;

    const tooltipContent = this.querySelector(
      '[slot=tooltip-content]'
    )?.textContent?.trim();

    return tooltipContent || 'Options';
  }

  private _getTriggerButton() {
    return this.shadowRoot
      ?.querySelector(`${prefix}-tooltip`)
      ?.querySelector('button') as HTMLButtonElement | null;
  }

  private _isTriggerEvent(event: Event) {
    const triggerButton = this._getTriggerButton();

    return !!triggerButton && event.composedPath().includes(triggerButton);
  }

  private _isDeprecatedOverflowMenuItemEvent(event: Event) {
    return event
      .composedPath()
      .some(
        (entry) =>
          entry instanceof HTMLElement &&
          deprecatedOverflowMenuTagNames.has(entry.tagName)
      );
  }

  /**
   * Checks whether the menu-composition path is enabled.
   */
  private _isMenuCompositionEnabled() {
    return (
      this.enableV12Overflowmenu ||
      isFeatureFlagEnabled('enable-v12-overflowmenu', this)
    );
  }

  /**
   * Checks whether floating styles should be driven by Floating UI.
   */
  private _usesDynamicFloatingStyles() {
    return (
      this.autoalign ||
      isFeatureFlagEnabled('enable-v12-dynamic-floating-styles', this)
    );
  }

  private _getMenuChild() {
    return (Array.from(this.children).find((child) => {
      return child.tagName === `${prefix}-menu`.toUpperCase();
    }) ?? null) as CDSMenu | null;
  }

  private _warnDeprecatedChildren() {
    if (this._didWarnDeprecatedChildren) {
      return;
    }

    // Migration guard for flagged usage of deprecated overflow-menu children.
    const hasDeprecatedChildren = Array.from(this.children).some((child) => {
      return deprecatedOverflowMenuTagNames.has(child.tagName);
    });

    if (hasDeprecatedChildren) {
      warnInDev(
        '`cds-overflow-menu` with `enable-v12-overflowmenu` expects a direct `cds-menu` child instead of the deprecated `cds-overflow-menu-body` structure.'
      );
      this._didWarnDeprecatedChildren = true;
    }
  }

  private _warnInvalidMenuComposition() {
    if (this._didWarnInvalidComposition) {
      return;
    }

    const hasDirectMenuItems = Array.from(this.children).some((child) =>
      child.tagName.startsWith(menuItemTagPrefix)
    );
    const hasMenuChild = !!this._getMenuChild();

    if (!hasMenuChild || hasDirectMenuItems) {
      warnInDev(
        '`cds-overflow-menu` with `enable-v12-overflowmenu` expects a direct `cds-menu` child. Place `cds-menu-item*` descendants inside that `cds-menu`.'
      );
      this._didWarnInvalidComposition = true;
    }
  }

  private _syncMenuChild() {
    const menuSyncToken = ++this._menuSyncToken;

    this._warnDeprecatedChildren();
    this._warnInvalidMenuComposition();

    const menu = this._getMenuChild();
    if (!menu) {
      return;
    }

    const menuAlignment = this.menuAlignment;

    menu.id ||= this._menuId;
    menu.label = this._getLabelText();
    menu.menuAlignment = menuAlignment;
    this._syncMenuChildPosition(menu);
    menu.open = this.open;
    menu.size = this._toMenuSize(this.size);

    const shouldUseFloatingStyles = this._usesDynamicFloatingStyles();

    if (!this.open || !shouldUseFloatingStyles) {
      this._menuController.hostDisconnected();
      this._resetMenuFloatingStyles(menu);
      return;
    }

    this.updateComplete.then(async () => {
      if (
        menuSyncToken !== this._menuSyncToken ||
        !this.open ||
        !this._isMenuCompositionEnabled() ||
        this._getMenuChild() !== menu
      ) {
        return;
      }

      await menu.updateComplete;
      if (
        menuSyncToken !== this._menuSyncToken ||
        !this.open ||
        !this._isMenuCompositionEnabled() ||
        this._getMenuChild() !== menu
      ) {
        return;
      }

      const trigger = this._getTriggerButton();
      if (!trigger) {
        return;
      }

      const styleElement = menu.shadowRoot?.querySelector(
        `.${prefix}--menu`
      ) as HTMLElement | undefined;

      const fallbackPlacements = menuAlignment.includes('bottom')
        ? [...bottomFirstFallbackPlacements]
        : [...topFirstFallbackPlacements];

      const flipArguments = this.autoalign
        ? {
            fallbackPlacements,
          }
        : {
            mainAxis: false,
            crossAxis: false,
          };

      this._menuController.setPlacement({
        trigger,
        target: menu,
        alignment: menuAlignment,
        styleElement,
        flipArguments,
        mainAxisOffset: 0,
        open: this.open,
      });
    });
  }

  private _syncMenuChildPosition(menu: CDSMenu) {
    const trigger = this._getTriggerButton();
    if (!trigger) {
      return;
    }

    const { left, right, top, bottom } = trigger.getBoundingClientRect();
    menu.x = [left, right];
    menu.y = [top, bottom];
  }

  private _toMenuSize(size: OVERFLOW_MENU_SIZE | string): CDSMenu['size'] {
    switch (size) {
      case OVERFLOW_MENU_SIZE.EXTRA_SMALL:
        return MENU_SIZE.EXTRA_SMALL;
      case OVERFLOW_MENU_SIZE.SMALL:
        return MENU_SIZE.SMALL;
      case OVERFLOW_MENU_SIZE.MEDIUM:
        return MENU_SIZE.MEDIUM;
      case OVERFLOW_MENU_SIZE.LARGE:
        return MENU_SIZE.LARGE;
      default:
        return MENU_SIZE.MEDIUM;
    }
  }

  private async _focusManagedMenuItem(index: number) {
    const menu = this._getMenuChild();
    if (!menu) {
      return;
    }

    await menu.updateComplete;

    if (!this.open || this._getMenuChild() !== menu) {
      return;
    }

    const enabledItems = menu.activeitems
      .map(({ item }) => item)
      .filter(
        (item) => item instanceof HTMLElement && !item.hasAttribute('disabled')
      );
    const focusTarget = enabledItems[index - 1] ?? enabledItems[0];

    focusTarget?.focus();
  }

  private _resetMenuChildFloatingStyles({
    closeMenu = false,
  }: { closeMenu?: boolean } = {}) {
    const menu = this._getMenuChild();
    if (!menu) {
      return;
    }

    this._resetMenuFloatingStyles(menu);

    if (closeMenu) {
      menu.open = false;
    }
  }

  private _resetMenuFloatingStyles(menu: CDSMenu) {
    const menuSurface = menu.shadowRoot?.querySelector(`.${prefix}--menu`) as
      | HTMLElement
      | undefined;

    if (!menuSurface) {
      return;
    }

    menuSurface.style.removeProperty('left');
    menuSurface.style.removeProperty('top');
    menuSurface.style.removeProperty('position');
    menuSurface.style.removeProperty('visibility');
    menuSurface.removeAttribute('align');
  }

  /**
   * Suppresses trigger tooltip interactions while the menu is open.
   */
  private _syncTriggerTooltipState() {
    const tooltip = this.shadowRoot?.querySelector(`${prefix}-tooltip`) as
      | (HTMLElement & { open?: boolean; keyboardOnly?: boolean })
      | null;
    const tooltipContent = this.shadowRoot?.querySelector(
      `${prefix}-tooltip-content`
    ) as HTMLElement | null;

    if (!tooltip) {
      return;
    }

    tooltip.keyboardOnly = this.open;
    tooltipContent?.toggleAttribute('hidden', this.disabled || this.open);

    if (this.open) {
      tooltip.open = false;
    }
  }
}

export default CDSOverflowMenu;
