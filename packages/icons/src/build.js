'use strict';

const { reporter } = require('@carbon/cli-reporter');
const { pascal } = require('change-case');
const del = require('del');
const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const { rollup } = require('rollup');
const { flatMapAsync } = require('./tools');
const { parse } = require('./svgo');
const optimize = require('./optimize');

const blacklist = new Set(['.DS_Store']);

const prettierOptions = {
  parser: 'babylon',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
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
  const bundles = [
    {
      type: 'cjs',
      directory: path.join(cwd, path.dirname(commonjsEntrypoint)),
    },
    {
      type: 'umd',
      directory: path.join(cwd, path.dirname(umdEntrypoint)),
    },
  ];

  reporter.info(
    `Building bundle types: [${bundles.map(b => b.type).join(', ')}] ` +
      `under: [${bundles.map(b => b.directory).join(', ')}]`
  );

  reporter.info('Cleaning up build directories...');
  await del(bundles.map(b => b.directory).concat(esmFolder));

  reporter.info('Building module source...');
  const files = optimized.map(icon => {
    const { filename, info, size } = icon;
    const { attrs, content } = info;
    const name = formatIconName(path.basename(icon.filename, '.svg'));
    const descriptor = {
      name,
      size,
      attrs: {
        ...attrs,
      },
      content,
    };

    if (size === 'glyph') {
      const [width, height] = info.attrs.viewBox.split(' ').slice(2);
      descriptor.attrs.width = width;
      descriptor.attrs.height = height;
    } else {
      descriptor.attrs.width = size;
      descriptor.attrs.height = size;
      descriptor.attrs.viewBox = `0 0 ${size} ${size}`;
    }

    return {
      icon,
      descriptor,
      source: prettier.format(
        `export default ${JSON.stringify(descriptor)};`,
        prettierOptions
      ),
      moduleName: getModuleName(name, size),
    };
  });

  reporter.info('Building JavaScript modules...');
  await Promise.all(
    files.map(async file => {
      const { descriptor, moduleName, source } = file;
      const { name, size } = descriptor;
      const moduleFolder = path.join(esmFolder, name);
      const jsFilepath = path.join(moduleFolder, `${size}.js`);

      await fs.ensureDir(moduleFolder);
      await fs.writeFile(jsFilepath, source);
      await Promise.all(
        bundles.map(async ({ type, directory }) => {
          const bundle = await rollup({
            input: jsFilepath,
          });
          const outputOptions = {
            format: type,
            file: jsFilepath.replace(/es/, directory),
          };
          if (type === 'umd') {
            outputOptions.name = moduleName;
          }
          return bundle.write(outputOptions);
        })
      );
    })
  );

  reporter.info('Building module entrypoints...');
  const moduleNames = files.map(file => file.moduleName);
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
    bundles.map(({ type, directory }) => {
      const outputOptions = {
        format: type,
        file: esmEntrypoint.replace(/es/, directory),
      };
      if (type === 'umd') {
        outputOptions.name = 'CarbonIcons';
      }
      return entrypointBundle.write(outputOptions);
    })
  );

  reporter.success('Done! 🎉');
}

function formatIconName(name) {
  return pascal(name);
}

function getModuleName(name, size) {
  const basename = name + size[0].toUpperCase() + size.slice(1);
  if (isNaN(basename[0])) {
    return pascal(basename);
  }
  return '_' + pascal(basename);
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
