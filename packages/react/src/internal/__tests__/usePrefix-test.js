/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { usePrefix, PrefixContext } from '../usePrefix';

describe('usePrefix', () => {
  afterEach(cleanup);

  it('should emit the default prefix without context', () => {
    let value = null;

    function TestComponent() {
      value = usePrefix();
      return null;
    }

    render(<TestComponent />);
    expect(value).toBe('cds');
  });

  it('should emit the prefix in context', () => {
    function TestComponent() {
      const contextValue = usePrefix();
      return <span data-testid="test">{contextValue}</span>;
    }

    render(
      <PrefixContext.Provider value="test">
        <TestComponent />
      </PrefixContext.Provider>
    );

    expect(screen.getByTestId('test')).toHaveTextContent('test');
  });
});
