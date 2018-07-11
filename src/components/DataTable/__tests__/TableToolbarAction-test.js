import React from 'react';
import { mount } from 'enzyme';
import { iconAddSolid } from 'carbon-icons';
import { TableToolbarAction } from '../';

describe('DataTable.TableToolbarAction', () => {
  it('should render', () => {
    const wrapper = mount(
      <TableToolbarAction
        className="custom-class"
        icon={iconAddSolid}
        iconDescription="Add"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
