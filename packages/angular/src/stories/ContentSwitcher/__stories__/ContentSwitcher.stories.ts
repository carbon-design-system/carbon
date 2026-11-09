/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import { fn } from 'storybook/test';
import { toString } from '@carbon/icon-helpers';
import TableOfContents16 from '@carbon/icons/es/table-of-contents/16.js';
import Workspace16 from '@carbon/icons/es/workspace/16.js';
import ViewMode2_16 from '@carbon/icons/es/view--mode-2/16.js';
import {
  ContentSwitcherComponent,
  ContentSwitcherItemComponent,
} from '@carbon/angular/content-switcher';
import { withLayers } from '../../../../.storybook/decorators/with-layers';

// ─── WC-parity stories (one-for-one with @carbon/web-components Content Switcher) ───

const sizes = ['sm', null, 'lg'];

const sharedArgs = {
  size: null,
  selectionMode: 'automatic',
  selectedIndex: 0,
  lowContrast: false,
  disabled: false,
};

const argTypes: ArgTypes = {
  selectedIndex: {
    control: {
      type: 'number',
      min: 0,
      max: 2,
      step: 1,
    },
    description: 'Specify a selected index for the initially selected content',
    table: {
      defaultValue: { summary: '0' },
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
    labels: {
      sm: 'Small (sm)',
      null: 'Medium (md - default)',
      lg: 'Large (lg)',
    },
    description:
      'Specify the size of the Content Switcher. Currently supports either sm, md (default) or lg as an option.',
    table: {
      defaultValue: { summary: '"md"' },
    },
  },
  onBeforeSelect: {
    action: 'cds-content-switcher-beingselected',
  },
  onChange: {
    action: 'cds-content-switcher-selected',
  },
  lowContrast: {
    control: 'boolean',
    description: '`true` to use the low contrast version.',
    table: {
      defaultValue: { summary: 'false' },
    },
  },
  disabled: {
    control: 'boolean',
    description: 'Specify disabled attribute to `true` to disable a button.',
    table: {
      defaultValue: { summary: 'false' },
    },
  },
};

const sharedParameters = {
  controls: {
    include: Object.keys(sharedArgs),
  },
};

const textItemsTemplate = `
  <cds-ng-content-switcher-item value="all" name="one" [disabled]="disabled">
    First section
  </cds-ng-content-switcher-item>
  <cds-ng-content-switcher-item value="cloudFoundry" name="two" [disabled]="disabled">
    Second section
  </cds-ng-content-switcher-item>
  <cds-ng-content-switcher-item value="staging" name="three" [disabled]="disabled">
    Third section
  </cds-ng-content-switcher-item>
`;

const tableOfContentsIcon = toString(TableOfContents16);
const workspaceIcon = toString(Workspace16);
const viewMode2Icon = toString(ViewMode2_16);

const iconItemsTemplate = `
  <cds-ng-content-switcher-item icon value="all" [disabled]="disabled">
    ${tableOfContentsIcon}
    <span slot="tooltip-content">Table of Contents</span>
  </cds-ng-content-switcher-item>
  <cds-ng-content-switcher-item icon value="cloudFoundry" [disabled]="disabled">
    ${workspaceIcon}
    <span slot="tooltip-content">Workspace Test</span>
  </cds-ng-content-switcher-item>
  <cds-ng-content-switcher-item icon value="staging" [disabled]="disabled">
    ${viewMode2Icon}
    <span slot="tooltip-content">View Mode</span>
  </cds-ng-content-switcher-item>
`;

const switcherTemplate = (items: string) => `
  <cds-ng-content-switcher
    [selectionMode]="selectionMode"
    [selectedIndex]="selectedIndex"
    [size]="size ?? ''"
    [lowContrast]="lowContrast"
    (contentSwitcherBeingselected)="onBeforeSelect($event.detail)"
    (contentSwitcherSelected)="onChange($event.detail)">
    ${items}
  </cds-ng-content-switcher>
`;

const lowContrastArgTypes: ArgTypes = {
  ...argTypes,
  lowContrast: {
    ...argTypes.lowContrast,
    table: {
      ...argTypes.lowContrast.table,
      readonly: true,
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Content switcher',
  // Storybook for Angular drops args that have no `action` or `control`
  // argType before rendering, so the output handlers need one.
  args: { onBeforeSelect: fn(), onChange: fn() },
  decorators: [
    moduleMetadata({
      imports: [ContentSwitcherComponent, ContentSwitcherItemComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  args: { ...sharedArgs },
  argTypes,
  parameters: sharedParameters,
  render: (args) => ({
    props: args,
    template: switcherTemplate(textItemsTemplate),
  }),
};

// WC: IconOnly
export const IconOnly: Story = {
  args: { ...sharedArgs },
  argTypes,
  parameters: sharedParameters,
  render: (args) => ({
    props: args,
    template: switcherTemplate(iconItemsTemplate),
  }),
};

// WC: IconOnlyWithLayer
export const IconOnlyWithLayer: Story = {
  decorators: [withLayers],
  args: { ...sharedArgs },
  argTypes,
  parameters: {
    ...sharedParameters,
    layout: 'fullscreen',
  },
  render: (args) => ({
    props: args,
    template: switcherTemplate(iconItemsTemplate),
  }),
};

// WC: LowContrast
export const LowContrast: Story = {
  args: {
    ...sharedArgs,
    lowContrast: true,
  },
  argTypes: lowContrastArgTypes,
  parameters: sharedParameters,
  render: (args) => ({
    props: args,
    template: switcherTemplate(textItemsTemplate),
  }),
};

// WC: lowContrastIconOnly
export const lowContrastIconOnly: Story = {
  args: {
    ...sharedArgs,
    lowContrast: true,
  },
  argTypes: lowContrastArgTypes,
  parameters: sharedParameters,
  render: (args) => ({
    props: args,
    template: switcherTemplate(iconItemsTemplate),
  }),
};

// WC: WithLayer
export const WithLayer: Story = {
  decorators: [withLayers],
  args: { ...sharedArgs },
  argTypes,
  parameters: {
    ...sharedParameters,
    layout: 'fullscreen',
  },
  render: (args) => ({
    props: args,
    template: switcherTemplate(textItemsTemplate),
  }),
};
