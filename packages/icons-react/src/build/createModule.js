'use strict';

const prettier = require('prettier');
const print = require('./print');

const prettierOptions = {
  parser: 'babylon',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
};

function createModule(name, size, viewBox, content) {
  const source = `import React from 'react';
import createIconComponent from '../__tools__/createIconComponent';

export default createIconComponent({
  name: '${name}',
  width: ${size},
  height: ${size},
  viewBox: '${viewBox}',
  content: (
    <>
      ${print(content)}
    </>
  ),
});
`;
  return prettier.format(source, prettierOptions);
}

module.exports = createModule;
