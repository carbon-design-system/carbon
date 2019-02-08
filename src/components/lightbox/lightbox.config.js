/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prefix } = require('../../globals/js/settings');
const { breakingChangesX } = require('../../globals/js/feature-flags');

module.exports = {
  hidden: true,
  meta: {
    removed: breakingChangesX,
  },
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Lightbox',
      context: {
        items: [
          {
            filmstripImageUrl: 'http://via.placeholder.com/256x144?text=/0',
            lightboxImageUrl: 'http://via.placeholder.com/1056x594?text=/0',
          },
          {
            filmstripImageUrl: 'http://via.placeholder.com/256x144?text=1',
            lightboxImageUrl: 'http://via.placeholder.com/1056x594?text=1',
          },
          {
            filmstripImageUrl: 'http://via.placeholder.com/256x144?text=2',
            lightboxImageUrl: 'http://via.placeholder.com/1056x594?text=2',
          },
          {
            filmstripImageUrl: 'http://via.placeholder.com/256x144?text=3',
            lightboxImageUrl: 'http://via.placeholder.com/1056x594?text=3',
          },
          {
            filmstripImageUrl: 'http://via.placeholder.com/256x144?text=4',
            lightboxImageUrl: 'http://via.placeholder.com/1056x594?text=4',
          },
          {
            filmstripImageUrl: 'http://via.placeholder.com/256x144?text=5',
            lightboxImageUrl: 'http://via.placeholder.com/1056x594?text=5',
          },
        ],
      },
    },
  ],
};
