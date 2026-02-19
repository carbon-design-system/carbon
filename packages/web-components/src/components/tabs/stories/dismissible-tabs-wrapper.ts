/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../../globals/settings';
import { TABS_TYPE } from '../tabs';

/**
 * Wrapper component for dismissible tabs story with state management
 */
export class DismissibleTabsWrapper extends LitElement {
  /**
   * Array of tab configurations
   */
  @state()
  private _tabs = [
    { id: 'all', label: 'Dashboard', value: 'all' },
    { id: 'cloudFoundry', label: 'Monitoring', value: 'cloudFoundry' },
    { id: 'staging', label: 'Activity', value: 'staging' },
    { id: 'dea', label: 'Settings', value: 'dea', disabled: true },
  ];

  /**
   * Whether tabs are disabled
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Whether tabs are contained
   */
  @property({ type: Boolean })
  contained = false;

  /**
   * Selection mode
   */
  @property({ attribute: 'selection-mode' })
  selectionMode = 'automatic';

  /**
   * Handle tab dismissed event
   */
  private _handleDismissed(event: CustomEvent) {
    const { index } = event.detail;
    this._tabs = this._tabs.filter((_, i) => i !== index);
  }

  /**
   * Handle before selected event
   */
  private _handleBeforeSelected(event: CustomEvent) {
    if (this.disabled) {
      event.preventDefault();
    }
  }

  render() {
    return html`
      <cds-tabs
        ?disabled="${this.disabled}"
        selection-mode="${this.selectionMode}"
        type="${this.contained ? TABS_TYPE.CONTAINED : TABS_TYPE.REGULAR}"
        ?dismissible="${true}"
        value="all"
        @cds-tab-closed="${this._handleDismissed}"
        @cds-tabs-beingselected="${this._handleBeforeSelected}">
        ${this._tabs.map(
          (tab) => html`
            <cds-tab
              id="tab-${tab.id}"
              target="panel-${tab.id}"
              value="${tab.value}"
              ?disabled="${tab.disabled}">
              ${tab.label}
            </cds-tab>
          `
        )}
      </cds-tabs>
      <div class="${prefix}-ce-demo-devenv--tab-panels">
        ${this._tabs.map(
          (tab) => html`
            <div
              id="panel-${tab.id}"
              role="tabpanel"
              aria-labelledby="tab-${tab.id}"
              hidden>
              ${tab.label}
            </div>
          `
        )}
      </div>
    `;
  }

  /**
   * Disable shadow DOM to inherit styles from parent
   */
  createRenderRoot() {
    return this;
  }
}

customElements.define('dismissible-tabs-wrapper', DismissibleTabsWrapper);

// Made with Bob
