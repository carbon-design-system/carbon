/**
 * Copyright IBM Corp. 2019, 2026
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
import { withLayers } from '../../../.storybook/decorators/with-layers';

import { CONTENT_SWITCHER_SIZE } from './content-switcher';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

const forwardEventDetail = (handler) => (event) => {
  handler?.(event.detail);
};

const sizes = {
  [`Small (${CONTENT_SWITCHER_SIZE.SMALL})`]: CONTENT_SWITCHER_SIZE.SMALL,
  'Medium (md - default)': null,
  [`Large (${CONTENT_SWITCHER_SIZE.LARGE})`]: CONTENT_SWITCHER_SIZE.LARGE,
};

const sharedArgs = {
  size: null,
  selectionMode: 'automatic',
  selectedIndex: 0,
  lowContrast: false,
  disabled: false,
};

const argTypes = {
  selectedIndex: {
    control: {
      type: 'number',
      min: 0,
      max: 2,
      step: 1,
    },
    description: 'Specify a selected index for the initially selected content',
    table: {
      defaultValue: { summary: 0 },
    },
  },
  selectionMode: {
    control: 'radio',
    options: ['automatic', 'manual'],
    description:
      'Choose whether or not to automatically change selection on focus when left/right arrow pressed. Defaults to `automatic`',
    table: {
      defaultValue: { summary: '"automatic"' },
    },
  },
  size: {
    control: 'radio',
    options: sizes,
    description:
      'Specify the size of the Content Switcher. Currently supports either sm, md (default) or lg as an option.',
    table: {
      defaultValue: { summary: '"md"' },
    },
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
    table: {
      defaultValue: { summary: false },
    },
  },
  disabled: {
    control: 'boolean',
    description: 'Specify disabled attribute to `true` to disable a button.',
    table: {
      defaultValue: { summary: false },
    },
  },
};

const sharedParameters = {
  controls: {
    include: Object.keys(sharedArgs),
  },
};

export const Default = {
  args: { ...sharedArgs },
  argTypes,
  parameters: sharedParameters,
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
        .selectedIndex=${selectedIndex}
        size=${ifDefined(size ?? undefined)}
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
  args: { ...sharedArgs },
  argTypes,
  parameters: sharedParameters,
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
      size=${ifDefined(size ?? undefined)}
      selection-mode="${selectionMode}"
      .selectedIndex=${selectedIndex}
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
  args: { ...sharedArgs },
  argTypes,
  decorators: [withLayers],
  parameters: {
    ...sharedParameters,
    layout: 'fullscreen',
  },
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
      size=${ifDefined(size ?? undefined)}
      selection-mode="${selectionMode}"
      .selectedIndex=${selectedIndex}
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

export const LowContrast = {
  args: {
    ...sharedArgs,
    lowContrast: true,
  },
  argTypes: {
    ...argTypes,
    lowContrast: {
      ...argTypes.lowContrast,
      table: {
        ...argTypes.lowContrast.table,
        readonly: true,
      },
    },
  },
  parameters: sharedParameters,
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
        .selectedIndex=${selectedIndex}
        size=${ifDefined(size ?? undefined)}
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
    ...sharedArgs,
    lowContrast: true,
  },
  argTypes: {
    ...argTypes,
    lowContrast: {
      ...argTypes.lowContrast,
      table: {
        ...argTypes.lowContrast.table,
        readonly: true,
      },
    },
  },
  parameters: sharedParameters,
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
      size=${ifDefined(size ?? undefined)}
      selection-mode="${selectionMode}"
      .selectedIndex=${selectedIndex}
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
  args: { ...sharedArgs },
  argTypes,
  decorators: [withLayers],
  parameters: {
    ...sharedParameters,
    layout: 'fullscreen',
  },
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
      size=${ifDefined(size ?? undefined)}
      selection-mode="${selectionMode}"
      .selectedIndex=${selectedIndex}
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
  `,
};

const meta = {
  title: 'Components/Content switcher',
};

export default meta;
