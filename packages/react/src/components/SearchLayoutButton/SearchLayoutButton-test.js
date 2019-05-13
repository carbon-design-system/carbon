/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ListBulleted16 from '@carbon/icons-react/lib/list--bulleted/16';
import Grid16 from '@carbon/icons-react/lib/grid/16';
import SearchLayoutButton from '../SearchLayoutButton';
import { shallow, mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('SearchLayoutButton', () => {
  const wrapper = mount(<SearchLayoutButton labelText="testlabel" />);

  describe('buttons', () => {
    const btn = wrapper.find('button');

    it('should have type="button"', () => {
      const type = btn.instance().getAttribute('type');
      expect(type).toEqual('button');
    });

    it('has expected class for sort button', () => {
      expect(btn.hasClass(`${prefix}--search-button`)).toEqual(true);
    });
  });

  describe('icons', () => {
    it('should use "list" icon for toggle button', () => {
      const icon = wrapper.find(ListBulleted16);
      expect(icon.length).toBe(1);
    });

    it('should use "grid" icon when format state is not "list"', () => {
      wrapper.setState({ format: 'not-list' });
      const icon = wrapper.find(Grid16);
      expect(icon.length).toBe(1);
    });

    it('should support specifying the layout via props', () => {
      const wrapperWithFormatProps = mount(
        <SearchLayoutButton format="grid" />
      );
      expect(wrapperWithFormatProps.find(Grid16).length).toBe(1);
      expect(wrapperWithFormatProps.find(ListBulleted16).length).toBe(0);
      wrapperWithFormatProps.setProps({ format: 'list' });
      expect(wrapperWithFormatProps.find(Grid16).length).toBe(0);
      expect(wrapperWithFormatProps.find(ListBulleted16).length).toBe(1);
    });

    it('should avoid change the format upon setting props, unless there the value actually changes', () => {
      const wrapperWithFormatProps = shallow(<SearchLayoutButton />);
      wrapperWithFormatProps.setProps({ format: 'grid' });
      wrapperWithFormatProps.setState({ format: 'list' });
      wrapperWithFormatProps.setProps({ format: 'grid' });
      expect(wrapperWithFormatProps.state().format).toEqual('list');
    });

    it('should support being notified of change in layout', () => {
      const onChangeFormat = jest.fn();
      const wrapperWithFormatProps = mount(
        <SearchLayoutButton format="grid" onChangeFormat={onChangeFormat} />
      );
      wrapperWithFormatProps.find('button').simulate('click');
      wrapperWithFormatProps.find('button').simulate('click');
      expect(onChangeFormat.mock.calls).toEqual([
        [{ format: 'list' }],
        [{ format: 'grid' }],
      ]);
    });
  });
});
