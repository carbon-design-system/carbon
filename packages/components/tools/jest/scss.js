/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* global jest */

'use strict';

const fs = require('fs');
const { render, types } = require('node-sass');
const path = require('path');

function sassAsync(options) {
  return new Promise((resolve, reject) => {
    render(options, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
}

const root = path.resolve(__dirname, '../..');

function importer(url, prev, done) {
  const baseDirectory = prev !== 'stdin' ? path.dirname(prev) : root;
  const partialFilepath = path.resolve(baseDirectory, path.dirname(url), `_${path.basename(url)}.scss`);
  const filepath = path.resolve(baseDirectory, path.dirname(url), `${path.basename(url)}.scss`);

  if (fs.existsSync(partialFilepath)) {
    done({ file: partialFilepath });
    return;
  }

  if (fs.existsSync(filepath)) {
    done({ file: filepath });
    return;
  }

  done();
}

const flags = `
$css--font-face: false;
$css--helpers: false;
$css--body: false;
$css--use-layer: false;
$css--reset: false;
$css--typography: false;
$css--plex: false;
`;

async function renderSass(data) {
  const calls = [];
  const warn = jest.fn(() => types.Null());
  const mockError = jest.fn(() => types.Null());
  const log = jest.fn(() => types.Null());
  const debug = jest.fn(() => types.Null());
  let result;
  let renderError;

  try {
    result = await sassAsync({
      data: `${flags}\n${data}`,
      importer,
      functions: {
        '@error': mockError,
        '@debug': debug,
        '@log': log,
        '@warn': warn,
        test(...args) {
          // Remove the `done()` argument at the end
          calls.push(args.slice(0, -1));
          // return types.String('test');
          return types.Null();
        },
      },
    });
  } catch (error) {
    if (!error.message.includes('Function breakpoint finished without @return')) {
      throw error;
    }
    renderError = error;
  }

  return {
    calls,
    result,
    error: renderError,
    output: {
      debug,
      error: mockError,
      log,
      warn,
    },
  };
}

function convert(value) {
  if (value instanceof types.Boolean || value instanceof types.String) {
    return value.getValue();
  }

  if (value instanceof types.Number) {
    return `${value.getValue()}${value.getUnit()}`;
  }

  if (value instanceof types.List) {
    const length = value.getLength();
    const list = [];

    for (let i = 0; i < length; i++) {
      list.push(convert(value.getValue(i)));
    }

    return list;
  }

  if (value instanceof types.Map) {
    const length = value.getLength();
    const map = {};

    for (let i = 0; i < length; i++) {
      const key = value.getKey(i).getValue();
      map[key] = convert(value.getValue(i));
    }

    return map;
  }

  if (value instanceof types.Null) {
    return null;
  }

  throw new Error(`Unknown value type: ${value}`);
}

module.exports = {
  convert,
  renderSass,
};
