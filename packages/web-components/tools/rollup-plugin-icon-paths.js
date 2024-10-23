/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import { fileURLToPath } from 'url';

/**
 * @returns {object} The rollup plugin to transform `@carbon/icons/lib` imports to relative path in build.
 */
export default function rollupPluginIconPaths() {
  return {
    name: 'transform-icon-paths',

    generateBundle(options, bundle) {
      function transformIconPaths(filePath, content) {
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const iconPathRegex = /@carbon\/icons\/lib/g;
        const filenameES = filePath.replace(/[/\\]src[/\\]/, '/es/');
        const iconsDir = path.relative(
          path.dirname(filenameES),
          path.resolve(__dirname, '../icons')
        );
        return content.replace(iconPathRegex, iconsDir);
      }

      for (const [fileName, fileData] of Object.entries(bundle)) {
        if (fileData.type === 'chunk') {
          fileData.code = transformIconPaths(fileName, fileData.code);
        }
      }
    },
  };
}
