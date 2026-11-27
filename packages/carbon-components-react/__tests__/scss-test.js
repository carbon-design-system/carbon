/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { files } from '@carbon/styles/files';
import { SassRenderer } from '@carbon/test-utils/scss';

const { render } = SassRenderer.create(__dirname);

// All files here are just a `@forward` of a `@carbon/styles` entrypoint. Check
// that each wrapper forwards the correct module and compile once
describe('carbon-components-react/scss', () => {
  it.each(files)(
    '$filepath forwards $importPath',
    ({ filepath, importPath }) => {
      const contents = readFileSync(join(__dirname, '..', filepath), 'utf8');
      expect(contents).toContain(`@forward '${importPath}';`);
    }
  );

  it('should be importable', async () => {
    await expect(render(`@use '../index' as test;`)).resolves.toBeDefined();
  });
});
