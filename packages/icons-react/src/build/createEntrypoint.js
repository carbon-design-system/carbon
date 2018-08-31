'use strict';

const path = require('path');

function createEntrypoint(folder, components) {
  return {
    name: 'Icons',
    source: components.reduce((acc, { dest, name }) => {
      const modulePath = path.relative(folder, dest);
      return acc + `\nexport { default as ${name} } from './${modulePath}';`;
    }, ''),
    dest: path.join(folder, 'index.js'),
  };
}

module.exports = createEntrypoint;
