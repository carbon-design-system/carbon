import React from 'react';
import { mount } from 'enzyme';
import { Table, TableBody } from '../';

describe('DataTable.TableBody', () => {
  it('should render', () => {
    const wrapper = mount(
      <Table>
        <TableBody className="custom-class" />
      </Table>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
