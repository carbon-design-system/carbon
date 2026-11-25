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
import { LayerComponent } from '@carbon/angular/layer';

// ─── WC-parity stories (one-for-one with @carbon/web-components Layer) ───────

const controls: ArgTypes = {
  label: {
    control: 'text',
    description: 'Provide the content displayed in each layer.',
  },
  level: {
    control: 'select',
    options: [0, 1, 2],
    description: `Specify the layer level.`,
  },
};

// Inline equivalents of the WC `layer-story.scss` helper classes.
const withBackgroundStyle =
  'padding: 1rem; background: var(--cds-layer); color: var(--cds-text-primary);';
const noBackgroundStyle = 'padding: 1rem; color: var(--cds-text-primary);';

const meta: Meta = {
  title: 'Components/Layer',
  decorators: [
    moduleMetadata({
      imports: [LayerComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj;

// WC: Default
export const Default: Story = {
  args: {
    label: 'Workspace settings',
  },
  argTypes: {
    label: controls['label'],
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-layer>
        <div style="${withBackgroundStyle}">{{ label }}</div>
        <cds-ng-layer>
          <div style="${withBackgroundStyle}">{{ label }}</div>
          <cds-ng-layer>
            <div style="${withBackgroundStyle}">{{ label }}</div>
          </cds-ng-layer>
        </cds-ng-layer>
      </cds-ng-layer>
    `,
  }),
};

// TODO(parity): `withBackground` does not set a background yet. The web
// component selects on the `with-background` attribute, which its non-reflecting
// property never sets, and the wrapper only forwards properties.
// See https://github.com/carbon-design-system/carbon/issues/24093
// WC: withBackground
export const withBackground: Story = {
  args: {
    label: 'Workspace settings',
  },
  argTypes: {
    label: controls['label'],
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-layer withBackground>
        <div style="${noBackgroundStyle}">{{ label }}</div>
        <cds-ng-layer withBackground>
          <div style="${noBackgroundStyle}">{{ label }}</div>
          <cds-ng-layer withBackground>
            <div style="${noBackgroundStyle}">{{ label }}</div>
          </cds-ng-layer>
        </cds-ng-layer>
      </cds-ng-layer>
    `,
  }),
};

// WC: CustomLevel
export const CustomLevel: Story = {
  name: 'Custom level',
  args: {
    label: 'Workspace settings',
    level: 2,
  },
  argTypes: controls,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-layer [level]="level">
        <div style="${withBackgroundStyle}">{{ label }}</div>
      </cds-ng-layer>
    `,
  }),
};

// WC: UseLayer
export const UseLayer: Story = {
  name: 'useLayer',
  args: {
    label: 'Current layer level',
  },
  argTypes: {
    label: controls['label'],
  },
  render: (args) => ({
    props: {
      ...args,
      // `cds-ng-use-layer` is surfaced by `LayerComponent` as the `useLayer`
      // output. The event bubbles, so an outer layer also reports the nested
      // layers; each report writes the same value.
      onUseLayer: (event: CustomEvent) => {
        const { layer, level } = event.detail;
        const target = layer.querySelector('.use-layer-level');
        if (target) {
          target.innerText = `${level + 1}`;
        }
      },
    },
    template: `
      <cds-ng-layer (useLayer)="onUseLayer($event)">
        <div style="${withBackgroundStyle}">
          {{ label }}: <span class="use-layer-level"></span>
        </div>
        <cds-ng-layer (useLayer)="onUseLayer($event)">
          <div style="${withBackgroundStyle}">
            {{ label }}: <span class="use-layer-level"></span>
          </div>
        </cds-ng-layer>
      </cds-ng-layer>
    `,
  }),
};
