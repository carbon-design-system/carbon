/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import CDSContentSwitcherItem from '../content-switcher/content-switcher-item';
import { TABS_ICON_SIZE, TABS_TYPE } from './defs';
import styles from './tabs.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Basic tab.
 *
 * @element cds-tab
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
   * An optional label to render under the primary tab label.
   * Only useful for contained tabs.
   */
  @property({ attribute: 'secondary-label', reflect: true })
  secondaryLabel?: string;

  /**
   * **Experimental**: Display an empty dot badge on the Tab.
   */
  @property({ type: Boolean, reflect: true, attribute: 'badge-indicator' })
  badgeIndicator = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    // Retrieve content of the slot to use for aria-label.
    const content = (target as HTMLSlotElement).assignedNodes();
    this.tabTitle = content[0]?.textContent?.trim() || undefined;
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
  }

  render() {
    const {
      badgeIndicator,
      disabled,
      secondaryLabel,
      selected,
      tabTitle,
      _handleSlotChange: handleSlotChange,
    } = this;
    const accessibleLabel = tabTitle || this.getAttribute('aria-label');
    const isIconOnly =
      this.iconOnly ||
      this.classList.contains(`${prefix}--tabs__nav-item--icon-only`);
    // No `href`/`tabindex` to not to make this `<a>` click-focusable
    const tabLink = html`
      <a
        class="${prefix}--tabs__nav-link"
        role="tab"
        aria-label="${ifDefined(accessibleLabel || undefined)}"
        tabindex="${selected ? 0 : -1}"
        ?disabled="${disabled}"
        aria-selected="${selected}">
        <span class="${prefix}--tabs__nav-item-label-wrapper">
          <slot @slotchange="${handleSlotChange}"></slot>
        </span>
        ${secondaryLabel
          ? html`<span
              class="${prefix}--tabs__nav-item-secondary-label"
              title="${secondaryLabel}"
              >${secondaryLabel}</span
            >`
          : ''}
        ${!disabled && badgeIndicator
          ? html`<cds-badge-indicator></cds-badge-indicator>`
          : ''}
      </a>
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

  static styles = styles;
}
