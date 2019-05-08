/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import uniqueId from '../uniqueId';

describe('uniqueId', () => {
  it('increments unique id as expected', () => {
    const uniqueIdOne = uniqueId();
    const uniqueIdTwo = uniqueId();

    expect(uniqueIdOne).toEqual('id1');
    expect(uniqueIdTwo).toEqual('id2');
  });

  it('accepts a custom prefix', () => {
    const uniqueIdThree = uniqueId('customPrefix');
    expect(uniqueIdThree).toEqual('customPrefix3');
  });
});
