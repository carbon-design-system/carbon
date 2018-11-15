'use strict';

const fs = require('fs-extra');
const path = require('path');
const rollup = require('rollup').rollup;
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

async function bundle(entrypoint, { cwd, name } = {}) {
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
  const bundle = await rollup({
    input: entrypoint,
    plugins: [
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
        }

        return bundle.write(outputOptions);
      })
  );
}

module.exports = bundle;
