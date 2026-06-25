/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import HostListenerMixin from '@carbon/web-components/es/globals/mixins/host-listener.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/inline-loading/index.js';
import checkmarkOutline16 from '@carbon/icons/es/checkmark--outline/16';
import errorOutline16 from '@carbon/icons/es/error--outline/16';
import save16 from '@carbon/icons/es/save/16';
import { iconLoader } from "@carbon/web-components/es/globals/internal/icon-loader.js";
import styles from './saving.scss?lit';

const blockClass = `c4p--saving`;

type Status = 'default' | 'in-progress' | 'success' | 'fail';
const statusObj = {
  default: {
    text: 'Save',
    icon: () => iconLoader(save16, { slot: 'icon' }),
  },
  ['in-progress']: {
    text: 'Saving...',
    icon: () =>
      html`<cds-inline-loading
        active=""
        description="Loading"
        assistive-text="Loading"
        slot="icon"
      ></cds-inline-loading>`,
  },
  success: {
    text: 'Saved',
    icon: () => iconLoader(checkmarkOutline16, { slot: 'icon' }),
  },
  fail: {
    text: 'Failed to save. Try again?',
    icon: () => iconLoader(errorOutline16, { slot: 'icon' }),
  },
};
/**
 * Saving.
 *
 * @element manual-saving
 *
 * */

@customElement(`manual-saving`)
class ManualSaving extends HostListenerMixin(LitElement) {
  @state()
  status: Status = 'default';
  render() {
    const { status, _onRequestSave: onRequestSave } = this;
    const icon = statusObj[status]?.icon?.();
    return html`
      <style>
        ${styles}
      </style>
      <div class="${blockClass}__buttons">
        <cds-button
          kind="secondary"
          ?disabled=${status !== 'in-progress'}
          type="button"
        >
          Cancel
        </cds-button>
        <cds-button
          @click=${onRequestSave}
          kind="primary"
          ?disabled=${status === 'in-progress'}
          type="button"
        >
          ${statusObj[status]?.text} ${icon}
        </cds-button>
      </div>
    `;
  }
  _onRequestSave = () => {
    this.status = 'in-progress';
    setTimeout(() => {
      this.status = 'success';
    }, 2000);
  };
  static styles = styles;
}
export default ManualSaving;
