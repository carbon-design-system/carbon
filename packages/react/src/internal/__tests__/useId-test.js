/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { useId } from '../useId';

describe('useId', () => {
  it('should generate a unique id that is stable across renders', () => {
    function Test() {
      const id = useId('test');
      return <span id={id}>test</span>;
    }

    render(<Test />);
    expect(screen.getByText('test')).toHaveAttribute('id', 'test-1');
  });
});
