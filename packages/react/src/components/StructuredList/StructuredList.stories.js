/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import mdx from './StructuredList.mdx';
import { WithLayer } from '../../../.storybook/templates/WithLayer';

import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListInput,
  StructuredListCell,
} from './';
import { CheckmarkFilled } from '@carbon/icons-react';
const prefix = 'cds';
import StructuredListSkeleton from './StructuredList.Skeleton';

const defaultArgs = {
  'aria-label': 'Service status',
  isCondensed: false,
  isFlush: false,
  selection: false,
};

const defaultArgTypes = {
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
  isFlush: {
    control: {
      type: 'boolean',
    },
  },
  selection: {
    table: { readonly: true },
  },
};

const defaultControls = ['aria-label', 'isCondensed', 'isFlush'];

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
  title: 'Components/StructuredList',
  component: StructuredListWrapper,
  subcomponents: {
    StructuredListHead,
    StructuredListBody,
    StructuredListRow,
    StructuredListInput,
    StructuredListCell,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return (
    <StructuredListWrapper {...args}>
      <StructuredListHead>
        <StructuredListRow head>
          <StructuredListCell head>Service</StructuredListCell>
          <StructuredListCell head>Status</StructuredListCell>
          <StructuredListCell head>Description</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        <StructuredListRow>
          <StructuredListCell noWrap>API gateway</StructuredListCell>
          <StructuredListCell>Online</StructuredListCell>
          <StructuredListCell>
            Routes and secures application traffic across environments.
          </StructuredListCell>
        </StructuredListRow>
        <StructuredListRow>
          <StructuredListCell noWrap>Data warehouse</StructuredListCell>
          <StructuredListCell>Maintenance</StructuredListCell>
          <StructuredListCell>
            Scheduled maintenance begins Friday at 22:00 UTC.
          </StructuredListCell>
        </StructuredListRow>
      </StructuredListBody>
    </StructuredListWrapper>
  );
};

Default.args = { ...defaultArgs };

Default.parameters = {
  controls: {
    include: defaultControls,
  },
};
Default.argTypes = { ...defaultArgTypes };
const structuredListBodyRowGenerator = (numRows) => {
  return selectionRows.slice(0, numRows).map((row, i) => (
    <StructuredListRow key={`row-${i}`} id={`row-${i}`}>
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
      <StructuredListCell>
        <CheckmarkFilled
          className={`${prefix}--structured-list-svg`}
          aria-label="select an option">
          <title>select an option</title>
        </CheckmarkFilled>
      </StructuredListCell>
    </StructuredListRow>
  ));
};

export const Selection = (args) => {
  return (
    <StructuredListWrapper {...args}>
      <StructuredListHead>
        <StructuredListRow head>
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

export const InitialSelection = (args) => {
  return (
    <StructuredListWrapper key={args.selectedInitialRow} {...args}>
      <StructuredListHead>
        <StructuredListRow head>
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

InitialSelection.args = {
  ...selectionArgs,
  selectedInitialRow: 'row-2',
};
InitialSelection.argTypes = {
  ...selectionArgTypes,
  selectedInitialRow: {
    control: {
      type: 'select',
    },
    options: ['row-0', 'row-1', 'row-2', 'row-3'],
  },
};
InitialSelection.parameters = {
  controls: {
    include: [...selectionControls, 'selectedInitialRow'],
  },
};

export const WithBackgroundLayer = (args) => {
  return (
    <WithLayer>
      <StructuredListWrapper {...args}>
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head>Environment</StructuredListCell>
            <StructuredListCell head>Region</StructuredListCell>
            <StructuredListCell head>Purpose</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          {structuredListBodyRowGenerator(4)}
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

export const Skeleton = (args) => <StructuredListSkeleton {...args} />;

Skeleton.decorators = [
  (story) => <div style={{ width: '800px' }}>{story()}</div>,
];

Skeleton.args = {
  rowCount: 5,
};

Skeleton.parameters = {
  controls: {
    include: ['rowCount'],
  },
};

Skeleton.argTypes = {
  rowCount: {
    control: {
      type: 'number',
      min: 1,
      max: 10,
    },
  },
};
