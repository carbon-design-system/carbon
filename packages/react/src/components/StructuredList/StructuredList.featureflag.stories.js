/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { WithLayer } from '../../../.storybook/templates/WithLayer';
import { useFeatureFlag } from '../FeatureFlags';

import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListInput,
  StructuredListCell,
} from './';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

const selectionArgs = {
  'aria-label': 'Deployment environments',
  isCondensed: false,
  selection: true,
};

const selectionArgTypes = {
  'aria-label': {
    control: {
      type: 'text',
    },
  },
  isCondensed: {
    control: {
      type: 'boolean',
    },
  },
  selection: {
    table: { readonly: true },
  },
};

const selectionControls = ['aria-label', 'isCondensed'];

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

export default {
  title: 'Components/StructuredList/Feature Flag',
  component: StructuredListWrapper,
  subcomponents: {
    StructuredListHead,
    StructuredListBody,
    StructuredListRow,
    StructuredListInput,
    StructuredListCell,
  },
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

const structuredListBodyRowGenerator = (numRows) => {
  return selectionRows.slice(0, numRows).map((row, i) => (
    <StructuredListRow key={`row-${i}`} selection>
      <StructuredListCell>{row.environment}</StructuredListCell>
      <StructuredListCell>{row.region}</StructuredListCell>
      <StructuredListCell>{row.purpose}</StructuredListCell>
      <StructuredListInput
        id={`row-${i}`}
        value={`row-${i}`}
        title={`row-${i}`}
        name="row-0"
        aria-label={`row-${i}`}
      />
    </StructuredListRow>
  ));
};

export const Selection = (args) => {
  return (
    <StructuredListWrapper {...args}>
      <StructuredListHead>
        <StructuredListRow head selection>
          <StructuredListCell head>Environment</StructuredListCell>
          <StructuredListCell head>Region</StructuredListCell>
          <StructuredListCell head>Purpose</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        {structuredListBodyRowGenerator(4)}
      </StructuredListBody>
    </StructuredListWrapper>
  );
};

Selection.args = { ...selectionArgs };
Selection.argTypes = { ...selectionArgTypes };
Selection.parameters = {
  controls: {
    include: selectionControls,
  },
};

export const WithBackgroundLayer = (args) => {
  const v12StructuredRadioIcons = useFeatureFlag(
    'enable-v12-structured-list-visible-icons'
  );
  return (
    <WithLayer>
      <StructuredListWrapper {...args}>
        <StructuredListHead>
          <StructuredListRow head>
            {v12StructuredRadioIcons && (
              <StructuredListCell head></StructuredListCell>
            )}
            <StructuredListCell head>Environment</StructuredListCell>
            <StructuredListCell head>Region</StructuredListCell>
            <StructuredListCell head>Purpose</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          {structuredListBodyRowGenerator(4, v12StructuredRadioIcons)}
        </StructuredListBody>
      </StructuredListWrapper>
    </WithLayer>
  );
};

WithBackgroundLayer.args = { ...selectionArgs };
WithBackgroundLayer.argTypes = { ...selectionArgTypes };
WithBackgroundLayer.parameters = {
  controls: {
    include: selectionControls,
  },
};
