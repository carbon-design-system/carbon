/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { files } from '@carbon/styles/files';
import { SassRenderer } from '@carbon/test-utils/scss';

const { render } = SassRenderer.create(__dirname);

const relativePaths = files.map((file) => {
  return file.relativePath;
});

describe('@carbon/react/scss', () => {
  describe.each(relativePaths)('%s', (relativePath) => {
    it('should be importable', async () => {
      await expect(
        render(`@use '../${relativePath}' as test;`)
      ).resolves.toBeDefined();
    });
  });
});
