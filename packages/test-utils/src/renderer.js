/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const sass = require('sass');
const { Importer } = require('./importer');

const SassRenderer = {
  create(cwd, initialData = '') {
    const importer = Importer.create(cwd);

    async function render(data) {
      const values = [];
      const result = sass.renderSync({
        data: `${initialData}\n${data}`,
        importer,
        functions: {
          'get-value($arg)': (arg) => {
            values.push(arg);
            return sass.types.Null.NULL;
          },
        },
      });

      return {
        result,
        values,
        getValue(index) {
          return convert(values[index]);
        },
      };
    }

    return {
      convert,
      render,
      types: sass.types,
    };
  },
};

/**
 * Converts a value from Sass into a comparable JavaScript type
 */
function convert(value) {
  const { types } = sass;

  if (value instanceof types.Boolean) {
    return value.getValue();
  }

  if (value instanceof types.Number) {
    const unit = value.getUnit();
    if (unit === '') {
      return value.getValue();
    }
    return `${value.getValue()}${unit}`;
  }

  if (value instanceof types.String) {
    return value.getValue();
  }

  if (value instanceof types.Color) {
    return value.toString();
  }

  if (value instanceof types.List) {
    const length = value.getLength();
    const result = Array(length);

    for (let i = 0; i < length; i++) {
      result[i] = convert(value.getValue(i));
    }

    return result;
  }

  if (value instanceof types.Map) {
    const length = value.getLength();
    const result = {};

    for (let i = 0; i < length; i++) {
      const key = convert(value.getKey(i));
      result[key] = convert(value.getValue(i));
    }

    return result;
  }

  if (value instanceof types.Null) {
    return null;
  }

  return value;
}

module.exports = {
  SassRenderer,
};
