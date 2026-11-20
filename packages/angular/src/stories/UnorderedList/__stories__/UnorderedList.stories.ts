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
  ListItemComponent,
  UnorderedListComponent,
} from '@carbon/angular/list';

// ─── WC-parity stories (one-for-one with @carbon/web-components Unordered list)

const defaultArgs = {
  isExpressive: false,
  nested: false,
};

const controls: ArgTypes = {
  isExpressive: {
    control: 'boolean',
    description: 'Specify whether this unordered list is expressive.',
  },
  nested: {
    control: 'boolean',
    description: 'Specify whether to use nested styling for child lists.',
  },
};

const meta: Meta = {
  title: 'Components/Unordered list',
  decorators: [
    moduleMetadata({
      imports: [UnorderedListComponent, ListItemComponent],
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
      <cds-ng-unordered-list [isExpressive]="isExpressive" [nested]="nested">
        <cds-ng-list-item>Review pull requests</cds-ng-list-item>
        <cds-ng-list-item>Update dependencies</cds-ng-list-item>
        <cds-ng-list-item>Publish the release notes</cds-ng-list-item>
      </cds-ng-unordered-list>
    `,
  }),
};

// WC: Nested
export const Nested: Story = {
  args: {
    ...defaultArgs,
    nested: true,
  },
  argTypes: {
    ...controls,
    nested: {
      ...controls['nested'],
      table: { readonly: true },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-unordered-list [isExpressive]="isExpressive">
        <cds-ng-list-item>
          Prepare the release
          <cds-ng-unordered-list [isExpressive]="isExpressive" [nested]="nested">
            <cds-ng-list-item>Review pull requests</cds-ng-list-item>
            <cds-ng-list-item>
              Update dependencies
              <cds-ng-unordered-list
                [isExpressive]="isExpressive"
                [nested]="nested">
                <cds-ng-list-item>Run the test suite</cds-ng-list-item>
                <cds-ng-list-item>Resolve security alerts</cds-ng-list-item>
              </cds-ng-unordered-list>
            </cds-ng-list-item>
          </cds-ng-unordered-list>
        </cds-ng-list-item>
        <cds-ng-list-item>Publish the release notes</cds-ng-list-item>
        <cds-ng-list-item>Notify maintainers</cds-ng-list-item>
      </cds-ng-unordered-list>
    `,
  }),
};
