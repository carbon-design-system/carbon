/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { HeadingComponent, SectionComponent } from '@carbon/angular/heading';

// ─── WC-parity stories (one-for-one with @carbon/web-components Heading) ─────

const meta: Meta = {
  title: 'Components/Heading',
  decorators: [
    moduleMetadata({
      imports: [HeadingComponent, SectionComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj;

// WC: Default
export const Default: Story = {
  render: () => ({
    template: `
      <cds-ng-heading>Project overview</cds-ng-heading>
      <cds-ng-section>
        <cds-ng-heading>Delivery milestones</cds-ng-heading>
        <cds-ng-section>
          <cds-ng-heading>Release readiness</cds-ng-heading>
        </cds-ng-section>
      </cds-ng-section>
    `,
  }),
};

// WC: CustomLevel
export const CustomLevel: Story = {
  args: {
    level: 5,
  },
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      table: { category: 'Section' },
    },
  },
  // `cds-ng-section` reads its level once, when it connects to the DOM, so
  // the level is written into the template as a static attribute. Changing
  // the control changes the template, which re-creates the section (the
  // Angular counterpart of the `keyed` directive used by the WC story).
  render: ({ level }) => ({
    template: `
      <cds-ng-heading>Project overview</cds-ng-heading>
      <cds-ng-section level="${level}">
        <cds-ng-heading>Release readiness</cds-ng-heading>
        <cds-ng-section>
          <cds-ng-heading>Final approvals</cds-ng-heading>
        </cds-ng-section>
      </cds-ng-section>
    `,
  }),
};
