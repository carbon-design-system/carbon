/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StoryDocsPage } from '../../../../global/js/utils/StoryDocsPage';

export const DocsPage = () => (
  <StoryDocsPage
    omitCodedExample
    blocks={[
      {
        title: 'Filtering',
        description: `Table filtering allows a user to add or remove data items from a data table by selecting or clearing predefined attributes. Filters can help a user find something they're looking for, view available options within a certain set of criteria, and decide between many options. These guidelines are an extension of [Carbon's filter documentation](https://carbondesignsystem.com/patterns/filtering/).
        `,
      },
      {
        description: `Filtering results in a table is a different type of action from searching. While both actions can help the user narrow results down, searching is meant to help the user find a specific result, whereas filtering allows users to trim results according to its attributes.`,
      },
      {
        description: `Applied filters can affect both the data that is visible in the table and also data that might not be displayed in the columns available in the table. Filter options can be displayed in many form components, including dropdowns, text inputs, checkboxes, radio buttons, and date range pickers.`,
      },
      {
        description: `[Check out the Guidance here.](https://pages.github.ibm.com/carbon/ibm-products/components/datagrid/filtering/usage/)`,
      },
      {
        subTitle: 'Preparing your column headers',
      },
      {
        description:
          'To utilize filtering, you have to add some extra properties into your headers that are going to be filtered.',
      },
      {
        description: `Two things you need to do is:
- Specify a \`filter\` to use (unless it's text match which is default)
- (Optional) Render the component with the \`Cell\` property to display the right information. Use this if the data you send into the table isn't how you want to display it, for example like Dates. See the example for \`passwordStrength\` below.
        `,
      },
      {
        description: `For example; here we are specifying that the \`joined\` header column should be filtered using a \`filter: 'date'\`, and render the cell using it's value and converting it to string. (Since the value of joined is a date object, react isn't going to allow you to render it as jsx so we have to convert it to string)`,
        source: {
          code: `
{
  Header: 'Joined',
  accessor: 'joined',
  filter: 'date',
  Cell: ({ cell: { value } }) => <span>{value.toLocaleDateString()}</span>,
},
          `,
        },
      },
      {
        description: `The different types of filters are:
- text (default)
- date
- number
- checkbox
- radio
- dropdown
        `,
        source: {
          code: `
const columns = [
  {
    Header: 'Row Index',
    accessor: (row, i) => i,
    sticky: 'left',
    id: 'rowIndex', // id is required when accessor is a function.
  },
  {
    Header: 'First Name',
    accessor: 'firstName',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'Age',
    accessor: 'age',
    width: 50,
  },
  {
    Header: 'Visits',
    accessor: 'visits',
    filter: 'number',
    width: 60,
  },
  {
    Header: 'Status',
    accessor: 'status',
    filter: 'dropdown',
  },
  // Shows the date filter example
  {
    Header: 'Joined',
    accessor: 'joined',
    filter: 'date',
    Cell: ({ cell: { value } }) => <span>{value.toLocaleDateString()}</span>,
  },
  // Shows the checkbox filter example
  {
    Header: 'Password strength',
    accessor: 'passwordStrength',
    filter: 'checkbox',
    Cell: ({ cell: { value } }) => {
      const iconProps = {
        size: 'sm',
        theme: 'light',
        kind: value,
        iconDescription: value,
      };

      return (
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <StatusIcon {...iconProps} />
          {iconProps.iconDescription}
        </span>
      );
    },
  },
  // Shows the checkbox filter example
  {
    Header: 'Role',
    accessor: 'role',
    filter: 'radio',
  },
];
          `,
        },
      },
      {
        subTitle: 'Store you data into state, this can also come from an API',
        source: {
          code: `
const [data] = useState([
  {
    activeSince: new Date('09/26/81'),
    age: 41,
    firstName: 'Joel',
    lastName: 'Miller',
    passwordStrength: 'normal',
    role: 'developer',
    visits: '81',
  },
  {
    activeSince: new Date('08/30/97'),
    age: 19,
    firstName: 'Ellie',
    lastName: 'N/A',
    passwordStrength: 'critical',
    role: 'designer',
    visits: '7',
  },
  {
    activeSince: new Date('01/26/03'),
    age: 39,
    firstName: 'Tommy',
    lastName: 'Miller',
    passwordStrength: 'minor-warning',
    role: 'researcher',
    visits: '25',
  },
]);
          `,
        },
      },
      {
        subTitle: 'Create your filters for flyout variant',
        description: `To add filters to the flyout, you have to pass in an array of filters. These filters will be converted to it's respective component. Each filters has 3 important props, \`type\`, \`column\`, \`props\`.
- \`type\`: the type of filter (this should be the same \`filter\` property in the headers)
- \`column\`: the column that it should be filtered on
- \`props\`: the props for the components needed to render the filter.

Please refer to all the available filters that you can use below.
        `,
        source: {
          code: `
const filters = [
  {
    type: 'date',
    column: 'joined',
    props: {
      DatePicker: {
        datePickerType: 'range',
        // Add any other Carbon DatePicker props here
      },
      DatePickerInput: {
        start: {
          id: 'date-picker-input-id-start',
          placeholder: 'mm/dd/yyyy',
          labelText: 'Joined start date',
          // Add any other Carbon DatePickerInput props here
        },
        end: {
          id: 'date-picker-input-id-end',
          placeholder: 'mm/dd/yyyy',
          labelText: 'Joined end date',
          // Add any other Carbon DatePickerInput props here
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
        // Add any other Carbon NumberInput props here
      },
    },
  },
  {
    type: 'checkbox',
    column: 'passwordStrength',
    props: {
      FormGroup: {
        legendText: 'Password strength',
        // Add any other Carbon FormGroup props here
      },
      Checkbox: [
        {
          id: 'normal',
          labelText: 'Normal',
          value: 'normal',
          // Add any other Carbon Checkbox props here
        },
        {
          id: 'minor-warning',
          labelText: 'Minor warning',
          value: 'minor-warning',
          // Add any other Carbon Checkbox props here
        },
        {
          id: 'critical',
          labelText: 'Critical',
          value: 'critical',
          // Add any other Carbon Checkbox props here
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
        // Add any other Carbon FormGroup props here
      },
      RadioButtonGroup: {
        orientation: 'vertical',
        legend: 'Role legend',
        name: 'role-radio-button-group',
        // Add any other Carbon RadioButtonGroup props here
      },
      RadioButton: [
        {
          id: 'developer',
          labelText: 'Developer',
          value: 'developer',
          // Add any other Carbon RadioButton props here
        },
        {
          id: 'designer',
          labelText: 'Designer',
          value: 'designer',
          // Add any other Carbon RadioButton props here
        },
        {
          id: 'researcher',
          labelText: 'Researcher',
          value: 'researcher',
          // Add any other Carbon RadioButton props here
        },
      ],
      DefaultRadioButton: {
        id: 'any__unique-id-for-any-radio-button',
        labelText: 'Any',
        value: 'Any',
        // Add any other Carbon RadioButton props here
      }
    },
  },
  {
    type: 'dropdown',
    column: 'status',
    props: {
      Dropdown: {
        id: 'marital-status-dropdown',
        ariaLabel: 'Marital status dropdown',
        items: ['relationship', 'complicated', 'single'],
        label: 'Marital status',
        titleText: 'Marital status',
        // Add any other Carbon Dropdown props here
      },
    },
  },
  {
    type: 'multiSelect',
    column: 'status',
    props: {
      MultiSelect: {
        items: [
          { text: 'relationship', id: 'relationship' },
          { text: 'complicated', id: 'complicated' },
          { text: 'single', id: 'single' },
        ],
        id: 'carbon-multiselect-example',
        label: 'Status selection',
        titleText: 'Multiselect title',
        itemToString: (item) => (item ? item.text : ''),
        // Add any other Carbon MultiSelect props here
      },
    },
  },
];
          `,
        },
      },
      {
        subTitle: 'Create your filters for panel variant',
        description: 'Filter panel coming soon.',
      },
      {
        subTitle: 'Customizing the filter tag labels',
        description:
          'You can customize the rendering of the filter tag labels by supplying the `renderLabel` property to your `filterProps` as seen below. Otherwise it will default to `key: value`.',
        source: {
          code: `
filterProps: {
  ...otherFilterProps,
  renderLabel: (key, value) => myCustomTagLabelFormatter(key, value),
},
          `,
        },
      },
      {
        subTitle: 'Putting it all together',
        source: {
          code: `
import { Datagrid, useDatagrid, useFiltering } from '@carbon/ibm-products';

const App = () => {
  const columns = [...];
  const [data] = useState([...]);
  const filters = [...];


  const datagridState = useDatagrid(
    {
      columns,
      data,
      filterProps: {
        variation: 'flyout', // default
        updateMethod: 'batch', // default
        primaryActionLabel: 'Apply', // default
        secondaryActionLabel: 'Cancel', // default
        flyoutIconDescription: 'Open filters', // default
        shouldClickOutsideToClose: false, // default
        filters,
      },
      DatagridActions,
      batchActions: true,
      toolbarBatchActions: getBatchActions(),
    },
    useFiltering
  );

  return <Datagrid datagridState={datagridState} />;
};
          `,
        },
      },
      {
        subTitle: `\`filterProps\` types`,
        source: {
          language: 'json',
          code: `
filterProps: {
  /** The variation of filtering */
  variation: 'flyout'|'panel',
  /** The update method in which to filter, instant automatically
      applies the filters, batch the user has to click apply */
  updateMethod: 'batch'|'instant',
  /** Text for primary action button, default is 'Apply' */
  primaryActionLabel: string,
  /** Text for secondary action button, default is 'Cancel' */
  secondaryActionLabel: string,
  /** Text for flyout icon description */
  flyoutIconDescription: string,
  /** Array of objects to render filters in flyout */
  filters: object[]
  /** Applies custom formatting to filter tags */
  renderLabel: Function
}
          `,
        },
      },
      {
        subTitle: `onApply method`,
        source: {
          language: 'jsx',
          code: `
/*
  This method is called when the user applies filters, if you want to do something after filters
  are applied here we pass in the filtersState. Inside the filtersState you can find the state of
  the filters in the ui, and you can find the array of appliedFilters.
*/

const datagridState = useDatagrid({
    columns,
    data,
    filterProps: {
      onApply: (filtersState) => console.log(filtersState),
    }
  });

  return <Datagrid datagridState={datagridState} />;
          `,
        },
      },
      {
        subTitle: `onClearFilters method`,
        source: {
          language: 'jsx',
          code: `
/*
  This method is called when the user clears filters from the filters summary.
*/

const datagridState = useDatagrid({
    columns,
    data,
    filterProps: {
      onClearFilters: () => console.log('callback to be run after clearing all filters'),
    }
  });

  return <Datagrid datagridState={datagridState} />;
          `,
        },
      },
    ]}
  />
);
