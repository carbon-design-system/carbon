import React from 'react';
import Icon from '../Icon';
import SearchLayoutButton from '../SearchLayoutButton';
import { mount } from 'enzyme';

describe('SearchLayoutButton', () => {
  const wrapper = mount(<SearchLayoutButton labelText="testlabel" />);

  describe('buttons', () => {
    const btn = wrapper.find('button');

    it('should have type="button"', () => {
      const type = btn.instance().getAttribute('type');
      expect(type).toEqual('button');
    });

    it('has expected class for sort button', () => {
      expect(btn.hasClass('bx--search-button')).toEqual(true);
    });
  });

  describe('icons', () => {
    it('should use "list" icon for toggle button', () => {
      const icon = wrapper.find(Icon);
      expect(icon.props().name).toEqual('list');
    });

    it('should use "grid" icon when format state is not "list"', () => {
      wrapper.setState({ format: 'not-list' });
      const icon = wrapper.find(Icon);
      expect(icon.props().name).toEqual('grid');
    });

    it('should support specifying the layout via props', () => {
      const wrapperWithFormatProps = mount(
        <SearchLayoutButton format="grid" />
      );
      expect(wrapperWithFormatProps.find(Icon).props().name).toEqual('grid');
      wrapperWithFormatProps.setProps({ format: 'list' });
      expect(wrapperWithFormatProps.find(Icon).props().name).toEqual('list');
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
