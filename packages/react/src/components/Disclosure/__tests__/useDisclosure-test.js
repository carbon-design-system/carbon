/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useDisclosure } from '../../Disclosure';

describe('useDisclosure', () => {
  // https://www.w3.org/TR/wai-aria-practices-1.1/#keyboard-interaction-8
  it.todo('should toggle visibility when the button is clicked');
  it.todo(
    'should toggle visibility when the button is focused and Enter or Space is pressed'
  );

  // https://www.w3.org/TR/wai-aria-practices-1.1/#wai-aria-roles-states-and-properties-8
  it.todo('should set `aria-expanded` to match the visibility of the content');
  it.todo('should set `aria-controls` to match the id of the content');
  it.todo('should set `id` on the content');
});
