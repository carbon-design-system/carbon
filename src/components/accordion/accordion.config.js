'use strict';

const { prefix } = require('../../globals/js/settings');

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Accordion',
      notes: 'Accordions allow users to expand and collapse sections of content.',
      context: {
        sections: [
          {
            title: 'Section 1 title',
            paneId: 'pane1',
          },
          {
            title: 'Section 2 title',
            paneId: 'pane2',
          },
          {
            title: 'Section 3 title',
            paneId: 'pane3',
          },
          {
            title: 'Section 4 title',
            paneId: 'pane4',
          },
        ],
      },
    },
    {
      name: 'legacy',
      label: 'Legacy',
      context: {
        sections: [
          {
            title: 'Section 1 title',
          },
          {
            title: 'Section 2 title',
          },
          {
            title: 'Section 3 title',
          },
          {
            title: 'Section 4 title',
          },
        ],
      },
    },
  ],
};
