/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { createRef } from 'react';
import { mount, configure as enzymeConfigure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzymeConfigure({
  adapter: new Adapter(),
});
import TableColumnResizer from '../TableColumnResizer';
import columnResize from '../tools/columnResize';

jest.mock('../tools/columnResize', () => {
  const hookReturnVal = {
    colWidth: 100,
    ref: null,
    columnKeyResizeActive: null,
    initColumnResizing: jest.fn(),
    cleanupColumnResizing: jest.fn(),
    startResizeAction: jest.fn(),
    endResizeAction: jest.fn(),
    resizeColumn: jest.fn(),
    syncOnWindowResize: jest.fn(),
  };
  return {
    hookReturnVal,
    useColumnResizing: () => hookReturnVal,
  };
});

describe('DataTable.TableColumnResizer', () => {
  const ref = createRef();
  let wrapper = null;

  beforeEach(() => {
    jest.clearAllMocks();
    // make sure we only have one wrapper around - otherwise
    // wrappers from earlier tests will receive mouse events
    wrapper = mount(<TableColumnResizer headerRef={ref} colKey="aKey" />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
    expect(columnResize.hookReturnVal.initColumnResizing).toHaveBeenCalledTimes(
      1
    );

    wrapper.unmount();
    expect(
      columnResize.hookReturnVal.cleanupColumnResizing
    ).toHaveBeenCalledTimes(1);
  });

  it('should start resizing on mouse-down and stop on mouse-up', () => {
    expect(document.onmouseup).toBeFalsy();
    expect(document.onmousemove).toBeFalsy();
    expect(document.body.style.cursor).toEqual('');

    wrapper.simulate('mouseDown');
    expect(columnResize.hookReturnVal.startResizeAction).toHaveBeenCalledTimes(
      1
    );
    expect(document.onmouseup).toBeTruthy();
    expect(document.onmousemove).toBeTruthy();
    expect(document.body.style.cursor).toEqual('col-resize');

    // mouse move is not caught with react so explicitely call it
    const mouseMoveEv = new Event('mousemove');
    document.onmousemove(mouseMoveEv);
    expect(columnResize.hookReturnVal.resizeColumn).toHaveBeenCalledTimes(1);

    const mouseUpEv = new Event('mouseup');
    document.onmouseup(mouseUpEv);
    expect(columnResize.hookReturnVal.endResizeAction).toHaveBeenCalledTimes(1);
    expect(document.onmouseup).toBeFalsy();
    expect(document.onmousemove).toBeFalsy();
    expect(document.body.style.cursor).toEqual('default');
    wrapper.unmount();
  });

  it('should sync column widths on window resize', () => {
    // mouse move is not caught with react so explicitely call it
    global.dispatchEvent(new Event('resize'));
    expect(columnResize.hookReturnVal.syncOnWindowResize).toHaveBeenCalledTimes(
      1
    );
    wrapper.unmount();
    jest.clearAllMocks();

    global.dispatchEvent(new Event('resize'));
    expect(columnResize.hookReturnVal.syncOnWindowResize).toHaveBeenCalledTimes(
      0
    );
  });
});
