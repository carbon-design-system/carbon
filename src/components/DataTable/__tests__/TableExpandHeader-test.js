import React from 'react';
import { mount } from 'enzyme';
import { Table, TableHead, TableRow, TableExpandHeader } from '../';

describe('DataTable.TableExpandHeader', () => {
  it('should render', () => {
    const wrapper = mount(
      <Table>
        <TableHead>
          <TableRow>
            <TableExpandHeader className="custom-class" />
          </TableRow>
        </TableHead>
      </Table>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
