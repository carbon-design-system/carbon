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
import {
  LayoutComponent,
  LayoutConstraintComponent,
} from '@carbon/angular/layout';
import {
  AccordionComponent,
  AccordionItemComponent,
} from '@carbon/angular/accordion';
import { ButtonComponent } from '@carbon/angular/button';
import { TagComponent } from '@carbon/angular/tag';
import { TextInputComponent } from '@carbon/angular/text-input';
import { StackComponent } from '@carbon/angular/stack';

// ─── WC-parity stories (one-for-one with @carbon/web-components Layout) ───────

const LAYOUT_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const LAYOUT_DENSITIES = ['condensed', 'normal'];

const args = {
  density: 'normal',
  size: 'md',
};

const argTypes: ArgTypes = {
  density: {
    control: 'radio',
    description: 'Specify the density of components within the layout context.',
    options: [...LAYOUT_DENSITIES],
  },
  size: {
    control: 'select',
    description: 'Specify the size of components within the layout context.',
    options: [...LAYOUT_SIZES],
  },
  styles: {
    table: {
      disable: true,
    },
  },
};

// Equivalent of the WC `Demo` helper.
const demo = `
  <cds-ng-stack gap="6">
    <cds-ng-stack orientation="horizontal" gap="6">
      <cds-ng-text-input
        label="&lt;cds-ng-text-input /&gt;"
        placeholder="Placeholder">
      </cds-ng-text-input>

      <div style="display:flex; align-items:flex-end;">
        <cds-ng-button>&#60;cds-ng-button /&#62;</cds-ng-button>
      </div>

      <div style="display:flex; align-items:flex-end;">
        <cds-ng-tag>&#60;cds-ng-tag /&#62;</cds-ng-tag>
      </div>

      <cds-ng-text-input
        size="sm"
        label='&lt;cds-ng-text-input size="sm" /&gt;'
        placeholder="Placeholder">
      </cds-ng-text-input>

      <div style="display:flex; align-items:flex-end;">
        <cds-ng-button size="sm">&#60;cds-ng-button size="sm" /&#62;</cds-ng-button>
      </div>

      <div style="display:flex; align-items:flex-end;">
        <cds-ng-tag type="blue" size="sm">&#60;cds-ng-tag size="sm" /&#62;</cds-ng-tag>
      </div>
    </cds-ng-stack>

    <cds-ng-accordion>
      <cds-ng-accordion-item title="&lt;cds-ng-accordion-item /&gt;">
        Content
      </cds-ng-accordion-item>
    </cds-ng-accordion>
  </cds-ng-stack>
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Preview/preview__Layout',
  args,
  argTypes,
  decorators: [
    moduleMetadata({
      imports: [
        LayoutComponent,
        LayoutConstraintComponent,
        AccordionComponent,
        AccordionItemComponent,
        ButtonComponent,
        TagComponent,
        TextInputComponent,
        StackComponent,
      ],
    }),
  ],
  parameters: {
    controls: {
      include: ['density', 'size'],
    },
  },
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  render: ({ size, density }) => ({
    props: { size, density },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2.5rem;">
        <h1>Layout demo</h1>
        <div>
          <h2 style="margin-block-end: 1rem">Outside of &lt;cds-ng-layout&gt;</h2>
          ${demo}
        </div>

        <div>
          <h2 style="margin-block-end: 1rem">Inside of &lt;cds-ng-layout&gt;</h2>
          <cds-ng-layout [size]="size" [density]="density">
            ${demo}
          </cds-ng-layout>
        </div>
      </div>
    `,
  }),
};
