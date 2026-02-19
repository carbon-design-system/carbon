/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import CDSContentSwitcherItem from '../content-switcher/content-switcher-item';
import { TABS_TYPE } from './tabs';
import styles from './tabs.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import '../button/button';
import Close16 from '@carbon/icons/es/close/16.js';
import iconLoader from '../../globals/internal/icon-loader';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Basic tab.
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
   * The tab text content.
   */
  @property()
  tabTitle;

  /**
   * Whether this tab should be dismissable.
   */
  @state()
  _dismissible = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    // Retrieve content of the slot to use for aria-label.
    const content = (target as HTMLSlotElement).assignedNodes();
    this.tabTitle = content[0].textContent;
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
  }

  render() {
    const navlinkClasses = classMap({
      [`${prefix}--tabs__nav-link`]: true,
      [`${prefix}--tabs__nav-link--dismissible`]: this._dismissible,
    });
    const {
      disabled,
      selected,
      tabTitle,
      _dismissible: parentDismissible,
      _handleSlotChange: handleSlotChange,
      _handleClick: handleClick,
    } = this;

    const iconButton = html`
      <cds-button kind="ghost" size="xs" @click="${handleClick}">
        ${iconLoader(Close16, { 'aria-label': 'close', slot: 'icon' })}
      </cds-button>
    `;

    // No `href`/`tabindex` to not to make this `<a>` click-focusable
    return html`
      <a
        class="${navlinkClasses}"
        role="tab"
        aria-label="${tabTitle}"
        tabindex="${selected ? 0 : -1}"
        ?disabled="${disabled}"
        aria-selected="${Boolean(selected)}">
        <slot @slotchange="${handleSlotChange}"></slot>
        ${parentDismissible ? iconButton : ''}
      </a>
    `;
  }

  _handleClick(event: Event) {
    event.stopPropagation();

    // Get index of this tab within parent tabs
    const parentTabs = this.closest(`${prefix}-tabs`);
    const allTabs = parentTabs?.querySelectorAll(`${prefix}-tab`);
    const index = allTabs ? Array.from(allTabs).indexOf(this) : -1;

    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        index,
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
