#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const mkdirpModule = require('mkdirp');
const { pascalCase } = require('change-case');
const kebabCase = require('kebab-case');
const experimentalTokens = require('@carbon/themes');

const writeFile = promisify(fs.writeFile);
const mkdirp = promisify(mkdirpModule);

const contents = Object.keys(experimentalTokens)
  .filter(token => Object(experimentalTokens[token]) !== experimentalTokens[token])
  .map(token => {
    const convertedMultipleCaps = token.replace(/([A-Z]{2,})/g, (match, found, offset, string) => {
      const next = string[offset + found.length];
      return !next || !/[a-z]/.test(next)
        ? pascalCase(found)
        : pascalCase(found.substr(0, found.length - 1)) + found.substr(found.length - 1);
    });
    const converted = /^(.*?)(\d*)$/
      .exec(convertedMultipleCaps)
      .filter(Boolean)
      .slice(1)
      .map(kebabCase)
      .join('-');
    return `$${converted}: ${experimentalTokens[token]} !default !global;`;
  });

mkdirp(path.resolve(__dirname, '../src/globals/scss/vendor/@carbon/themes/scss'))
  .then(() =>
    writeFile(
      path.resolve(__dirname, '../src/globals/scss/vendor/@carbon/themes/scss/_colors-mixin.scss'),
      // eslint-disable-next-line prefer-template
      [
        '// Code generated from @carbon/themes. DO NOT EDIT.',
        `@mixin theme--base--experimental() {\n${contents.map(content => `  ${content}`).join('\n')}\n}`,
      ].join('\n') + '\n'
    )
  )
  .then(() => {
    console.log('Success! 🎉'); // eslint-disable-line no-console
  });
