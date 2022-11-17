/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const { rollup } = require('rollup');

const config = require('../config');
const getRollupConfig = require('../../tools/get-rollup-config');

/**
 * Gets all of the folders and returns out
 *
 * @param {string} dir Directory to check
 * @returns {string[]} List of folders
 * @private
 */
function _getFolders(dir) {
  return fs.readdirSync(dir).filter((file) => fs.statSync(path.join(dir, file)).isDirectory());
}

/**
 * Builds all of the rollup bundles for all components
 *
 * @param {object} [options] The build options.
 * @param {string} [options.mode=development] The build mode.
 * @param {string} [options.dir=ltr] The UI direction.
 */
async function _buildComponents({ mode = 'development', dir = 'ltr' } = {}) {
  if (!fs.existsSync(config.distDestDir)) {
    fs.mkdirSync(config.distDestDir);
  }

  const folders = _getFolders(`${config.srcDir}/components`);

  for (let i = folders.length - 1; i >= 0; i--) {
    if (!fs.existsSync(`${config.srcDir}/components/${folders[i]}/index.ts`)) {
      folders.splice(i, 1);
    }
  }

  return rollup(getRollupConfig({ mode, dir, folders }))
    .then((bundle) => {
      bundle.write({
        format: 'es',
        dir: config.distDestDir,
        banner: 'let process = { env: {} };',
      });
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
}

/**
 * Defined scripts to return as gulp tasks
 *
 * @type {{ltr: object, rtl: object}}
 * @private
 */
const _scripts = {
  ltr: {
    dev() {
      return _buildComponents();
    },
    prod() {
      return _buildComponents({ mode: 'production' });
    },
  },
  rtl: {
    dev() {
      return _buildComponents({ dir: 'rtl' });
    },
    prod() {
      return _buildComponents({ mode: 'production', dir: 'rtl' });
    },
  },
};

// Gulp tasks (LTR)
gulp.task('build:dist:ltr:dev', _scripts.ltr.dev);
gulp.task('build:dist:ltr:prod', _scripts.ltr.prod);
gulp.task('build:dist:ltr', gulp.series(gulp.task('build:dist:ltr:dev'), gulp.task('build:dist:ltr:prod')));

// Gulp tasks (RTL)
gulp.task('build:dist:rtl:dev', _scripts.rtl.dev);
gulp.task('build:dist:rtl:prod', _scripts.rtl.prod);
gulp.task('build:dist:rtl', gulp.series(gulp.task('build:dist:rtl:dev'), gulp.task('build:dist:rtl:prod')));

// Build all components
gulp.task('build:dist', gulp.series(gulp.series(gulp.task('build:dist:ltr:prod'), gulp.task('build:dist:rtl:prod'))));
gulp.task('build:dist:dev', gulp.series(gulp.series(gulp.task('build:dist:ltr:dev'), gulp.task('build:dist:rtl:dev'))));
