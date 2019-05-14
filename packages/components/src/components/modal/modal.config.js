/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prefix } = require('../../globals/js/settings');

module.exports = {
  context: {
    prefix,
  },
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
        classPrimaryButton: `${prefix}--btn--primary`,
        classCloseButton: `${prefix}--btn--secondary`,
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
        classPrimaryButton: `${prefix}--btn--primary`,
        classCloseButton: `${prefix}--btn--secondary`,
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
        classModalSupplemental: `${prefix}--modal--danger`,
        classPrimaryButton: `${prefix}--btn--danger`,
        classCloseButton: `${prefix}--btn--secondary`,
      },
    },
    {
      name: 'input',
      label: 'Input Modal',
      context: {
        idSuffix: Math.random()
          .toString(36)
          .substr(2),
        hasInput: true,
        hasFooter: true,
        classPrimaryButton: `${prefix}--btn--primary`,
        classCloseButton: `${prefix}--btn--secondary`,
      },
    },
  ],
};
