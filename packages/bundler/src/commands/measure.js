/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const chalk = require('chalk');
const Table = require('cli-table');
const filesize = require('filesize');
const fs = require('fs-extra');
const path = require('path');
const glob = require('../glob');
const gzipSize = require('gzip-size');
const { reporter } = require('@carbon/cli-reporter');
const compile = require('../tools/compile');

async function measure(pattern, { cwd, output, ignore = [] }) {
  const outputFilename = 'results.json';
  const outputFilepath = output
    ? path.join(output, outputFilename)
    : path.join(cwd, outputFilename);
  reporter.info(`Running in: ${cwd}`);
  reporter.info(`Checking pattern: '${pattern}', ignoring: '${ignore}'`);
  reporter.info(`Writing results to: ${outputFilepath}`);

  const files = await glob(pattern, {
    cwd,
    ignore,
  });

  const results = await Promise.all(
    compile(files.map(file => path.join(cwd, file)))
  );

  const errors = results.reduce((acc, result) => {
    if (result.error) {
      const error = result.error;
      error.filepath = result.filepath;
      return acc.concat(error);
    }
    return acc;
  }, []);

  if (errors.length > 0) {
    errors.forEach(error => {
      const { formatted, filepath } = error;
      reporter.error(`Error compiling ${path.relative(cwd, filepath)}`);
      console.log(chalk.gray(formatted));
    });
    process.exit(1);
    return;
  }

  // At this point, we've successfully compiled all of our scss files and now we
  // need to start getting the corresponding size values and compare them to
  // previous results, if they exist.

  const prevResults = (await fs.pathExists(outputFilepath))
    ? await fs.readJson(outputFilepath)
    : {};
  const nextResults = await Promise.all(
    results.map(async ({ result, filepath }) => ({
      filename: path.basename(filepath),
      package: await findPackageFor(filepath),
      size: Buffer.byteLength(result.css),
      gzip: await gzipSize(result.css),
    }))
  );

  await fs.writeJson(outputFilepath, nextResults, {
    spaces: 2,
  });

  console.log(printResults(prevResults, nextResults));
}

// Rough heuristic used to find the package name for a given file. Idea is to
// move upwards looking for directories that have a `package.json` file. Once we
// find one, we report back the name from that file.
async function findPackageFor(filepath) {
  let directory = filepath;

  while (directory !== '/') {
    const directoryToSearch = path.dirname(directory);
    const files = await fs.readdir(directoryToSearch);

    if (files.indexOf('package.json') !== -1) {
      const packageJson = await fs.readJson(
        path.join(directoryToSearch, 'package.json')
      );
      return packageJson.name;
    }

    directory = path.resolve(directory, '..');
  }

  throw new Error(`Unable to find package for: ${filepath}`);
}

function printResults(prevResults, results) {
  const resultsHeaders = [
    'Package',
    'File',
    'Prev Size',
    'Current Size',
    'Diff',
    'Prev Gzip',
    'Current Gzip',
    'Diff',
  ];

  const table = new Table({
    head: resultsHeaders.map(label => chalk.gray.yellow(label)),
  });

  results.forEach(result => {
    const prevResult =
      prevResults.find(prevResult => {
        return (
          prevResult.filename === result.filename &&
          prevResult.package === result.package
        );
      }) || {};

    table.push([
      chalk.white.bold(result.package),
      chalk.white.bold(result.filename),
      chalk.gray.bold(prevResult.size || 0),
      chalk.white.bold(filesize(result.size)),
      percentChangeString(fractionalChange(prevResult.size, result.size)),
      chalk.gray.bold(prevResult.gzip || 0),
      chalk.white.bold(filesize(result.gzip)),
      percentChangeString(fractionalChange(prevResult.gzip, result.gzip)),
    ]);
  });

  return table.toString();
}

function fractionalChange(prev, current) {
  return (current - prev) / prev;
}

function percentChangeString(change) {
  if (!isFinite(change)) {
    // When a new package is created
    return 'n/a';
  }
  const formatted = (change * 100).toFixed(1);
  if (/^-|^0(?:\.0+)$/.test(formatted)) {
    return `${formatted}%`;
  } else {
    return `+${formatted}%`;
  }
}

module.exports = measure;
