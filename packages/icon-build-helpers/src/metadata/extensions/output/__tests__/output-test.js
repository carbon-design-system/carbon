/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

describe('categories', () => {
  let Metadata;
  let extension;
  let vol;
  let yml;

  beforeEach(() => {
    jest.mock('fs', () => {
      const memfs = require('memfs');
      vol = memfs.vol;
      return memfs.fs;
    });

    Metadata = require('../../');
    extension = require('../');
  });

  afterEach(() => {
    vol.reset();
  });

  it('should work', async () => {
    // const files = {};
    // vol.fromJSON(files);
    // const metadata = await Metadata.load({
    // input: {
    // svg: '/',
    // extensions: '/',
    // },
    // extensions: [extension],
    // });
  });
});
