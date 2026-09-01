/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './structured-list';
import './structured-list-head';
import './structured-list-header-row';
import './structured-list-header-cell';
import './structured-list-body';
import './structured-list-row';
import './structured-list-cell';
import './structured-list-header-cell-skeleton';

const defaultArgs = {
  ariaLabel: 'Service status',
  condensed: false,
  flush: false,
  hasSelection: false,
};

const controls = {
  ariaLabel: {
    control: 'text',
    description: 'Specify a label for the structured list.',
  },
  condensed: {
    control: 'boolean',
    description: 'Specify if structured list is condensed, default is false.',
  },
  flush: {
    control: 'boolean',
    description: 'Specify if structured list is flush, default is false.',
  },
  hasSelection: {
    control: 'boolean',
    description: 'Supports selection feature (has-selection)',
  },
};

const selectionRows = [
  {
    environment: 'Production',
    region: 'Frankfurt',
    purpose: 'Runs customer-facing services',
  },
  {
    environment: 'Staging',
    region: 'Dallas',
    purpose: 'Validates releases before deployment',
  },
  {
    environment: 'Development',
    region: 'London',
    purpose: 'Supports feature development and integration',
  },
  {
    environment: 'Disaster recovery',
    region: 'Sydney',
    purpose: 'Provides a standby recovery environment',
  },
];

export const Default = {
  args: defaultArgs,
  argTypes: controls,
  render: ({ ariaLabel, condensed, flush, hasSelection }) => {
    const selectionName = !hasSelection
      ? undefined
      : 'structured-list-selection';
    const selectionValues = !hasSelection
      ? []
      : [
          'structured-list-selection-0',
          'structured-list-selection-1',
          'structured-list-selection-2',
        ];
    return html`
      <cds-structured-list
        aria-label=${ifDefined(ariaLabel)}
        selection-name=${ifDefined(selectionName)}
        ?condensed=${condensed}
        ?flush=${flush}>
        <cds-structured-list-head>
          <cds-structured-list-header-row>
            <cds-structured-list-header-cell>
              Service
            </cds-structured-list-header-cell>
            <cds-structured-list-header-cell>
              Status
            </cds-structured-list-header-cell>
            <cds-structured-list-header-cell>
              Description
            </cds-structured-list-header-cell>
          </cds-structured-list-header-row>
        </cds-structured-list-head>
        <cds-structured-list-body>
          <cds-structured-list-row
            selection-value=${ifDefined(selectionValues[0])}>
            <cds-structured-list-cell>API gateway</cds-structured-list-cell>
            <cds-structured-list-cell>Online</cds-structured-list-cell>
            <cds-structured-list-cell>
              Routes and secures application traffic across environments.
            </cds-structured-list-cell>
          </cds-structured-list-row>
          <cds-structured-list-row
            selection-value=${ifDefined(selectionValues[1])}>
            <cds-structured-list-cell>Data warehouse</cds-structured-list-cell>
            <cds-structured-list-cell>Maintenance</cds-structured-list-cell>
            <cds-structured-list-cell>
              Scheduled maintenance begins Friday at 22:00 UTC.
            </cds-structured-list-cell>
          </cds-structured-list-row>
        </cds-structured-list-body>
      </cds-structured-list>
    `;
  },
};

export const Selection = {
  args: {
    ariaLabel: 'Deployment environments',
    condensed: false,
    hasSelection: true,
  },
  argTypes: {
    ariaLabel: controls.ariaLabel,
    condensed: controls.condensed,
    hasSelection: {
      ...controls.hasSelection,
      table: { readonly: true },
    },
  },
  parameters: {
    controls: {
      include: ['ariaLabel', 'condensed'],
    },
  },
  render: ({ ariaLabel, condensed, hasSelection }) => {
    const selectionName = 'structured-list-selection';

    return html`
      <cds-structured-list
        aria-label=${ifDefined(ariaLabel)}
        selection-name=${ifDefined(hasSelection ? selectionName : undefined)}
        ?condensed=${condensed}>
        <cds-structured-list-head>
          <cds-structured-list-header-row>
            <cds-structured-list-header-cell>
              Environment
            </cds-structured-list-header-cell>
            <cds-structured-list-header-cell>
              Region
            </cds-structured-list-header-cell>
            <cds-structured-list-header-cell>
              Purpose
            </cds-structured-list-header-cell>
          </cds-structured-list-header-row>
        </cds-structured-list-head>
        <cds-structured-list-body>
          ${selectionRows.map(
            (row, index) =>
              html` <cds-structured-list-row
                selection-value=${`structured-list-selection-${index}`}>
                <cds-structured-list-cell>
                  ${row.environment}
                </cds-structured-list-cell>
                <cds-structured-list-cell>
                  ${row.region}
                </cds-structured-list-cell>
                <cds-structured-list-cell>
                  ${row.purpose}
                </cds-structured-list-cell>
              </cds-structured-list-row>`
          )}
        </cds-structured-list-body>
      </cds-structured-list>
    `;
  },
};

export const Skeleton = {
  decorators: [(story) => html`<div style="width: 800px">${story()}</div>`],
  args: {
    rowCount: 5,
  },
  argTypes: {
    rowCount: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Specify the number of skeleton rows.',
    },
  },
  parameters: {
    controls: {
      include: ['rowCount'],
    },
  },
  render: ({ rowCount }) => html`
    <cds-structured-list>
      <cds-structured-list-head>
        <cds-structured-list-header-row>
          ${Array.from({ length: 3 }).map(
            () => html`
              <cds-structured-list-header-cell-skeleton>
              </cds-structured-list-header-cell-skeleton>
            `
          )}
        </cds-structured-list-header-row>
      </cds-structured-list-head>
      <cds-structured-list-body>
        ${Array.from({ length: rowCount }).map(
          () =>
            html`<cds-structured-list-row>
              <cds-structured-list-cell></cds-structured-list-cell>
              <cds-structured-list-cell></cds-structured-list-cell>
              <cds-structured-list-cell></cds-structured-list-cell>
            </cds-structured-list-row>`
        )}
      </cds-structured-list-body>
    </cds-structured-list>
  `,
};

const meta = {
  title: 'Components/Structured list',
};

export default meta;
