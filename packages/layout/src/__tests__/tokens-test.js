/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { unstable_tokens as tokens } from '../tokens';
import * as Layout from '../';

describe('@carbon/layout tokens', () => {
  test.each(tokens)('%s should be exported', token => {
    expect(Layout[token]).toBeDefined();
  });
});
