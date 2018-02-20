import React from 'react';
import { mount } from 'enzyme';
import { Table, TableHead } from '../';

describe('DataTable.TableHead', () => {
  it('should render', () => {
    const wrapper = mount(
      <Table>
        <TableHead className="custom-class" />
      </Table>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
