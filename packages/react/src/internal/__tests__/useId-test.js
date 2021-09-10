/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, cleanup } from '@carbon/test-utils/react';
import React from 'react';
import { useId } from '../useId';

describe('useId', () => {
  afterEach(cleanup);

  it('should generate a unique id that is stable across renders', () => {
    function Test() {
      const id = useId('test');
      return <span id={id}>test</span>;
    }

    const container = document.createElement('div');
    const getTestId = () => container.firstChild.getAttribute('id');

    render(<Test />, { container });

    const id = getTestId();
    expect(getTestId()).toBeDefined();

    render(<Test />, { container });
    expect(id).toBe(getTestId());
  });
});
