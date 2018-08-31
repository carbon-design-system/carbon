'use strict';

const del = require('del');
const fs = require('fs-extra');
const path = require('path');
const icons = require('@carbon/icons');
const { pascal } = require('change-case');
const prettier = require('prettier');
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const {
  BUILD_ES_DIR,
  BUILD_CJS_DIR,
  BUILD_UMD_DIR,
  BUILD_DIRS,
} = require('../paths');
const createEntrypoint = require('./createEntrypoint');
const createModule = require('./createModule');

const prettierOptions = {
  parser: 'babylon',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
};

async function build() {
  // Clean
  console.log('Cleaning build directories');
  await del(BUILD_DIRS);

  // Build
  const tools = [
    path.resolve(__dirname, '../tools/createIconComponent.js'),
  ].map(filepath => ({
    name: 'createIconComponent',
    source: fs.readFileSync(filepath, 'utf8'),
    dest: path.join(BUILD_ES_DIR, '__tools__', path.basename(filepath)),
  }));

  console.log('Building components');
  const components = Object.keys(icons).map(key => {
    const icon = icons[key];
    const { content, viewBox, width: size } = icon;
    const folder = isUppercase(icon.name) ? icon.name : pascal(icon.name);

    return {
      name: key,
      source: createModule(key, size, viewBox, icon.content),
      dest: path.join(BUILD_ES_DIR, folder, `${size}.js`),
    };
  });
  const entrypoint = createEntrypoint(BUILD_ES_DIR, components);
  const modules = [...components, ...tools, entrypoint];

  console.log('Writing ES2015 modules');
  await Promise.all(
    modules.map(async file => {
      await fs.ensureFile(file.dest);
      await fs.writeFile(file.dest, file.source);

      // We have to make sure that we transpile the React-specific syntax that
      // we use in the module entrypoint
      const inputOptions = {
        input: file.dest,
        plugins: [
          resolve(),
          babel({
            babelrc: false,
            presets: ['@babel/preset-react'],
          }),
        ],
        external: ['react', ...tools.map(tool => tool.dest)],
      };
      const outputOptions = {
        format: 'es',
        file: file.dest,
        globals: {
          react: 'React',
        },
      };

      if (tools.includes(file)) {
        inputOptions.external = ['react'];
      }

      const bundle = await rollup(inputOptions);

      await bundle.write(outputOptions);
    })
  );

  console.log('Writing bundles');
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
    BUNDLE_TYPES.reduce((acc, { type, folder }) => {
      const components = modules.map(async file => {
        const inputOptions = {
          input: file.dest,
          plugins: [
            resolve(),
            babel({
              babelrc: false,
              presets: ['@babel/preset-react'],
            }),
          ],
          external: ['react', ...tools.map(tool => tool.dest)],
        };
        const outputOptions = {
          format: type,
          file: file.dest.replace(/\/es\//, `/${folder}/`),
          globals: {
            react: 'React',
          },
        };

        if (tools.includes(file)) {
          inputOptions.external = ['react'];
        }

        if (type === 'umd') {
          outputOptions.name = file.name;
        }

        const bundle = await rollup(inputOptions);

        await bundle.write(outputOptions);
      });
      return acc.concat(components);
    }, [])
  );
}

function isUppercase(string) {
  return string === string.toUpperCase();
}

module.exports = build;
