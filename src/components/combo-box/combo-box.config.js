'use stirct';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Default',
    },
    {
      name: 'disabled',
      label: 'Disabled',
      context: {
        disabled: true,
      },
    },
  ],
};
