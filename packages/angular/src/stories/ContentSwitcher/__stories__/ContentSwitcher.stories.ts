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
import {
  ContentSwitcherComponent,
  ContentSwitcherItemComponent,
} from '@carbon/angular/content-switcher';
import { LayerComponent } from '@carbon/angular/layer';

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

const svgOpen = `<svg slot="icon" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32">`;

// Carbon icons: table-of-contents/16, workspace/16, view--mode-2/16
const tableOfContentsIcon = `${svgOpen}<path d="M4 6H22V8H4z"/><path d="M4 12H22V14H4z"/><path d="M4 18H22V20H4z"/><path d="M4 24H22V26H4z"/><path d="M26 6H28V8H26z"/><path d="M26 12H28V14H26z"/><path d="M26 18H28V20H26z"/><path d="M26 24H28V26H26z"/></svg>`;
const workspaceIcon = `${svgOpen}<path d="M16,17v8H6V17H16m0-2H6a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2H16a2,2,0,0,0,2-2V17a2,2,0,0,0-2-2Z"/><path d="M27,6v5H17V6H27m0-2H17a2,2,0,0,0-2,2v5a2,2,0,0,0,2,2H27a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2Z"/><path d="M27,17v5H22V17h5m0-2H22a2,2,0,0,0-2,2v5a2,2,0,0,0,2,2h5a2,2,0,0,0,2-2V17a2,2,0,0,0-2-2Z"/><path d="M11,6v5H6V6h5m0-2H6A2,2,0,0,0,4,6v5a2,2,0,0,0,2,2h5a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2Z"/></svg>`;
const viewMode2Icon = `${svgOpen}<path d="M4 26H28V28H4z"/><path d="M4 19H28V21H4z"/><path d="M12,6v6H6V6h6m0-2H6A2,2,0,0,0,4,6v6a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2Z"/><path d="M26,6v6H20V6h6m0-2H20a2,2,0,0,0-2,2v6a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2Z"/></svg>`;

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

// Mirrors the `withLayers` decorator of the web components stories: the story
// content rendered on $background, $layer-01 and $layer-02.
const layeredTemplate = (items: string) => `
  <div class="cds--with-layer__background">
    <div class="cds--with-layer__label">$background</div>
    <div class="cds--with-layer__content">
      ${switcherTemplate(items)}
      <cds-ng-layer [withBackground]="true">
        <div class="cds--with-layer__layer">
          <div class="cds--with-layer__label">$layer-01</div>
          <div class="cds--with-layer__content">
            ${switcherTemplate(items)}
            <cds-ng-layer [withBackground]="true">
              <div class="cds--with-layer__layer">
                <div class="cds--with-layer__label">$layer-02</div>
                <div class="cds--with-layer__content">
                  ${switcherTemplate(items)}
                </div>
              </div>
            </cds-ng-layer>
          </div>
        </div>
      </cds-ng-layer>
    </div>
  </div>
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
      imports: [
        ContentSwitcherComponent,
        ContentSwitcherItemComponent,
        LayerComponent,
      ],
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
  args: { ...sharedArgs },
  argTypes,
  parameters: {
    ...sharedParameters,
    layout: 'fullscreen',
  },
  render: (args) => ({
    props: args,
    template: layeredTemplate(iconItemsTemplate),
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
  args: { ...sharedArgs },
  argTypes,
  parameters: {
    ...sharedParameters,
    layout: 'fullscreen',
  },
  render: (args) => ({
    props: args,
    template: layeredTemplate(textItemsTemplate),
  }),
};
