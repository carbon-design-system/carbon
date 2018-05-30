'use strict';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Interior Left Nav',
      notes: `
        Interior left navigation organizes the content structure and provides
        context to support user orientation. This pattern accommodates the
        breadth of content and tasks users expect to see.
      `,
    },
    {
      name: 'keep-open',
      label: 'Keep open',
      context: {
        keepOpen: true,
      },
    },
  ],
};
