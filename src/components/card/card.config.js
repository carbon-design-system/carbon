'use stirct';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Card',
      notes: `
        Cards provide an at-a glance preview of the content they link to and frequently contain
        easily-consumable content.
      `,
    },
    {
      name: 'with-status',
      label: 'With status',
      notes: 'Card Status displays the current status of the application (RUNNING, NOT_RUNNING, STOPPED).',
      context: {
        hasStatus: true,
      },
    },
  ],
};
