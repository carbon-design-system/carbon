/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

describe('output', () => {
  let Metadata;
  let vol;
  let icons;
  let pictogramExtension;
  let memory;
  let assets;
  let output;
  let extensions;

  beforeEach(() => {
    jest.mock('fs', () => {
      const memfs = require('memfs');
      vol = memfs.vol;
      return memfs.fs;
    });

    Metadata = require('../../../');
    memory = require('../../../adapters/memory');
    icons = require('../../icons');
    pictogramExtension = require('../../pictograms');
    assets = require('../../assets');
    output = require('../');

    extensions = [icons, assets, output];
  });

  afterEach(() => {
    vol.reset();
    memory.filesystem.clear();
  });

  it('should decorate the metadata with an output field with downsized assets', async () => {
    const icons = [
      {
        name: 'test-a',
        friendly_name: 'test-a',
        sizes: [32],
        assets: [
          {
            size: 32,
            source: '<svg width="32" height="32" viewBox="0 0 32 32"></svg>',
            filepath: '32/test-a.svg',
          },
        ],
      },
    ];
    const files = {};

    for (const icon of icons) {
      for (const asset of icon.assets) {
        files[`/src/svg/${asset.filepath}`] = asset.source;
      }
    }

    memory.filesystem.set(
      '/icons',
      icons.map((icon) => {
        return {
          name: icon.name,
          friendly_name: icon.friendly_name,
          sizes: icon.sizes,
        };
      })
    );

    vol.fromJSON(files);

    const metadata = await Metadata.load({
      adapter: memory,
      input: {
        svg: '/src/svg',
        extensions: '/',
      },
      extensions,
    });

    for (const icon of icons) {
      const match = metadata.icons.find((entry) => {
        return icon.name === entry.name;
      });

      expect(match).toHaveProperty('output');
      // We downsample from 32 to 24, 20, and 16
      expect(match.output.length).toBe(4);

      for (const info of match.output) {
        expect(info).toHaveProperty('moduleName');
        expect(info).toHaveProperty('filepath');
        expect(info).toHaveProperty('descriptor');
      }
    }
  });

  it('should not downsample an asset if there is a bespoke size asset available', async () => {
    const icons = [
      {
        name: 'test-a',
        friendly_name: 'test-a',
        sizes: [32, 16],
        assets: [
          {
            size: 32,
            source: '<svg width="32" height="32" viewBox="0 0 32 32"></svg>',
            filepath: '32/test-a.svg',
          },
          {
            size: 16,
            source:
              '<svg width="16" height="16" viewBox="0 0 16 16" data-test-id="test"></svg>',
            filepath: '16/test-a.svg',
          },
        ],
      },
    ];
    const files = {};

    for (const icon of icons) {
      for (const asset of icon.assets) {
        files[`/src/svg/${asset.filepath}`] = asset.source;
      }
    }

    memory.filesystem.set(
      '/icons',
      icons.map((icon) => {
        return {
          name: icon.name,
          friendly_name: icon.friendly_name,
          sizes: icon.sizes,
        };
      })
    );

    vol.fromJSON(files);

    const metadata = await Metadata.load({
      adapter: memory,
      input: {
        svg: '/src/svg',
        extensions: '/',
      },
      extensions,
    });

    const [icon] = metadata.icons;
    const bespoke = icon.output.find((output) => {
      return output.descriptor.size === 16;
    });
    expect(bespoke.descriptor.attrs).toHaveProperty('data-test-id', 'test');
  });

  it('should support the pictogram target for assets without sizes', async () => {
    const pictograms = [
      {
        name: 'test-a',
        friendly_name: 'test-a',
        assets: [
          {
            source: '<svg width="32" height="32" viewBox="0 0 32 32"></svg>',
            filepath: 'test-a.svg',
          },
        ],
      },
    ];
    const files = {};

    for (const pictogram of pictograms) {
      for (const asset of pictogram.assets) {
        files[`/src/svg/${asset.filepath}`] = asset.source;
      }
    }

    memory.filesystem.set(
      '/pictograms',
      pictograms.map((pictogram) => {
        return {
          name: pictogram.name,
          friendly_name: pictogram.friendly_name,
        };
      })
    );

    vol.fromJSON(files);

    const metadata = await Metadata.load({
      adapter: memory,
      input: {
        svg: '/src/svg',
        extensions: '/',
      },
      extensions: [
        pictogramExtension,
        assets,
        [output, { target: 'pictograms' }],
      ],
    });

    for (const pictogram of pictograms) {
      const icon = metadata.icons.find((icon) => {
        return icon.name === pictogram.name;
      });

      // We don't downsample pictogram assets
      expect(icon.output.length).toBe(1);
      expect(icon.output[0]).toHaveProperty('moduleName');
      expect(icon.output[0]).toHaveProperty('filepath');
      expect(icon.output[0]).toHaveProperty('descriptor');
    }
  });
});
