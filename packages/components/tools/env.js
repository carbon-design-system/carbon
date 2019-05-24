'use strict';

const { BABEL_ENV } = process.env;

module.exports = () => ({
  presets: [
    [
      '@babel/preset-env',
      {
        modules: BABEL_ENV !== 'test' ? false : 'commonjs',
        targets: {
          browsers: ['extends browserslist-config-carbon'],
        },
      },
    ],
  ],
});
