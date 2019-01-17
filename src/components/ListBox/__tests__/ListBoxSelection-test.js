/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import ListBox from '../';

describe('ListBoxSelection', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      clearSelection: jest.fn(),
      translateWithId: jest.fn(() => 'translation'),
    };
  });

  it('should render', () => {
    const singleSelectionWrapper = mount(<ListBox.Selection {...mockProps} />);
    const multiSelectionWrapper = mount(
      <ListBox.Selection selectionCount={3} {...mockProps} />
    );
    expect(singleSelectionWrapper).toMatchSnapshot();
    expect(multiSelectionWrapper).toMatchSnapshot();
  });

  it('should call `translateWithId` with the id strings needed to translate', () => {
    mount(<ListBox.Selection {...mockProps} />);
    expect(mockProps.translateWithId).toHaveBeenCalledWith('clear.selection');

    mockProps.translateWithId.mockClear();

    mount(<ListBox.Selection {...mockProps} selectionCount={3} />);
    expect(mockProps.translateWithId).toHaveBeenCalledWith('clear.all');
  });
});
