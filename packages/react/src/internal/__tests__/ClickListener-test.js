/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ClickListener from '../ClickListener';
import { shallow, mount } from 'enzyme';

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

  it('should render', () => {
    const wrapper = shallow(
      <ClickListener onClickOutside={onClickOutside}>
        <div>
          <div className="child">Test</div>
          <div className="child">Test</div>
        </div>
      </ClickListener>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should throw a PropType validation error if passed multiple children', () => {
    // We need to make assertions on `console.error` that come from React, so let's
    // disable the `no-console` eslint rules on certain lines.
    // eslint-disable-next-line no-console
    const originalConsoleError = console.error;
    const mockConsoleError = jest.fn();
    // eslint-disable-next-line no-console
    console.error = mockConsoleError;

    shallow(
      <ClickListener onClickOutside={onClickOutside}>
        <div className="child">Test</div>
        <div className="child">Test</div>
      </ClickListener>
    );
    expect(mockConsoleError).toHaveBeenCalledWith(
      expect.stringContaining(
        'Warning: Failed prop type: Invalid prop `children` of type `array`'
      )
    );

    // eslint-disable-next-line no-console
    console.error = originalConsoleError;
  });

  it('should invoke onClickOutside if click is outside of the component', () => {
    mount(
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
    mount(
      <ClickListener onClickOutside={onClickOutside}>
        <Child ref={mockRef} />
      </ClickListener>
    );
    expect(handleRefSpy).toHaveBeenCalledTimes(1);
    expect(mockRef).toHaveBeenCalledTimes(1);
  });
});
