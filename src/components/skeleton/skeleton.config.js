'use strict';

const { prefix } = require('../../globals/js/settings');

const tabItems = [
  {},
  {},
  {
    selected: true,
  },
];

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Skeleton',
      context: {
        breadCrumbItems: new Array(3),
        progressIndicatorSteps: new Array(4),
        tabItems,
      },
    },
  ],
};
