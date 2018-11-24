const fs = require('fs-extra');
const path = require('path');
const { LIB } = require('../src/paths');
const build = require('../src/build');

const timeout = 60 * 1000;

beforeAll(async () => {
  if (await fs.pathExists(LIB)) {
    const files = await fs.readdir(LIB);
    if (files.length > 0) {
      return;
    }
  }

  await build();
});

describe('LIB', () => {
  it(
    'should build an entrypoint that is require-able',
    async () => {
      const indexJsPath = path.join(LIB, 'index.js');
      expect(await fs.pathExists(indexJsPath)).toBe(true);

      expect(() => {
        require(indexJsPath);
      }).not.toThrow();
    },
    timeout
  );

  it(
    'should generate .d.ts files',
    async () => {
      const exists = await fs.pathExists(path.join(LIB, 'index.d.ts'));
      expect(exists).toBe(true);
    },
    timeout
  );

  it(
    'should generate .ngfactory.js files',
    async () => {
      const exists = await fs.pathExists(
        path.join(LIB, 'IconModule.ngfactory.js')
      );
      expect(exists).toBe(true);
    },
    timeout
  );
});
