/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prefix } = require('../../globals/js/settings');

const tags = [
  {
    type: 'red',
    label: 'Red',
  },
  {
    type: 'magenta',
    label: 'Magenta',
  },
  {
    type: 'purple',
    label: 'Purple',
  },
  {
    type: 'blue',
    label: 'Blue',
  },
  {
    type: 'cyan',
    label: 'Cyan',
  },
  {
    type: 'teal',
    label: 'Teal',
  },
  {
    type: 'green',
    label: 'Green',
  },
  {
    type: 'gray',
    label: 'Gray',
  },
  {
    type: 'cool-gray',
    label: 'Cool-Gray',
  },
  {
    type: 'warm-gray',
    label: 'Warm-Gray',
  },
];

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Tag',
      context: {
        tags,
      },
    },
    {
      name: 'filter',
      label: 'Tag (filter)',
      context: {
        filter: true,
      },
    },
  ],
};
