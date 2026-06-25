/* eslint-disable ssr-friendly/no-dom-globals-in-module-scope */
/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { handleFilterTagLabelText } from './handleFilterTagLabelText';
import { action } from 'storybook/actions';
import { getDateFormat } from './getDateFormat';

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
];

export const generateDummyCheckboxes = Array(25)
  .fill(null)
  .map((_, index) => ({
    id: `${index}`,
    labelText: `Dummy checkbox ${index + 1}`,
    value: 'dummy-checkbox',
    disabled: true,
  }));

export const flyoutFilterProps = {
  variation: 'flyout',
  updateMethod: 'instant',
  primaryActionLabel: 'Apply',
  secondaryActionLabel: 'Cancel',
  flyoutIconDescription: 'Open filters',
  onFlyoutOpen: action('onFlyoutOpen'),
  onFlyoutClose: action('onFlyoutClose'),
  filters,
  renderLabel: (key, value) => handleFilterTagLabelText(key, value),
};

export const filterProps = ({
  includeManyCheckboxes = false,
  dropdownOnChange = () => {},
} = {}) => {
  const checkboxList = [
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
    ...(includeManyCheckboxes ? generateDummyCheckboxes : []),
  ];
  return {
    autoHideFilters: includeManyCheckboxes ? false : true,
    variation: 'panel',
    panelIconDescription: 'Open filters',
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
              type: 'dropdown',
              column: 'status',
              props: {
                Dropdown: {
                  id: 'marital-status-dropdown',
                  ['aria-label']: 'Marital status dropdown',
                  items: ['relationship', 'complicated', 'single'],
                  label: 'Marital status',
                  titleText: 'Marital status',
                  onChange: dropdownOnChange,
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
                Checkbox: checkboxList,
              },
            },
          },
        ],
      },
    ],
    renderLabel: (key, value) => handleFilterTagLabelText(key, value),
    renderDateLabel: (start, end) => {
      const startDateObj = new Date(start);
      const endDateObj = new Date(end);
      return `${startDateObj.toLocaleDateString()} - ${endDateObj.toLocaleDateString()}`;
    },
  };
};
