/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const sass = require('sass');
const path = require('path');

const SassRenderer = {
  create(cwd, initialData = '') {
    const nodeModules = getNodeModulesFolders(cwd);

    async function render(data) {
      const values = [];
      const valuesByKey = new Map();
      const source = `${initialData}\n${data}`;
      const result = sass.compileString(source, {
        loadPaths: [cwd, ...nodeModules],
        quietDeps: true,
        functions: {
          'get-value($arg)': (args) => {
            values.push(args[0]);
            return sass.sassNull;
          },
          'get($key, $value)': (args) => {
            const key = convertValue(args[0]);
            const value = args[1];
            valuesByKey.set(key, {
              value: convertValue(value),
              nativeValue: value,
            });
            return sass.sassNull;
          },
        },
      });

      return {
        result,
        values,
        getValue(index) {
          return convertValue(values[index]);
        },
        get(key) {
          if (valuesByKey.has(key)) {
            return valuesByKey.get(key);
          }
          throw new Error(`Unabled to find value with key: ${key}`);
        },
        unwrap(key) {
          if (valuesByKey.has(key)) {
            return valuesByKey.get(key).value;
          }
          throw new Error(`Unabled to find value with key: ${key}`);
        },
      };
    }

    return {
      convert: convertValue,
      render,
    };
  },
};

/**
 * Converts a value from Sass into a comparable JavaScript type
 */
function convertValue(value) {
  if (value == null || value.realNull === null) {
    return null;
  }

  if (value instanceof sass.SassBoolean) {
    return value.value;
  }

  if (value instanceof sass.SassNumber) {
    const num = value;
    if (!num.hasUnits) {
      return num.value;
    }
    const numUnits = num.numeratorUnits.toArray().join('');
    const denUnits = num.denominatorUnits.toArray().join('');
    return `${num.value}${numUnits}${denUnits ? `/${denUnits}` : ''}`;
  }

  if (value instanceof sass.SassString) {
    return value.text;
  }

  if (value instanceof sass.SassColor) {
    return value.toString();
  }

  // tryMap() first to get objects for maps and avoid converting them to arrays.
  const asMap = value.tryMap ? value.tryMap() : null;
  if (asMap) {
    const result = {};
    const pairs = asMap.asList;
    const size = pairs.size;
    for (let i = 0; i < size; i++) {
      const pair = pairs.get(i);
      const pairList = pair.asList;
      const k = convertValue(pairList.get(0));
      const v = convertValue(pairList.get(1));
      result[k] = v;
    }
    return result;
  }

  if (value instanceof sass.SassList || value.asList) {
    const list = value.asList;
    const size = list.size;
    const result = [];
    for (let i = 0; i < size; i++) {
      result.push(convertValue(list.get(i)));
    }
    return result;
  }

  return value;
}

/**
 * Collect all the node_modules folders that are present in the current path by
 * traversing upwards and looking for if a node_modules folder exists. This is
 * useful for the `includePaths` option for a sass renderer
 * @param {string} cwd
 * @returns {Array<string>}
 */
function getNodeModulesFolders(cwd) {
  const { root } = path.parse(cwd);
  const folders = [];
  let directory = cwd;

  while (directory !== root) {
    const folder = path.join(directory, 'node_modules');
    if (fs.existsSync(folder)) {
      folders.push(folder);
    }
    directory = path.dirname(directory);
  }

  return folders;
}

module.exports = {
  SassRenderer,
};
