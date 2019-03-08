/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prefix } = require('../../globals/js/settings');
const { componentsX } = require('../../globals/js/feature-flags');

module.exports = {
  context: {
    prefix,
    componentsX,
  },
  variants: [
    {
      name: 'default',
      label: 'File uploader',
    },
    {
      name: 'example upload states',
      label: 'File uploader with example upload states',
      context: {
        exampleUploadStates: true,
      },
    },
  ],
};
