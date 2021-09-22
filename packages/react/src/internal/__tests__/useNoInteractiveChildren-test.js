/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { cleanup, render } from '@testing-library/react';
import React, { useRef } from 'react';
import { useNoInteractiveChildren } from '../useNoInteractiveChildren';

describe('useNoInteractiveChildren', () => {
  afterEach(cleanup);

  it('should render without errors if no interactive content is found', () => {
    function TestComponent() {
      const ref = useRef(null);
      useNoInteractiveChildren(ref);
      return <span ref={ref}>Content</span>;
    }

    expect(() => {
      render(<TestComponent />);
    }).not.toThrow();
  });

  it('should throw an error if interactive content is found', () => {
    function TestComponent() {
      const ref = useRef(null);
      useNoInteractiveChildren(ref);
      return (
        <div ref={ref}>
          <button type="button">Interactive</button>
        </div>
      );
    }

    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
