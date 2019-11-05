import React from 'react';
import ButtonGroup from '../ButtonGroup';
import OverflowMenuItem from '../OverflowMenuItem';
import OverflowMenu from '../OverflowMenu';
import Button from '../Button';
import { mount } from 'enzyme';

describe('SplitButton', () => {
  describe('renders as expected', () => {
    const wrapper = mount(
      <ButtonGroup buttonLabel={'Button Label'}>
        <OverflowMenuItem itemText={'Item 1'} primaryFocus />
        <OverflowMenuItem itemText={'Item 2'} />
        <OverflowMenuItem itemText={'Item 2'} />
      </ButtonGroup>
    );

    it('displays the correct menu text', () => {
      expect(wrapper.find(Button).props().children).toEqual('Button Label');
    });

    it('renders all children as expected', () => {
      const menu = wrapper.find(OverflowMenu);

      menu.simulate('click');

      expect(wrapper.find('FloatingMenu ul').props().children.length).toEqual(
        3
      );
    });
  });
});
