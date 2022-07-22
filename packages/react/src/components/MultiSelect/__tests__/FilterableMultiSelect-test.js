/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterableMultiSelect from '../FilterableMultiSelect';
import {
  assertMenuOpen,
  assertMenuClosed,
  findMenuIconNode,
  generateItems,
  generateGenericItem,
} from '../../ListBox/test-helpers';

const openMenu = () => {
  userEvent.click(screen.getByRole('combobox'));
};

describe('FilterableMultiSelect', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      id: 'test-filterable-multiselect',
      disabled: false,
      items: generateItems(5, generateGenericItem),
      initialSelectedItems: [],
      onChange: jest.fn(),
      onMenuChange: jest.fn(),
      placeholder: 'Placeholder...',
    };
  });

  it('should display all items when the menu is open', () => {
    render(<FilterableMultiSelect {...mockProps} />);
    openMenu();
    expect(screen.getAllByRole('option').length).toBe(mockProps.items.length);
  });

  it('should initially have the menu open when open prop is provided', () => {
    render(<FilterableMultiSelect {...mockProps} open />);
    assertMenuOpen(mockProps);
  });

  it('should open the menu with a down arrow', () => {
    render(<FilterableMultiSelect {...mockProps} />);
    const menuIconNode = findMenuIconNode();

    userEvent.type(menuIconNode, '{arrowdown}');
    expect(screen.getAllByRole('option').length).toBe(mockProps.items.length);
  });

  it('should let the user toggle the menu by the menu icon', () => {
    render(<FilterableMultiSelect {...mockProps} />);
    userEvent.click(findMenuIconNode());

    assertMenuOpen(mockProps);
    userEvent.click(findMenuIconNode());

    assertMenuClosed();
  });

  it('should not close the menu after a user makes a selection', () => {
    render(<FilterableMultiSelect {...mockProps} />);
    openMenu();

    userEvent.click(screen.getAllByRole('option')[0]);

    assertMenuOpen(mockProps);
  });

  it('should filter a list of items by the input value', () => {
    render(<FilterableMultiSelect {...mockProps} placeholder="test" />);
    openMenu();
    expect(screen.getAllByRole('option').length).toBe(mockProps.items.length);

    userEvent.type(screen.getByPlaceholderText('test'), '3');

    expect(screen.getAllByRole('option').length).toBe(1);
  });

  it('should call `onChange` with each update to selected items', () => {
    render(<FilterableMultiSelect {...mockProps} selectionFeedback="top" />);
    openMenu();

    // Select the first two items
    userEvent.click(screen.getAllByRole('option')[0]);

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [mockProps.items[0]],
    });

    userEvent.click(screen.getAllByRole('option')[1]);

    expect(mockProps.onChange).toHaveBeenCalledTimes(2);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [mockProps.items[0], mockProps.items[1]],
    });

    // Un-select the next two items
    userEvent.click(screen.getAllByRole('option')[0]);
    expect(mockProps.onChange).toHaveBeenCalledTimes(3);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [mockProps.items[0]],
    });

    userEvent.click(screen.getAllByRole('option')[0]);
    expect(mockProps.onChange).toHaveBeenCalledTimes(4);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [],
    });
  });

  it('should let items stay at their position after selecting', () => {
    render(<FilterableMultiSelect {...mockProps} selectionFeedback="fixed" />);
    openMenu();

    // Select the first two items
    userEvent.click(screen.getAllByRole('option')[1]);

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [mockProps.items[1]],
    });

    userEvent.click(screen.getAllByRole('option')[1]);

    expect(mockProps.onChange).toHaveBeenCalledTimes(2);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [],
    });
  });

  it('should not clear input value after a user makes a selection', () => {
    render(<FilterableMultiSelect {...mockProps} placeholder="test" />);
    openMenu();

    userEvent.type(screen.getByPlaceholderText('test'), '3');

    userEvent.click(screen.getAllByRole('option')[0]);

    expect(screen.getByPlaceholderText('test')).toHaveDisplayValue(3);
  });
});
