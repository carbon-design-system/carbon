'use stirct';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Default',
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
