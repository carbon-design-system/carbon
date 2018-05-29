'use strict';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Transactional Modal',
      notes: `
        Modals communicate information via a secondary window and allow the user to maintain the context of a particular task.
      `,
      context: {
        idSuffix: Math.random()
          .toString(36)
          .substr(2),
        hasFooter: true,
        classPrimaryButton: 'bx--btn--primary',
        classCloseButton: 'bx--btn--secondary',
      },
    },
    {
      name: 'nofooter',
      label: 'Passive Modal',
      notes: 'Passive Modals are modals without footers.',
      context: {
        idSuffix: Math.random()
          .toString(36)
          .substr(2),
        hasFooter: false,
        classPrimaryButton: 'bx--btn--primary',
        classCloseButton: 'bx--btn--secondary',
      },
    },
    {
      name: 'danger',
      label: 'Danger Modal',
      context: {
        idSuffix: Math.random()
          .toString(36)
          .substr(2),
        hasFooter: true,
        labelPrimaryButton: 'Danger',
        classModalSupplemental: 'bx--modal--danger',
        classPrimaryButton: 'bx--btn--danger--primary',
        classCloseButton: 'bx--btn--tertiary',
      },
    },
  ],
};
