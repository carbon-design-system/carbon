/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const prettier = require('prettier');

const prettierOptions = {
  parser: 'scss',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  proseWrap: 'always',
};

function createPrinter(definitions) {
  let buffer = [];
  let indentLevel = 0;

  const printer = {
    append(string) {
      buffer.push(string);
    },

    blockStart(character = '{') {
      printer.token(character);
      indentLevel++;
      printer.newline();
    },

    blockEnd(character = '}') {
      indentLevel--;
      printer.newline();
      printer.token(character);
    },

    get() {
      return prettier.format(buffer.join(''), prettierOptions);
    },

    maybeNewline() {
      if (buffer[buffer.length - 1] !== '\n') {
        printer.newline();
      }
    },

    newline() {
      buffer.push('\n');
      buffer.push(padLeft(indentLevel));
    },

    print(node, parent) {
      definitions[node.type].generate(printer, node, parent);
    },

    space() {
      buffer.push(' ');
    },

    token(characters) {
      return buffer.push(characters);
    },
  };

  return printer;
}

function padLeft(level) {
  return '  '.repeat(level);
}

module.exports = {
  createPrinter,
};
