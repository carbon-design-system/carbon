/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import React, { act, type JSX } from 'react';

import { HeaderContainer } from '../';
import type { HeaderContainerRenderProps } from '../HeaderContainer';
import userEvent from '@testing-library/user-event';

type HeaderContainerRender<
  Props extends HeaderContainerRenderProps = HeaderContainerRenderProps,
> = (props: Props, context?: unknown) => JSX.Element | null;

describe('HeaderContainer', () => {
  it('should support rendering through a render prop', () => {
    const renderProp = jest.fn<HeaderContainerRender>(() => null);
    render(<HeaderContainer render={renderProp} />);
    expect(renderProp).toHaveBeenCalled();
    expect(renderProp).toHaveBeenCalledWith(
      {
        isSideNavExpanded: false,
        onClickSideNavExpand: expect.any(Function),
      },
      undefined
    );
  });

  it('should call the `render` prop any time the state changes', () => {
    let onClickSideNavExpand: (() => void) | undefined;
    const renderProp = jest.fn<HeaderContainerRender>(
      ({ onClickSideNavExpand: onClick }) => {
        onClickSideNavExpand = onClick;
        return null;
      }
    );
    render(<HeaderContainer render={renderProp} isSideNavExpanded />);

    expect(renderProp).toHaveBeenCalledWith(
      {
        isSideNavExpanded: true,
        onClickSideNavExpand: expect.any(Function),
      },
      undefined
    );

    if (!onClickSideNavExpand) {
      throw new Error('Expected the render prop to receive a click handler.');
    }
    act(onClickSideNavExpand);

    expect(renderProp).toHaveBeenCalledWith(
      {
        isSideNavExpanded: false,
        onClickSideNavExpand: expect.any(Function),
      },
      undefined
    );
  });

  it('should pass through rest props', () => {
    const rest = {
      foo: 'foo',
      bar: /bar/,
    };
    const Test = jest.fn<
      HeaderContainerRender<HeaderContainerRenderProps & typeof rest>
    >(() => <div />);

    render(<HeaderContainer render={Test} {...rest} />);

    expect(Test).toHaveBeenCalledWith(
      {
        isSideNavExpanded: false,
        onClickSideNavExpand: expect.any(Function),
        ...rest,
      },
      undefined
    );
  });

  it('should close the side nav on Escape', async () => {
    const renderProp = jest.fn<HeaderContainerRender>(() => null);

    render(<HeaderContainer render={renderProp} isSideNavExpanded />);

    await userEvent.keyboard('[Escape]');
    expect(renderProp).toHaveBeenCalledWith(
      {
        isSideNavExpanded: false,
        onClickSideNavExpand: expect.any(Function),
      },
      undefined
    );
  });
});
