/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = () => {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: {
            browsers: ['extends browserslist-config-carbon'],
          },
        },
      ],
      () => ({
        plugins: ['@babel/plugin-transform-class-properties'],
      }),
      [
        '@babel/preset-typescript',
        // Babel 8 defaults this to true, which keeps `import { Type }` as a
        // runtime require. Carbon does not use verbatimModuleSyntax.
        { onlyRemoveTypeImports: false },
      ],
    ],
    // Skip JSX parsing on `.ts` files so generic params like `<T>` are not
    // treated as JSX. Babel 8's preset-react default runtime is `"automatic"`;
    // keep `"classic"` (`React.createElement`) for Carbon's existing output.
    overrides: [
      {
        test: /\.(js|jsx|tsx)$/,
        presets: [
          [
            '@babel/preset-react',
            {
              runtime: 'classic',
            },
          ],
        ],
      },
    ],
    plugins: [
      'dev-expression',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-transform-export-namespace-from',
      '@babel/plugin-transform-react-constant-elements',
    ],
  };
};
