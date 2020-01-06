'use strict';
const { generateScopedName } = require('./styles.config');
const BABEL_ENV = process.env.BABEL_ENV;
const docgenConfig = [
  [
    'babel-plugin-react-docgen',
    {
      removeMethods: true,
    },
  ],
];

module.exports = () => ({
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        modules:
          BABEL_ENV === 'es' || BABEL_ENV === 'rollup' ? false : 'commonjs',
        targets: {
          browsers: ['extends browserslist-config-carbon'],
        },
      },
    ],
  ],
  plugins: [
    [
      'react-css-modules',
      {
        generateScopedName,
        removeImport: BABEL_ENV === 'docgen',
        webpackHotModuleReloading: true,
        filetypes: {
          '.scss': {
            syntax: 'postcss-scss',
          },
        },
      },
    ],
    ...(BABEL_ENV === 'docgen' ? docgenConfig : []),
  ],
});
