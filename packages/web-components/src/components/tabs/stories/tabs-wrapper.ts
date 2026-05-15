/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../../globals/settings';
import { TABS_TYPE } from '../tabs';
import { iconLoader } from '../../../globals/internal/icon-loader';
import Dashboard16 from '@carbon/icons/es/dashboard/16.js';
import CloudMonitoring16 from '@carbon/icons/es/cloud--monitoring/16.js';
import Activity16 from '@carbon/icons/es/activity/16.js';
import Settings16 from '@carbon/icons/es/settings/16.js';
import '../../button';

/**
 * Wrapper component for dismissable tabs story with state management
 */
export class DismissableTabsWrapper extends LitElement {
  /**
   * Whether to render tabs with icons
   */
  @property({ type: Boolean, attribute: 'with-icons' })
  withIcons = false;

  private _defaultTabs = [
    { id: 'all', label: 'Dashboard', value: 'all', icon: Dashboard16 },
    {
      id: 'cloudFoundry',
      label: 'Monitoring',
      value: 'cloudFoundry',
      icon: CloudMonitoring16,
    },
    { id: 'staging', label: 'Activity', value: 'staging', icon: Activity16 },
    {
      id: 'dea',
      label: 'Settings',
      value: 'dea',
      disabled: true,
      icon: Settings16,
    },
  ];
  /**
   * Array of tab configurations
   */
  @state()
  private _tabs = this._defaultTabs;

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
   * Whether the rendered Tab children should be dismissable.
   */
  @property({ type: Boolean })
  dismissable = true;

  /**
   * Selection mode
   */
  @property({ attribute: 'selection-mode' })
  selectionMode = 'automatic';

  /**
   * Selected index for the initially selected content
   */
  @property({ attribute: 'selected-index' })
  selectedIndex = 0;

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

  private resetTabs() {
    this._tabs = [...this._defaultTabs];
  }

  render() {
    const { resetTabs } = this;
    return html`
      <cds-button style="margin-bottom: 3rem" @click="${resetTabs}">
        Reset
      </cds-button>
      <cds-tabs
        ?disabled="${this.disabled}"
        selection-mode="${this.selectionMode}"
        selected-index="${this.selectedIndex}"
        type="${this.contained ? TABS_TYPE.CONTAINED : TABS_TYPE.REGULAR}"
        ?dismissable="${this.dismissable}"
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
              ${this.withIcons ? iconLoader(tab.icon) : ''} ${tab.label}
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

customElements.define('tabs-story-wrapper', DismissableTabsWrapper);

// Made with Bob
