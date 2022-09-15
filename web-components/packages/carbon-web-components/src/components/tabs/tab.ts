/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import BXContentSwitcherItem from '../content-switcher/content-switcher-item';
import { TABS_TYPE } from './tabs';
import styles from './tabs.scss';

const { prefix } = settings;

/**
 * Basic tab.
 * @element bx-tab
 */
@customElement(`${prefix}-tab`)
class BXTab extends BXContentSwitcherItem {
  /**
   * `true` if this tab should be highlighted.
   * If `true`, parent `<bx-tabs>` selects/deselects this tab upon keyboard interaction.
   * @private
   */
  @property({ type: Boolean, reflect: true })
  highlighted = false;

  /**
   * `true` if this tab is in a focused `<bx-tabs>`.
   * @private
   */
  @property({ type: Boolean, reflect: true, attribute: 'in-focus' })
  inFocus = false;

  /**
   * Tab type.
   */
  @property({ reflect: true })
  type = TABS_TYPE.REGULAR;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
  }

  render() {
    const { disabled, selected } = this;
    // No `href`/`tabindex` to not to make this `<a>` click-focusable
    return html`
      <a class="${prefix}--tabs__nav-link" role="tab" ?disabled="${disabled}" aria-selected="${Boolean(selected)}">
        <slot></slot>
      </a>
    `;
  }

  static styles = styles;
}

export default BXTab;
