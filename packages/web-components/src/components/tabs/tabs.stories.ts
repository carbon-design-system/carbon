/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { TABS_TYPE } from './tabs';
import styles from './tabs-story.scss?lit';
import { prefix } from '../../globals/settings';
import '../button';
import '../checkbox';
import './index';
import '../text-input';

const args = {
  contained: false,
  disabled: false,
  selectionMode: 'automatic',
};

const argTypes = {
  disabled: {
    control: 'boolean',
    description: 'Disable tab selection',
  },
  contained: {
    control: 'boolean',
    description: 'Container type styling for tabs',
  },
  selectionMode: {
    control: 'select',
    description:
      'Choose whether or not to automatically change selection on focus when left/right arrow pressed.',
    options: ['automatic', 'manual'],
  },
};

export const Default = {
  args,
  argTypes,
  render: ({ disabled, contained, selectionMode }) => {
    const handleBeforeSelected = (event: CustomEvent) => {
      if (disabled) {
        event.preventDefault();
      }
    };

    return html`
      <style>
        ${styles}
      </style>
      <cds-tabs
        disabled="${disabled}"
        selection-mode="${selectionMode}"
        type="${contained ? TABS_TYPE.CONTAINED : null}"
        value="dashboard"
        @cds-tabs-beingselected="${handleBeforeSelected}">
        <cds-tab id="tab-dashboard" target="panel-dashboard" value="dashboard">
          Dashboard
        </cds-tab>
        <cds-tab
          id="tab-monitoring"
          target="panel-monitoring"
          value="monitoring">
          Monitoring
        </cds-tab>
        <cds-tab id="tab-activity" target="panel-activity" value="activity">
          Activity
        </cds-tab>
        <cds-tab id="tab-settings" target="panel-settings" value="settings">
          Settings
        </cds-tab>
      </cds-tabs>
      <div
        id="panel-dashboard"
        class="${prefix}--tab-content"
        role="tabpanel"
        aria-labelledby="tab-dashboard"
        hidden>
        Tab Panel 1
      </div>
      <div
        id="panel-monitoring"
        class="${prefix}--tab-content"
        role="tabpanel"
        aria-labelledby="tab-monitoring"
        hidden>
        Tab Panel 2
      </div>
      <div
        id="panel-activity"
        class="${prefix}--tab-content"
        role="tabpanel"
        aria-labelledby="tab-activity"
        hidden>
        Tab Panel 3
      </div>
      <div
        id="panel-settings"
        class="${prefix}--tab-content"
        role="tabpanel"
        aria-labelledby="tab-settings"
        hidden>
        Tab Panel 4
      </div>
    `;
  },
};

export const Contained = {
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-tabs value="all" type="${TABS_TYPE.CONTAINED}">
      <cds-tab id="tab-all" target="panel-all" value="all">Tab label 1</cds-tab>
      <cds-tab
        id="tab-cloudFoundry"
        target="panel-cloudFoundry"
        value="cloudFoundry">
        Tab label 2
      </cds-tab>
      <cds-tab id="tab-staging" target="panel-staging" value="staging" disabled>
        Tab label 3
      </cds-tab>
      <cds-tab id="tab-dea" target="panel-dea" value="dea">Tab label 4</cds-tab>
      <cds-tab id="tab-five" target="panel-five" value="five">
        Tab label 5
      </cds-tab>
    </cds-tabs>
    <div class="${prefix}-ce-demo-devenv--tab-panels">
      <div id="panel-all" role="tabpanel" aria-labelledby="tab-all" hidden>
        Tab Panel 1
      </div>
      <div
        id="panel-cloudFoundry"
        role="tabpanel"
        aria-labelledby="tab-cloudFoundry"
        hidden>
        <form style="margin: 2em">
          <legend class="${prefix}--label">Validation example</legend>
          <cds-checkbox
            id="cb"
            label-text="Accept privacy policy"></cds-checkbox>
          <cds-button
            style="margin-top: 1rem; margin-bottom: 1rem"
            type="submit">
            Submit
          </cds-button>
          <cds-text-input
            type="text"
            label="Text input label"
            helper-text="Optional help text"
            id="text-input-1"></cds-text-input>
        </form>
      </div>
      <div
        id="panel-staging"
        role="tabpanel"
        aria-labelledby="tab-staging"
        hidden>
        Tab Panel 3
      </div>
      <div id="panel-dea" role="tabpanel" aria-labelledby="tab-dea" hidden>
        Tab Panel 4
      </div>
      <div id="panel-five" role="tabpanel" aria-labelledby="tab-five" hidden>
        Tab Panel 5
      </div>
    </div>
  `,
};

export const Manual = {
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-tabs value="all" selection-mode="manual">
      <cds-tab id="tab-all" target="panel-all" value="all">Dashboard</cds-tab>
      <cds-tab
        id="tab-cloudFoundry"
        target="panel-cloudFoundry"
        value="cloudFoundry">
        Monitoring
      </cds-tab>
      <cds-tab
        id="tab-staging"
        target="panel-staging"
        value="staging"
        title="Tab label 4">
        Activity
      </cds-tab>
      <cds-tab id="tab-dea" target="panel-dea" value="dea">Analyze</cds-tab>
      <cds-tab id="tab-five" target="panel-five" value="five" disabled>
        Settings
      </cds-tab>
    </cds-tabs>
    <div class="${prefix}-ce-demo-devenv--tab-panels">
      <div id="panel-all" role="tabpanel" aria-labelledby="tab-all" hidden>
        Tab Panel 1
      </div>
      <div
        id="panel-cloudFoundry"
        role="tabpanel"
        aria-labelledby="tab-cloudFoundry"
        hidden>
        <form style="margin: 2em">
          <legend class="cds--label">Validation example</legend>
          <cds-checkbox
            id="cb"
            label-text="Accept privacy policy"></cds-checkbox>
          <cds-button
            style="margin-top: 1rem; margin-bottom: 1rem"
            type="submit">
            Submit
          </cds-button>
          <cds-text-input
            type="text"
            label="Text input label"
            helper-text="Optional help text"
            id="text-input-1"></cds-text-input>
        </form>
      </div>
      <div
        id="panel-staging"
        role="tabpanel"
        aria-labelledby="tab-staging"
        hidden>
        Tab Panel 3
      </div>
      <div id="panel-dea" role="tabpanel" aria-labelledby="tab-dea" hidden>
        Tab Panel 4
      </div>
      <div id="panel-five" role="tabpanel" aria-labelledby="tab-five" hidden>
        Tab Panel 5
      </div>
    </div>
  `,
};

export const skeleton = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () => html`
    <cds-tabs-skeleton>
      <cds-tab-skeleton></cds-tab-skeleton>
      <cds-tab-skeleton></cds-tab-skeleton>
      <cds-tab-skeleton></cds-tab-skeleton>
      <cds-tab-skeleton></cds-tab-skeleton>
      <cds-tab-skeleton></cds-tab-skeleton>
    </cds-tabs-skeleton>
  `,
};

export default {
  title: 'Components/Tabs',
  actions: { argTypesRegex: '^on.*' },
};
