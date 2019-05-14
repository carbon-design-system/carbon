/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import OverflowMenuItem from '../OverflowMenuItem';
import { shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;
const shallowRender = props => shallow(<OverflowMenuItem {...props} />);

describe('OverflowMenuItem', () => {
  describe('Renders as expected', () => {
    it('should render a button and text as expected', () => {
      const wrapper = shallowRender({
        itemText: 'testing',
        onSelect() {},
      });

      const button = wrapper.find('button');

      expect(button.length).toEqual(1);
      expect(button.text()).toEqual('testing');
      expect(wrapper.type()).toEqual('li');
    });

    it('should have the correct classes', () => {
      const wrapper = shallowRender({
        itemText: 'testing',
        onSelect() {},
      });

      const button = wrapper.find('button');
      expect(button.hasClass(`${prefix}--overflow-menu-options__btn`)).toEqual(
        true
      );
    });

    it('should have the correct class when hasDivider is true', () => {
      const wrapper = shallowRender({
        itemText: 'testing',
        onSelect() {},
        hasDivider: true,
      });

      expect(wrapper.hasClass(`${prefix}--overflow-menu--divider`)).toEqual(
        true
      );
    });

    it('renders an anchor when passed href', () => {
      const wrapper = shallowRender({
        itemText: 'testing',
        href: 'testing',
      });

      expect(wrapper.find('a').length).toBe(1);
    });
  });
});
