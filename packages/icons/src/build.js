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
const { flatMapAsync } = require('./tools');
const { parse } = require('./svgo');
const optimize = require('./optimize');

const SCALED_SIZES = [24, 20];
const prettierOptions = {
  parser: 'babylon',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  proseWrap: 'always',
};

async function build(source, { cwd } = {}) {
  const optimized = await optimize(source, { cwd });

  reporter.info(`Building the module source for ${optimized.length} icons...`);

  const packageJson = await findPackageJsonFor(cwd);
  const {
    main: commonjsEntrypoint = 'lib/index.js',
    module: esmEntrypoint = 'es/index.js',
    umd: umdEntrypoint = 'umd/index.js',
  } = packageJson;
  const esmFolder = path.dirname(esmEntrypoint);
  const BUNDLE_FORMATS = [
    {
      format: 'cjs',
      directory: path.join(cwd, path.dirname(commonjsEntrypoint)),
    },
    {
      format: 'umd',
      directory: path.join(cwd, path.dirname(umdEntrypoint)),
    },
  ];

  reporter.info(
    `Building bundle types: [es, ${BUNDLE_FORMATS.map(b => b.format).join(
      ', '
    )}] ` + `under: [${BUNDLE_FORMATS.map(b => b.directory).join(', ')}]`
  );

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

  const output = await flatMapAsync(files, async file => {
    const { basename, moduleName, prefix, size, source } = file;
    const formattedPrefix = prefix.filter(step => isNaN(step));
    const moduleFolder = path.join(esmFolder, ...formattedPrefix, basename);
    const jsFilepath = path.join(
      moduleFolder,
      size ? `${size}.js` : 'index.js'
    );

    await fs.ensureDir(moduleFolder);
    await fs.writeFile(jsFilepath, source);

    const esm = {
      ...file,
      outputOptions: {
        format: 'esm',
        file: jsFilepath,
      },
    };
    await Promise.all(
      BUNDLE_FORMATS.map(async ({ format, directory }) => {
        const bundle = await rollup({
          input: jsFilepath,
        });
        const outputOptions = {
          format,
          file: jsFilepath.replace(/es/, directory),
        };
        if (format === 'umd') {
          outputOptions.name = moduleName;
        }
        await bundle.write(outputOptions);
      })
    );
    return esm;
  });

  reporter.info('Building module entrypoints...');
  const entrypoint = prettier.format(
    files.reduce((acc, file) => {
      const { moduleName, descriptor } = file;
      return (
        acc + `\nexport const ${moduleName} = ${JSON.stringify(descriptor)}`
      );
    }, ''),
    prettierOptions
  );
  await fs.writeFile(esmEntrypoint, entrypoint);

  const entrypointBundle = await rollup({
    input: esmEntrypoint,
  });
  await Promise.all(
    BUNDLE_FORMATS.map(({ format, directory }) => {
      const outputOptions = {
        format,
        file: esmEntrypoint.replace(/es/, directory),
      };
      if (format === 'umd') {
        outputOptions.name = 'CarbonIcons';
      }
      return entrypointBundle.write(outputOptions);
    })
  );

  const formattedOutput = output.map(icon => {
    const {
      filename,
      basename,
      size,
      prefix,
      descriptor,
      moduleName,
      original,
      outputOptions,
    } = icon;
    return {
      filename,
      basename,
      size,
      prefix,
      descriptor,
      moduleName,
      original,
      outputOptions,
    };
  });

  await fs.writeJson(path.resolve(__dirname, '../meta.json'), formattedOutput, {
    spaces: 2,
  });

  reporter.success('Done! 🎉');
}

function getModuleName(name, size, prefixParts) {
  const prefix = prefixParts
    .filter(size => isNaN(size))
    .map(pascal)
    .join('');

  if (prefix !== '') {
    if (!size) {
      return prefix + pascal(name) + 'Glyph';
    }
    return prefix + pascal(name) + size;
  }

  if (!size) {
    return pascal(name) + 'Glyph';
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
    moduleName: getModuleName(basename, size, prefix),
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

async function findPackageJsonFor(filepath) {
  let workingDirectory = path.dirname(filepath);
  while (workingDirectory !== path.dirname(workingDirectory)) {
    const files = await fs.readdir(workingDirectory);
    if (files.indexOf('package.json') !== -1) {
      return fs.readFile(path.join(workingDirectory, 'package.json'), 'utf8');
    }
    workingDirectory = path.dirname(workingDirectory);
  }
  throw new Error(
    `Unable to find a corresponding \`package.json\` for file: \`${filepath}\``
  );
}

module.exports = build;
