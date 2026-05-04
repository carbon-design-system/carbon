const { PHASE_PRODUCTION_BUILD } = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_PRODUCTION_BUILD) {
    return {
        basePath: '/type/examples/preview',
        output: 'export',
        distDir: 'build',
    }
  }

  return {};
}
