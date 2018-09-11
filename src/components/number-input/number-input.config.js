'use strict';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Number Input',
      notes: `
        Number inputs are similar to text fields, but contain controls used to increase or decrease an incremental value.
        The Number Input component can be passed a starting value, a min, a max, and the step.
      `,
      context: {
        tooltipId: `__carbon-tooltip_${Math.random()
          .toString(36)
          .substr(2)}`,
      },
    },
    {
      name: 'light',
      label: 'Number Input (Light)',
      context: {
        light: true,
        tooltipId: `__carbon-tooltip_${Math.random()
          .toString(36)
          .substr(2)}`,
      },
    },
  ],
};
