'use stirct';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Default',
      notes: 'Forms are widely used to collect user input.',
    },
    {
      name: 'light',
      label: 'Light',
      context: {
        light: true,
      },
    },
  ],
};
