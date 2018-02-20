import React from 'react';
import { mount } from 'enzyme';
import { Table, TableBody, TableRow } from '../';

describe('DataTable.TableRow', () => {
  it('should render', () => {
    const wrapper = mount(
      <Table>
        <TableBody>
          <TableRow className="custom-class" />
        </TableBody>
      </Table>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
