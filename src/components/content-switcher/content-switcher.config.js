'use stirct';

module.exports = {
  variants: [
    {
      name: 'default',
    },
    {
      name: 'with-icon',
      label: 'With icon',
      context: {
        hasIcon: true,
      },
    },
  ],
};
