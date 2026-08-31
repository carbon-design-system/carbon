/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import './index';

export const Default = {
  render: () => html`
    <cds-heading>Project overview</cds-heading>
    <cds-section>
      <cds-heading>Delivery milestones</cds-heading>
      <cds-section>
        <cds-heading>Release readiness</cds-heading>
      </cds-section>
    </cds-section>
  `,
};

export const CustomLevel = {
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
  render: ({ level }) =>
    html`<cds-heading>Project overview</cds-heading> ${keyed(
        level,
        html`<cds-section .level=${level}>
          <cds-heading>Release readiness</cds-heading>
          <cds-section>
            <cds-heading>Final approvals</cds-heading>
          </cds-section>
        </cds-section>`
      )}`,
};

const meta = {
  title: 'Components/Heading',
};

export default meta;
