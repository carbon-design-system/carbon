'use stirct';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Multi',
      notes: `
        Code snippets are small blocks of reusable code that can be inserted in a code file.
      `,
      context: {
        variant: 'multi',
      },
    },
    {
      name: 'single',
      label: 'Single',
      notes: `
        Code snippets are small blocks of reusable code that can be inserted in a code file.

        The single-line style is for e.g. terminal.
      `,
      context: {
        variant: 'single',
      },
    },
    {
      name: 'inline',
      label: 'Inline',
      preview: 'code-snippet--inline',
    },
    {
      name: 'inline-light',
      label: 'Inline light',
      context: {
        variant: 'light',
      },
      preview: 'code-snippet--inline',
    },
  ],
};
