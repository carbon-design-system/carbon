/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { HeaderContainer } from '../';

describe('HeaderContainer', () => {
  it('should support rendering through a render prop', () => {
    const renderProp = jest.fn(() => null);
    render(<HeaderContainer render={renderProp} />);
    expect(renderProp).toHaveBeenCalled();
    expect(renderProp).toHaveBeenCalledWith(
      {
        isSideNavExpanded: false,
        onClickSideNavExpand: expect.any(Function),
      },
      {}
    );
  });

  it('should call the `render` prop any time the state changes', () => {
    let _onClickSideNavExpand;
    const renderProp = jest.fn(({ onClickSideNavExpand }) => {
      _onClickSideNavExpand = onClickSideNavExpand;
      return null;
    });
    render(<HeaderContainer render={renderProp} isSideNavExpanded />);

    expect(renderProp).toHaveBeenCalledWith(
      {
        isSideNavExpanded: true,
        onClickSideNavExpand: expect.any(Function),
      },
      {}
    );

    act(() => {
      _onClickSideNavExpand();
    });

    expect(renderProp).toHaveBeenCalledWith(
      {
        isSideNavExpanded: false,
        onClickSideNavExpand: expect.any(Function),
      },
      {}
    );
  });
});
