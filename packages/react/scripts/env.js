'use strict';

const BABEL_ENV = process.env.BABEL_ENV;

const docgenConfig = {
  plugins: [
    [
      'babel-plugin-react-docgen',
      {
        removeMethods: true,
      },
    ],
  ],
};

module.exports = () => ({
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        modules: BABEL_ENV === 'es' ? false : 'commonjs',
        targets: {
          browsers: ['extends browserslist-config-carbon'],
        },
      },
    ],
  ],
  ...(BABEL_ENV === 'docgen' && docgenConfig),
});
