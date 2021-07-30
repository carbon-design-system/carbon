/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const resolve = require('resolve');

const defaultResolveOptions = {
  extensions: ['.scss'],
};

/**
 * A custom importer for rendering sass. It will correctly look up paths in test
 * files, including related node_modules. The returned importer supports both
 * asynchronous and synchronous forms of rendering.
 */
const Importer = {
  create(cwd) {
    function importer(url, prev) {
      const baseDirectory = prev !== 'stdin' ? path.dirname(prev) : cwd;

      if (url.startsWith('@')) {
        const file = resolve.sync(url, {
          ...defaultResolveOptions,
          basedir: cwd,
          packageFilter(pkg) {
            if (pkg.eyeglass !== undefined) {
              // Replace JavaScript entrypoint with Sass module entrypoint
              pkg.main = `${pkg.eyeglass.sassDir}/index.scss`;
            }
            return pkg;
          },
          pathFilter(_pkg, _path, relativePath) {
            // Transforms `scss/filename` to `scss/_filename.scss`
            return relativePath.replace(/^(scss[\\/])([a-z-]+)/, '$1_$2.scss');
          },
        });

        return { file };
      }

      const candidates = [
        `${path.basename(url)}.scss`,
        `_${path.basename(url)}.scss`,
        path.basename(url),
        `_${path.basename(url)}`,
      ];

      for (const candidate of candidates) {
        const filepath = path.resolve(
          baseDirectory,
          path.dirname(url),
          candidate
        );
        if (fs.existsSync(filepath)) {
          return { file: filepath };
        }
      }
    }

    return importer;
  },
};

module.exports = {
  Importer,
};
