'use strict';

const tags = [
  {
    type: 'ibm',
    label: 'IBM',
  },
  {
    type: 'beta',
    label: 'Beta',
  },
  {
    type: 'third-party',
    label: 'Third-Party',
  },
  {
    type: 'local',
    label: 'Local',
  },
  {
    type: 'dedicated',
    label: 'Dedicated',
  },
  {
    type: 'custom',
    label: 'Custom',
  },
  {
    type: 'experimental',
    label: 'Experimental',
  },
  {
    type: 'community',
    label: 'Community',
  },
  {
    type: 'private',
    label: 'Private',
  },
];

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Tag',
      context: {
        tags,
      },
    },
  ],
};
