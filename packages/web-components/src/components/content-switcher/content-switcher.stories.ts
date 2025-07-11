/**
 * Copyright IBM Corp. 2019, 2025
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

const forwardEventDetail = (handler) => (event) => {
  handler?.(event.detail);
};

const sizes = {
  [`Small (${CONTENT_SWITCHER_SIZE.SMALL})`]: CONTENT_SWITCHER_SIZE.SMALL,
  'Medium (md - default)': null,
  [`Large (${CONTENT_SWITCHER_SIZE.LARGE})`]: CONTENT_SWITCHER_SIZE.LARGE,
};

const args = {
  value: 'all',
  size: null,
  selectionMode: 'automatic',
  selectedIndex: 0,
  lowContrast: false,
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
    control: 'radio',
    options: ['automatic', 'manual'],
    description:
      'Choose whether or not to automatically change selection on focus when left/right arrow pressed. Defaults to `automatic`',
  },
  size: {
    control: 'radio',
    options: sizes,
    description:
      'Specify the size of the Content Switcher. Currently supports either sm, md (default) or lg as an option.',
  },
  onBeforeSelect: {
    action: `${prefix}-content-switcher-beingselected`,
  },
  onChange: {
    action: `${prefix}-content-switcher-selected`,
  },
  lowContrast: {
    control: 'boolean',
    description: 'Use the low contrast version of the content switcher',
  },
};

export const Default = {
  args,
  argTypes,
  render: ({
    value,
    onBeforeSelect,
    onChange,
    size,
    selectionMode,
    selectedIndex,
    lowContrast,
  }) => {
    return html`
      <cds-content-switcher
        value="${ifDefined(value)}"
        selectionMode="${selectionMode}"
        selectedIndex="${selectedIndex}"
        size="${size}"
        ?lowcontrast="${lowContrast}"
        @cds-content-switcher-beingselected="${forwardEventDetail(
          onBeforeSelect
        )}"
        @cds-content-switcher-selected="${forwardEventDetail(onChange)}">
        <cds-content-switcher-item
          value="all"
          name="one"
          text="First section"
          ?lowcontrast="${lowContrast}">
          First section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          value="cloudFoundry"
          name="two"
          text="Second section"
          ?lowcontrast="${lowContrast}">
          Second section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          value="staging"
          name="three"
          text="Third section"
          ?lowcontrast="${lowContrast}">
          Third section
        </cds-content-switcher-item>
      </cds-content-switcher>
    `;
  },
};

export const IconOnly = {
  args,
  argTypes,
  render: ({
    value,
    onBeforeSelect,
    onChange,
    size,
    selectionMode,
    selectedIndex,
    lowContrast,
  }) => html`
    <cds-content-switcher
      value="${ifDefined(value)}"
      size="${size}"
      selectionMode="${selectionMode}"
      selectedIndex="${selectedIndex}"
      ?lowcontrast="${lowContrast}"
      @cds-content-switcher-beingselected="${forwardEventDetail(
        onBeforeSelect
      )}"
      @cds-content-switcher-selected="${forwardEventDetail(onChange)}">
      <cds-content-switcher-item icon value="all" ?lowcontrast="${lowContrast}">
        ${TableOfContents16()}
        <span slot="tooltip-content">Table of Contents</span>
      </cds-content-switcher-item>
      <cds-content-switcher-item
        icon
        value="cloudFoundry"
        ?lowcontrast="${lowContrast}">
        ${Workspace16()}
        <span slot="tooltip-content">Workspace Test</span>
      </cds-content-switcher-item>
      <cds-content-switcher-item
        icon
        value="staging"
        ?lowcontrast="${lowContrast}">
        ${ViewMode2_16()}
        <span slot="tooltip-content">View Mode</span>
      </cds-content-switcher-item>
    </cds-content-switcher>
  `,
};

export const IconOnlyWithLayer = {
  args,
  argTypes,
  render: ({
    value,
    onBeforeSelect,
    onChange,
    size,
    selectionMode,
    selectedIndex,
    lowContrast,
  }) => html`
    <sb-template-layers>
      <cds-content-switcher
        value="${ifDefined(value)}"
        size="${size}"
        selectionMode="${selectionMode}"
        selectedIndex="${selectedIndex}"
        ?lowcontrast="${lowContrast}"
        @cds-content-switcher-beingselected="${forwardEventDetail(
          onBeforeSelect
        )}"
        @cds-content-switcher-selected="${forwardEventDetail(onChange)}">
        <cds-content-switcher-item
          icon
          value="all"
          ?lowcontrast="${lowContrast}">
          ${TableOfContents16()}
          <span slot="tooltip-content">Table of Contents</span>
        </cds-content-switcher-item>
        <cds-content-switcher-item
          icon
          value="cloudFoundry"
          ?lowcontrast="${lowContrast}">
          ${Workspace16()}
          <span slot="tooltip-content">Workspace Test</span>
        </cds-content-switcher-item>
        <cds-content-switcher-item
          icon
          value="staging"
          ?lowcontrast="${lowContrast}">
          ${ViewMode2_16()}
          <span slot="tooltip-content">View Mode</span>
        </cds-content-switcher-item>
      </cds-content-switcher>
    </sb-template-layers>
  `,
};

export const LowContrast = {
  args: {
    ...args,
    lowContrast: true,
  },
  argTypes,
  render: ({
    value,
    onBeforeSelect,
    onChange,
    size,
    selectionMode,
    selectedIndex,
    lowContrast,
  }) => {
    return html`
      <cds-content-switcher
        value="${ifDefined(value)}"
        selectionMode="${selectionMode}"
        selectedIndex="${selectedIndex}"
        size="${size}"
        ?lowcontrast="${lowContrast}"
        @cds-content-switcher-beingselected="${forwardEventDetail(
          onBeforeSelect
        )}"
        @cds-content-switcher-selected="${forwardEventDetail(onChange)}">
        <cds-content-switcher-item
          ?lowcontrast="${lowContrast}"
          value="all"
          name="one"
          text="First section">
          First section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          value="cloudFoundry"
          name="two"
          text="Second section"
          ?lowcontrast="${lowContrast}">
          Second section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          name="three"
          text="Third section"
          ?lowcontrast="${lowContrast}"
          value="staging">
          Third section
        </cds-content-switcher-item>
      </cds-content-switcher>
    `;
  },
};

export const lowContrastIconOnly = {
  args: {
    ...args,
    lowContrast: true,
  },
  argTypes,
  render: ({
    value,
    onBeforeSelect,
    onChange,
    size,
    selectionMode,
    selectedIndex,
    lowContrast,
  }) => html`
    <cds-content-switcher
      value="${ifDefined(value)}"
      size="${size}"
      selectionMode="${selectionMode}"
      selectedIndex="${selectedIndex}"
      ?lowcontrast="${lowContrast}"
      @cds-content-switcher-beingselected="${forwardEventDetail(
        onBeforeSelect
      )}"
      @cds-content-switcher-selected="${forwardEventDetail(onChange)}">
      <cds-content-switcher-item icon value="all" ?lowcontrast="${lowContrast}">
        ${TableOfContents16()}
        <span slot="tooltip-content">Table of Contents</span>
      </cds-content-switcher-item>
      <cds-content-switcher-item
        icon
        value="cloudFoundry"
        ?lowcontrast="${lowContrast}">
        ${Workspace16()}
        <span slot="tooltip-content">Workspace Test</span>
      </cds-content-switcher-item>
      <cds-content-switcher-item
        icon
        value="staging"
        ?lowcontrast="${lowContrast}">
        ${ViewMode2_16()}
        <span slot="tooltip-content">View Mode</span>
      </cds-content-switcher-item>
    </cds-content-switcher>
  `,
};

export const WithLayer = {
  args,
  argTypes,
  render: ({
    value,
    onBeforeSelect,
    onChange,
    size,
    selectionMode,
    selectedIndex,
    lowContrast,
  }) => html`
    <sb-template-layers>
      <cds-content-switcher
        value="${ifDefined(value)}"
        size="${size}"
        selectionMode="${selectionMode}"
        selectedIndex="${selectedIndex}"
        ?lowcontrast="${lowContrast}"
        @cds-content-switcher-beingselected="${forwardEventDetail(
          onBeforeSelect
        )}"
        @cds-content-switcher-selected="${forwardEventDetail(onChange)}">
        <cds-content-switcher-item value="all" name="one" text="First section">
          First section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          value="cloudFoundry"
          name="two"
          text="Second section">
          Second section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          value="staging"
          name="three"
          text="Third section">
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
