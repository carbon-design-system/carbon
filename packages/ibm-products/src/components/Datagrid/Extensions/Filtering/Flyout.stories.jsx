/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import { Datagrid } from '../../index';
import styles from '../../_storybook-styles.scss?inline';
import { DocsPage } from './Filtering.docs-page';
import { ARG_TYPES } from '../../utils/getArgTypes';
import { handleFilterTagLabelText } from '../../utils/handleFilterTagLabelText';
import { multiSelectProps } from './Panel.stories';
import { FilteringUsage } from '../../utils/FilteringUsage';
import { getDateFormat } from '../../utils/getDateFormat';
import { getFilterProps } from './Panel.stories';

export default {
  title: 'Deprecated/Datagrid/Filtering/Flyout',
  component: Datagrid,
  tags: ['autodocs'],
  parameters: {
    chromatic: { disableSnapshot: true },
    styles,
    docs: { page: DocsPage },
    layout: 'fullscreen',
  },
  argTypes: {
    featureFlags: {
      table: {
        disable: true,
      },
    },
  },
};

const FilteringTemplateWrapper = ({ ...args }) => {
  return <FilteringUsage defaultGridProps={{ ...args }} />;
};

const filters = [
  {
    type: 'date',
    column: 'joined',
    props: {
      DatePicker: {
        datePickerType: 'range',
        locale: navigator?.language || 'en',
        dateFormat: getDateFormat(navigator?.language || 'en'),
      },
      DatePickerInput: {
        start: {
          id: 'date-picker-input-id-start',
          placeholder: getDateFormat(navigator?.language || 'en', true),
          labelText: 'Joined start date',
        },
        end: {
          id: 'date-picker-input-id-end',
          placeholder: getDateFormat(navigator?.language || 'en', true),
          labelText: 'Joined end date',
        },
      },
    },
  },
  {
    type: 'number',
    column: 'visits',
    props: {
      NumberInput: {
        min: 0,
        id: 'visits-number-input',
        invalidText: 'A valid value is required',
        label: 'Visits',
        placeholder: 'Type a number amount of visits',
      },
    },
  },
  {
    type: 'checkbox',
    column: 'passwordStrength',
    props: {
      FormGroup: {
        legendText: 'Password strength',
      },
      Checkbox: [
        {
          id: 'normal',
          labelText: 'Normal',
          value: 'normal',
        },
        {
          id: 'minor-warning',
          labelText: 'Minor warning',
          value: 'minor-warning',
        },
        {
          id: 'critical',
          labelText: 'Critical',
          value: 'critical',
        },
      ],
    },
  },
  {
    type: 'radio',
    column: 'role',
    props: {
      FormGroup: {
        legendText: 'Role',
      },
      RadioButtonGroup: {
        orientation: 'vertical',
        legend: 'Role legend',
        name: 'role-radio-button-group',
      },
      RadioButton: [
        {
          id: 'developer',
          labelText: 'Developer',
          value: 'developer',
        },
        {
          id: 'designer',
          labelText: 'Designer',
          value: 'designer',
        },
        {
          id: 'researcher',
          labelText: 'Researcher',
          value: 'researcher',
        },
      ],
    },
  },
  {
    type: 'multiSelect',
    column: 'status',
    props: {
      MultiSelect: {
        ...multiSelectProps,
      },
    },
  },
];

export const FlyoutBatch = FilteringTemplateWrapper.bind({});
FlyoutBatch.storyName = 'Filter flyout with batch update';
FlyoutBatch.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  filterProps: ARG_TYPES.filterProps,
};
FlyoutBatch.args = {
  gridTitle: 'Data table title',
  gridDescription: 'Additional information if needed',
  useDenseHeader: false,
  emptyStateTitle: 'No filters match',
  emptyStateDescription:
    'Data was not found with the current filters applied. Change filters or clear filters to see other results.',
  filterProps: {
    clearFiltersText: 'Clear filters',
    variation: 'flyout',
    updateMethod: 'batch',
    primaryActionLabel: 'Apply',
    secondaryActionLabel: 'Cancel',
    flyoutIconDescription: 'Open filters',
    align: 'bottom',
    onFlyoutOpen: action('onFlyoutOpen'),
    onFlyoutClose: action('onFlyoutClose'),
    filters,
    renderLabel: (key, value) => handleFilterTagLabelText(key, value),
  },
};

export const FlyoutInstant = FilteringTemplateWrapper.bind({});
FlyoutInstant.storyName = 'Filter flyout with instant update';
FlyoutInstant.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  filterProps: ARG_TYPES.filterProps,
};
FlyoutInstant.args = {
  gridTitle: 'Data table title',
  gridDescription: 'Additional information if needed',
  useDenseHeader: false,
  emptyStateTitle: 'No filters match',
  emptyStateDescription:
    'Data was not found with the current filters applied. Change filters or clear filters to see other results.',
  filterProps: {
    variation: 'flyout',
    updateMethod: 'instant',
    primaryActionLabel: 'Apply',
    secondaryActionLabel: 'Cancel',
    flyoutIconDescription: 'Open filters',
    align: 'bottom',
    onFlyoutOpen: action('onFlyoutOpen'),
    onFlyoutClose: action('onFlyoutClose'),
    filters,
    renderLabel: (key, value) => handleFilterTagLabelText(key, value),
  },
};

export const FlyoutWithInitialFilters = FilteringTemplateWrapper.bind({});
FlyoutWithInitialFilters.storyName = 'Filter flyout with initial filters';
FlyoutWithInitialFilters.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  filterProps: ARG_TYPES.filterProps,
};
FlyoutWithInitialFilters.args = {
  initialState: {
    filters: [
      {
        id: 'role',
        type: 'radio',
        value: 'developer',
      },
    ],
  },
  gridTitle: 'Data table title',
  gridDescription: 'Additional information if needed',
  useDenseHeader: false,
  emptyStateTitle: 'No filters match',
  emptyStateDescription:
    'Data was not found with the current filters applied. Change filters or clear filters to see other results.',
  filterProps: getFilterProps(),
};
