import React from 'react';
import TableHead from '../TableHead';
import { shallow } from 'enzyme';

describe('TableHead', () => {
  describe('Renders as expected', () => {
    const thead = shallow(
      <TableHead>
        <tr />
      </TableHead>
    );

    it('has the expected classes', () => {
      expect(thead.hasClass('bx--table-head')).toEqual(true);
    });

    it('should render a thead with the appropriate class', () => {
      const theadEl = thead.find('thead');
      expect(theadEl.hasClass('bx--table-head')).toEqual(true);
    });

    it('should add extra classes that are passed via className for the table', () => {
      thead.setProps({ className: 'extra-class' });
      const tableEl = thead.find('thead');
      expect(tableEl.hasClass('extra-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(thead.find('tr').length).toEqual(1);
    });
  });
});
