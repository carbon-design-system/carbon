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
import { TABS_COLOR_SCHEME, TABS_TYPE } from './tabs';
import './tab';
import './tabs-skeleton';
import './tab-skeleton';
import styles from './tabs-story.scss';
import storyDocs from './tabs-story.mdx';

const noop = () => {};

const colorSchemes = {
  [`Regular`]: null,
  [`Light (${TABS_COLOR_SCHEME.LIGHT})`]: TABS_COLOR_SCHEME.LIGHT,
};

const types = {
  'Regular type': null,
  [`Container type (${TABS_TYPE.CONTAINER})`]: TABS_TYPE.CONTAINER,
};

export const Default = (args) => {
  const {
    colorScheme,
    triggerContent,
    type,
    value,
    disableSelection,
    onBeforeSelect = noop,
    onSelect = noop,
  } = args?.['bx-tabs'] || {};
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
    <bx-tabs
      color-scheme="${ifDefined(colorScheme)}"
      trigger-content="${ifDefined(triggerContent)}"
      type="${ifDefined(type)}"
      value="${ifDefined(value)}"
      @bx-tabs-beingselected="${handleBeforeSelected}"
      @bx-tabs-selected="${onSelect}">
      <bx-tab id="tab-all" target="panel-all" value="all">Option 1</bx-tab>
      <bx-tab
        id="tab-cloudFoundry"
        target="panel-cloudFoundry"
        disabled
        value="cloudFoundry"
        >Option 2</bx-tab
      >
      <bx-tab id="tab-staging" target="panel-staging" value="staging"
        >Option 3</bx-tab
      >
      <bx-tab id="tab-dea" target="panel-dea" value="dea">Option 4</bx-tab>
      <bx-tab id="tab-router" target="panel-router" value="router"
        >Option 5</bx-tab
      >
    </bx-tabs>
    <div class="bx-ce-demo-devenv--tab-panels">
      <div id="panel-all" role="tabpanel" aria-labelledby="tab-all" hidden>
        <h1>Content for option 1</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div
        id="panel-cloudFoundry"
        role="tabpanel"
        aria-labelledby="tab-cloudFoundry"
        hidden>
        <h1>Content for option 2</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div
        id="panel-staging"
        role="tabpanel"
        aria-labelledby="tab-staging"
        hidden>
        <h1>Content for option 3</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div id="panel-dea" role="tabpanel" aria-labelledby="tab-dea" hidden>
        <h1>Content for option 4</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div
        id="panel-router"
        role="tabpanel"
        aria-labelledby="tab-router"
        hidden>
        <h1>Content for option 5</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  `;
};

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    'bx-tabs': () => ({
      colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
      triggerContent: textNullable(
        'The default content of the trigger button for narrow screen (trigger-content)',
        'Select an item'
      ),
      type: select('Tabs type (type)', types, null),
      value: textNullable('The value of the selected item (value)', 'staging'),
      disableSelection: boolean(
        'Disable user-initiated selection change (Call event.preventDefault() in bx-content-switcher-beingselected event)',
        false
      ),
      onBeforeSelect: action('bx-tabs-beingselected'),
      onSelect: action('bx-tabs-selected'),
    }),
  },
};

export const skeleton = () => html`
  <bx-tabs-skeleton>
    <bx-tab-skeleton></bx-tab-skeleton>
    <bx-tab-skeleton></bx-tab-skeleton>
    <bx-tab-skeleton></bx-tab-skeleton>
    <bx-tab-skeleton></bx-tab-skeleton>
    <bx-tab-skeleton></bx-tab-skeleton>
  </bx-tabs-skeleton>
`;

skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export default {
  title: 'Components/Tabs',
  parameters: {
    ...storyDocs.parameters,
  },
};
