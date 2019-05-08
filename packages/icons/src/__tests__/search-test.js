/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { createFsFromVolume, Volume } = require('memfs');

const mockSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
  <path d="M4 2v2H2V2h2zm1-1H1v4h4V1zM9" />
</svg>
`;

describe('search', () => {
  let search;
  let mockVol;
  let mockFs;

  beforeEach(() => {
    jest.resetModules();

    mockVol = Volume.fromJSON({
      '/flat/icon1.svg': mockSVG,
      '/flat/icon2.svg': mockSVG,
      '/flat/icon3.svg': mockSVG,

      '/flat+nested/icon1.svg': mockSVG,
      '/flat+nested/prefix1/icon2.svg': mockSVG,
      '/flat+nested/prefix2/icon3.svg': mockSVG,
      '/flat+nested/prefix3/prefix4/icon4.svg': mockSVG,

      '/flat+nested+sizes/icon1.svg': mockSVG,
      '/flat+nested+sizes/16/icon2.svg': mockSVG,
      '/flat+nested+sizes/32/icon3.svg': mockSVG,
      '/flat+nested+sizes/32/nested1/icon4.svg': mockSVG,
      '/flat+nested+sizes/nested2/icon5.svg': mockSVG,
      '/flat+nested+sizes/nested3/16/icon6.svg': mockSVG,
    });
    mockFs = createFsFromVolume(mockVol);

    jest.mock('fs', () => mockFs);

    search = require('../search');
  });

  it('should throw if the directory does not exist', async () => {
    expect.assertions(1);
    await expect(search('/does-not-exist')).rejects.toThrow();
  });

  it('should treat flat-level icons as glyphs', async () => {
    const results = await search('/flat');
    expect(results.length).toBe(3);
  });

  it('should treat first-level directories that are not named as numbers as prefixes', async () => {
    const results = await search('/flat+nested');
    expect(results.length).toBe(4);
    expect(results[0].prefix).toEqual([]);
    expect(results[1].prefix).toEqual(['prefix1']);
    expect(results[2].prefix).toEqual(['prefix2']);
    expect(results[3].prefix).toEqual(['prefix3', 'prefix4']);
  });

  it('should treat first-level directories named as numbers as sizes', async () => {
    const results = await search('/flat+nested+sizes');
    expect(results.length).toBe(6);

    expect(results.find(result => result.basename === 'icon1').prefix).toEqual(
      []
    );
    expect(results.find(result => result.basename === 'icon2').prefix).toEqual([
      '16',
    ]);
    expect(results.find(result => result.basename === 'icon2').size).toEqual(
      16
    );
    expect(results.find(result => result.basename === 'icon3').prefix).toEqual([
      '32',
    ]);
    expect(results.find(result => result.basename === 'icon3').size).toEqual(
      32
    );
    expect(results.find(result => result.basename === 'icon4').prefix).toEqual([
      '32',
      'nested1',
    ]);
    expect(results.find(result => result.basename === 'icon4').size).toEqual(
      32
    );
    expect(results.find(result => result.basename === 'icon5').prefix).toEqual([
      'nested2',
    ]);
    expect(
      results.find(result => result.basename === 'icon5').size
    ).not.toBeDefined();
    expect(results.find(result => result.basename === 'icon6').prefix).toEqual([
      'nested3',
      '16',
    ]);
    expect(results.find(result => result.basename === 'icon6').size).toEqual(
      16
    );
  });
});
