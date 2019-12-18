'use strict';

const BABEL_ENV = process.env.BABEL_ENV;

const getPlugins = () => {
  const cssModules = [
    'react-css-modules',
    {
      removeImport: process.env.BABEL_ENV !== 'rollup',
      generateScopedName: '[name]_[local]__[hash:base64:5]',
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
