/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

describe('scss/utilities/layout', () => {
  test('redefine-tokens sets layout context for shadow host ancestors', async () => {
    const { result } = await render(`
      @use 'sass:meta';
      @use '../../config' with (
        $prefix: 'cds',
      );
      @use '../layout';

      .cds--text-input {
        @include layout.redefine-tokens(
          (
            size: (
              height: (
                md: 18.75rem,
                lg: 25rem,
              ),
            ),
          )
        );
      }
    `);

    const output = result.css.toString();
    expect(output).toContain('--cds-layout-size-height-md: 18.75rem');
    expect(output).toContain('--cds-layout-size-height-lg: 25rem');
    expect(output).toContain(
      '.cds--layout--size-md :where(.cds--text-input)'
    );
    expect(output).toContain(
      ':host-context(cds-layout[size=md]) :where(.cds--text-input)'
    );
    expect(output).toContain(
      ':host-context(cds-layout[size=lg]) :where(.cds--text-input)'
    );
  });
});
