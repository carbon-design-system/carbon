/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import UnorderedList from '../UnorderedList';
import ListItem from '../ListItem';
import { shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;
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
      expect(list.hasClass(`${prefix}--list--unordered`)).toEqual(true);
      expect(list.hasClass('some-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(list.find(ListItem).length).toEqual(1);
    });

    it('should render nested lists', () => {
      list.setProps({ nested: true });
      expect(list.hasClass(`${prefix}--list--nested`)).toEqual(true);
      list.setProps({ nested: false });
      expect(list.hasClass(`${prefix}--list--nested`)).toEqual(false);
    });
  });
});
