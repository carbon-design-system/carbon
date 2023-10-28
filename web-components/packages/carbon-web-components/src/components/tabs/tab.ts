/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import BXContentSwitcherItem from '../content-switcher/content-switcher-item';
import { TABS_TYPE } from './tabs';
import styles from './tabs.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

const { prefix } = settings;

/**
 * Basic tab.
 *
 * @element bx-tab
 */
@customElement(`${prefix}-tab`)
class BXTab extends BXContentSwitcherItem {
  /**
   * `true` if this tab should be highlighted.
   * If `true`, parent `<bx-tabs>` selects/deselects this tab upon keyboard interaction.
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
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    // Retrieve content of the slot to use for aria-label.
    let content = (target as HTMLSlotElement).assignedNodes();
    this.tabTitle = content[0].textContent;
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
  }

  render() {
    const {
      disabled,
      selected,
      tabTitle,
      _handleSlotChange: handleSlotChange,
    } = this;
    // No `href`/`tabindex` to not to make this `<a>` click-focusable
    return html`
      <a
        class="${prefix}--tabs__nav-link"
        role="tab"
        aria-label="${tabTitle}"
        tabindex="${disabled ? -1 : 0}"
        ?disabled="${disabled}"
        aria-selected="${Boolean(selected)}">
        <slot @slotchange="${handleSlotChange}"></slot>
      </a>
    `;
  }

  static styles = styles;
}

export default BXTab;
