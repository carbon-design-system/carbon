'use strict';

const { reporter } = require('@carbon/cli-reporter');
const del = require('del');
const fs = require('fs-extra');
const path = require('path');
const { parse, svgo } = require('./svgo');
const { flatMapAsync } = require('./tools');

const blacklist = new Set(['.DS_Store']);

async function optimize(folder, { cwd, buildDir = `${cwd}/svg` } = {}) {
  reporter.info(`Optimizing icons in the folder: \`${folder}\``);

  if (!(await fs.pathExists(folder))) {
    throw new Error(
      `Unable to find folder at: \`${folder}\`. Make sure it exists and has ` +
        `folders for each icon size.`
    );
  }

  const sizes = (await fs.readdir(folder)).filter(filename => {
    return !blacklist.has(filename);
  });

  reporter.info(`Using the following icon sizes: [${sizes.join(', ')}]`);
  reporter.info('Optimizing icons...');

  const optimized = await flatMapAsync(sizes, async size => {
    const icons = await fs.readdir(path.join(folder, size));

    return await Promise.all(
      icons.map(async icon => {
        const filename = path.join(folder, size, icon);
        const source = await fs.readFile(filename, 'utf8');
        const target = await svgo.optimize(source, {
          path: filename,
        });

        return {
          filename,
          folder,
          size,
          optimized: target.data,
          info: await parse(target.data),
          output: path.join(buildDir, path.relative(folder, filename)),
        };
      })
    );
  });

  reporter.info('Clearing build folder...');
  // /path/to/source/svg/<size>/<filename>.svg --> /path/to/build/svg/<size>/<filename>.svg
  await del([buildDir]);
  await fs.ensureDir(buildDir);
  await Promise.all(sizes.map(size => fs.ensureDir(path.join(buildDir, size))));

  await Promise.all(
    optimized.map(source => {
      return fs.writeFile(source.output, source.optimized);
    })
  );

  reporter.success(`Successfully optimized ${optimized.length} icons 🎉`);

  return optimized;
}

module.exports = optimize;
