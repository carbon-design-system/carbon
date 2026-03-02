/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './index';
import { prefix } from '../../globals/settings';
import { iconLoader } from '../../globals/internal/icon-loader';
import TableOfContents16 from '@carbon/icons/es/table-of-contents/16.js';
import Workspace16 from '@carbon/icons/es/workspace/16.js';
import ViewMode2_16 from '@carbon/icons/es/view--mode-2/16.js';
import '../layer/index';
import '../../../.storybook/templates/with-layer';

import { CONTENT_SWITCHER_SIZE } from './content-switcher';
import { html } from 'lit';

const forwardEventDetail = (handler) => (event) => {
  handler?.(event.detail);
};

const sizes = {
  [`Small (${CONTENT_SWITCHER_SIZE.SMALL})`]: CONTENT_SWITCHER_SIZE.SMALL,
  'Medium (md - default)': null,
  [`Large (${CONTENT_SWITCHER_SIZE.LARGE})`]: CONTENT_SWITCHER_SIZE.LARGE,
};

const args = {
  size: null,
  selectionMode: 'automatic',
  selectedIndex: 0,
  lowContrast: false,
  disabled: false,
};

const argTypes = {
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
    description: '`true` to use the low contrast version.',
  },
  disabled: {
    control: 'boolean',
    description: 'Specify disabled attribute to `true` to disable a button.',
  },
};

