/**
 * Copyright IBM Corp. 2019, 2023
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
};

export const Default = {
  args,
  argTypes,
  render: ({ disabled, contained }) => {
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

export default {
  title: 'Components/Tabs',
  actions: { argTypesRegex: '^on.*' },
};
