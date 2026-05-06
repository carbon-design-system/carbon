/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
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
import Task16 from '@carbon/icons/es/task/16.js';
import Restart16 from '@carbon/icons/es/restart/16.js';
import '../button';
import '../checkbox';
import './index';
import '../text-input';
import './stories/tabs-wrapper';

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
      value="dashboard"
      type="${TABS_TYPE.CONTAINED}"
      @cds-tabs-beingselected="${onTabsBeingSelected}"
      @cds-tabs-selected="${onTabsSelected}">
      <cds-tab id="tab-dashboard" target="panel-dashboard" value="dashboard">
        Dashboard
      </cds-tab>
      <cds-tab id="tab-monitoring" target="panel-monitoring" value="monitoring">
        Monitoring
      </cds-tab>
      <cds-tab id="tab-activity" target="panel-activity" value="activity">
        Activity
      </cds-tab>
      <cds-tab id="tab-analyze" target="panel-analyze" value="analyze">
        Analyze
      </cds-tab>
      <cds-tab
        id="tab-settings"
        target="panel-settings"
        value="settings"
        disabled>
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
      <form style="margin: 2em">
        <legend class="${prefix}--label">Validation example</legend>
        <cds-checkbox id="cb" label-text="Accept privacy policy"></cds-checkbox>
        <cds-button style="margin-top: 1rem; margin-bottom: 1rem" type="submit">
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
      id="panel-activity"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-activity"
      hidden>
      Tab Panel 3
    </div>
    <div
      id="panel-analyze"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-analyze"
      hidden>
      Tab Panel 4
    </div>
    <div
      id="panel-settings"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-settings"
      hidden>
      Tab Panel 5
    </div>
  `,
};

export const ContainedFullWidth = {
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-tabs
      value="tls"
      type="${TABS_TYPE.CONTAINED}"
      full-width
      @cds-tabs-beingselected="${onTabsBeingSelected}"
      @cds-tabs-selected="${onTabsSelected}">
      <cds-tab id="tab-tls" target="panel-tls" value="tls">TLS</cds-tab>
      <cds-tab id="tab-origin" target="panel-origin" value="origin">
        Origin
      </cds-tab>
      <cds-tab
        id="tab-rate-limiting"
        target="panel-rate-limiting"
        value="rate-limiting"
        disabled>
        Rate limiting
      </cds-tab>
      <cds-tab id="tab-waf" target="panel-waf" value="waf">WAF</cds-tab>
      <cds-tab
        id="tab-ip-firewall"
        target="panel-ip-firewall"
        value="ip-firewall">
        IP Firewall
      </cds-tab>
      <cds-tab
        id="tab-firewall-rules"
        target="panel-firewall-rules"
        value="firewall-rules">
        Firewall rules
      </cds-tab>
      <cds-tab id="tab-range" target="panel-range" value="range">Range</cds-tab>
      <cds-tab id="tab-mutual-tls" target="panel-mutual-tls" value="mutual-tls">
        Mutual TLS
      </cds-tab>
    </cds-tabs>
    <div
      id="panel-tls"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-tls"
      hidden>
      Tab Panel 1
    </div>
    <div
      id="panel-origin"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-origin"
      hidden>
      <form style="margin: 2em">
        <legend class="${prefix}--label">Validation example</legend>
        <cds-checkbox id="cb" label-text="Accept privacy policy"></cds-checkbox>
        <cds-button style="margin-top: 1rem; margin-bottom: 1rem" type="submit">
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
      id="panel-rate-limiting"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-rate-limiting"
      hidden>
      Tab Panel 3
    </div>
    <div
      id="panel-waf"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-waf"
      hidden>
      Tab Panel 4
    </div>
    <div
      id="panel-ip-firewall"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-ip-firewall"
      hidden>
      Tab Panel 5
    </div>
    <div
      id="panel-firewall-rules"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-firewall-rules"
      hidden>
      Tab Panel 6
    </div>
    <div
      id="panel-range"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-range"
      hidden>
      Tab Panel 7
    </div>
    <div
      id="panel-mutual-tls"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-mutual-tls"
      hidden>
      Tab Panel 8
    </div>
  `,
};

