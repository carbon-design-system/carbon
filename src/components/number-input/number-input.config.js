'use stirct';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Default',
      notes: `
        Number inputs are similar to text fields, but contain controls used to increase or decrease an incremental value. The Number Input component can be passed a starting value, a min, a max, and the step.
      `,
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
