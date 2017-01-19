import React from 'react';
import TableBody from '../TableBody';
import { shallow } from 'enzyme';

describe('TableBody', () => {
  describe('Renders as expected', () => {
    const rootWrapper = shallow(
      <TableBody className="extra-class">
        <td>Sample</td>
      </TableBody>
    );

    it('has the expected classes', () => {
      expect(rootWrapper.hasClass('bx--table-body')).toEqual(true);
    });

    it('should render a tbody', () => {
      const tbody = rootWrapper.find('tbody');
      expect(tbody.length).toEqual(1);
    });

    it('should render children as expected', () => {
      expect(rootWrapper.find('td').length).toEqual(1);
    });
  });
});
