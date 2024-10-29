/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { getByText } from '@carbon/test-utils/dom';
import userEvent from '@testing-library/user-event';
import FilterableMultiSelect from '../FilterableMultiSelect';
import {
  assertMenuOpen,
  assertMenuClosed,
  findMenuIconNode,
  generateItems,
  generateGenericItem,
} from '../../ListBox/test-helpers';
import { AILabel } from '../../AILabel';

const prefix = 'cds';
const waitForPosition = () => act(async () => {});
const openMenu = async () => {
  await userEvent.click(screen.getByRole('combobox'));
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

  it('should display all items when the menu is open', async () => {
    render(<FilterableMultiSelect {...mockProps} />);
    await waitForPosition();

    await openMenu();
    expect(screen.getAllByRole('option').length).toBe(mockProps.items.length);
  });

  it('should call `onMenuChange` when the user clicks on the combobox', async () => {
    render(<FilterableMultiSelect {...mockProps} />);
    await waitForPosition();

    await userEvent.click(screen.getByRole('combobox'));
    expect(mockProps.onMenuChange).toHaveBeenCalledWith(true);
  });

  it('should call `onMenuChange` when the user clicks on the screen', async () => {
    render(<FilterableMultiSelect {...mockProps} open />);
    await waitForPosition();

    await userEvent.click(document.body);
    expect(mockProps.onMenuChange).toHaveBeenCalledWith(false);
  });

  it('should not be interactive if readonly', async () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <FilterableMultiSelect
        id="test"
        readOnly={true}
        label={label}
        items={items}
      />
    );
    await waitForPosition();

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const labelNode = getByText(container, label);
    await userEvent.click(labelNode);

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeFalsy();
  });
  it('should initially have the menu open when open prop is provided', async () => {
    render(<FilterableMultiSelect {...mockProps} open />);
    await waitForPosition();

    assertMenuOpen(mockProps);
  });

  it('should call `onMenuChange` when open prop is provided', async () => {
    render(<FilterableMultiSelect {...mockProps} open />);
    await waitForPosition();

    expect(mockProps.onMenuChange).toHaveBeenCalledWith(true);
  });

  it('should open the menu with a down arrow', async () => {
    render(<FilterableMultiSelect {...mockProps} />);
    await waitForPosition();

    const menuIconNode = findMenuIconNode();

    await userEvent.type(menuIconNode, '{arrowdown}');
    expect(screen.getAllByRole('option').length).toBe(mockProps.items.length);
  });

  it('should call `onMenuChange` when the user types a down arrow', async () => {
    render(<FilterableMultiSelect {...mockProps} />);
    await waitForPosition();

    const menuIconNode = findMenuIconNode();
    await userEvent.type(menuIconNode, '{arrowdown}');
    expect(mockProps.onMenuChange).toHaveBeenCalledWith(true);
  });

  it('should let the user toggle the menu by the menu icon', async () => {
    render(<FilterableMultiSelect {...mockProps} />);
    await waitForPosition();

    await userEvent.click(findMenuIconNode());

    assertMenuOpen(mockProps);
    await userEvent.click(findMenuIconNode());

    assertMenuClosed();
  });

  it('should call `onMenuChange` when the user toggles the menu by the menu icon', async () => {
    render(<FilterableMultiSelect {...mockProps} />);
    await waitForPosition();

    await userEvent.click(findMenuIconNode());
    expect(mockProps.onMenuChange).toHaveBeenCalledWith(true);

    await userEvent.click(findMenuIconNode());
    expect(mockProps.onMenuChange).toHaveBeenCalledWith(false);
  });

  it('should not close the menu after a user makes a selection', async () => {
    render(<FilterableMultiSelect {...mockProps} />);
    await waitForPosition();

    await openMenu();

    await userEvent.click(screen.getAllByRole('option')[0]);

    assertMenuOpen(mockProps);
  });

  it('should filter a list of items by the input value', async () => {
    render(<FilterableMultiSelect {...mockProps} placeholder="test" />);
    await waitForPosition();

    await openMenu();
    expect(screen.getAllByRole('option').length).toBe(mockProps.items.length);

    await userEvent.type(screen.getByPlaceholderText('test'), '3');

    expect(screen.getAllByRole('option').length).toBe(1);
  });

  it('should call `onChange` with each update to selected items', async () => {
    render(<FilterableMultiSelect {...mockProps} selectionFeedback="top" />);
    await waitForPosition();

    await openMenu();

    // Select the first two items
    await userEvent.click(screen.getAllByRole('option')[0]);

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [mockProps.items[0]],
    });

    await userEvent.click(screen.getAllByRole('option')[1]);

    expect(mockProps.onChange).toHaveBeenCalledTimes(2);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [mockProps.items[0], mockProps.items[1]],
    });

    // Un-select the next two items
    await userEvent.click(screen.getAllByRole('option')[0]);
    expect(mockProps.onChange).toHaveBeenCalledTimes(3);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [mockProps.items[0]],
    });

    await userEvent.click(screen.getAllByRole('option')[0]);
    expect(mockProps.onChange).toHaveBeenCalledTimes(4);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [],
    });
  });

  it('should let items stay at their position after selecting', async () => {
    render(<FilterableMultiSelect {...mockProps} selectionFeedback="fixed" />);
    await waitForPosition();

    await openMenu();

    // Select the first two items
    await userEvent.click(screen.getAllByRole('option')[1]);

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [mockProps.items[1]],
    });

    await userEvent.click(screen.getAllByRole('option')[1]);

    expect(mockProps.onChange).toHaveBeenCalledTimes(2);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [],
    });
  });

  it('should not clear input value after a user makes a selection', async () => {
    render(<FilterableMultiSelect {...mockProps} placeholder="test" />);
    await waitForPosition();

    await openMenu();

    await userEvent.type(screen.getByPlaceholderText('test'), '3');

    await userEvent.click(screen.getAllByRole('option')[0]);

    expect(screen.getByPlaceholderText('test')).toHaveDisplayValue(3);
  });

  it('should clear input value when clicking on cross button', async () => {
    render(<FilterableMultiSelect {...mockProps} placeholder="test" />);
    await openMenu();

    await userEvent.type(screen.getByPlaceholderText('test'), '3');

    const clearButton = screen.getByRole('button', {
      name: 'Clear selected item',
    });
    await userEvent.click(clearButton);

    expect(screen.getByPlaceholderText('test')).toHaveDisplayValue('');
  });

  it('should respect slug prop', async () => {
    const { container } = render(
      <FilterableMultiSelect {...mockProps} slug={<AILabel />} />
    );
    await waitForPosition();

    expect(container.firstChild).toHaveClass(
      `${prefix}--list-box__wrapper--slug`
    );
  });

  it('should place the given id on the listbox wrapper', async () => {
    render(<FilterableMultiSelect {...mockProps} id="custom-id" />);
    await waitForPosition();

    expect(document.querySelector(`.${prefix}--list-box`).id).toBe('custom-id');
  });
});
