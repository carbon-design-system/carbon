'use strict';

const { prefix } = require('../../globals/js/settings');
const { componentsX } = require('../../globals/js/feature-flags');

const menuItems = [
  {
    label: 'Stop app',
    primaryFocus: true,
  },
  {
    label: 'Restart app',
  },
  {
    label: 'Rename app',
  },
  {
    label: 'Edit routes and access, use title when',
  },
  {
    label: 'Delete app',
    danger: true,
  },
];

const batchActions = [
  {
    label: 'Ghost',
    icon: () => (componentsX ? 'carbon-icon-add-filled' : 'carbon-icon-add-solid'),
  },
  {
    label: 'Ghost',
    icon: () => (componentsX ? 'carbon-icon-add-filled' : 'carbon-icon-add-solid'),
  },
  {
    label: 'Ghost',
    icon: () => (componentsX ? 'carbon-icon-add-filled' : 'carbon-icon-add-solid'),
  },
];

const toolbarActions = [
  {
    icon: () => 'carbon-icon-download',
  },
  {
    icon: () => 'carbon-icon-edit',
  },
  {
    icon: () => 'carbon-icon-settings',
  },
];

const columns = [
  {
    name: 'select',
    title: 'Label name',
    checkbox: true,
    checkboxId: `${prefix}--checkbox-20`,
    checkboxName: 'checkbox-20',
    checkboxValue: 'green',
  },
  {
    name: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    name: 'protocol',
    title: 'Protocol',
    sortable: true,
  },
  {
    name: 'port',
    title: 'Port',
    sortable: true,
  },
  {
    name: 'rule',
    title: 'Rule',
    sortable: true,
  },
  {
    name: 'attachedGroups',
    title: 'Attached Groups',
    sortable: true,
  },
  {
    name: 'status',
    title: 'Status',
    sortable: true,
  },
  {
    name: 'menu',
    menu: true,
  },
];

const columnsExpandable = [
  {
    name: 'section',
    section: true,
  },
  {
    name: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    name: 'protocol',
    title: 'Protocol',
    sortable: true,
  },
  {
    name: 'port',
    title: 'Ports',
    sortable: true,
  },
  {
    name: 'rule',
    title: 'Rule',
    sortable: true,
  },
  {
    name: 'attachedGroups',
    title: 'Attached Groups',
    sortable: true,
  },
  {
    name: 'status',
    title: 'Status',
    sortable: true,
  },
];

const columnsEditable = columns.slice(1, 7).map((column, i) => ({
  ...column,
  editable: true,
  editing: i === 0,
}));

const columnsSmall = columns.slice(1, -1).map(column => ({
  ...column,
  sortable: false,
}));

const rows = [
  {
    id: 'row-id-13',
    select: {
      id: `${prefix}--checkbox-13`,
      name: 'checkbox-13',
      value: 'green',
      label: 'Label name',
    },
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active',
    menu: {
      label: 'Overflow menu description',
      items: menuItems,
      flip: true,
    },
  },
  {
    id: 'row-id-14',
    select: {
      id: `${prefix}--checkbox-14`,
      name: 'checkbox-14',
      value: 'green',
      label: 'Label name',
    },
    name: 'Load Balancer 5',
    protocol: 'HTTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active',
    menu: {
      label: 'Overflow menu description',
      items: menuItems,
      flip: true,
    },
  },
  {
    id: 'row-id-15',
    select: {
      id: `${prefix}--checkbox-15`,
      name: 'checkbox-15',
      value: 'green',
      label: 'Label name',
    },
    name: 'Load Balancer 5',
    protocol: 'HTTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active',
    menu: {
      label: 'Overflow menu description',
      items: menuItems,
      flip: true,
    },
  },
  {
    id: 'row-id-11',
    select: {
      id: `${prefix}--checkbox-11`,
      name: 'checkbox-11',
      value: 'green',
      label: 'Label name',
    },
    name: 'Load Balancer 5',
    protocol: 'HTTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active',
    menu: {
      label: 'Overflow menu description',
      items: menuItems,
      flip: true,
    },
  },
  {
    id: 'row-id-12',
    select: {
      id: `${prefix}--checkbox-12`,
      name: 'checkbox-12',
      value: 'green',
      label: 'Label name',
    },
    name: 'Load Balancer 5',
    protocol: 'HTTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active',
    menu: {
      label: 'Overflow menu description',
      items: menuItems,
      flip: true,
    },
  },
];

