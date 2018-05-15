'use stirct';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Default',
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
