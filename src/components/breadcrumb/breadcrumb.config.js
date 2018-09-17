'use strict';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Breadcrumb',
      notes:
        'Breadcrumb enables users to quickly see their location within a path of navigation and move up to a parent level if desired. If there are more than three levels, the home level and the last two levels are visible, with all middle levels being collapsed into ellipses and accessible from a dropdown.',
      context: {
        items: [
          {
            label: 'Breadcrumb 1',
          },
          {
            label: 'Breadcrumb 2',
          },
          {
            label: 'Breadcrumb 3',
          },
        ],
      },
    },
  ],
};
