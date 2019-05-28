/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prefix } = require('../../globals/js/settings');

module.exports = {
  default: 'primary',
  context: {
    prefix,
  },
  variants: [
    {
      name: 'primary',
      label: 'Primary Buttons',
      notes:
        'Primary buttons should be used for the principle call to action on the page.',
      context: {
        variant: 'primary',
        hasIconOnly: true,
      },
    },
    {
      name: 'primary--field',
      label: 'Primary Buttons (Field)',
      notes: `
        "Field" buttons are used in forms, when a button needs to line up horizontally with an input field. 
        Field buttons match the height of input elements that they sit next to.
      `,
      context: {
        variant: 'primary',
        field: true,
        hasIconOnly: true,
      },
    },
    {
      name: 'primary--small',
      label: 'Primary Buttons (Small)',
      notes: `
        Small buttons may be used when there is not enough space for a
        regular sized button. This issue is most found in tables. Small button should have three words
        or less.
      `,
      context: {
        variant: 'primary',
        small: true,
        hasIconOnly: true,
      },
    },
    {
      name: 'secondary',
      label: 'Secondary Buttons',
      notes:
        'Secondary buttons should be used for secondary actions on each page.',
      context: {
        variant: 'secondary',
        hasIconOnly: true,
      },
    },
    {
      name: 'secondary--field',
      label: 'Secondary Buttons (Field)',
      notes: `
        "Field" buttons are used in forms, when a button needs to line up horizontally with an input field. 
        Field buttons match the height of input elements that they sit next to.
      `,
      context: {
        variant: 'secondary',
        field: true,
        hasIconOnly: true,
      },
    },
    {
      name: 'secondary--small',
      label: 'Secondary Buttons (Small)',
      notes: `
        Small buttons may be used when there is not enough space for a
        regular sized button. This issue is most found in tables. Small button should have three words
        or less.
      `,
      context: {
        variant: 'secondary',
        small: true,
        hasIconOnly: true,
      },
    },
    {
      name: 'tertiary',
      label: 'Tertiary Buttons',
      notes:
        'Tertiary buttons should be used for tertiary actions on each page.',
      context: {
        variant: 'tertiary',
      },
    },
    {
      name: 'tertiary--field',
      label: 'Tertiary Buttons (Field)',
      notes: `
        "Field" buttons are used in forms, when a button needs to line up horizontally with an input field. 
        Field buttons match the height of input elements that they sit next to.
      `,
      context: {
        variant: 'tertiary',
        field: true,
        hasIconOnly: true,
      },
    },
    {
      name: 'tertiary--small',
      label: 'Tertiary Buttons (Small)',
      notes: `
        Small buttons may be used when there is not enough space for a
        regular sized button. This issue is most found in tables. Small button should have three words
        or less.
      `,
      context: {
        variant: 'tertiary',
        small: true,
      },
    },
    {
      name: 'danger',
      label: 'Danger Buttons',
      notes:
        'Danger buttons should be used for a negative action (such as Delete) on the page.',
      context: {
        variant: 'danger',
        danger: true,
      },
    },
    {
      name: 'danger--field',
      label: 'Danger Buttons (Field)',
      notes: `
        "Field" buttons are used in forms, when a button needs to line up horizontally with an input field. 
        Field buttons match the height of input elements that they sit next to.
      `,
      context: {
        variant: 'danger',
        field: true,
        hasIconOnly: true,
      },
    },
    {
      name: 'danger--small',
      label: 'Danger Buttons (Small)',
      notes: `
        Small buttons may be used when there is not enough space for a
        regular sized button. This issue is most found in tables. Small button should have three words
        or less.
      `,
      context: {
        variant: 'danger',
        danger: true,
        small: true,
      },
    },
    {
      name: 'ghost',
      label: 'Ghost Buttons',
      context: {
        variant: 'ghost',
      },
    },
    {
      name: 'ghost--field',
      label: 'Ghost Buttons (Field)',
      notes: `
        "Field" buttons are used in forms, when a button needs to line up horizontally with an input field. 
        Field buttons match the height of input elements that they sit next to.
      `,
      context: {
        variant: 'ghost',
        field: true,
        hasIconOnly: true,
      },
    },
    {
      name: 'ghost--small',
      label: 'Ghost Buttons (Small)',
      notes: `
        Small buttons may be used when there is not enough space for a
        regular sized button. This issue is most found in tables. Small button should have three words
        or less.
      `,
      context: {
        variant: 'ghost',
        small: true,
      },
    },
  ],
};
