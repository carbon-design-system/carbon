import React from 'react';
import { mount } from 'enzyme';
import { Table, TableBody, TableRow, TableCell } from '../';

describe('DataTable.TableCell', () => {
  it('should render', () => {
    const wrapper = mount(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="custom-class" />
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
