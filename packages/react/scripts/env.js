'use strict';

const BABEL_ENV = process.env.BABEL_ENV;
const { generateScopedName } = require('./styles.config');

const getPlugins = () => {
  const cssModules = [
    'react-css-modules',
    {
      removeImport: process.env.BABEL_ENV !== 'rollup',
      generateScopedName,
      filetypes: {
        '.scss': {
          syntax: 'postcss-scss',
        },
      },
    },
  ];

  return BABEL_ENV !== 'docgen'
    ? [cssModules]
    : [
        cssModules,
        [
          'babel-plugin-react-docgen',
          {
            removeMethods: true,
          },
        ],
      ];
};

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
  plugins: getPlugins(),
});
