import React from 'react';
import ListItem from '../ListItem';
import { shallow } from 'enzyme';

describe('ListItem', () => {
  describe('Renders as expected', () => {
    const item = shallow(<ListItem className="some-class">An Item</ListItem>);

    it('should render as an li element', () => {
      expect(item.find('li').length).toEqual(1);
    });

    it('should render with the appropriate classes', () => {
      expect(item.hasClass('bx--list__item')).toEqual(true);
      expect(item.hasClass('some-class')).toEqual(true);
    });

    it('should include child content', () => {
      expect(item.text()).toEqual('An Item');
    });
  });
});
