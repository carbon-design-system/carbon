/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DataTableSkeleton from '../DataTableSkeleton/';
import { shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('DataTableSkeleton', () => {
  describe('Renders as expected', () => {
    const rowCount = 20;
    const columnCount = 3;
    const headers = ['Name', 'Protocol', 'Port'];
    const wrapper = shallow(
      <DataTableSkeleton
        compact
        rowCount={rowCount}
        columnCount={columnCount}
        headers={headers}
      />
    );

    it('Has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--skeleton`)).toEqual(true);
      expect(wrapper.hasClass(`${prefix}--data-table`)).toEqual(true);
    });

    it('Has the correct number of rows and columns', () => {
      expect(wrapper.find('thead > tr > th').length).toEqual(columnCount);
      expect(wrapper.find('tbody > tr').length).toEqual(rowCount);
      expect(wrapper.find('tbody > tr > td').length).toEqual(
        rowCount * columnCount
      );
    });

    it('Has the correct headers', () => {
      wrapper
        .find('thead > tr > th')
        .forEach((header, index) => expect(header.text()).toBe(headers[index]));
    });
  });
});

describe('DataTableSkeleton Compact', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<DataTableSkeleton compact />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--skeleton`)).toEqual(true);
      expect(wrapper.hasClass(`${prefix}--data-table`)).toEqual(true);
      expect(wrapper.hasClass(`${prefix}--data-table--compact`)).toEqual(true);
    });
  });
});

describe('DataTableSkeleton Zebra', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<DataTableSkeleton zebra />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--skeleton`)).toEqual(true);
      expect(wrapper.hasClass(`${prefix}--data-table`)).toEqual(true);
      expect(wrapper.hasClass(`${prefix}--data-table--zebra`)).toEqual(true);
    });
  });
});
