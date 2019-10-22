import React from 'react';
import SplitButton from '../SplitButton';
import OverflowMenuItem from '../OverflowMenuItem';
import Button from '../Button';
import OverflowMenu from '../OverflowMenu';
import { shallow } from 'enzyme';

describe('SplitButton', () => {
  describe('renders as expected', () => {
    const wrapper = shallow(
      <SplitButton
        classNameContainer={'extra-class'}
        classNameButton={'extra-class'}
        classNameOverflow={'extra-class'}>
        <OverflowMenuItem itemText={'Item 1'} />
        <OverflowMenuItem itemText={'Item 2'} primaryFocus />
        <OverflowMenuItem itemText={'Item 2'} />
      </SplitButton>
    );

    it('renders children as expected', () => {
      expect(wrapper.props().children.length).toEqual(2);
    });

    it('renders extra classes as expected', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
      expect(
        wrapper
          .find(Button)
          .shallow()
          .hasClass('extra-class')
      ).toEqual(true);
      expect(
        wrapper
          .find(OverflowMenu)
          .shallow()
          .hasClass('extra-class')
      ).toEqual(true);
    });
  });
});
