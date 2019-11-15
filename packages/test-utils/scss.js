/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const { render, types } = require('node-sass');
const path = require('path');
const resolve = require('resolve');

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

const defaultResolveOptions = {
  extensions: ['.scss'],
};

/**
 * Create an importer for sass with the given `cwd`. This importer will try and
 * mimic the default sass resolution algorithm
 * @param {string} cwd
 * @returns {Function}
 */
function createImporter(cwd) {
  return (url, prev, done) => {
    const baseDirectory = prev !== 'stdin' ? path.dirname(prev) : cwd;

    if (url.startsWith('@')) {
      const file = resolve.sync(url, {
        ...defaultResolveOptions,
        basedir: cwd,
        packageFilter(pkg) {
          if (pkg.eyeglass !== undefined) {
            // Replace JavaScript entrypoint with Sass module entrypoing
            pkg.main = `${pkg.eyeglass.sassDir}/index.scss`;
          }
          return pkg;
        },
        pathFilter(pkg, path, relativePath) {
          // Transforms `scss/filename` to `scss/_filename.scss`
          return relativePath.replace(/^(scss\/)([a-z-]+)/, '$1_$2.scss');
        },
      });
      done({ file });
      return;
    }

    const partialFilepath = path.resolve(
      baseDirectory,
      path.dirname(url),
      `_${path.basename(url)}.scss`
    );
    const filepath = path.resolve(
      baseDirectory,
      path.dirname(url),
      `${path.basename(url)}.scss`
    );

    if (fs.existsSync(partialFilepath)) {
      done({ file: partialFilepath });
      return;
    }

    if (fs.existsSync(filepath)) {
      done({ file: filepath });
      return;
    }

    done();
  };
}

/**
 * Create a sass renderer for the given current working directory. Setting `cwd`
 * is useful so that we can resolve sass files relative to the test file.
 * @param {string} cwd
 * @param {string} initialData - optional string to prefix each render call
 * @returns {Function}
 */
function createSassRenderer(cwd, initialData = '') {
  const importer = createImporter(cwd);
  return async data => {
    const calls = [];
    const warn = jest.fn(() => types.Null());
    const mockError = jest.fn(() => types.Null());
    const log = jest.fn(() => types.Null());
    const debug = jest.fn(() => types.Null());
    const output = {
      debug,
      error: mockError,
      log,
      warn,
    };
    let result;
    let renderError;

    try {
      result = await sassAsync({
        data: [initialData, data].join('\n'),
        importer,
        functions: {
          '@error': mockError,
          '@debug': debug,
          '@log': log,
          '@warn': warn,
          test(...args) {
            // Remove the `done()` argument at the end
            calls.push(args.slice(0, -1));
            return types.Null();
          },
        },
      });
    } catch (error) {
      if (
        !error.message.includes('Function breakpoint finished without @return')
      ) {
        throw error;
      }
      renderError = error;
    }

    return {
      calls,
      result,
      error: renderError,
      output,
      getOutput(level = 'debug') {
        return output[level].mock.calls
          .map(call => convert(call[0]))
          .join('\n');
      },
    };
  };
}

function toHexString(number) {
  if (number === 0) {
    return '00';
  }
  const string = number.toString(16);
  if (string.length === 1) {
    return `0${string}`;
  }
  return string;
}

function convert(value) {
  if (value instanceof types.Boolean || value instanceof types.String) {
    return value.getValue();
  }

  if (value instanceof types.Number) {
    if (value.getValue() === 0) {
      return value.getValue();
    }
    return `${value.getValue()}${value.getUnit()}`;
  }

  if (value instanceof types.Color) {
    if (value.getA() !== 1) {
      const r = value.getR();
      const g = value.getG();
      const b = value.getB();
      const a = value.getA();
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    const hexcode = [value.getR(), value.getG(), value.getB()]
      .map(toHexString)
      .join('');
    return `#${hexcode}`;
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
  createSassRenderer,
  createImporter,
  types,
};
