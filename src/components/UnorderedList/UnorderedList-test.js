import React from 'react';
import UnorderedList from '../UnorderedList';
import ListItem from '../ListItem';
import { shallow } from 'enzyme';

describe('UnorderedList', () => {
  describe('Renders as expected', () => {
    const list = shallow(
      <UnorderedList className="some-class">
        <ListItem>Item</ListItem>
      </UnorderedList>
    );

    it('should be a ul element', () => {
      expect(list.find('ul').length).toEqual(1);
    });

    it('should render with the appropriate classes', () => {
      expect(list.hasClass('bx--list--unordered')).toEqual(true);
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
