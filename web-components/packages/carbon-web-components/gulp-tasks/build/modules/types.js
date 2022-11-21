/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const gulp = require('gulp');
const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const through2 = require('through2');
const typescript = require('gulp-typescript');

const config = require('../../config');

/**
 * Builds the types module
 *
 * @returns {*} gulp stream
 */
function types() {
  const tsProject = typescript.createProject(path.resolve(__dirname, '../../../tsconfig.json'));
  const { dts } = gulp
    .src([`${config.srcDir}/**/*.ts`, `!${config.srcDir}/**/*-story*.ts*`, `!${config.srcDir}/**/stories/**/*.ts*`])
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  return dts
    .pipe(
      through2.obj((file, enc, done) => {
        file.contents = Buffer.from(`${file.contents.toString()}\n//# sourceMappingURL=${path.basename(file.path)}.map\n`);
        done(null, file);
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.jsDestDir));
}

gulp.task('build:modules:types', types);
