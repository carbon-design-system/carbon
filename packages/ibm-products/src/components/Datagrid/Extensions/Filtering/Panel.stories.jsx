/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import { Datagrid } from '../../index';
import { ARG_TYPES } from '../../utils/getArgTypes';
import { handleFilterTagLabelText } from '../../utils/handleFilterTagLabelText';
import { DocsPage } from './Filtering.docs-page';
import { action } from 'storybook/actions';
import styles from '../../_storybook-styles.scss?inline';
import { FilteringUsage } from '../../utils/FilteringUsage';
import { getDateFormat } from '../../utils/getDateFormat';

export default {
  title: 'Deprecated/Datagrid/Filtering/Panel',
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
  excludeStories: ['getFilterProps', 'getDateFormat', 'multiSelectProps'],
};

// This is to show off the View all button in checkboxes
const dummyCheckboxes = Array(25)
  .fill(null)
  .map((_, index) => ({
    id: `${index}`,
    labelText: `Dummy checkbox ${index + 1}`,
    value: 'dummy-checkbox',
    disabled: true,
  }));

const FilteringTemplateWrapper = ({ ...args }) => {
  return <FilteringUsage defaultGridProps={{ ...args }} />;
};

export const multiSelectProps = {
  // items: ['relationship', 'complicated', 'single'],
  items: [
    { text: 'relationship', id: 'relationship' },
    { text: 'complicated', id: 'complicated' },
    { text: 'single', id: 'single' },
  ],
  id: 'carbon-multiselect-example',
  label: 'Status selection',
  titleText: 'Multiselect title',
  itemToString: (item) => (item ? item.text : ''),
  size: 'md',
  type: 'default',
  disabled: false,
  hideLabel: false,
  invalid: false,
  warn: false,
  open: false,
  clearSelectionDescription: 'Total items selected: ',
  clearSelectionText: 'To clear selection, press Delete or Backspace,',
};

export const getFilterProps = (id = 'id') => ({
  variation: 'panel',
  clearFiltersText: 'Clear filters',
  updateMethod: 'batch',
  primaryActionLabel: 'Apply',
  secondaryActionLabel: 'Cancel',
  panelIconDescription: `Open filters`,
  closeIconDescription: 'Close panel',
  align: 'bottom',
  sections: [
    {
      categoryTitle: 'Category title',
      hasAccordion: true,
      filters: [
        {
          filterLabel: 'Joined',
          filter: {
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
        },
        {
          filterLabel: 'Status',
          filter: {
            type: 'multiSelect',
            column: 'status',
            props: {
              MultiSelect: {
                ...multiSelectProps,
              },
            },
          },
        },
      ],
    },
    {
      categoryTitle: 'Category title',
      filters: [
        {
          filterLabel: 'Role',
          filter: {
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
                  id: `developer-${id}`,
                  labelText: 'Developer',
                  value: 'developer',
                },
                {
                  id: `designer-${id}`,
                  labelText: 'Designer',
                  value: 'designer',
                },
                {
                  id: `researcher-${id}`,
                  labelText: 'Researcher',
                  value: 'researcher',
                },
              ],
            },
          },
        },
        {
          filterLabel: 'Visits',
          filter: {
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
        },
        {
          filterLabel: 'Password strength',
          filter: {
            type: 'checkbox',
            column: 'passwordStrength',
            props: {
              FormGroup: {
                legendText: 'Password strength',
              },
              Checkbox: [
                {
                  id: `normal-${id}`,
                  labelText: 'Normal',
                  value: 'normal',
                },
                {
                  id: `minor-warning-${id}`,
                  labelText: 'Minor warning',
                  value: 'minor-warning',
                },
                {
                  id: `critical-${id}`,
                  labelText: 'Critical',
                  value: 'critical',
                },
              ],
            },
          },
        },
      ],
    },
  ],
  onPanelOpen: action('onPanelOpen'),
  onPanelClose: action('onPanelClose'),
  panelTitle: 'Filter',
  renderLabel: (key, value) => handleFilterTagLabelText(key, value),
  renderDateLabel: (start, end) => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    return `${startDateObj.toLocaleDateString()} - ${endDateObj.toLocaleDateString()}`;
  },
});

export const PanelBatch = FilteringTemplateWrapper.bind({});
PanelBatch.storyName = 'Filter panel with batch update';
PanelBatch.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  filterProps: ARG_TYPES.filterProps,
};
PanelBatch.args = {
  gridTitle: 'Data table title',
  gridDescription: 'Additional information if needed',
  useDenseHeader: false,
  emptyStateTitle: 'No filters match',
  emptyStateDescription:
    'Data was not found with the current filters applied. Change filters or clear filters to see other results.',
  filterProps: getFilterProps(),
};

