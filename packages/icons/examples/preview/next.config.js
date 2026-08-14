const { PHASE_PRODUCTION_BUILD } = require('next/constants')
const path = require('path')

const nextConfig = {
  turbopack: {
    root: path.resolve(__dirname, '../../../..'),
  },
};

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_BUILD) {
    return {
        ...nextConfig,
        basePath: '/icons/examples/preview',
        output: 'export',
        distDir: 'build',
    }
  }

  return {
    ...defaultConfig,
    ...nextConfig,
  };
}
