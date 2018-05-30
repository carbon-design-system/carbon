import React from 'react';
import Icon from '../Icon';
import SearchFilterButton from '../SearchFilterButton';
import { mount } from 'enzyme';

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
      expect(icon.props().name).toEqual('filter');
    });
  });
});
