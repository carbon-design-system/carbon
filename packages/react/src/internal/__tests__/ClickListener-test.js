/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ClickListener from '../ClickListener';

import { render } from '@testing-library/react';

describe('ClickListener', () => {
  let onClickOutside;
  let handleRefSpy;

  beforeEach(() => {
    onClickOutside = jest.fn();
    handleRefSpy = jest.spyOn(ClickListener.prototype, 'handleRef');
  });

  afterEach(() => {
    handleRefSpy.mockRestore();
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
      class Child extends React.Component {
        render() {
          return <div />;
        }
      }
      render(
        <ClickListener onClickOutside={onClickOutside}>
          <Child ref={mockRef} />
        </ClickListener>
      );
      expect(handleRefSpy).toHaveBeenCalledTimes(1);
      expect(mockRef).toHaveBeenCalledTimes(1);
    });
  });
});
