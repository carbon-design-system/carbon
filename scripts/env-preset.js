const buildPreset = require('babel-preset-env').buildPreset;
const BABEL_ENV = process.env.BABEL_ENV;

module.exports = {
  presets: [
    buildPreset,
    {
      modules: BABEL_ENV === 'es' ? false : 'commonjs',
      targets: {
        browsers: ['last 1 version', 'ie >= 11'],
      },
    },
  ],
};
