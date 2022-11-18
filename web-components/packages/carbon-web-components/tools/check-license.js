#!/usr/bin/env node

/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const { promisify } = require('util');
const commander = require('commander');
const reLicense = require('./license-text');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const { currentYear, reLicenseTextCurrentYear, reLicenseTextSingleYear, reLicenseTextRange } = reLicense;

/**
 * Checks files with the given paths for valid license text.
 *
 * @param {string[]} paths The file paths to check for valid license text.
 * @param {object} options The options.
 * @param {boolean} options.testCurrentYear `true` to see if the license text contains the current year.
 * @param {boolean} options.writeCurrentYear `true` to update the given file with the current year for the license text.
 * @returns {Promise<void>} The promise that is fulfilled when the check finishes.
 */
const check = async (paths, { testCurrentYear, writeCurrentYear }) => {
  const filesWithErrors = (
    await Promise.all(
      paths.map(async (item) => {
        const contents = await readFile(item, 'utf8');
        const result = (testCurrentYear || writeCurrentYear ? reLicenseTextCurrentYear : reLicense).test(contents);
        if (!result) {
          if (writeCurrentYear) {
            const newContents = contents
              .replace(reLicenseTextSingleYear, (match) => `${match}, ${currentYear}`)
              .replace(reLicenseTextRange, (match, token) => `${token}${currentYear}`);
            if (!reLicenseTextCurrentYear.test(newContents)) {
              return item;
            }
            await writeFile(item, newContents, 'utf8');
          } else {
            return item;
          }
        }
        return undefined;
      })
    )
  ).filter(Boolean);
  if (filesWithErrors.length > 0) {
    throw new Error(`Cannot find license text in: ${filesWithErrors.join(', ')}`);
  }
};

const { args, ...options } = commander
  .option('-c, --test-current-year', 'Ensures the license header represents the current year')
  .option('-w, --write-current-year', 'Updates the license header to represent the current year')
  .parse(process.argv);
check(args, options).then(
  () => {
    process.exit(0);
  },
  (error) => {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  }
);
