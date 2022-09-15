/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const asyncDone = require('async-done');
const excludeGitignore = require('gulp-exclude-gitignore');
const filter = require('gulp-filter');
const globby = require('globby');
const gulp = require('gulp');
const path = require('path');
const through2 = require('through2');
const { promisify } = require('util');

const config = require('./config');
const reLicenseText = require('../tools/license-text');

const promisifyStream = promisify(asyncDone);

/**
 * @returns {NodeJS.ReadWriteStream} A Gulp plugin that checks if the Vinyl file content has a license header.
 */
const _gulpCheckLicense = () => {
  const filesWithError = [];
  return through2.obj(
    (file, enc, done) => {
      if (!reLicenseText.test(file.contents)) {
        filesWithError.push(file.path);
      }
      done(null, file);
    },
    done => {
      if (filesWithError.length > 0) {
        done(new Error(`Could not find license text in:\n${filesWithError.join('\n')}`));
      } else {
        done();
      }
    }
  );
};

/**
 * Runs lint over the src
 * @returns {Promise<void>}
 */
async function src() {
  const paths = await globby(path.resolve(__dirname, '../**/.gitignore'), {
    cwd: path.resolve(__dirname, '..'),
    gitignore: true,
  });
  await promisifyStream(() =>
    paths
      .reduce(
        (stream, item) => stream.pipe(excludeGitignore(item)),
        // Exclude `node_modules` here as a fast path of `gulp-exclude-gitignore`
        gulp.src(['**/*.{js,ts,tsx,scss,html}', '!.yarn/**', '!**/node_modules/**'])
      )
      .pipe(_gulpCheckLicense())
  );
}

/**
 * Runs lint over dist
 * @returns {Promise<void>}
 */
function dist() {
  return gulp
    .src([`${config.cjsDestDir}/**/*`, `${config.jsDestDir}/**/*`, '!**/*.json', '!**/*.map'])
    .pipe(filter(file => !file.stat.isDirectory()))
    .pipe(_gulpCheckLicense());
}

gulp.task('lint:license:src', src);
gulp.task('lint:license:dist', dist);
gulp.task('lint:license', gulp.parallel(gulp.task('lint:license:src'), gulp.task('lint:license:dist')));
