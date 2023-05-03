/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { reset } from '../reset';
import { print } from '../print';

describe('reset', () => {
  it('should set styles for `html` and `body`', () => {
    expect(reset.html).toBeDefined();
    expect(reset.body).toBeDefined();
  });

  it('should be printable', () => {
    expect(print(reset.html)).toMatchSnapshot();
    expect(print(reset.body)).toMatchSnapshot();
  });
});
