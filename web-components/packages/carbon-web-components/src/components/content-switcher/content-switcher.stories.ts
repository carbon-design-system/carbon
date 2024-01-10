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
import storyDocs from './content-switcher.mdx';
import { prefix } from '../../globals/settings';
import TableOfContents16 from '@carbon/web-components/es/icons/table-of-contents/16';
import Workspace16 from '@carbon/web-components/es/icons/workspace/16';
import ViewMode2_16 from '@carbon/web-components/es/icons/view--mode-2/16';
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
};

const argTypes = {
  value: {
    control: 'text',
    description: 'The value of the selected item (value)',
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
  onBeforeSelect: {
    action: `${prefix}-content-switcher-beingselected`,
  },
  onSelect: {
    action: `${prefix}-content-switcher-selected`,
  },
};

export const Default = {
  render: () => html`
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
  `,
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

export const Playground = {
  args,
  argTypes,
  render: (args) => {
    const {
      value,
      disableSelection,
      onBeforeSelect = noop,
      onSelect = noop,
      size,
    } = args ?? {};
    const handleBeforeSelected = (event: CustomEvent) => {
      onBeforeSelect(event);
      if (disableSelection) {
        event.preventDefault();
      }
    };

    return html`
      <cds-content-switcher
        value="${ifDefined(value)}"
        @cds-content-switcher-beingselected="${handleBeforeSelected}"
        @cds-content-switcher-selected="${onSelect}"
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
      </cds-content-switcher>
    `;
  },
};

const meta = {
  title: 'Components/Content switcher',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
