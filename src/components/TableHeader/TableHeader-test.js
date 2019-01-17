/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { iconCaretDown } from 'carbon-icons';
import TableHeader from '../TableHeader';
import Icon from '../Icon';
import { shallow } from 'enzyme';

describe('TableHeader', () => {
  describe('Renders as expected', () => {
    const theader = shallow(
      <TableHeader>
        <p>Content</p>
      </TableHeader>
    );

    it('should render a th with the appropriate class', () => {
      const thEl = theader.find('th');
      expect(thEl.hasClass('bx--table-header')).toEqual(true);
    });

    it('should add extra classes that are passed via className for the th', () => {
      theader.setProps({ className: 'extra-class' });
      expect(theader.hasClass('extra-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(theader.find('p').length).toEqual(1);
    });

    it('should render a down icon if sortDir is passed in', () => {
      theader.setProps({ sortDir: 'DESC' });
      const icon = theader.find(Icon);
      expect(icon.length).toEqual(1);
      expect(icon.hasClass('bx--table-sort__svg')).toEqual(true);
      expect(icon.props().icon).toEqual(iconCaretDown);
    });
  });
});
