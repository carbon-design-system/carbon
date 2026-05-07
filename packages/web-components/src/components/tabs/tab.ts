/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property, state, query } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import CDSContentSwitcherItem from '../content-switcher/content-switcher-item';
import { TABS_ICON_SIZE, TABS_TYPE } from './defs';
import styles from './tabs.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
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
export default class CDSTab extends CDSContentSwitcherItem {
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
   * `true` if the tab is in vertical orientation.
   * This is automatically set by the parent `<cds-tabs>` when it's in vertical mode.
   */
  @property({ type: Boolean, reflect: true })
  vertical = false;

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
   * `true` if the tab text is truncated with ellipsis.
   * This state is automatically updated when the component renders in vertical mode.
   */
  @state()
  truncated = false;

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
   * Reference to the label span element (only present in vertical mode).
   * @private
   */
  @query(`.${prefix}--tabs__nav-item-label`)
  private _labelElement?: HTMLElement;

  /**
   * Checks if the text overflow ellipsis is currently applied to the label.
   * This is useful for determining if a tooltip should be shown.
   *
   * @returns `true` if text is truncated/clamped, `false` otherwise or if not in vertical mode
   */
  isTextTruncated(): boolean {
    if (!this.vertical || !this._labelElement) {
      return false;
    }

    // Compare scrollHeight with clientHeight to detect if content is overflowing
    // When line-clamp is active and text exceeds 2 lines, scrollHeight > clientHeight
    return this._labelElement.scrollHeight > this._labelElement.clientHeight;
  }

  /**
   * Updates the truncated state after the component has rendered.
   */
  updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);

    // Check if text is truncated and update state when in vertical mode
    if (this.vertical && this._labelElement) {
      const isTruncated = this.isTextTruncated();
      if (this.truncated !== isTruncated) {
        this.truncated = isTruncated;
      }
    }
  }

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    // Retrieve content of the slot to use for aria-label.
    const content = (target as HTMLSlotElement).assignedNodes();
    const textContent = content[0]?.textContent;
    // Normalize whitespace: trim and replace multiple spaces with single space
    this.tabTitle = textContent?.trim().replace(/\s+/g, ' ') || undefined;
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
      vertical,
      truncated,
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
        ${vertical
          ? html`<span
              class="${prefix}--tabs__nav-item-label"
              title="${truncated ? tabTitle.trim() : ''}">
              <slot @slotchange="${handleSlotChange}"></slot>
            </span>`
          : html`
              <span class="${prefix}--tabs__nav-item-label-wrapper">
                <slot @slotchange="${handleSlotChange}"></slot>
              </span>
            `}
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

  _handleClick(event: Event) {
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
