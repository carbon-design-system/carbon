/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import { ifDefined } from 'lit/directives/if-defined.js';
import { TABS_TYPE } from './tabs';
import './tab';
import './tabs-skeleton';
import './tab-skeleton';
import styles from './tabs-story.scss';
import storyDocs from './tabs-story.mdx';
import { prefix } from '../../globals/settings';

const noop = () => {};

const types = {
  'Regular type': null,
  [`Container type (${TABS_TYPE.CONTAINED})`]: TABS_TYPE.CONTAINED,
};

export const Default = () => html`
  <style>
    ${styles}
  </style>
  <cds-tabs value="all">
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

export const Contained = () => html`
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

export const skeleton = () => html`
  <cds-tabs-skeleton>
    <cds-tab-skeleton></cds-tab-skeleton>
    <cds-tab-skeleton></cds-tab-skeleton>
    <cds-tab-skeleton></cds-tab-skeleton>
    <cds-tab-skeleton></cds-tab-skeleton>
    <cds-tab-skeleton></cds-tab-skeleton>
  </cds-tabs-skeleton>
`;

skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export const Playground = (args) => {
  const {
    triggerContent,
    type,
    value,
    disableSelection,
    onBeforeSelect = noop,
    onSelect = noop,
  } = args?.[`${prefix}-tabs`] || {};
  const handleBeforeSelected = (event: CustomEvent) => {
    onBeforeSelect(event);
    if (disableSelection) {
      event.preventDefault();
    }
  };
  return html`
    <style>
      ${styles}
    </style>
    <cds-tabs
      trigger-content="${ifDefined(triggerContent)}"
      type="${ifDefined(type)}"
      value="${ifDefined(value)}"
      @cds-tabs-beingselected="${handleBeforeSelected}"
      @cds-tabs-selected="${onSelect}">
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
};

Playground.parameters = {
  ...storyDocs.parameters,
  knobs: {
    [`${prefix}-tabs`]: () => ({
      triggerContent: textNullable(
        'The default content of the trigger button for narrow screen (trigger-content)',
        'Select an item'
      ),
      type: select('Tabs type (type)', types, null),
      value: textNullable('The value of the selected item (value)', 'all'),
      disableSelection: boolean(
        `Disable user-initiated selection change (Call event.preventDefault() in ${prefix}-content-switcher-beingselected event)`,
        false
      ),
      onBeforeSelect: action(`${prefix}-tabs-beingselected`),
      onSelect: action(`${prefix}-tabs-selected`),
    }),
  },
};

export default {
  title: 'Components/Tabs',
};
