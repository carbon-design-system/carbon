/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

// @use '../theme';
// @use '../themes';

// :root {
// @include theme.theme(themes.$white);
// @include theme.theme((
// notification-background-success: 'foobar',
// ));
// }

describe('Component Tokens', () => {
  test('component tokenks', async () => {
    const { unwrap } = await render(`
      @use 'sass:meta';
      @use '../components/notification/tokens';

      $_: get('tokens', meta.module-variables('tokens'));
      // $_: get('white', tokens.$white);
    `);

    console.log(unwrap('tokens'));
    // console.log(unwrap('white'));
  });
});
