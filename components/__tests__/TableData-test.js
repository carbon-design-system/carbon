import React from 'react';
import TableData from '../TableData';
import { shallow } from 'enzyme';

describe('TableData', () => {
  describe('Renders as expected', () => {
    const td = shallow(
      <TableData>Content</TableData>
    );

    it('should render a table data element', () => {
      expect(td.find('td').length).toEqual(1);
    });

    it('should add extra classes that are passed via className for the td', () => {
      td.setProps({ className: 'extra-class' });
      const tdEl = td.find('td');
      expect(tdEl.hasClass('extra-class')).toEqual(true);
    });
  });
});
