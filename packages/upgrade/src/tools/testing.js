/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const semver = require.requireActual('semver');

function defineInlineTest(
  pathToMigrations,
  version,
  input,
  expectedOutput,
  testName
) {
  let mockInput = input;
  let mockOutput;
  let mockOptions;
  let migration;

  beforeEach(() => {
    jest.resetModules();
    jest.mock('fs-extra', () => {
      return {
        async readFile() {
          return mockInput;
        },
        async writeFile(filename, contents) {
          mockOutput = contents;
        },
      };
    });
    jest.mock('fast-glob', () => {
      return () => ['mock-file-for-fast-glob'];
    });
    jest.mock('../reporter');

    mockOptions = {
      dry: false,
      ignore: [],
    };

    const migrations = require(pathToMigrations);

    [migration] = migrations.from.filter(migration => {
      return semver.satisfies(version, migration.version);
    });
    if (!migration) {
      throw new Error('Unable to find migration for version: ' + version);
    }
  });

  test(testName || 'transforms correctly', async () => {
    await migration.migrate(mockOptions);
    expect(mockOutput.trim()).toEqual(expectedOutput.trim());
  });
}

module.exports = {
  defineInlineTest,
};
