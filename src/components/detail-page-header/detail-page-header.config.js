'use stirct';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Detail Page Header',
    },
    {
      name: 'with-tabs',
      label: 'With tabs',
      context: {
        hasTabs: true,
      },
    },
  ],
};
