'use stirct';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Default',
    },
    {
      name: 'inline',
      label: 'Inline',
      context: {
        inline: true,
      },
    },
  ],
};
