'use strict';

const { reporter } = require('@carbon/cli-reporter');
const bundlers = require('../bundlers');
const path = require('path');

async function bundle(entrypoint, options, info) {
  const { cwd } = info;
  const extension = path.extname(entrypoint);

  if (!bundlers.has(extension)) {
    reporter.error(
      `Invalid extension: \`${extension}\` on entrypoint: \`${entrypoint}\``
    );
    process.exit(1);
  }

  try {
    const bundle = bundlers.get(extension);
    await bundle(path.join(cwd, entrypoint), options, info);
  } catch (error) {
    reporter.error(`Unexpected error occurred while bundling ${entrypoint}:`);
    console.log(error);
    process.exit(1);
  }

  reporter.success('Done! 🎉');
}

module.exports = bundle;
