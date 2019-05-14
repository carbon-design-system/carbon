/**
 * @jest-environment node
 */

// eslint-disable-next-line strict,lines-around-directive
'use strict';

const path = require('path');
const sass = require('node-sass');
const glob = require('glob');

const defaultOptions = {
  includePaths: ['node_modules', '../../../node_modules'],
};
const cwd = path.resolve(__dirname, '../src');
const files = glob.sync('**/*.scss', {
  cwd,
  ignore: ['**/vendor/@carbon/**'],
});

describe('styles', () => {
  it.each(files)('%s should compile', (relativeFilePath, done) => {
    const filepath = path.join(cwd, relativeFilePath);
    sass.render(
      {
        file: filepath,
        ...defaultOptions,
      },
      (error, result) => {
        if (error) {
          const { column, line, message } = error;
          done.fail(`${filepath}\n[${line}:${column}] ${message}`);
          return;
        }
        expect(result.css).toBeDefined();
        done();
      }
    );
  });
});
