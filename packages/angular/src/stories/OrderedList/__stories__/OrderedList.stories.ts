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
import { ListItemComponent, OrderedListComponent } from '@carbon/angular/list';

// ─── WC-parity stories (one-for-one with @carbon/web-components Ordered list) ─

const repeatItem = (text: string, count: number) =>
  Array.from(
    { length: count },
    () => `<cds-ng-list-item>${text}</cds-ng-list-item>`
  ).join('\n');

const defaultArgs = {
  isExpressive: false,
  native: false,
  nested: false,
};

const controls: ArgTypes = {
  isExpressive: {
    control: 'boolean',
    description: 'Specify whether this ordered list expressive or not.',
  },
  native: {
    control: 'boolean',
    description:
      'Specify whether this ordered list should use native list styles instead of custom counter.',
  },
  nested: {
    control: 'boolean',
    description: 'Specify whether to use nested styling for child lists.',
  },
};

const meta: Meta = {
  title: 'Components/Ordered list',
  decorators: [
    moduleMetadata({
      imports: [OrderedListComponent, ListItemComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj;

// WC: Default
export const Default: Story = {
  args: defaultArgs,
  argTypes: controls,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-ordered-list
        [isExpressive]="isExpressive"
        [native]="native"
        [nested]="nested">
        ${repeatItem('Ordered List level 1', 13)}
      </cds-ng-ordered-list>
    `,
  }),
};

// WC: NativeListStyles
export const NativeListStyles: Story = {
  args: { native: true, nested: true },
  argTypes: {
    native: {
      ...controls['native'],
      control: false,
    },
    nested: {
      ...controls['nested'],
      control: false,
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-ordered-list [isExpressive]="isExpressive" [native]="native">
        ${repeatItem('Ordered List level 1', 3)}
        <cds-ng-list-item>
          Ordered List level 1
          <cds-ng-ordered-list
            [isExpressive]="isExpressive"
            [native]="native"
            [nested]="nested">
            ${repeatItem('Ordered List level 2', 4)}
          </cds-ng-ordered-list>
        </cds-ng-list-item>
        ${repeatItem('Ordered List level 1', 5)}
      </cds-ng-ordered-list>
    `,
  }),
};

// WC: Nested
export const Nested: Story = {
  args: { nested: true },
  argTypes: {
    nested: {
      ...controls['nested'],
      control: false,
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-ordered-list [isExpressive]="isExpressive" [native]="native">
        <cds-ng-list-item>
          Ordered List level 1
          <cds-ng-ordered-list
            [isExpressive]="isExpressive"
            [native]="native"
            [nested]="nested">
            <cds-ng-list-item>Ordered List level 2</cds-ng-list-item>
            <cds-ng-list-item>
              Ordered List level 2
              <cds-ng-ordered-list
                [isExpressive]="isExpressive"
                [native]="native"
                [nested]="nested">
                <cds-ng-list-item>Ordered List level 3</cds-ng-list-item>
                <cds-ng-list-item>Ordered List level 3</cds-ng-list-item>
              </cds-ng-ordered-list>
            </cds-ng-list-item>
          </cds-ng-ordered-list>
        </cds-ng-list-item>
        ${repeatItem('Ordered List level 1', 2)}
      </cds-ng-ordered-list>
    `,
  }),
};
