/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
// TODO figure out how to use fibers with jest
// const Fiber = require('fibers');
const path = require('path');

function createSassAsync(compiler) {
  const { render } = compiler;
  return function sassAsync(options) {
    return new Promise((resolve, reject) => {
      render(options, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
    });
  };
}

/**
 * Create an importer for sass with the given `cwd`. This importer will try and
 * mimic the default sass resolution algorithm
 * @param {string} cwd
 * @returns {Function}
 */
function createImporter(cwd) {
  return (url, prev, done) => {
    const baseDirectory = prev !== 'stdin' ? path.dirname(prev) : cwd;
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

function createCreateSassRenderer(compiler) {
  const { types } = compiler;
  /**
   * Create a sass renderer for the given current working directory. Setting `cwd`
   * is useful so that we can resolve sass files relative to the test file.
   * @param {string} cwd
   * @param {string} initialData - optional string to prefix each render call
   * @returns {Function}
   */
  return function createSassRenderer(cwd, initialData = '') {
    const NULL = types.Null.NULL;
    const importer = createImporter(cwd);
    const renderer = async data => {
      const calls = [];
      const warn = jest.fn(() => NULL);
      const mockError = jest.fn(() => NULL);
      const log = jest.fn(() => NULL);
      const debug = jest.fn(() => NULL);
      const output = {
        debug,
        error: mockError,
        log,
        warn,
      };
      let result;
      let renderError;

      const nodeSassFunctions = {
        '@error': mockError,
        '@debug': debug,
        '@log': log,
        '@warn': warn,
      };

      const compilerOptions = {
        data: [initialData, data].join('\n'),
        importer,
        outputStyle: 'expanded',
        functions: {
          'test($args...)': args => {
            let called = [];
            for (let i = 0; i < args.getLength(); i++) {
              called.push(args.getValue(i));
            }
            calls.push(called);
            return NULL;
          },
        },
      };

      // check if we're running in dart sass and skip assigning to `@` functions
      // the `@` function assignment is a undocumented feature in node-sass
      if (!compiler.info.includes('dart')) {
        Object.assign(compilerOptions.functions, nodeSassFunctions);
      }

      try {
        result = await createSassAsync(compiler)(compilerOptions);
      } catch (error) {
        if (
          !error.message.includes(
            'Function breakpoint finished without @return'
          )
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
            .map(call => createConvert(compiler)(call[0]))
            .join('\n');
        },
      };
    };

    return {
      renderer,
      types,
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

function createConvert(compiler) {
  const { types } = compiler;
  return function convert(value) {
    if (value instanceof types.Boolean || value instanceof types.String) {
      return value.getValue();
    }
    if (value instanceof types.Number) {
      return `${value.getValue()}${value.getUnit()}`;
    }

    if (value instanceof types.Color) {
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
  };
}

/**
 *
 * @param compiler the sass compiler to create our test utils with
 */
function createSassUtil(compiler) {
  return {
    convert: createConvert(compiler),
    createSassRenderer: createCreateSassRenderer(compiler),
    sassAsync: createSassAsync(compiler),
    createImporter,
  };
}

function testAll(sassutils, describeCallback) {
  for (const util of sassutils) {
    describeCallback(util);
  }
}

module.exports = {
  createSassUtil,
  createConvert,
  createCreateSassRenderer,
  createSassAsync,
  createImporter,
  testAll
};
