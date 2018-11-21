'use strict';

const { prefix } = require('../../globals/js/settings');

module.exports = {
  meta: {
    useIframe: true,
  },
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Grid',
    },
  ],
};
