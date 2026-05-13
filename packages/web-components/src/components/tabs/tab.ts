/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import CDSContentSwitcherItem from '../content-switcher/content-switcher-item';
import { TABS_ICON_SIZE, TABS_TYPE } from './defs';
import styles from './tabs.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import '../button/button';
import Close16 from '@carbon/icons/es/close/16.js';
import iconLoader from '../../globals/internal/icon-loader';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Basic tab.
 *
 * @element cds-tab
 * @fires cds-tab-beingclosed
 *   The custom event fired before a tab is closed upon a user gesture.
 *   Cancellation of this event stops changing the user-initiated action.
 * @fires cds-tab-closed - The custom event fired after a a tab is closed upon a user gesture.
 */
@customElement(`${prefix}-tab`)
export default class CDSTab extends HostListenerMixin(CDSContentSwitcherItem) {
  /**
   * `true` if this tab should be highlighted.
   * If `true`, parent `<cds-tabs>` selects/deselects this tab upon keyboard interaction.
   *
   * @private
   */
  @property({ type: Boolean, reflect: true })
  highlighted = false;

  /**
   * Tab type.
   */
  @property({ reflect: true })
  type = TABS_TYPE.REGULAR;

  /**
   * `true` if this tab is icon-only.
   */
  @property({ type: Boolean, reflect: true, attribute: 'icon-only' })
  iconOnly = false;

  /**
   * Specify the icon size used by icon-only tabs.
   */
  @property({ attribute: 'icon-size', reflect: true })
  iconSize?: TABS_ICON_SIZE;

  /**
   * The tab text content.
   */
  @property()
  tabTitle;

  /**
   * **Experimental**: Display an empty dot badge on the Tab.
   */
  @property({ type: Boolean, reflect: true, attribute: 'badge-indicator' })
  badgeIndicator = false;

  /**
   * Whether this tab should be dismissable.
   */
  @state()
  _dismissable = false;

  /**
   * The index of the tab component
   */
  @state()
  _index = -1;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    // Retrieve content of the slot to use for aria-label.
    const content = (target as HTMLSlotElement).assignedNodes();
    this.tabTitle = content[0]?.textContent?.trim() || undefined;
  }

  /**
   * Handles `keydown` event on the tab.
   * Triggers tab close when Delete key is pressed on a dismissable tab.
   */
  @HostListener('keydown')
  protected _handleKeydown(event: KeyboardEvent) {
    const { key } = event;
    if (
      this._dismissable &&
      !this.disabled &&
      (key === 'Delete' || key === 'Backspace')
    ) {
      event.preventDefault();
      this._handleClose(event);
    }
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
  }

  render() {
    const navLinkClasses = classMap({
      [`${prefix}--tabs__nav-link`]: true,
      [`${prefix}--tabs__nav-link--dismissable`]: this._dismissable,
    });
    const closeButtonClasses = classMap({
      [`${prefix}--tabs__nav-item--close`]: this._dismissable,
      [`${prefix}--tabs__nav-item--close--hidden`]: !this._dismissable,
    });
    const {
      badgeIndicator,
      disabled,
      selected,
      tabTitle,
      _handleSlotChange: handleSlotChange,
      _handleClick: handleClick,
    } = this;

    const iconButton = html`
      <cds-button
        title="${this.textContent?.trim()
          ? `Remove ${this.textContent.trim()} tab`
          : 'Remove tab'}"
        class="${closeButtonClasses}"
        kind="ghost"
        size="xs"
        @click="${handleClick}"
        tab-index="${-1}"
        aria-hidden="${this.selected && this._dismissable ? 'false' : 'true'}"
        ?disabled="${disabled}">
        ${iconLoader(Close16, { 'aria-label': 'close', slot: 'icon' })}
      </cds-button>
    `;

    const accessibleLabel = tabTitle || this.getAttribute('aria-label');
    const isIconOnly =
      this.iconOnly ||
      this.classList.contains(`${prefix}--tabs__nav-item--icon-only`);
    // No `href`/`tabindex` to not to make this `<a>` click-focusable
    const tabLink = html`
      <a
        class="${navLinkClasses}"
        role="tab"
        aria-label="${ifDefined(accessibleLabel || undefined)}"
        tabindex="${selected ? 0 : -1}"
        ?disabled="${disabled}"
        aria-selected="${selected}">
        <span class="${prefix}--tabs__nav-item-label-wrapper">
          <slot @slotchange="${handleSlotChange}"></slot>
        </span>
        ${!disabled && badgeIndicator
          ? html`<cds-badge-indicator></cds-badge-indicator>`
          : ''}
      </a>
      ${iconButton}
    `;

    if (isIconOnly && accessibleLabel && !disabled) {
      return html`
        <cds-tooltip align="bottom" class="${prefix}--icon-tooltip">
          ${tabLink}
          <cds-tooltip-content>${accessibleLabel}</cds-tooltip-content>
        </cds-tooltip>
      `;
    }

    return tabLink;
  }

  /**
   * Handles the close action for the tab.
   * Dispatches before-close and close events.
   */
  protected _handleClose(event: Event) {
    event.stopPropagation();
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        index: this._index,
      },
    };
    if (
      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSTab).eventBeforeClose,
          init
        )
      )
    ) {
      this.dispatchEvent(
        new CustomEvent((this.constructor as typeof CDSTab).eventClose, init)
      );
    }
  }

  /**
   * Handles click event on the close button.
   */
  _handleClick(event: Event) {
    this._handleClose(event);
  }

  /**
   * The name of the custom event fired before a tab is closed upon a user gesture.
   * Cancellation of this event stops changing the user-initiated action.
   */
  static get eventBeforeClose() {
    return `${prefix}-tab-beingclosed`;
  }

  /**
   * The name of the custom event fired after a a tab is closed upon a user gesture.
   */
  static get eventClose() {
    return `${prefix}-tab-closed`;
  }

  static styles = styles;
}
