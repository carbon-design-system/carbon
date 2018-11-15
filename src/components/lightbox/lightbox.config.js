'use strict';

const { prefix } = require('../../globals/js/settings');

module.exports = {
  hidden: true,
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
