/* eslint-disable no-console */

'use strict';

const { pascal } = require('change-case');
const del = require('del');
const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const { rollup } = require('rollup');
const { BUILD_DIRS, BUILD_ES_DIR, BUILD_SVG_DIR, SVG_DIR } = require('./paths');
const { svgo, parse } = require('./svgo');

const prettierOptions = {
  parser: 'babylon',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
};

async function build() {
  await del(BUILD_DIRS);

  // Build phase
  const filenames = await fs.readdir(SVG_DIR);
  const files = await Promise.all(
    filenames.map(async filename => {
      const name = path.basename(filename, '.svg');
      const filepath = path.join(SVG_DIR, filename);
      return {
        name,
        filename,
        filepath,
        source: await fs.readFile(filepath, 'utf8'),
      };
    })
  );

  console.log('Optimizing icons');

  const icons = await Promise.all(
    files.map(async file => {
      const optimized = await svgo.optimize(file.source, {
        path: file.filepath,
      });
      const content = await parse(optimized.data, file.name);
      return {
        ...file,
        optimized: {
          ...optimized,
          content,
        },
      };
    })
  );

  console.log('Building module source');

  const sizes = [16, 20, 24, 32];
  const iconModules = icons.reduce((acc, icon) => {
    const { name, optimized } = icon;
    const folder = path.join(BUILD_ES_DIR, name);
    const files = sizes.map(size => {
      const source = `export default {
  name: '${name}',
  width: ${size},
  height: ${size},
  viewBox: '0 0 32 32',
  content: ${JSON.stringify(optimized.content)},
  }`;
      return {
        name,
        size,
        source: prettier.format(source, prettierOptions),
        dest: path.join(folder, `${size}.js`),
      };
    });

    return acc.concat(files);
  }, []);
  const entrypoint = createEntrypoint(BUILD_ES_DIR, iconModules);
  const modules = [...iconModules, entrypoint];

  // Write phase
  console.log('Write optimized svg files');

  await fs.ensureDir(BUILD_SVG_DIR);
  await Promise.all(
    icons.map(icon => {
      const { optimized } = icon;
      return fs.writeFile(
        path.resolve(BUILD_SVG_DIR, `${icon.name}.svg`),
        optimized.data
      );
    })
  );

  console.log('Create source modules');

  await Promise.all(
    modules.map(async file => {
      await fs.ensureFile(file.dest);
      return fs.writeFile(file.dest, file.source);
    })
  );

  console.log('Build modules');

  const BUNDLE_TYPES = [
    {
      type: 'cjs',
      folder: 'lib',
    },
    {
      type: 'umd',
      folder: 'umd',
    },
  ];

  await Promise.all(
    BUNDLE_TYPES.map(({ type, folder }) => {
      const bundles = modules.map(async file => {
        const bundle = await rollup({
          input: file.dest,
        });

        const outputOptions = {
          format: type,
          file: file.dest.replace(/\/es\//, `/${folder}/`),
        };

        if (type === 'umd') {
          // If we're in our entrypoint, just default to CarbonIcons
          outputOptions.name = getModuleName(file.name, file.size);
        }

        await bundle.write(outputOptions);
      });
      return Promise.all(bundles);
    })
  );
}

function isUppercase(string) {
  return string === string.toUpperCase();
}

function getModuleName(name, size) {
  if (size) {
    return isUppercase(name) ? `${name}${size}` : pascal(`${name}${size}`);
  }
  return name;
}

function createEntrypoint(folder, modules) {
  const source = modules.reduce((acc, file) => {
    const moduleName = getModuleName(file.name, file.size);
    const modulePath = path.relative(folder, file.dest);
    return (
      acc + `\nexport { default as ${moduleName} } from './${modulePath}';`
    );
  }, '');
  return {
    name: 'CarbonIcons',
    source: prettier.format(source, prettierOptions),
    dest: path.join(folder, 'index.js'),
  };
}

module.exports = build;
