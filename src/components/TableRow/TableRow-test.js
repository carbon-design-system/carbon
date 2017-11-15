import React from 'react';
import TableRow from '../TableRow';
import { shallow } from 'enzyme';

describe('TableRow', () => {
  describe('Renders as expected', () => {
    const tableRow = shallow(
      <TableRow>
        <td />
      </TableRow>
    );

    it('should render a tr with the appropriate class', () => {
      const trEl = tableRow.find('tr');
      expect(trEl.hasClass('bx--table-row')).toEqual(true);
      expect(trEl.hasClass('bx--parent-row')).toEqual(true);
    });

    it('should not render the parent row class if a header row', () => {
      tableRow.setProps({ header: true });
      const trEl = tableRow.find('tr');
      expect(trEl.hasClass('bx--parent-row')).toEqual(false);
    });

    it('should add extra classes that are passed via className for the tr', () => {
      tableRow.setProps({ className: 'extra-class' });
      expect(tableRow.hasClass('extra-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(tableRow.find('td').length).toEqual(1);
    });
  });
});
