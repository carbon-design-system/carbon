import React from 'react';
import { mount } from 'enzyme';
import { TableToolbarAction } from '../';

describe('DataTable.TableToolbarAction', () => {
  it('should render', () => {
    const wrapper = mount(
      <TableToolbarAction
        className="custom-class"
        iconName="add--glyph"
        iconDescription="Add"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
