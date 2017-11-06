import React from 'react';
import TableRowExpanded from '../TableRowExpanded';
import { shallow } from 'enzyme';

describe('TableRowExpanded', () => {
  describe('Renders as expected', () => {
    const tableRow = shallow(
      <TableRowExpanded>
        <p>Deep in</p>
      </TableRowExpanded>
    );

    it('if expanded, should render a tr with the appropriate class', () => {
      tableRow.setProps({ expanded: true });
      const trEl = tableRow.find('tr');
      expect(trEl.hasClass('bx--table-row')).toEqual(true);
      expect(trEl.hasClass('bx--expandable-row')).toEqual(true);
    });

    it('if expanded, should add extra classes that are passed via className for the tr', () => {
      tableRow.setProps({ expanded: true });
      tableRow.setProps({ className: 'extra-class' });
      expect(tableRow.hasClass('extra-class')).toEqual(true);
    });

    it('if expanded, should render children as expected', () => {
      tableRow.setProps({ expanded: true });
      expect(tableRow.find('p').length).toEqual(1);
    });

    it('if not expanded, should not render anything', () => {
      tableRow.setProps({ expanded: false });
      expect(tableRow.text()).toEqual('');
    });
  });
});
