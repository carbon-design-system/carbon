import React from 'react';
import OrderedList from '../OrderedList';
import ListItem from '../ListItem';
import { shallow } from 'enzyme';

describe('OrderedList', () => {
  describe('Renders as expected', () => {
    const list = shallow(
      <OrderedList className="some-class">
        <ListItem>Item</ListItem>
      </OrderedList>
    );

    it('should be an ol element', () => {
      expect(list.find('ol').length).toEqual(1);
    });

    it('should render with the appropriate classes', () => {
      expect(list.hasClass('bx--list--ordered')).toEqual(true);
      expect(list.hasClass('some-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(list.find(ListItem).length).toEqual(1);
    });

    it('should render nested lists', () => {
      list.setProps({ nested: true });
      expect(list.hasClass('bx--list--nested')).toEqual(true);
      list.setProps({ nested: false });
      expect(list.hasClass('bx--list--nested')).toEqual(false);
    });
  });
});
