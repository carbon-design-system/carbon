'use strict';

const prettier = require('prettier');

const prettierOptions = {
  parser: 'babylon',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
};

function createIconStory(info) {
  const { descriptor, moduleName, outputOptions } = info;
  const source = `
import React from 'react';
import { storiesOf } from '@storybook/react';
import ${moduleName} from '../../../${outputOptions.file}';

storiesOf('${moduleName}', module)
  .add('default', () => <${moduleName} />)
  .add('with accessibility label', () => (
    <${moduleName} aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <${moduleName} aria-label="Icon label">
      <title>Icon title</title>
    </${moduleName}>
  ));
`;
  return prettier.format(source, prettierOptions);
}

module.exports = createIconStory;
