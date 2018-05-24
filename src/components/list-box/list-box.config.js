'use stirct';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'List Box',
    },
    {
      name: 'inline',
      label: 'Inline',
      context: {
        inline: true,
      },
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
