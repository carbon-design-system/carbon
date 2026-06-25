/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StoryDocsPage } from '../../../../global/js/utils/StoryDocsPage';
import {
  EditableCellUsageStory,
  InlineEditUsageStory,
} from './EditableCell.stories';

export const DocsPage = () => (
  <StoryDocsPage
    omitCodedExample
    blocks={[
      {
        description: `The \`Datagrid\` supports inline editing when used with the \`useEditableCell\` hook (previously named \`useInlineEdit\` in v1) and columns are provided the required configuration. The four data types supported are strings, numbers, dates, and
        selection (dropdown).`,
      },
      {
        description: `Below are example column configurations for the supported inline edit data types:

Default/string:
        `,
        source: {
          language: 'json',
          code: `
  {
    Header: 'First Name',
    accessor: 'firstName',
    inlineEdit: {
      type: 'text',
      // required for including validation, this is used to set the invalid prop internally
      validator: (n) => n.length >= 40,
      // These props are passed to the Carbon component used for inline editing, in this case the TextInput
      inputProps: {
        invalidText: 'Invalid text, character count must be less than 40',
      },
    },
  }
          `,
        },
      },
      {
        description: 'Number',
        source: {
          language: 'json',
          code: `
{
  Header: 'Age',
  accessor: 'age',
  width: 120,
  inlineEdit: {
    // required for including validation, this is used to set the invalid prop internally
    validator: (n) => n && n < 18,
    type: 'number',
    // These props are passed to the Carbon component used for inline editing, in this case NumberInput
    inputProps: {
      invalidText: 'Invalid number, must be 18 or greater',
    },
  },
},
          `,
        },
      },
      {
        description: 'Date',
        source: {
          language: 'json',
          code: `
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
      labelText: 'Change active since date',
      // optionally pass props here to be passed through to Carbon's DatePickerInput component
      datePickerInputProps: {
        labelText: 'Change active since date',
      },
    },
  },
},
          `,
        },
      },
      {
        description: 'Selection',
        source: {
          language: 'json',
          code: `
{
  Header: 'Chart type',
  accessor: 'chartType',
  inlineEdit: {
    type: 'selection',
    inputProps: {
      // These props are passed to the Carbon component used for inline editing
      items: [
        {
          id: 'option-0',
          icon: ChartColumnFloating16,
          text: 'Column Chart',
        },
        {
          id: 'option-1',
          icon: ChartBubble16,
          text: 'Bubble Chart',
        },
        {
          id: 'option-2',
          icon: ChartVennDiagram16,
          text: 'Venn Diagram',
        },
      ],
      onChange: (item) => {
        console.log(item);
      },
    },
  },
},
          `,
        },
      },
      {
        description: `Using the column structure outlined above, along with the use of the \`useEditableCell\` hook (previously named \`useInlineEdit\` in v1), the \`Datagrid\` will support inline editing. See example below:`,
        source: {
          code: `
import { Datagrid, useDatagrid, useEditableCell } from '@carbon/ibm-products';
const App = () => {
  const [data, setData] = useState(makeData(10));
  const columns = React.useMemo(() => getInlineEditColumns(), []); // These columns follow the inline edit column configuration detailed above
  const datagridState = useDatagrid(
    {
      columns,
      data,
      onDataUpdate: setData,
    },
    useEditableCell
  );
  return <Datagrid datagridState={datagridState} />;
};
          `,
        },
        story: EditableCellUsageStory,
      },
      {
        title: 'Using deprecated useInlineEdit hook',
        description: `At this time, it is possible to still use the deprecated \`useInlineEdit\` hook but requires setting a feature flag. See example below:`,
        source: {
          code: `
import {
  Datagrid,
  useDatagrid,
  useInlineEdit,
  pkg,
} from '@carbon/ibm-products';

const MyInlineEditDatagrid = () => {
  pkg.feature['Datagrid.useInlineEdit'] = true;
  const [data, setData] = useState(gridData);
  const datagridState = useDatagrid(
    {
      columns,
      data,
      onDataUpdate: setData,
    },
    useInlineEdit
  );
  return <Datagrid datagridState={datagridState} />;
};
          `,
        },
        story: InlineEditUsageStory,
      },
      {
        title: 'Opt out of editing at cell level',
        description: `In some cases you may want to disable editing per cell. This is possible by providing the following structure for the cell value within your row data:`,
        source: {
          code: `
{
  value: '\u2014', // Value displayed for static cell
  isStaticCell: true,
  columnId: 'lastName',
}
          `,
        },
      },
    ]}
  />
);