export const ContainedWithIcons = {
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-tabs
      value="dashboard"
      type="${TABS_TYPE.CONTAINED}"
      @cds-tabs-beingselected="${onTabsBeingSelected}"
      @cds-tabs-selected="${onTabsSelected}">
      <cds-tab id="tab-dashboard" target="panel-dashboard" value="dashboard">
        Dashboard ${iconLoader(Dashboard16)}
      </cds-tab>
      <cds-tab id="tab-monitoring" target="panel-monitoring" value="monitoring">
        Monitoring ${iconLoader(CloudMonitoring16)}
      </cds-tab>
      <cds-tab id="tab-activity" target="panel-activity" value="activity">
        Activity ${iconLoader(Activity16)}
      </cds-tab>
      <cds-tab id="tab-analyze" target="panel-analyze" value="analyze">
        Analyze ${iconLoader(IbmWatsonDiscovery16)}
      </cds-tab>
      <cds-tab
        id="tab-settings"
        target="panel-settings"
        value="settings"
        disabled>
        Settings ${iconLoader(Settings16)}
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
      <form style="margin: 2em">
        <legend class="${prefix}--label">Validation example</legend>
        <cds-checkbox id="cb" label-text="Accept privacy policy"></cds-checkbox>
        <cds-button style="margin-top: 1rem; margin-bottom: 1rem" type="submit">
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
      id="panel-activity"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-activity"
      hidden>
      Tab Panel 3
    </div>
    <div
      id="panel-analyze"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-analyze"
      hidden>
      Tab Panel 4
    </div>
    <div
      id="panel-settings"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-settings"
      hidden>
      Tab Panel 5
    </div>
  `,
};

export const ContainedWithSecondaryLabels = {
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-tabs
      value="engage"
      type="${TABS_TYPE.CONTAINED}"
      @cds-tabs-beingselected="${onTabsBeingSelected}"
      @cds-tabs-selected="${onTabsSelected}">
      <cds-tab
        id="tab-engage"
        target="panel-engage"
        value="engage"
        secondary-label="(21/25)">
        Engage
      </cds-tab>
      <cds-tab
        id="tab-analyze"
        target="panel-analyze"
        value="analyze"
        secondary-label="(12/16)">
        Analyze
      </cds-tab>
      <cds-tab
        id="tab-remediate"
        target="panel-remediate"
        value="remediate"
        secondary-label="(0/7)">
        Remediate
      </cds-tab>
      <cds-tab
        id="tab-assets"
        target="panel-assets"
        value="assets"
        secondary-label="(4/12)">
        Assets
      </cds-tab>
      <cds-tab
        id="tab-monitoring"
        target="panel-monitoring"
        value="monitoring"
        secondary-label="(0/10)"
        disabled>
        Monitoring
      </cds-tab>
    </cds-tabs>
    <div
      id="panel-engage"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-engage"
      hidden>
      Tab Panel 1
    </div>
    <div
      id="panel-analyze"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-analyze"
      hidden>
      <form style="margin: 2em">
        <legend class="${prefix}--label">Validation example</legend>
        <cds-checkbox id="cb" label-text="Accept privacy policy"></cds-checkbox>
        <cds-button style="margin-top: 1rem; margin-bottom: 1rem" type="submit">
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
      id="panel-remediate"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-remediate"
      hidden>
      Tab Panel 3
    </div>
    <div
      id="panel-assets"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-assets"
      hidden>
      Tab Panel 4
    </div>
    <div
      id="panel-monitoring"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-monitoring"
      hidden>
      Tab Panel 5
    </div>
  `,
};

export const ContainedWithSecondaryLabelsAndIcons = {
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-tabs
      value="engage"
      type="${TABS_TYPE.CONTAINED}"
      @cds-tabs-beingselected="${onTabsBeingSelected}"
      @cds-tabs-selected="${onTabsSelected}">
      <cds-tab
        id="tab-engage"
        target="panel-engage"
        value="engage"
        secondary-label="(21/25)">
        Engage ${iconLoader(Task16)}
      </cds-tab>
      <cds-tab
        id="tab-analyze"
        target="panel-analyze"
        value="analyze"
        secondary-label="(12/16)">
        Analyze ${iconLoader(IbmWatsonDiscovery16)}
      </cds-tab>
      <cds-tab
        id="tab-remediate"
        target="panel-remediate"
        value="remediate"
        secondary-label="(0/7)"
        disabled>
        Remediate ${iconLoader(Restart16)}
      </cds-tab>
      <cds-tab
        id="tab-assets"
        target="panel-assets"
        value="assets"
        secondary-label="(4/12)">
        Assets ${iconLoader(Dashboard16)}
      </cds-tab>
      <cds-tab
        id="tab-monitoring"
        target="panel-monitoring"
        value="monitoring"
        secondary-label="(1/23)">
        Monitoring ${iconLoader(CloudMonitoring16)}
      </cds-tab>
    </cds-tabs>
    <div
      id="panel-engage"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-engage"
      hidden>
      Tab Panel 1
    </div>
    <div
      id="panel-analyze"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-analyze"
      hidden>
      <form style="margin: 2em">
        <legend class="${prefix}--label">Validation example</legend>
        <cds-checkbox id="cb" label-text="Accept privacy policy"></cds-checkbox>
        <cds-button style="margin-top: 1rem; margin-bottom: 1rem" type="submit">
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
      id="panel-remediate"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-remediate"
      hidden>
      Tab Panel 3
    </div>
    <div
      id="panel-assets"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-assets"
      hidden>
      Tab Panel 4
    </div>
    <div
      id="panel-monitoring"
      class="${prefix}--tab-content"
      role="tabpanel"
      aria-labelledby="tab-monitoring"
      hidden>
      Tab Panel 5
    </div>
  `,
};

export const Dismissable = {
  args: {
    dismissable: true,
    selectedIndex: 0,
  },
  argTypes: {
    dismissable: {
      control: 'boolean',
      description: 'Whether the rendered Tab children should be dismissable.',
    },
    selectedIndex: {
      control: 'number',
      description:
        'Specify a selected index for the initially selected content.',
    },
  },
  render: ({ dismissable, selectedIndex }) => {
    return html`
      <style>
        ${styles}
      </style>
      <tabs-story-wrapper
        ?dismissable="${dismissable}"
        selected-index="${selectedIndex}">
      </tabs-story-wrapper>
    `;
  },
};
export const DismissableContained = {
  args: {
    contained: true,
    dismissable: true,
    selectedIndex: 0,
  },
  argTypes: {
    dismissable: {
      control: 'boolean',
      description: 'Whether the rendered Tab children should be dismissable.',
    },
    selectedIndex: {
      control: 'number',
      description:
        'Specify a selected index for the initially selected content.',
    },
  },
  render: ({ contained, dismissable, selectedIndex }) => {
    return html`
      <style>
        ${styles}
      </style>
      <tabs-story-wrapper
        ?dismissable="${dismissable}"
        ?contained="${contained}"
        selected-index="${selectedIndex}">
      </tabs-story-wrapper>
    `;
  },
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
