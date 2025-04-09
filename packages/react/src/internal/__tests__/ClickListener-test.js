/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React, { forwardRef } from 'react';
import { ClickListener } from '../ClickListener';

describe('ClickListener', () => {
  let onClickOutside;

  beforeEach(() => {
    onClickOutside = jest.fn();
  });

  describe('renders as expected - Component API', () => {
    it('should render', () => {
      const { container } = render(
        <ClickListener onClickOutside={onClickOutside}>
          <div>
            <div className="child">Test</div>
            <div className="child">Test</div>
          </div>
        </ClickListener>
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('behaves as expected', () => {
    it('should invoke onClickOutside if click is outside of the component', () => {
      render(
        <ClickListener onClickOutside={onClickOutside}>
          <div>
            <div className="child">Test</div>
            <div className="child">Test</div>
          </div>
        </ClickListener>
      );

      const evt = new MouseEvent('click');
      document.dispatchEvent(evt);

      expect(onClickOutside).toHaveBeenCalled();
    });

    it('should not overwrite any children function refs', () => {
      const mockRef = jest.fn();
      const Child = forwardRef((props, ref) => <div ref={ref} {...props} />);

      render(
        <ClickListener onClickOutside={onClickOutside}>
          <Child ref={mockRef} />
        </ClickListener>
      );

      expect(mockRef).toHaveBeenCalledTimes(1);
    });
  });
});
