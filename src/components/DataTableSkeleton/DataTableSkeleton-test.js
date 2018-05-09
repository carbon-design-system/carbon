import React from 'react';
import DataTableSkeleton from '../DataTableSkeleton/';
import { shallow } from 'enzyme';

describe('DataTableSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<DataTableSkeleton compact rowCount={20} />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--skeleton')).toEqual(true);
      expect(wrapper.hasClass('bx--data-table-v2')).toEqual(true);
    });
  });
});

describe('DataTableSkeleton Compact', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<DataTableSkeleton compact />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--skeleton')).toEqual(true);
      expect(wrapper.hasClass('bx--data-table-v2')).toEqual(true);
      expect(wrapper.hasClass('bx--data-table-v2--compact')).toEqual(true);
    });
  });
});

describe('DataTableSkeleton Zebra', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<DataTableSkeleton zebra />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--skeleton')).toEqual(true);
      expect(wrapper.hasClass('bx--data-table-v2')).toEqual(true);
      expect(wrapper.hasClass('bx--data-table-v2--zebra')).toEqual(true);
    });
  });
});
