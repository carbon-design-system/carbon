'use strict';

const { prefix } = require('../../globals/js/settings');
const featureFlags = require('../../globals/js/feature-flags');

const filterOptions = [
  {
    id: 'filter-option-1',
    value: 'filter-option-1',
    label: 'Filter option 1',
  },
  {
    id: 'filter-option-2',
    value: 'filter-option-2',
    label: 'Filter option 2',
  },
  {
    id: 'filter-option-3',
    value: 'filter-option-3',
    label: 'Filter option 3',
  },
];

const rowHeightOptions = [
  {
    id: 'short-rows',
    value: 'short',
    label: 'Short',
    selected: true,
  },
  {
    id: 'tall-rows',
    value: 'tall',
    label: 'Tall',
  },
];

module.exports = {
  context: {
    featureFlags,
    prefix,
    overflowMenuIcon: () => featureFlags.componentsX ? 'carbon-icon-overflow-menu-vertical' : 'carbon-icon-overflow-menu',
    checkmarkIcon: () => (featureFlags.componentsX ? 'carbon-icon-checkmark' : 'carbon-icon-checkmark-classic'),
    overflowMenuIcon: () => (featureFlags.componentsX ? 'carbon-icon-overflow-menu-vertical' : 'carbon-icon-overflow-menu'),
  },
  variants: [
    {
      name: 'default',
      label: 'Toolbar',
      context: {
        filterOptions,
        rowHeightOptions,
      },
    },
  ],
};
