/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { reporter } = require('@carbon/cli-reporter');
const { pascal } = require('change-case');
const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const { rollup } = require('rollup');
const { flatMapAsync } = require('../../tools');
const { parse } = require('./svgo');
const optimize = require('./optimize');
const virtual = require('../plugins/virtual');

const prettierOptions = {
  parser: 'babel',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  proseWrap: 'always',
};

async function builder(source, { cwd } = {}) {
  const optimized = await optimize(source, { cwd });

  reporter.info(`Building the module source for ${optimized.length} icons...`);

  const BUNDLE_FORMATS = [
    {
      directory: 'es',
      file: path.join(cwd, 'es/index.js'),
      format: 'esm',
    },
    {
      directory: 'lib',
      file: path.join(cwd, 'lib/index.js'),
      format: 'cjs',
    },
  ];

  reporter.info('Building module source...');

  // Build up icon index. Useful for looking up size info for a particular icon.
  const index = optimized.reduce((acc, icon) => {
    const { basename, prefix } = icon;
    const key = getIndexName(basename, prefix);
    if (acc[key]) {
      return {
        ...acc,
        [key]: {
          sizes: acc[key].sizes.concat(icon.size).sort(),
        },
      };
    }
    return {
      ...acc,
      [key]: {
        sizes: [icon.size],
      },
    };
  }, {});

  const SCALED_SIZES = [24, 20, 16];
  const files = await flatMapAsync(optimized, async file => {
    const { basename, size, prefix } = file;

    if (size === 32) {
      const key = getIndexName(basename, prefix);
      const { sizes } = index[key];
      const defaultIcon = await createDescriptorFromFile(file);
      const scaledIcons = await Promise.all(
        // Only scale down for sizes we don't have icons for
        SCALED_SIZES.filter(size => sizes.indexOf(size) === -1).map(size =>
          createDescriptorFromFile({
            ...file,
            size,
            original: 32,
          })
        )
      );
      return [defaultIcon, ...scaledIcons];
    }
    return Object.assign({}, file, await createDescriptorFromFile(file));
  });

  reporter.info('Building JavaScript modules...');

  const inputs = files.map(file => {
    const { basename, prefix, size, source } = file;
    const formattedPrefix = prefix.filter(step => isNaN(step));
    const moduleFolder = path.join(...formattedPrefix, basename);
    const filepath = path.join(moduleFolder, size ? `${size}.js` : 'index.js');

    return {
      ...file,
      filepath,
      source,
    };
  });

  const bundle = await rollup({
    input: inputs.reduce(
      (acc, input) => ({
        ...acc,
        [input.filepath]: input.filepath,
      }),
      {}
    ),
    external: [],
    plugins: [
      virtual(
        inputs.reduce(
          (acc, input) => ({
            ...acc,
            [input.filepath]: input.source,
          }),
          {}
        )
      ),
    ],
  });

  await Promise.all(
    BUNDLE_FORMATS.map(({ directory, format }) => {
      return bundle.write({
        dir: directory,
        format,
        // We already specify `.js` in the `filepath` used in `input` above
        entryFileNames: '[name]',
      });
    })
  );

  reporter.info('Building module entrypoints...');

  let entrypoint = `/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

  for (const file of files) {
    const { moduleName, descriptor } = file;
    const value = JSON.stringify(descriptor);
    entrypoint += `\nexport const ${moduleName} = ${value}`;
  }

  const entrypointBundle = await rollup({
    input: '__entrypoint__.js',
    external: [],
    plugins: [
      virtual({
        '__entrypoint__.js': prettier.format(entrypoint, prettierOptions),
      }),
    ],
  });

  await Promise.all(
    BUNDLE_FORMATS.map(({ format, file }) => {
      const outputOptions = {
        format,
        file,
      };

      return entrypointBundle.write(outputOptions);
    })
  );

  const formattedOutput = inputs.map(input => {
    const {
      filename,
      basename,
      size,
      prefix,
      descriptor,
      moduleName,
      original,
      filepath,
    } = input;
    return {
      filename,
      basename,
      size,
      prefix,
      descriptor,
      moduleName,
      original,
      outputOptions: {
        file: path.join('es', filepath),
      },
    };
  });

  await fs.writeJson(path.join(cwd, 'build-info.json'), formattedOutput, {
    spaces: 2,
  });

  reporter.success('Done! 🎉');
}

function getModuleName(name, size, prefixParts, descriptor) {
  const width = parseInt(descriptor.attrs.width, 10);
  const height = parseInt(descriptor.attrs.height, 10);
  const prefix = prefixParts
    .filter(size => isNaN(size))
    .map(pascal)
    .join('');
  const isGlyph = width < 16 || height < 16;

  if (prefix !== '') {
    if (!size) {
      if (isGlyph) {
        return prefix + pascal(name) + 'Glyph';
      }
      return prefix + pascal(name);
    }
    return prefix + pascal(name) + size;
  }

  if (!size) {
    if (isGlyph) {
      return pascal(name) + 'Glyph';
    }
    return pascal(name);
  }

  if (isNaN(name[0])) {
    return pascal(name) + size;
  }

  return '_' + pascal(name) + size;
}

function createIconSource(file, descriptor) {
  const { basename, prefix, size } = file;
  return {
    source: prettier.format(
      `export default ${JSON.stringify(descriptor)};`,
      prettierOptions
    ),
    moduleName: getModuleName(basename, size, prefix, descriptor),
  };
}

async function createDescriptorFromFile(file) {
  const { basename, size, optimized, original } = file;
  const info = await parse(optimized.data, basename);
  const descriptor = {
    ...info,
    name: basename,
  };

  if (size) {
    descriptor.size = size;
    descriptor.attrs.width = size;
    descriptor.attrs.height = size;
    descriptor.attrs.viewBox = original
      ? `0 0 ${original} ${original}`
      : `0 0 ${size} ${size}`;
  } else {
    const [width, height] = info.attrs.viewBox.split(' ').slice(2);
    descriptor.attrs.width = width;
    descriptor.attrs.height = height;
  }

  const { source, moduleName } = createIconSource(file, descriptor);

  return {
    ...file,
    descriptor,
    source,
    moduleName,
  };
}

function getIndexName(basename, prefix) {
  return prefix
    .filter(part => isNaN(part))
    .concat(basename)
    .join('/');
}

module.exports = builder;
