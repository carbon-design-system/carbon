'use strict';

const tabItems = [
  {},
  {},
  {
    selected: true,
  },
];

module.exports = {
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
