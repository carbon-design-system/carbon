/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import './index';

const headingArgTypes = {
  rootHeading: {
    control: 'text',
    table: { category: 'Heading content' },
  },
  sectionHeading: {
    control: 'text',
    table: { category: 'Heading content' },
  },
  nestedHeading: {
    control: 'text',
    table: { category: 'Heading content' },
  },
};

const headingArgs = {
  rootHeading: 'Account settings',
  sectionHeading: 'Profile',
  nestedHeading: 'Contact information',
};

export const Default = {
  args: headingArgs,
  argTypes: headingArgTypes,
  render: ({ rootHeading, sectionHeading, nestedHeading }) => html`
    <cds-heading>${rootHeading}</cds-heading>
    <cds-section>
      <cds-heading>${sectionHeading}</cds-heading>
      <cds-section>
        <cds-heading>${nestedHeading}</cds-heading>
      </cds-section>
    </cds-section>
  `,
};

export const CustomLevel = {
  args: {
    ...headingArgs,
    level: 5,
  },
  argTypes: {
    ...headingArgTypes,
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      table: { category: 'Section' },
    },
  },
  render: ({ rootHeading, sectionHeading, nestedHeading, level }) =>
    html`<cds-heading>${rootHeading}</cds-heading> ${keyed(
        level,
        html`<cds-section .level=${level}>
          <cds-heading>${sectionHeading}</cds-heading>
          <cds-section>
            <cds-heading>${nestedHeading}</cds-heading>
          </cds-section>
        </cds-section>`
      )}`,
};

const meta = {
  title: 'Components/Heading',
};

export default meta;
