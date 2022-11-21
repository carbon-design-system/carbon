/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { dirname, relative, resolve } = require('path');
const replaceExtension = require('replace-ext');

module.exports = function resourceJSPaths(babel) {
  const t = babel.types;

  return {
    visitor: {
      ImportDeclaration(path, state) {
        const { node } = path;
        const { value: source } = node.source;
        if (/^\..*\.scss$/i.test(source)) {
          const declaration = t.cloneNode(node);
          declaration.source.value = `./${replaceExtension(source, '.css.js')}`;
          path.replaceWith(declaration);
        } else if (/^@carbon\/icons\/lib/i.test(source)) {
          const filenameES = state.file.opts.filename.replace(
            /[/\\]src[/\\]/,
            '/es/'
          );
          const iconsDir = relative(
            dirname(filenameES),
            resolve(__dirname, '../es/icons')
          );
          const declaration = t.cloneNode(node);
          declaration.source.value = source.replace(
            /^@carbon\/icons\/lib/i,
            iconsDir
          );
          path.replaceWith(declaration);
        }
      },
    },
  };
};
