/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import * as tokens from '../styles';
import { print } from '../print';

describe('styles', () => {
  test.each(Object.keys(tokens))('%s should be printable', (key) => {
    const token = tokens[key];
    expect(print(token)).toMatchSnapshot();
  });
});
