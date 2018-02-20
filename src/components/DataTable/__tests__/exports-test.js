import fs from 'fs';
import path from 'path';
import * as DataTable from '../../DataTable';

const COMPONENT_PATH = path.resolve(__dirname, '../');
const blacklist = new Set([
  'README.md',
  'state',
  'tools',
  '.DS_Store',
  'index.js',
  'DataTable-story.js',
  '__tests__',
  '__mocks__',
  'DataTable.js',
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