export const PanelInstant = FilteringTemplateWrapper.bind({});
PanelInstant.storyName = 'Filter panel with instant update';
PanelInstant.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  filterProps: ARG_TYPES.filterProps,
};
PanelInstant.args = {
  gridTitle: 'Data table title',
  gridDescription: 'Additional information if needed',
  useDenseHeader: false,
  emptyStateTitle: 'No filters match',
  emptyStateDescription:
    'Data was not found with the current filters applied. Change filters or clear filters to see other results.',
  filterProps: {
    variation: 'panel',
    updateMethod: 'instant',
    primaryActionLabel: 'Apply',
    secondaryActionLabel: 'Cancel',
    panelIconDescription: `Open filters`,
    closeIconDescription: 'Close panel',
    align: 'bottom',
    sections: [
      {
        categoryTitle: 'Category title',
        hasAccordion: true,
        filters: [
          {
            filterLabel: 'Joined',
            filter: {
              type: 'date',
              column: 'joined',
              props: {
                DatePicker: {
                  datePickerType: 'range',
                },
                DatePickerInput: {
                  start: {
                    id: 'date-picker-input-id-start',
                    placeholder: 'mm/dd/yyyy',
                    labelText: 'Joined start date',
                  },
                  end: {
                    id: 'date-picker-input-id-end',
                    placeholder: 'mm/dd/yyyy',
                    labelText: 'Joined end date',
                  },
                },
              },
            },
          },
          {
            filterLabel: 'Status',
            filter: {
              type: 'multiSelect',
              column: 'status',
              props: {
                MultiSelect: {
                  ...multiSelectProps,
                },
              },
            },
          },
        ],
      },
      {
        categoryTitle: 'Category title',
        filters: [
          {
            filterLabel: 'Role',
            filter: {
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
          },
          {
            filterLabel: 'Visits',
            filter: {
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
          },
          {
            filterLabel: 'Password strength',
            filter: {
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
          },
        ],
      },
    ],
    onPanelOpen: action('onPanelOpen'),
    onPanelClose: action('onPanelClose'),
    panelTitle: 'Filter',
    renderLabel: (key, value) => handleFilterTagLabelText(key, value),
  },
};

export const PanelWithInitialFilters = FilteringTemplateWrapper.bind({});
PanelWithInitialFilters.storyName = 'Filter panel with initial filters';
PanelWithInitialFilters.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  filterProps: ARG_TYPES.filterProps,
};
PanelWithInitialFilters.args = {
  initialState: {
    filters: [
      {
        id: 'role',
        type: 'radio',
        value: 'developer',
      },
      {
        id: 'passwordStrength',
        type: 'checkbox',
        value: [
          {
            id: 'normal',
            labelText: 'Normal',
            value: 'normal',
            selected: false,
          },
          {
            id: 'minor-warning',
            labelText: 'Minor warning',
            value: 'minor-warning',
            selected: true,
          },
          {
            id: 'critical',
            labelText: 'Critical',
            value: 'critical',
            selected: false,
          },
        ],
      },
    ],
  },
  gridTitle: 'Data table title',
  gridDescription: 'Additional information if needed',
  useDenseHeader: false,
  emptyStateTitle: 'No filters match',
  emptyStateDescription:
    'Data was not found with the current filters applied. Change filters or clear filters to see other results.',
  filterProps: {
    variation: 'panel',
    updateMethod: 'batch',
    primaryActionLabel: 'Apply',
    secondaryActionLabel: 'Cancel',
    panelIconDescription: `Open filters`,
    closeIconDescription: 'Close panel',
    align: 'bottom',
    sections: [
      {
        categoryTitle: 'Category title',
        hasAccordion: true,
        filters: [
          {
            filterLabel: 'Joined',
            filter: {
              type: 'date',
              column: 'joined',
              props: {
                DatePicker: {
                  datePickerType: 'range',
                },
                DatePickerInput: {
                  start: {
                    id: 'date-picker-input-id-start',
                    placeholder: 'mm/dd/yyyy',
                    labelText: 'Joined start date',
                  },
                  end: {
                    id: 'date-picker-input-id-end',
                    placeholder: 'mm/dd/yyyy',
                    labelText: 'Joined end date',
                  },
                },
              },
            },
          },
          {
            filterLabel: 'Status',
            filter: {
              type: 'multiSelect',
              column: 'status',
              props: {
                MultiSelect: {
                  ...multiSelectProps,
                },
              },
            },
          },
        ],
      },
      {
        categoryTitle: 'Category title',
        filters: [
          {
            filterLabel: 'Role',
            filter: {
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
          },
          {
            filterLabel: 'Visits',
            filter: {
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
          },
          {
            filterLabel: 'Password strength',
            filter: {
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
          },
        ],
      },
    ],
    onPanelOpen: action('onPanelOpen'),
    onPanelClose: action('onPanelClose'),
    panelTitle: 'Filter',
    renderLabel: (key, value) => handleFilterTagLabelText(key, value),
  },
};

export const PanelOnlyAccordions = FilteringTemplateWrapper.bind({});
PanelOnlyAccordions.storyName = 'Filter panel only accordions';
PanelOnlyAccordions.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  filterProps: ARG_TYPES.filterProps,
};
PanelOnlyAccordions.args = {
  gridTitle: 'Data table title',
  gridDescription: 'Additional information if needed',
  useDenseHeader: false,
  emptyStateTitle: 'No filters match',
  emptyStateDescription:
    'Data was not found with the current filters applied. Change filters or clear filters to see other results.',
  filterProps: {
    variation: 'panel',
    updateMethod: 'instant',
    primaryActionLabel: 'Apply',
    secondaryActionLabel: 'Cancel',
    panelIconDescription: `Open filters`,
    closeIconDescription: 'Close panel',
    align: 'bottom',
    sections: [
      {
        categoryTitle: 'Category title',
        hasAccordion: true,
        filters: [
          {
            filterLabel: 'Joined',
            filter: {
              type: 'date',
              column: 'joined',
              props: {
                DatePicker: {
                  datePickerType: 'range',
                },
                DatePickerInput: {
                  start: {
                    id: 'date-picker-input-id-start',
                    placeholder: 'mm/dd/yyyy',
                    labelText: 'Joined start date',
                  },
                  end: {
                    id: 'date-picker-input-id-end',
                    placeholder: 'mm/dd/yyyy',
                    labelText: 'Joined end date',
                  },
                },
              },
            },
          },
          {
            filterLabel: 'Status',
            filter: {
              type: 'multiSelect',
              column: 'status',
              props: {
                MultiSelect: {
                  ...multiSelectProps,
                },
              },
            },
          },
        ],
      },
      {
        categoryTitle: 'Category title',
        hasAccordion: true,
        filters: [
          {
            filterLabel: 'Role',
            filter: {
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
          },
          {
            filterLabel: 'Visits',
            filter: {
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
          },
          {
            filterLabel: 'Password strength',
            filter: {
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
          },
        ],
      },
    ],
    onPanelOpen: action('onPanelOpen'),
    onPanelClose: action('onPanelClose'),
    panelTitle: 'Filter',
    renderLabel: (key, value) => handleFilterTagLabelText(key, value),
  },
};

export const PanelNoAccordions = FilteringTemplateWrapper.bind({});
PanelNoAccordions.storyName = 'Filter panel no accordions';
PanelNoAccordions.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  filterProps: ARG_TYPES.filterProps,
};
PanelNoAccordions.args = {
  gridTitle: 'Data table title',
  gridDescription: 'Additional information if needed',
  useDenseHeader: false,
  emptyStateTitle: 'No filters match',
  emptyStateDescription:
    'Data was not found with the current filters applied. Change filters or clear filters to see other results.',
  filterProps: {
    variation: 'panel',
    updateMethod: 'instant',
    primaryActionLabel: 'Apply',
    secondaryActionLabel: 'Cancel',
    panelIconDescription: `Open filters`,
    closeIconDescription: 'Close panel',
    align: 'bottom',
    sections: [
      {
        categoryTitle: 'Category title',
        hasAccordion: false,
        filters: [
          {
            filterLabel: 'Joined',
            filter: {
              type: 'date',
              column: 'joined',
              props: {
                DatePicker: {
                  datePickerType: 'range',
                },
                DatePickerInput: {
                  start: {
                    id: 'date-picker-input-id-start',
                    placeholder: 'mm/dd/yyyy',
                    labelText: 'Joined start date',
                  },
                  end: {
                    id: 'date-picker-input-id-end',
                    placeholder: 'mm/dd/yyyy',
                    labelText: 'Joined end date',
                  },
                },
              },
            },
          },
          {
            filterLabel: 'Status',
            filter: {
              type: 'multiSelect',
              column: 'status',
              props: {
                MultiSelect: {
                  ...multiSelectProps,
                },
              },
            },
          },
        ],
      },
      {
        categoryTitle: 'Category title',
        hasAccordion: false,
        filters: [
          {
            filterLabel: 'Role',
            filter: {
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
          },
          {
            filterLabel: 'Visits',
            filter: {
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
          },
          {
            filterLabel: 'Password strength',
            filter: {
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
          },
        ],
      },
    ],
    onPanelOpen: action('onPanelOpen'),
    onPanelClose: action('onPanelClose'),
    panelTitle: 'Filter',
    renderLabel: (key, value) => handleFilterTagLabelText(key, value),
  },
};

export const PanelNoData = FilteringTemplateWrapper.bind({});
PanelNoData.storyName = 'Filter panel no data (disabled)';
PanelNoData.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  filterProps: ARG_TYPES.filterProps,
};
PanelNoData.args = {
  data: [],
  gridTitle: 'Data table title',
  gridDescription: 'Additional information if needed',
  useDenseHeader: false,
  emptyStateTitle: 'No data',
  emptyStateDescription: 'There is no data to show 🤠',
  filterProps: {
    variation: 'panel',
    updateMethod: 'instant',
    primaryActionLabel: 'Apply',
    secondaryActionLabel: 'Cancel',
    panelIconDescription: `Open filters`,
    closeIconDescription: 'Close panel',
    align: 'bottom',
    sections: [
      {
        categoryTitle: 'Category title',
        hasAccordion: true,
        filters: [
          {
            filterLabel: 'Joined',
            filter: {
              type: 'date',
              column: 'joined',
              props: {
                DatePicker: {
                  datePickerType: 'range',
                },
                DatePickerInput: {
                  start: {
                    id: 'date-picker-input-id-start',
                    placeholder: 'mm/dd/yyyy',
                    labelText: 'Joined start date',
                  },
                  end: {
                    id: 'date-picker-input-id-end',
                    placeholder: 'mm/dd/yyyy',
                    labelText: 'Joined end date',
                  },
                },
              },
            },
          },
          {
            filterLabel: 'Status',
            filter: {
              type: 'multiSelect',
              column: 'status',
              props: {
                MultiSelect: {
                  ...multiSelectProps,
                },
              },
            },
          },
        ],
      },
      {
        categoryTitle: 'Category title',
        hasAccordion: true,
        filters: [
          {
            filterLabel: 'Role',
            filter: {
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
          },
          {
            filterLabel: 'Visits',
            filter: {
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
          },
          {
            filterLabel: 'Password strength',
            filter: {
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
          },
        ],
      },
    ],
    onPanelOpen: action('onPanelOpen'),
    onPanelClose: action('onPanelClose'),
    panelTitle: 'Filter',
    renderLabel: (key, value) => handleFilterTagLabelText(key, value),
  },
};

export const PanelManyCheckboxes = FilteringTemplateWrapper.bind({});
PanelManyCheckboxes.storyName = 'Filter panel with many checkboxes';
PanelManyCheckboxes.argTypes = {
  gridTitle: ARG_TYPES.gridTitle,
  gridDescription: ARG_TYPES.gridDescription,
  useDenseHeader: ARG_TYPES.useDenseHeader,
  filterProps: ARG_TYPES.filterProps,
};
PanelManyCheckboxes.args = {
  gridTitle: 'Data table title',
  gridDescription: 'Additional information if needed',
  useDenseHeader: false,
  emptyStateTitle: 'No filters match',
  emptyStateDescription:
    'Data was not found with the current filters applied. Change filters or clear filters to see other results.',
  filterProps: {
    variation: 'panel',
    updateMethod: 'instant',
    primaryActionLabel: 'Apply',
    secondaryActionLabel: 'Cancel',
    panelIconDescription: `Open filters`,
    closeIconDescription: 'Close panel',
    align: 'bottom',
    sections: [
      {
        categoryTitle: 'Category title',
        hasAccordion: true,
        filters: [
          {
            filterLabel: 'Joined',
            filter: {
              type: 'date',
              column: 'joined',
              props: {
                DatePicker: {
                  datePickerType: 'range',
                },
                DatePickerInput: {
                  start: {
                    id: 'date-picker-input-id-start',
                    placeholder: 'mm/dd/yyyy',
                    labelText: 'Joined start date',
                  },
                  end: {
                    id: 'date-picker-input-id-end',
                    placeholder: 'mm/dd/yyyy',
                    labelText: 'Joined end date',
                  },
                },
              },
            },
          },
          {
            filterLabel: 'Status',
            filter: {
              type: 'multiSelect',
              column: 'status',
              props: {
                MultiSelect: {
                  ...multiSelectProps,
                },
              },
            },
          },
        ],
      },
      {
        categoryTitle: 'Category title',
        filters: [
          {
            filterLabel: 'Role',
            filter: {
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
          },
          {
            filterLabel: 'Visits',
            filter: {
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
          },
          {
            filterLabel: 'Password strength',
            filter: {
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
                  ...dummyCheckboxes,
                ],
              },
            },
          },
        ],
      },
    ],
    onPanelOpen: action('onPanelOpen'),
    onPanelClose: action('onPanelClose'),
    panelTitle: 'Filter',
    renderLabel: (key, value) => handleFilterTagLabelText(key, value),
  },
};
