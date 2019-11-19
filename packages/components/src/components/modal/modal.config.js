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
    hasBody: true,
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
      name: 'xs',
      label: 'Transactional Modal (XS)',
      context: {
        idSuffix: Math.random()
          .toString(36)
          .substr(2),
        hasFooter: true,
        classPrimaryButton: `${prefix}--btn--primary`,
        classCloseButton: `${prefix}--btn--secondary`,
        size: 'xs',
      },
    },
    {
      name: 'sm',
      label: 'Transactional Modal (Small)',
      context: {
        idSuffix: Math.random()
          .toString(36)
          .substr(2),
        hasFooter: true,
        classPrimaryButton: `${prefix}--btn--primary`,
        classCloseButton: `${prefix}--btn--secondary`,
        size: 'sm',
      },
    },
    {
      name: 'lg',
      label: 'Transactional Modal (Large)',
      context: {
        idSuffix: Math.random()
          .toString(36)
          .substr(2),
        hasFooter: true,
        classPrimaryButton: `${prefix}--btn--primary`,
        classCloseButton: `${prefix}--btn--secondary`,
        size: 'lg',
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
      name: 'nofooter-xs',
      label: 'Passive Modal (XS)',
      context: {
        idSuffix: Math.random()
          .toString(36)
          .substr(2),
        hasFooter: false,
        classPrimaryButton: `${prefix}--btn--primary`,
        classCloseButton: `${prefix}--btn--secondary`,
        size: 'xs',
      },
    },
    {
      name: 'nofooter-sm',
      label: 'Passive Modal (Small)',
      context: {
        idSuffix: Math.random()
          .toString(36)
          .substr(2),
        hasFooter: false,
        classPrimaryButton: `${prefix}--btn--primary`,
        classCloseButton: `${prefix}--btn--secondary`,
        size: 'sm',
      },
    },
    {
      name: 'nofooter-lg',
      label: 'Passive Modal (Large)',
      context: {
        idSuffix: Math.random()
          .toString(36)
          .substr(2),
        hasFooter: false,
        classPrimaryButton: `${prefix}--btn--primary`,
        classCloseButton: `${prefix}--btn--secondary`,
        size: 'lg',
      },
    },
    {
      name: 'titleonly-xs',
      label: 'Title Only Modal (XS)',
      context: {
        idSuffix: Math.random()
          .toString(36)
          .substr(2),
        hasBody: false,
        hasFooter: true,
        classPrimaryButton: `${prefix}--btn--primary`,
        classCloseButton: `${prefix}--btn--secondary`,
        size: 'xs',
      },
    },
    {
      name: 'titleonly-sm',
      label: 'Title Only Modal (Small)',
      context: {
        idSuffix: Math.random()
          .toString(36)
          .substr(2),
        hasBody: false,
        hasFooter: true,
        classPrimaryButton: `${prefix}--btn--primary`,
        classCloseButton: `${prefix}--btn--secondary`,
        size: 'sm',
      },
    },
    {
      name: 'titleonly-nofooter-xs',
      label: 'Title Only Passive Modal (XS)',
      context: {
        idSuffix: Math.random()
          .toString(36)
          .substr(2),
        hasBody: false,
        hasFooter: false,
        classPrimaryButton: `${prefix}--btn--primary`,
        classCloseButton: `${prefix}--btn--secondary`,
        size: 'xs',
      },
    },
    {
      name: 'titleonly-nofooter-sm',
      label: 'Title Only Passive Modal (Small)',
      context: {
        idSuffix: Math.random()
          .toString(36)
          .substr(2),
        hasBody: false,
        hasFooter: false,
        classPrimaryButton: `${prefix}--btn--primary`,
        classCloseButton: `${prefix}--btn--secondary`,
        size: 'sm',
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
    {
      name: 'scrolling',
      label: 'Modal with scrolling content',
      context: {
        idSuffix: Math.random()
          .toString(36)
          .substr(2),
        hasScrollingContent: true,
        hasFooter: true,
        classPrimaryButton: `${prefix}--btn--primary`,
        classCloseButton: `${prefix}--btn--secondary`,
      },
    },
  ],
};
