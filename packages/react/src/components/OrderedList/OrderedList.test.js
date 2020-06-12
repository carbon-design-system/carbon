/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import OrderedList from '../OrderedList';
import ListItem from '../ListItem';
import { shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

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
      expect(list.hasClass(`${prefix}--list--ordered`)).toEqual(true);
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
