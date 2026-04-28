/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from 'storybook/actions';
import { TABS_ICON_SIZE, TABS_TYPE } from './tabs';
import styles from './tabs-story.scss?lit';
import { prefix } from '../../globals/settings';
import { iconLoader } from '../../globals/internal/icon-loader';
import Activity16 from '@carbon/icons/es/activity/16.js';
import Activity20 from '@carbon/icons/es/activity/20.js';
import Dashboard16 from '@carbon/icons/es/dashboard/16.js';
import CloudMonitoring16 from '@carbon/icons/es/cloud--monitoring/16.js';
import Settings16 from '@carbon/icons/es/settings/16.js';
import Notification16 from '@carbon/icons/es/notification/16.js';
import Notification20 from '@carbon/icons/es/notification/20.js';
import Chat16 from '@carbon/icons/es/chat/16.js';
import Chat20 from '@carbon/icons/es/chat/20.js';
import IbmWatsonDiscovery16 from '@carbon/icons/es/ibm-watson--discovery/16.js';
import IbmWatsonDiscovery20 from '@carbon/icons/es/ibm-watson--discovery/20.js';
import '../button';
import '../checkbox';
import '../layer';
import '../radio-button';
import '../stack';
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

const onTabsBeingSelected = action('cds-tabs-beingselected');
const onTabsSelected = action('cds-tabs-selected');
const iconStoriesArgs = {
  badgeIndicator: false,
};

const iconStoriesArgTypes = {
  badgeIndicator: {
    description: '**Experimental**: Display an empty dot badge on the Tab.',
    control: 'boolean',
  },
};

