/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { unstable_tokens as tokens } from '../tokens';
import * as styles from '../styles';

describe('type tokens', () => {
  test.each(tokens)('%s should be defined in styles', (token) => {
    expect(styles[token]).toBeDefined();
  });

  test.each(Object.keys(styles))('%s should be defined in tokens', (token) => {
    expect(tokens.indexOf(token)).not.toBe(-1);
  });
});
