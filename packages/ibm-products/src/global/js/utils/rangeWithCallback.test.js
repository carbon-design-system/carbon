//
// Copyright IBM Corp. 2022, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import { rangeWithCallback } from './rangeWithCallback';

// Tests the utility function rangeWithCallback
// which iterates between two numbers while calling
// a callback function for each iteration
describe('rangeWithCallback', () => {
  it('calls the callback fn for each iteration', async () => {
    const testFn = jest.fn();
    rangeWithCallback(1, 10, () => {
      testFn();
    });
    expect(testFn).toHaveBeenCalledTimes(10);
  });
});