export const Default = {
  args,
  argTypes,
  render: ({ disabled, contained, selectionMode }) => {
    const handleBeforeSelected = (event: CustomEvent) => {
      onTabsBeingSelected(event);

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
        type="${ifDefined(contained && TABS_TYPE.CONTAINED)}"
        value="dashboard"
        @cds-tabs-beingselected="${handleBeforeSelected}"
        @cds-tabs-selected="${onTabsSelected}">
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
    <cds-tabs
      value="all"
      type="${TABS_TYPE.CONTAINED}"
      @cds-tabs-beingselected="${onTabsBeingSelected}"
      @cds-tabs-selected="${onTabsSelected}">
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

export const Icon20Only = {
  args: iconStoriesArgs,
  argTypes: iconStoriesArgTypes,
  render: ({ badgeIndicator }) => html`
    <style>
      ${styles}
    </style>
    <cds-tabs
      value="icon20-tab-2"
      icon-size="${TABS_ICON_SIZE.LARGE}"
      class="cds--layout--size-lg">
      <cds-tab
        id="icon20-tab-1"
        target="icon20-panel-1"
        value="icon20-tab-1"
        icon-only
        disabled
        aria-label="Analyze">
        ${iconLoader(IbmWatsonDiscovery20)}
      </cds-tab>
      <cds-tab
        id="icon20-tab-2"
        target="icon20-panel-2"
        value="icon20-tab-2"
        icon-only
        aria-label="Activity">
        ${iconLoader(Activity20)}
      </cds-tab>
      <cds-tab
        id="icon20-tab-3"
        target="icon20-panel-3"
        value="icon20-tab-3"
        icon-only
        ?badge-indicator="${badgeIndicator}"
        aria-label="New Notifications">
        ${iconLoader(Notification20)}
      </cds-tab>
      <cds-tab
        id="icon20-tab-4"
        target="icon20-panel-4"
        value="icon20-tab-4"
        icon-only
        aria-label="Chat">
        ${iconLoader(Chat20)}
      </cds-tab>
    </cds-tabs>
    <div class="${prefix}-ce-demo-devenv--tab-panels">
      <div
        id="icon20-panel-1"
        role="tabpanel"
        aria-labelledby="icon20-tab-1"
        hidden>
        Tab Panel 1
      </div>
      <div
        id="icon20-panel-2"
        role="tabpanel"
        aria-labelledby="icon20-tab-2"
        hidden>
        Tab Panel 2
      </div>
      <div
        id="icon20-panel-3"
        role="tabpanel"
        aria-labelledby="icon20-tab-3"
        hidden>
        Tab Panel 3
      </div>
      <div
        id="icon20-panel-4"
        role="tabpanel"
        aria-labelledby="icon20-tab-4"
        hidden>
        Tab Panel 4
      </div>
    </div>
  `,
};

export const IconOnly = {
  args: iconStoriesArgs,
  argTypes: iconStoriesArgTypes,
  render: ({ badgeIndicator }) => html`
    <style>
      ${styles}
    </style>
    <cds-tabs value="icon-tab-2" icon-size="${TABS_ICON_SIZE.DEFAULT}">
      <cds-tab
        id="icon-tab-1"
        target="icon-panel-1"
        value="icon-tab-1"
        icon-only
        disabled
        aria-label="Analyze">
        ${iconLoader(IbmWatsonDiscovery16)}
      </cds-tab>
      <cds-tab
        id="icon-tab-2"
        target="icon-panel-2"
        value="icon-tab-2"
        icon-only
        aria-label="Activity">
        ${iconLoader(Activity16)}
      </cds-tab>
      <cds-tab
        id="icon-tab-3"
        target="icon-panel-3"
        value="icon-tab-3"
        icon-only
        ?badge-indicator="${badgeIndicator}"
        aria-label="New Notifications">
        ${iconLoader(Notification16)}
      </cds-tab>
      <cds-tab
        id="icon-tab-4"
        target="icon-panel-4"
        value="icon-tab-4"
        icon-only
        aria-label="Chat">
        ${iconLoader(Chat16)}
      </cds-tab>
    </cds-tabs>
    <div class="${prefix}-ce-demo-devenv--tab-panels">
      <div
        id="icon-panel-1"
        role="tabpanel"
        aria-labelledby="icon-tab-1"
        hidden>
        Tab Panel 1
      </div>
      <div
        id="icon-panel-2"
        role="tabpanel"
        aria-labelledby="icon-tab-2"
        hidden>
        Tab Panel 2
      </div>
      <div
        id="icon-panel-3"
        role="tabpanel"
        aria-labelledby="icon-tab-3"
        hidden>
        Tab Panel 3
      </div>
      <div
        id="icon-panel-4"
        role="tabpanel"
        aria-labelledby="icon-tab-4"
        hidden>
        Tab Panel 4
      </div>
    </div>
  `,
};

export const Manual = {
  render: () => {
    return html`
      <style>
        ${styles}
      </style>
      <cds-tabs
        value="all"
        selection-mode="manual"
        @cds-tabs-beingselected="${onTabsBeingSelected}"
        @cds-tabs-selected="${onTabsSelected}">
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
    `;
  },
};

export const skeleton = {
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

export const Vertical = {
  args: {
    selectionMode: 'automatic',
    selectedIndex: 0,
    customHeight: '',
  },
  argTypes: {
    selectionMode: {
      control: 'select',
      description:
        'Choose whether or not to automatically change selection on focus when left/right arrow pressed.',
      options: ['automatic', 'manual'],
    },
    selectedIndex: {
      control: 'number',
      description: 'Specify a selected index for the initially selected tab.',
    },
    customHeight: {
      control: 'text',
      description:
        'Optional height for the vertical tabs container. Accepts any valid CSS height value (e.g. "500px", "50vh"). If omitted, the container grows to fit its content.',
    },
  },
  render: ({ selectionMode, selectedIndex, customHeight }) => {
    const handleBeforeSelected = (event: CustomEvent) => {
      action('cds-tabs-beingselected')(event.detail);
    };

    const handleSelected = (event: CustomEvent) => {
      action('cds-tabs-selected')(event.detail);
    };

    return html`
      <style>
        ${styles}
      </style>
      <cds-tabs-vertical custom-height="${customHeight || nothing}">
        <cds-tabs
          slot="tabs"
          selection-mode="${selectionMode}"
          selected-index="${selectedIndex}"
          value="all"
          @cds-tabs-beingselected="${handleBeforeSelected}"
          @cds-tabs-selected="${handleSelected}">
          <cds-tab id="tab-all" target="panel-all" value="all"
            >Dashboard</cds-tab
          >
          <cds-tab
            id="tab-cloudFoundry"
            target="panel-cloudFoundry"
            value="cloudFoundry">
            Extra long label that will go two lines then truncate when it goes
            beyond the Tab length
          </cds-tab>
          <cds-tab id="tab-staging" target="panel-staging" value="staging">
            Activity
          </cds-tab>
          <cds-tab id="tab-dea" target="panel-dea" value="dea">Analyze</cds-tab>
          <cds-tab id="tab-router" target="panel-router" value="router"
            >Investigate</cds-tab
          >
          <cds-tab id="tab-diego" target="panel-diego" value="diego"
            >Learn</cds-tab
          >
          <cds-tab
            id="tab-loggregator"
            target="panel-loggregator"
            value="loggregator"
            disabled
            >Settings</cds-tab
          >
        </cds-tabs>
        <div
          slot="panel"
          id="panel-all"
          role="tabpanel"
          aria-labelledby="tab-all"
          hidden>
          Tab Panel 1
        </div>
        <div
          slot="panel"
          id="panel-cloudFoundry"
          role="tabpanel"
          aria-labelledby="tab-cloudFoundry"
          hidden>
          <cds-layer level="1">
            <form style="margin: 2em">
              <cds-stack gap="7">
                <cds-text-input
                  type="text"
                  label="First Name"
                  id="text-input-1"></cds-text-input>
                <cds-text-input
                  type="text"
                  label="Middle Initial"
                  id="text-input-2"></cds-text-input>
                <cds-text-input
                  type="text"
                  label="Last Name"
                  id="text-input-3"></cds-text-input>
                <cds-radio-button-group
                  legend-text="Radio button heading"
                  invalid-text="Invalid selection"
                  label-position="right"
                  orientation="horizontal"
                  name="radio-group"
                  value="radio-2"
                  warn-text="Please notice the warning">
                  <cds-radio-button
                    value="radio-1"
                    label-text="Option 1"></cds-radio-button>
                  <cds-radio-button
                    value="radio-2"
                    label-text="Option 2"></cds-radio-button>
                  <cds-radio-button
                    value="radio-3"
                    label-text="Option 3"></cds-radio-button>
                </cds-radio-button-group>
                <cds-checkbox
                  id="cb-1"
                  label-text="Checkbox one"></cds-checkbox>
                <cds-checkbox
                  id="cb-2"
                  label-text="Checkbox two"></cds-checkbox>
                <cds-button
                  class="${prefix}-ce-demo-devenv--tab-story-button"
                  type="submit">
                  Submit
                </cds-button>
              </cds-stack>
            </form>
          </cds-layer>
        </div>
        <div
          slot="panel"
          id="panel-staging"
          role="tabpanel"
          aria-labelledby="tab-staging"
          hidden>
          Tab Panel 3
        </div>
        <div
          slot="panel"
          id="panel-dea"
          role="tabpanel"
          aria-labelledby="tab-dea"
          hidden>
          Tab Panel 4
        </div>
        <div
          slot="panel"
          id="panel-router"
          role="tabpanel"
          aria-labelledby="tab-router"
          hidden>
          Tab Panel 5
        </div>
        <div
          slot="panel"
          id="panel-diego"
          role="tabpanel"
          aria-labelledby="tab-diego"
          hidden>
          Tab Panel 6
        </div>
        <div
          slot="panel"
          id="panel-loggregator"
          role="tabpanel"
          aria-labelledby="tab-loggregator"
          hidden>
          Tab Panel 7
        </div>
      </cds-tabs-vertical>
    `;
  },
};

export const WithIcons = {
  render: () => {
    return html`
      <style>
        ${styles}
      </style>
      <cds-tabs
        selection-mode="manual"
        value="icon-tab-1"
        icon-size="${TABS_ICON_SIZE.DEFAULT}">
        <cds-tab id="icon-tab-1" target="icon-panel-1" value="icon-tab-1">
          Dashboard ${iconLoader(Dashboard16)}
        </cds-tab>
        <cds-tab id="icon-tab-2" target="icon-panel-2" value="icon-tab-2">
          Monitoring ${iconLoader(CloudMonitoring16)}
        </cds-tab>
        <cds-tab id="icon-tab-3" target="icon-panel-3" value="icon-tab-3">
          Activity ${iconLoader(Activity16)}
        </cds-tab>
        <cds-tab id="icon-tab-4" target="icon-panel-4" value="icon-tab-4">
          Analyze ${iconLoader(IbmWatsonDiscovery16)}
        </cds-tab>
        <cds-tab
          id="icon-tab-5"
          target="icon-panel-5"
          value="icon-tab-5"
          disabled>
          Settings ${iconLoader(Settings16)}
        </cds-tab>
      </cds-tabs>
      <div class="${prefix}-ce-demo-devenv--tab-panels">
        <div
          id="icon-panel-1"
          role="tabpanel"
          aria-labelledby="icon-tab-1"
          hidden>
          Tab Panel 1
        </div>
        <div
          id="icon-panel-2"
          role="tabpanel"
          aria-labelledby="icon-tab-2"
          hidden>
          <form style="margin: 2em;">
            <legend class="${prefix}--label">Validation example</legend>
            <cds-checkbox
              id="cb"
              label-text="Accept privacy policy"></cds-checkbox>
            <cds-button
              style="margin-top: 1rem; margin-bottom: 1rem;"
              type="submit">
              Submit
            </cds-button>
            <cds-text-input
              label="Text input label"
              helper-text="Optional help text"
              id="text-input-1">
            </cds-text-input>
          </form>
        </div>
        <div
          id="icon-panel-3"
          role="tabpanel"
          aria-labelledby="icon-tab-3"
          hidden>
          Tab Panel 3
        </div>
        <div
          id="icon-panel-4"
          role="tabpanel"
          aria-labelledby="icon-tab-4"
          hidden>
          Tab Panel 4
        </div>
        <div
          id="icon-panel-5"
          role="tabpanel"
          aria-labelledby="icon-tab-5"
          hidden>
          Tab Panel 5
        </div>
      </div>
    `;
  },
};

export default {
  title: 'Components/Tabs',
  actions: { argTypesRegex: '^on.*' },
};
