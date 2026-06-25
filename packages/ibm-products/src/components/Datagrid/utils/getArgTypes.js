/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const ARG_TYPES = {
  gridTitle: {
    name: 'gridTitle',
    control: 'text',
    description:
      'This sets the title text for the Datagrid component. _This value is set/passed inside of the `datagridState` object._',
    type: { name: 'string', required: false },
  },
  gridDescription: {
    name: 'gridDescription',
    control: 'text',
    description:
      'This sets the description text for the Datagrid component. _This value is set/passed inside of the `datagridState` object._',
    type: { name: 'string', required: false },
  },
  emptyStateTitle: {
    name: 'emptyStateTitle',
    control: 'text',
    description:
      'This sets the empty state title text for the Datagrid component. _This value is set/passed inside of the `datagridState` object._',
    type: { name: 'string', required: false },
  },
  emptyStateDescription: {
    name: 'emptyStateDescription',
    control: 'text',
    description:
      'This sets the empty state description text for the Datagrid component. _This value is set/passed inside of the `datagridState` object._',
    type: { name: 'string', required: false },
  },
  emptyStateSize: { control: 'select', options: ['sm', 'lg'] },
  isFetching: { control: 'radio', options: [true, false] },
  useDenseHeader: {
    control: { type: 'radio' },
    options: [true, false],
    description:
      'This sets the dense header option for the Datagrid component. _This value is set/passed inside of the `datagridState` object._',
  },
  rowSize: {
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    description:
      'This sets the height for each row of the Datagrid component. _This value is set/passed inside of the `datagridState` object._',
  },
  rowSizes: {
    control: 'object',
    description:
      'This array of objects specifies the different row size options that will render from the settings icon in the table actions. _This value is set/passed inside of the `datagridState` object._',
  },
  onRowSizeChange: {
    description:
      'Callback function that is called on row size changes. _This value is set/passed inside of the `datagridState` object._',
  },
  rowActions: {
    control: 'object',
    description:
      'This array of objects renders the action buttons for each row in the Datagrid. _This value is set/passed inside of the `datagridState` object._',
    action: 'Row action onClick',
  },
  batchActions: {
    control: { type: 'radio' },
    options: [true, false],
    description:
      'This will allow the Datagrid component to use batch actions. _This value is set/passed inside of the `datagridState` object._',
  },
  expandedContentHeight: {
    control: {
      type: 'number',
    },
    description:
      'This value controls the height of the expanded content area. _This value is set/passed inside of the `datagridState` object._',
  },
  expanderButtonTitleExpanded: {
    control: {
      type: 'text',
    },
    description:
      'This value controls the expander title/aria-label when expanded. _This value is set/passed inside of the `datagridState` object._',
  },
  expanderButtonTitleCollapsed: {
    control: {
      type: 'text',
    },
    description:
      'This value controls the expander title/aria-label when expanded. _This value is set/passed inside of the `datagridState` object._',
  },
  customizeColumnsProps: {
    control: 'object',
    description:
      'This is an object containing all of the props used with the column customization extension. _This value is set/passed inside of the `datagridState` object._',
  },
  filterProps: {
    name: 'Filter props',
    control: 'object',
    description:
      'This is an object for all the props passed into the filter flyout and filter panel',
  },
};
