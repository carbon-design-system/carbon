/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { isValidOption } from '..';

describe('isValidOptions', () => {
  it('Option to be invalid', () => {
    expect(isValidOption(['/expected to cause warning during test'])).toEqual(
      false
    );
  });
});
