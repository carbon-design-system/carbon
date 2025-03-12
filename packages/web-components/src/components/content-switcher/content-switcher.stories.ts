/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { CONTENT_SWITCHER_SIZE } from './content-switcher';
import './index';
import { prefix } from '../../globals/settings';
import TableOfContents16 from '@carbon/icons/lib/table-of-contents/16.js';
import Workspace16 from '@carbon/icons/lib/workspace/16.js';
import ViewMode2_16 from '@carbon/icons/lib/view--mode-2/16.js';
import '../layer/index';
import '../../../.storybook/templates/with-layer';

const noop = () => {};

const sizes = {
  'Medium (md - default)': null,
  [`Small (${CONTENT_SWITCHER_SIZE.SMALL})`]: CONTENT_SWITCHER_SIZE.SMALL,
  [`Large (${CONTENT_SWITCHER_SIZE.LARGE})`]: CONTENT_SWITCHER_SIZE.LARGE,
};

const args = {
  value: '',
  size: null,
  disableSelection: false,
  selectionMode: 'automatic',
  selectedIndex: 0,
};

const argTypes = {
  value: {
    control: 'text',
    description: 'The value of the selected item (value)',
  },
  selectedIndex: {
    control: 'number',
    description: 'Specify a selected index for the initially selected content',
  },
  selectionMode: {
    control: 'select',
    options: ['automatic', 'manual'],
    description:
      'Choose whether or not to automatically change selection on focus when left/right arrow pressed. Defaults to `automatic`',
  },
  size: {
    control: 'select',
    options: sizes,
    description: 'Button size (size)',
  },
  disableSelection: {
    control: 'boolean',
    description: `Disable user-initiated selection change (Call event.preventDefault() in ${prefix}-content-switcher-beingselected event)`,
  },
  onSelect: {
    action: `${prefix}-content-switcher-selected`,
  },
};

export const Default = {
  args,
  argTypes,
  render: (args) => {
    const {
      value,
      disableSelection,
      onSelect = noop,
      size,
      selectionMode,
      selectedIndex,
    } = args ?? {};
    const handleBeforeSelected = (event: CustomEvent) => {
      if (disableSelection) {
        event.preventDefault();
      }
    };

    return html`
      <cds-content-switcher
        value="all"
        @cds-content-switcher-beingselected="${handleBeforeSelected}"
        @cds-content-switcher-selected="${onSelect}"
        selectionMode="${selectionMode}"
        selectedIndex="${selectedIndex}"
        size="${size}">
        <cds-content-switcher-item value="all">
          First section
        </cds-content-switcher-item>
        <cds-content-switcher-item value="cloudFoundry">
          Second section
        </cds-content-switcher-item>
        <cds-content-switcher-item value="staging">
          Third section
        </cds-content-switcher-item>
        <cds-content-switcher-item value="4section">
          4 section
        </cds-content-switcher-item>
        <cds-content-switcher-item value="5section">
          5 section
        </cds-content-switcher-item>
      </cds-content-switcher>
    `;
  },
};

export const IconOnly = {
  render: () => html`
    <cds-content-switcher value="all">
      <cds-content-switcher-item icon value="all">
        ${TableOfContents16()}
        <span slot="tooltip-content">Table of Contents</span>
      </cds-content-switcher-item>
      <cds-content-switcher-item icon value="cloudFoundry">
        ${Workspace16()}
        <span slot="tooltip-content">Workspace Test</span>
      </cds-content-switcher-item>
      <cds-content-switcher-item icon value="staging">
        ${ViewMode2_16()}
        <span slot="tooltip-content">View Mode</span>
      </cds-content-switcher-item>
    </cds-content-switcher>
  `,
};

export const IconOnlyWithLayer = {
  render: () => html`
    <sb-template-layers>
      <cds-content-switcher value="all">
        <cds-content-switcher-item icon value="all">
          ${TableOfContents16()}
          <span slot="tooltip-content">Table of Contents</span>
        </cds-content-switcher-item>
        <cds-content-switcher-item icon value="cloudFoundry">
          ${Workspace16()}
          <span slot="tooltip-content">Workspace Test</span>
        </cds-content-switcher-item>
        <cds-content-switcher-item icon value="staging">
          ${ViewMode2_16()}
          <span slot="tooltip-content">View Mode</span>
        </cds-content-switcher-item>
      </cds-content-switcher>
    </sb-template-layers>
  `,
};

export const WithLayer = {
  render: () => html`
    <sb-template-layers>
      <cds-content-switcher value="all">
        <cds-content-switcher-item value="all">
          First section
        </cds-content-switcher-item>
        <cds-content-switcher-item value="cloudFoundry">
          Second section
        </cds-content-switcher-item>
        <cds-content-switcher-item value="staging">
          Third section
        </cds-content-switcher-item>
      </cds-content-switcher>
    </sb-template-layers>
  `,
};

const meta = {
  title: 'Components/Content switcher',
};

export default meta;
