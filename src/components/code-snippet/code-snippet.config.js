'use stirct';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Code',
      notes: `
        Code snippets are small blocks of reusable code that can be inserted in a code file.

        The Code style is for larger, multi-line code snippets.
      `,
      context: {
        variant: 'code',
      },
    },
    {
      name: 'terminal',
      label: 'Terminal',
      notes: `
        Code snippets are small blocks of reusable code that can be inserted in a code file.

        The Terminal style is for single-line .
      `,
      context: {
        variant: 'terminal',
      },
    },
  ],
};
