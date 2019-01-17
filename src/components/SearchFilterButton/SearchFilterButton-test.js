/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Icon from '../Icon';
import SearchFilterButton from '../SearchFilterButton';
import { mount } from 'enzyme';
import { iconFilter } from 'carbon-icons';

describe('SearchFilterButton', () => {
  const wrapper = mount(<SearchFilterButton labelText="testlabel" />);

  describe('buttons', () => {
    const btn = wrapper.find('button');

    it('should have type="button"', () => {
      const type = btn.instance().getAttribute('type');
      expect(type).toEqual('button');
    });

    it('has expected class', () => {
      expect(btn.hasClass('bx--search-button')).toEqual(true);
    });
  });

  describe('icons', () => {
    it('should use "filter" icon', () => {
      const icon = wrapper.find(Icon);
      expect(icon.props().icon).toEqual(iconFilter);
    });
  });
});