const rowsExpandable = [
  {
    sectionContent: `
      <h4>
        <strong>Harry Potter</strong>
      </h4>
      <p>Harry James Potter (b. 31 July, 1980) was a half-blood wizard, the only child and son of the late James and Lily
        Potter (née Evans), and one of the most famous and powerful wizards of modern times. In what proved to be a vain
        attempt to circumvent a prophecy that stated that a boy born at the end of July of 1980 could be able to defeat
        him, Lord Voldemort tried to murder him when he was a year and three months old. Voldemort murdered Harry's parents
        as they tried to protect him, shortly before attacking Harry.</p>
    `,
    section: true,
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active',
  },
  {
    sectionContent: `
      <h4>
        <strong>Harry Potter</strong>
      </h4>
      <p>Harry James Potter (b. 31 July, 1980) was a half-blood wizard, the only child and son of the late James and Lily
        Potter (née Evans), and one of the most famous and powerful wizards of modern times. In what proved to be a vain
        attempt to circumvent a prophecy that stated that a boy born at the end of July of 1980 could be able to defeat
        him, Lord Voldemort tried to murder him when he was a year and three months old. Voldemort murdered Harry's parents
        as they tried to protect him, shortly before attacking Harry.</p>
    `,
    section: true,
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: '80',
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active',
  },
];

const rowsEditable = [
  {
    id: 'row-id-15',
    name: 'Load Balancer 3',
    protocol: 'HTTP',
    port: '3000',
    rule: 'Round Robin',
    attachedGroups: 'Kevins VM Groups',
    status: 'Disabled',
  },
  {
    id: 'row-id-11',
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: '443',
    rule: 'Round Robin',
    attachedGroups: 'Maureens VM Groups',
    status: 'Starting',
  },
  {
    id: 'row-id-10',
    name: 'Load Balancer 2',
    protocol: 'HTTP',
    port: '80',
    rule: 'DNS delegation',
    attachedGroups: 'Andrews VM Groups',
    status: 'Active',
  },
].map((row, i) => ({
  ...row,
  editable: i === 0,
}));

module.exports = {
  label: 'Data Table V2',
  context: {
    prefix,
    overflowMenuIcon: () => (componentsX ? 'carbon-icon-overflow-menu-vertical' : 'carbon-icon-overflow-menu'),
    closeFilledIcon: () => (componentsX ? 'carbon-icon-close-filled' : 'carbon-icon-close-solid'),
  },
  variants: [
    {
      name: 'default',
      label: 'Data Table V2',
      notes: `
        Data Tables are used to represent a collection of resources, displaying a
        subset of their fields in columns, or headers.
      `,
      context: {
        title: 'Table title',
        batchActions,
        toolbarActions,
        columns,
        rows,
        selectedItemsCounterLabel: `
          <span data-items-selected>3</span> items selected
        `,
        searchInputId: 'search__input-2',
        searchLabelId: 'search-input-label-1',
        searchLabel: 'Search',
        clearSearchLabel: 'Clear search input',
        addNewLabel: 'Add new',
        cancelLabel: 'Cancel',
        sortLabel: 'Sort rows by this header in descending order',
        zebra: true,
        hasToolbar: true,
      },
    },
    {
      name: 'expandable',
      label: 'Expandable',
      context: {
        title: 'Table title',
        columns: columnsExpandable,
        rows: rowsExpandable,
        searchInputId: 'search__input-2',
        searchLabelId: 'search-input-label-1',
        searchLabel: 'Search',
        clearSearchLabel: 'Clear search input',
        hasToolbar: true,
      },
    },
    {
      name: 'editable',
      label: 'Inline Edit',
      context: {
        title: 'Table title',
        columns: columnsEditable,
        rows: rowsEditable,
        cancelLabel: 'Cancel',
        saveLabel: 'Save',
        sortLabel: 'Sort rows by this header in descending order',
        zebra: true,
      },
    },
    {
      name: 'small',
      label: 'Small',
      context: {
        small: true,
        columns: columnsSmall,
        rows,
      },
    },
    {
      name: 'with-pager',
      label: 'Pagination',
      context: {
        hasPager: true,
        title: 'Table title',
        batchActions,
        toolbarActions,
        columns,
        rows,
        selectedItemsCounterLabel: `
          <span data-items-selected>3</span> items selected
        `,
        searchInputId: 'search__input-2',
        searchLabelId: 'search-input-label-1',
        searchLabel: 'Search',
        clearSearchLabel: 'Clear search input',
        addNewLabel: 'Add new',
        cancelLabel: 'Cancel',
        sortLabel: 'Sort rows by this header in descending order',
        zebra: true,
        hasToolbar: true,
      },
    },
  ],
};