export const Default = {
  args,
  argTypes,
  render: ({
    onBeforeSelect,
    onChange,
    size,
    selectionMode,
    selectedIndex,
    lowContrast,
    disabled,
  }) => {
    return html`
      <cds-content-switcher
        selection-mode="${selectionMode}"
        selected-index="${selectedIndex}"
        size="${size}"
        ?low-contrast="${lowContrast}"
        @cds-content-switcher-beingselected="${forwardEventDetail(
          onBeforeSelect
        )}"
        @cds-content-switcher-selected="${forwardEventDetail(onChange)}">
        <cds-content-switcher-item
          value="all"
          name="one"
          ?disabled="${disabled}"
          ?low-contrast="${lowContrast}">
          First section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          value="cloudFoundry"
          name="two"
          ?disabled="${disabled}"
          ?low-contrast="${lowContrast}">
          Second section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          value="staging"
          name="three"
          ?disabled="${disabled}"
          ?low-contrast="${lowContrast}">
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
    onBeforeSelect,
    onChange,
    size,
    selectionMode,
    selectedIndex,
    lowContrast,
    disabled,
  }) => html`
    <cds-content-switcher
      size="${size}"
      selection-mode="${selectionMode}"
      selected-index="${selectedIndex}"
      ?low-contrast="${lowContrast}"
      @cds-content-switcher-beingselected="${forwardEventDetail(
        onBeforeSelect
      )}"
      @cds-content-switcher-selected="${forwardEventDetail(onChange)}">
      <cds-content-switcher-item
        icon
        value="all"
        ?disabled="${disabled}"
        ?low-contrast="${lowContrast}">
        ${iconLoader(TableOfContents16)}
        <span slot="tooltip-content">Table of Contents</span>
      </cds-content-switcher-item>
      <cds-content-switcher-item
        icon
        value="cloudFoundry"
        ?disabled="${disabled}"
        ?low-contrast="${lowContrast}">
        ${iconLoader(Workspace16)}
        <span slot="tooltip-content">Workspace Test</span>
      </cds-content-switcher-item>
      <cds-content-switcher-item
        icon
        value="staging"
        ?disabled="${disabled}"
        ?low-contrast="${lowContrast}">
        ${iconLoader(ViewMode2_16)}
        <span slot="tooltip-content">View Mode</span>
      </cds-content-switcher-item>
    </cds-content-switcher>
  `,
};

export const IconOnlyWithLayer = {
  args,
  argTypes,
  render: ({
    onBeforeSelect,
    onChange,
    size,
    selectionMode,
    selectedIndex,
    lowContrast,
    disabled,
  }) => html`
    <sb-template-layers>
      <cds-content-switcher
        size="${size}"
        selection-mode="${selectionMode}"
        selected-index="${selectedIndex}"
        ?low-contrast="${lowContrast}"
        @cds-content-switcher-beingselected="${forwardEventDetail(
          onBeforeSelect
        )}"
        @cds-content-switcher-selected="${forwardEventDetail(onChange)}">
        <cds-content-switcher-item
          icon
          value="all"
          ?disabled="${disabled}"
          ?low-contrast="${lowContrast}">
          ${iconLoader(TableOfContents16)}
          <span slot="tooltip-content">Table of Contents</span>
        </cds-content-switcher-item>
        <cds-content-switcher-item
          icon
          value="cloudFoundry"
          ?disabled="${disabled}"
          ?low-contrast="${lowContrast}">
          ${iconLoader(Workspace16)}
          <span slot="tooltip-content">Workspace Test</span>
        </cds-content-switcher-item>
        <cds-content-switcher-item
          icon
          value="staging"
          ?disabled="${disabled}"
          ?low-contrast="${lowContrast}">
          ${iconLoader(ViewMode2_16)}
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
    onBeforeSelect,
    onChange,
    size,
    selectionMode,
    selectedIndex,
    lowContrast,
    disabled,
  }) => {
    return html`
      <cds-content-switcher
        selection-mode="${selectionMode}"
        selected-index="${selectedIndex}"
        size="${size}"
        ?low-contrast="${lowContrast}"
        @cds-content-switcher-beingselected="${forwardEventDetail(
          onBeforeSelect
        )}"
        @cds-content-switcher-selected="${forwardEventDetail(onChange)}">
        <cds-content-switcher-item
          ?disabled="${disabled}"
          ?low-contrast="${lowContrast}"
          value="all"
          name="one">
          First section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          value="cloudFoundry"
          name="two"
          ?disabled="${disabled}"
          ?low-contrast="${lowContrast}">
          Second section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          name="three"
          ?disabled="${disabled}"
          ?low-contrast="${lowContrast}"
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
    onBeforeSelect,
    onChange,
    size,
    selectionMode,
    selectedIndex,
    lowContrast,
    disabled,
  }) => html`
    <cds-content-switcher
      size="${size}"
      selection-mode="${selectionMode}"
      selected-index="${selectedIndex}"
      ?low-contrast="${lowContrast}"
      @cds-content-switcher-beingselected="${forwardEventDetail(
        onBeforeSelect
      )}"
      @cds-content-switcher-selected="${forwardEventDetail(onChange)}">
      <cds-content-switcher-item
        icon
        value="all"
        ?disabled="${disabled}"
        ?low-contrast="${lowContrast}">
        ${iconLoader(TableOfContents16)}
        <span slot="tooltip-content">Table of Contents</span>
      </cds-content-switcher-item>
      <cds-content-switcher-item
        icon
        value="cloudFoundry"
        ?disabled="${disabled}"
        ?low-contrast="${lowContrast}">
        ${iconLoader(Workspace16)}
        <span slot="tooltip-content">Workspace Test</span>
      </cds-content-switcher-item>
      <cds-content-switcher-item
        icon
        value="staging"
        ?disabled="${disabled}"
        ?low-contrast="${lowContrast}">
        ${iconLoader(ViewMode2_16)}
        <span slot="tooltip-content">View Mode</span>
      </cds-content-switcher-item>
    </cds-content-switcher>
  `,
};

export const WithLayer = {
  args,
  argTypes,
  render: ({
    onBeforeSelect,
    onChange,
    size,
    selectionMode,
    selectedIndex,
    lowContrast,
    disabled,
  }) => html`
    <sb-template-layers>
      <cds-content-switcher
        size="${size}"
        selection-mode="${selectionMode}"
        selected-index="${selectedIndex}"
        ?low-contrast="${lowContrast}"
        @cds-content-switcher-beingselected="${forwardEventDetail(
          onBeforeSelect
        )}"
        @cds-content-switcher-selected="${forwardEventDetail(onChange)}">
        <cds-content-switcher-item
          ?disabled="${disabled}"
          ?low-contrast="${lowContrast}"
          value="all"
          name="one">
          First section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          ?disabled="${disabled}"
          ?low-contrast="${lowContrast}"
          value="cloudFoundry"
          name="two">
          Second section
        </cds-content-switcher-item>
        <cds-content-switcher-item
          ?disabled="${disabled}"
          ?low-contrast="${lowContrast}"
          value="staging"
          name="three">
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
