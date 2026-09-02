/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default {
  preset: 'jest-config-carbon',
  testMatch: ['<rootDir>/e2e/**/*-test.js'],
  testPathIgnorePatterns: [],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!chalk|@babel/)'],
};
