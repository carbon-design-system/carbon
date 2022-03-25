/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { TableToolbarSearch } from '../';

const prefix = 'cds';

describe('DataTable.TableToolbarSearch', () => {
  it('should render', () => {
    const wrapper = mount(
      <TableToolbarSearch
        className="custom-class"
        onChange={jest.fn()}
        id="custom-id"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should set an appropriate unique id', () => {
    const wrapper = mount(
      <TableToolbarSearch className="custom-class" onChange={jest.fn()} />
    );
    expect(typeof wrapper.find('Search').prop('id')).toBe('string');
  });
  it('should pass handleExpand as second parameter to onBlur/onFocus when provided', () => {
    const onBlur = jest.fn().mockImplementation((event, handleExpand) => {
      const { value } = event.target;
      if (!value) {
        handleExpand(event, false);
      }
    });
    const onFocus = jest.fn().mockImplementation((event, handleExpand) => {
      handleExpand(event, true);
    });
    const wrapper = mount(
      <TableToolbarSearch
        onChange={jest.fn()}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    );
    wrapper.find('input').simulate('focus');
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(typeof onFocus.mock.calls[0][1]).toEqual('function');
    expect(wrapper.find('div').first().instance()).toHaveClass(
      `${prefix}--toolbar-search-container-active`
    );
    wrapper.find('input').simulate('blur', { target: { value: 'test' } });
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(typeof onBlur.mock.calls[0][1]).toEqual('function');

    // should continue to be expanded, because the input has a value.
    expect(wrapper.find('div').first().instance()).toHaveClass(
      `${prefix}--toolbar-search-container-active`
    );
  });

  it('should expand/contract as normal when no onBlur/onFocus provided', () => {
    const wrapper = mount(<TableToolbarSearch onChange={jest.fn()} />);
    wrapper.find('input').simulate('focus');
    expect(wrapper.find('div').first().instance()).toHaveClass(
      `${prefix}--toolbar-search-container-active`
    );
    wrapper.find('input').simulate('blur');
    expect(wrapper.find('div').first().instance()).not.toHaveClass(
      `${prefix}--toolbar-search-container-active`
    );
  });
});
