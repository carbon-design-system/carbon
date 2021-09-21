/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as CarbonElements from '../';

test('Public API should only change with a semver change', () => {
  expect(Object.keys(CarbonElements).sort()).toMatchSnapshot();
});
