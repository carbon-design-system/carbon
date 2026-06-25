/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  ChartBubble,
  ChartColumnFloating,
  ChartVennDiagram,
} from '@carbon/react/icons';

export const inlineEditSelectItems = [
  {
    id: 'option-0',
    icon: (props) => <ChartColumnFloating size={16} {...props} />,
    text: 'Column Chart',
  },
  {
    id: 'option-1',
    icon: (props) => <ChartBubble size={16} {...props} />,
    text: 'Bubble Chart',
  },
  {
    id: 'option-2',
    icon: (props) => <ChartVennDiagram size={16} {...props} />,
    text: 'Venn Diagram',
  },
];

export const getInlineEditColumns = () => {
  return [
    {
      Header: 'Row Index',
      accessor: (row, i) => i,
      id: 'rowIndex', // id is required when accessor is a function.
    },
    {
      Header: 'Disabled column',
      accessor: 'disabledColumn',
      isDisabled: true,
    },
    {
      Header: 'First Name',
      accessor: 'firstName',
      inlineEdit: {
        type: 'text',
        // required for including validation, this is used to set the invalid prop internally
        validator: (n) => n.length > 40,
        // These props are passed to the Carbon component used for inline editing
        inputProps: {
          invalidText: 'Invalid text, character count must be less than 40',
        },
      },
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
      inlineEdit: {
        type: 'text',
        // required for including validation, this is used to set the invalid prop internally
        validator: (n) => n.length > 40,
        // These props are passed to the Carbon component used for inline editing
        inputProps: {
          invalidText: 'Invalid text, character count must be less than 40',
        },
      },
    },
    {
      Header: 'Age',
      accessor: 'age',
      width: 120,
      inlineEdit: {
        // required for including validation, this is used to set the invalid prop internally
        validator: (n) => n && n < 18,
        type: 'number',
        // These props are passed to the Carbon component used for inline editing
        inputProps: {
          invalidText: 'Invalid number, must be 18 or greater',
        },
      },
    },
    {
      Header: 'Visits',
      accessor: 'visits',
      width: 120,
      inlineEdit: {
        validator: (n) => n && n < 10,
        type: 'number',
        inputProps: {
          invalidText: 'Invalid number, must be 10 or greater',
        }, // These props are passed to the Carbon component used for inline editing
      },
    },
    {
      Header: 'Key',
      accessor: 'key',
      inlineEdit: {
        type: 'checkbox',
        inputProps: {
          onChange: (newDateObj, cell) => {
            console.log(newDateObj, cell);
          },
        },
      },
    },
    {
      Header: 'Active since',
      accessor: 'activeSince',
      inlineEdit: {
        type: 'date',
        inputProps: {
          // optionally pass props here to be passed through to Carbon's DatePicker component
          onChange: (newDateObj, cell) => {
            console.log(newDateObj, cell);
          },
          dateFormat: 'd/m/Y',
          // optionally pass props here to be passed through to Carbon's DatePickerInput component
          datePickerInputProps: {
            labelText: 'Change active since date',
          },
        },
      },
    },
    {
      Header: 'Chart type',
      accessor: 'chartType',
      inlineEdit: {
        type: 'selection',
        inputProps: {
          // These props are passed to the Carbon component used for inline editing
          items: inlineEditSelectItems,
          onChange: (item) => console.log(item),
        },
      },
    },
    {
      Header: 'Someone 2',
      accessor: 'someone2',
    },
    {
      Header: 'Someone 3',
      accessor: 'someone3',
    },
    {
      Header: 'Someone 4',
      accessor: 'someone4',
    },
    {
      Header: 'Someone 5',
      accessor: 'someone5',
    },
    {
      Header: 'Someone 6',
      accessor: 'someone6',
    },
    {
      Header: 'Someone 7',
      accessor: 'someone7',
    },
    {
      Header: 'Someone 8',
      accessor: 'someone8',
    },
    {
      Header: 'Someone 9',
      accessor: 'someone9',
    },
    {
      Header: 'Someone 10',
      accessor: 'someone10',
    },
  ];
};
