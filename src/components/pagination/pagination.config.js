'use strict';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'V1',
      notes: `
        Pagination is used for splitting up content or data into several pages, with a control for navigating to the next or previous page.
      `,
    },
    {
      name: 'v2',
      label: 'V2',
      context: {
        version: 'v2',
      },
    },
  ],
};
