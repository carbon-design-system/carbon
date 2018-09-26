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

const MODULE_TYPES = [
  {
    type: 'cjs',
    folder: 'lib',
  },
  {
    type: 'umd',
    folder: 'umd',
  },
];

async function build() {
  console.log('Cleaning up build directories...');
  await del(BUILD_DIRS);

  const sizes = await fs.readdir(SVG_DIR);

  console.log('Building icons for sizes:', sizes);
  const files = await flatMapAsync(sizes, async size => {
    const sizeDirectory = path.join(SVG_DIR, size);
    const filenames = await fs.readdir(sizeDirectory);
    return Promise.all(
      filenames.map(async filename => {
        const name = path.basename(filename, '.svg');
        const filepath = path.join(sizeDirectory, filename);
        // SVG source
        const svg = await fs.readFile(filepath, 'utf8');
        // Optimized SVG source
        const optimized = await svgo.optimize(svg, {
          path: filepath,
        });
        // Grab SVG information from optimized SVG source
        const info = await parse(optimized.data, name);
        const descriptor = {
          ...info,
          name,
        };

        if (size !== 'glyph') {
          descriptor.attrs = {
            ...descriptor.attrs,
            width: parseInt(size, 10),
            height: parseInt(size, 10),
            viewBox: `0 0 ${size} ${size}`,
          };
        } else {
          const [width, height] = info.attrs.viewBox
            .split(' ')
            .slice(2)
            .map(number => parseInt(number, 10));

          descriptor.attrs = {
            ...descriptor.attrs,
            width,
            height,
          };
        }

        // JS source
        const source = prettier.format(
          `export default ${JSON.stringify(descriptor)};`,
          prettierOptions
        );

        return {
          name,
          size: size !== 'glyph' ? parseInt(size, 10) : size,
          svg: optimized.data,
          source,
          descriptor,
        };
      })
    );
  });

  await fs.ensureDir(BUILD_SVG_DIR);

  console.log('Copying SVG source and building JS modules...');
  await Promise.all(
    files.map(async file => {
      const { name, size, svg, source } = file;
      const moduleFolder = path.join(BUILD_ES_DIR, name);
      const jsFilepath = path.join(moduleFolder, `${size}.js`);
      const svgFilepath = path.join(BUILD_SVG_DIR, `${name}-${size}.svg`);

      await fs.ensureDir(moduleFolder);
      await Promise.all([
        fs.writeFile(svgFilepath, svg),
        fs.writeFile(jsFilepath, source),
      ]);

      const modules = MODULE_TYPES.map(async ({ type, folder }) => {
        const bundle = await rollup({
          input: jsFilepath,
        });

        const outputOptions = {
          format: type,
          file: jsFilepath.replace(/\/es\//, `/${folder}/`),
        };

        if (type === 'umd') {
          outputOptions.name = getModuleName(name, size);
        }

        return bundle.write(outputOptions);
      });

      return Promise.all(modules);
    })
  );

  console.log('Creating entrypoints...');
  const entrypointPath = path.join(BUILD_ES_DIR, 'index.js');
  const entrypoint = prettier.format(
    files.reduce((acc, file) => {
      const name = getModuleName(file.name, file.size);
      const jsExport = `export const ${name} = ${JSON.stringify(
        file.descriptor
      )};`;
      return acc + jsExport;
    }, ''),
    prettierOptions
  );
  await fs.writeFile(entrypointPath, entrypoint);

  const entrypointBundle = await rollup({
    input: entrypointPath,
  });
  await Promise.all(
    MODULE_TYPES.map(async ({ type, folder }) => {
      const outputOptions = {
        format: type,
        file: entrypointPath.replace(/\/es\//, `/${folder}/`),
      };
      if (type === 'umd') {
        outputOptions.name = 'CarbonIcons';
      }
      return entrypointBundle.write(outputOptions);
    })
  );

  console.log('Done! 🎉');
}

function isUppercase(string) {
  return string === string.toUpperCase();
}

function getModuleName(name, size) {
  if (size) {
    const variant =
      typeof size === 'number' ? size : size[0].toUpperCase() + size.slice(1);

    // Handle cases where the icon starts with a number, like 4K
    if (isNaN(name[0])) {
      return isUppercase(name)
        ? `${name}${variant}`
        : pascal(`${name}${variant}`);
    }

    return isUppercase(name)
      ? `_${name}${variant}`
      : '_' + pascal(`${name}${variant}`);
  }

  return name;
}

async function flatMapAsync(source, callback) {
  const sink = await Promise.all(source.map(callback));
  return sink.reduce((acc, elem) => acc.concat(elem), []);
}

module.exports = build;
