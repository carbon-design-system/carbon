'use strict';

const fs = require('fs-extra');
const path = require('path');
const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

async function bundle(entrypoint, { cwd, globals, name } = {}) {
  const outputFolders = [
    {
      format: 'esm',
      directory: path.join(cwd, 'es'),
    },
    {
      format: 'cjs',
      directory: path.join(cwd, 'lib'),
    },
    {
      format: 'umd',
      directory: path.join(cwd, 'umd'),
    },
  ];

  await Promise.all(outputFolders.map(({ directory }) => fs.remove(directory)));

  const jsEntrypoint = path.join(
    outputFolders.find(folder => folder.format === 'esm').directory,
    'index.js'
  );
  const packageJsonPath = path.join(cwd, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);
  const { dependencies = {} } = packageJson;

  const bundle = await rollup({
    input: entrypoint,
    external: Object.keys(dependencies),
    plugins: [
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              targets: {
                browsers: ['last 1 version', 'ie >= 11', 'Firefox ESR'],
              },
            },
          ],
        ],
        plugins: ['macros'],
      }),
      nodeResolve({
        jsnext: true,
        main: true,
        module: true,
      }),
      commonjs({
        include: ['node_modules/**'],
        extensions: ['.js'],
      }),
    ],
  });
  await bundle.write({
    format: 'esm',
    file: jsEntrypoint,
  });

  await Promise.all(
    outputFolders
      .filter(folder => folder.type !== 'esm')
      .map(({ format, directory }) => {
        const outputOptions = {
          format,
          file: jsEntrypoint.replace(/\/es\//, `/${path.basename(directory)}/`),
        };

        if (format === 'umd') {
          outputOptions.name = name;
          outputOptions.globals = globals;
        }

        return bundle.write(outputOptions);
      })
  );
}

module.exports = bundle;
