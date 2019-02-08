/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const fs = require('fs');
const path = require('path');
const { render, types } = require('node-sass');

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

async function testSassString(data) {
  const calls = [];
  const result = await sassAsync({
    data,
    importer(url, prev, done) {
      const baseDirectory = prev !== 'stdin' ? path.dirname(prev) : __dirname;
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
    },
    functions: {
      test(...args) {
        // Remove the `done()` argument at the end
        calls.push(args.slice(0, -1));
        // return types.String('test');
        return types.Null();
      },
    },
  });

  return [calls, result];
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

  throw new Error('Unknown value type:' + value);
}

describe('_grid.scss', () => {
  describe('stable', () => {
    it('should export grid variables', async () => {
      const [calls] = await testSassString(`
@import '../grid';

$variables: (
  'max-width': $max-width,
  'columns': $max-width,
  'grid-breakpoints': $grid-breakpoints,
  'gutter-brekapoints': $gutter-breakpoints,
  'grid-gutter-breakpoints': $grid-gutter-breakpoints,
);

@each $key, $value in $variables {
  $t: test($key, $value);
}
`);

      const variables = calls.reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key.getValue()]: convert(value),
        };
      }, {});

      expect(variables).toMatchInlineSnapshot(`
Object {
  "columns": "1600px",
  "grid-breakpoints": Object {
    "lg": "992px",
    "md": "768px",
    "sm": "576px",
    "xl": "1200px",
    "xxl": "1600px",
  },
  "grid-gutter-breakpoints": Object {
    "sm": "5%",
    "xs": "3%",
  },
  "gutter-brekapoints": Object {
    "sm": "10px",
    "xs": "5px",
  },
  "max-width": "1600px",
}
`);
    });

    it('should support the grid mixin', async () => {
      const [_, result] = await testSassString(`
$css--reset: false;
$css--helpers: false;
@import '../grid';

@include grid();
`);

      expect(result.css.toString()).toMatchSnapshot();
    });

    it('should support the breakpoint function', async () => {
      const [calls] = await testSassString(`
@import '../grid';

@each $key, $value in $grid-breakpoints {
  $t: test($key, breakpoint($key));
}

$t: test('unknown', breakpoint('unknown'));
`);
    });
  });
});
