/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs';
import path from 'path';
import * as DataTable from '../../DataTable';

const COMPONENT_PATH = path.resolve(__dirname, '../');
const blacklist = new Set([
  'README.md',
  'migrate-to-7.x.md',
  'state',
  'tools',
  '.DS_Store',
  'index.js',
  'DataTable-story.js',
  '__tests__',
  '__mocks__',
  'DataTable.js',
  'stories',
]);
const components = fs
  .readdirSync(COMPONENT_PATH)
  .filter(name => !blacklist.has(name))
  .map(name => path.basename(name, '.js'));

describe('DataTable exports', () => {
  it('should export DataTable by default', () => {
    expect(typeof DataTable.default).toBe('function');
    expect(DataTable.default.name).toBe('DataTable');
  });

  components.forEach(component => {
    it(`should have a named export for Component: ${component}`, () => {
      expect(DataTable[component]).toBeDefined();
      expect(DataTable.default[component]).toBeDefined();
    });
  });
});
