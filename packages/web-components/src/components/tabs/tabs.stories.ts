/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, nothing } from 'lit';
import { TABS_TYPE } from './tabs';
import styles from './tabs-story.scss?lit';
import { prefix } from '../../globals/settings';
import '../button';
import '../checkbox';
import '../radio-button';
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
        value="all"
        @cds-tabs-beingselected="${handleBeforeSelected}">
        <cds-tab id="tab-all" target="panel-all" value="all"
          >Tab label 1</cds-tab
        >
        <cds-tab
          id="tab-cloudFoundry"
          target="panel-cloudFoundry"
          value="cloudFoundry">
          Tab label 2
        </cds-tab>
        <cds-tab
          id="tab-staging"
          target="panel-staging"
          value="staging"
          disabled>
          Tab label 3
        </cds-tab>
        <cds-tab id="tab-dea" target="panel-dea" value="dea"
          >Tab label 4</cds-tab
        >
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

export const Vertical = {
  args: {
    ...args,
    customHeight: '',
  },
  argTypes: {
    ...argTypes,
    customHeight: {
      control: 'text',
      description:
        'Optional height for the vertical tabs container. Accepts any valid CSS height value (e.g. "500px", "50vh"). If omitted, the container grows to fit its content.',
    },
  },
  render: ({ disabled, contained, selectionMode, customHeight }) => {
    const handleBeforeSelected = (event: CustomEvent) => {
      if (disabled) {
        event.preventDefault();
      }
    };

    return html`
      <style>
        ${styles}
      </style>
      <cds-tabs-vertical custom-height="${customHeight || nothing}">
        <cds-tabs
          slot="tabs"
          disabled="${disabled}"
          selection-mode="${selectionMode}"
          type="${contained ? TABS_TYPE.CONTAINED : null}"
          value="all"
          @cds-tabs-beingselected="${handleBeforeSelected}">
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
          <form style="margin: 2em">
            <cds-text-input
              type="text"
              label="First Name"
              id="text-input-1"></cds-text-input>
            <cds-text-input
              type="text"
              label="Middle Initial"
              id="text-input-1"></cds-text-input>
            <cds-text-input
              type="text"
              label="Last Name"
              id="text-input-1"></cds-text-input>
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
            <cds-checkbox id="cb" label-text="Checkbox one"></cds-checkbox>
            <cds-checkbox id="cb" label-text="Checkbox two"></cds-checkbox>
            <cds-button
              style="margin-top: 1rem; margin-bottom: 1rem"
              type="submit">
              Submit
            </cds-button>
          </form>
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

export default {
  title: 'Components/Tabs',
  actions: { argTypesRegex: '^on.*' },
};
