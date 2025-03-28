/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { getByText } from '@carbon/test-utils/dom';
import userEvent from '@testing-library/user-event';
import { FilterableMultiSelect } from '../';
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
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(
      <FilterableMultiSelect {...mockProps} slug={<AILabel />} />
    );
    await waitForPosition();

    expect(container.firstChild).toHaveClass(
      `${prefix}--list-box__wrapper--slug`
    );
    spy.mockRestore();
  });

  it('should respect decorator prop', async () => {
    const { container } = render(
      <FilterableMultiSelect {...mockProps} decorator={<AILabel />} />
    );
    await waitForPosition();

    expect(container.firstChild).toHaveClass(
      `${prefix}--list-box__wrapper--decorator`
    );
  });

  it('should place the given id on the listbox wrapper', async () => {
    render(<FilterableMultiSelect {...mockProps} id="custom-id" />);
    await waitForPosition();

    expect(document.querySelector(`.${prefix}--list-box`).id).toBe('custom-id');
  });

  it('should render with initial selected items', async () => {
    const initialSelectedItems = [mockProps.items[0], mockProps.items[1]];
    render(
      <FilterableMultiSelect
        {...mockProps}
        initialSelectedItems={initialSelectedItems}
      />
    );
    await waitForPosition();

    expect(
      screen.getAllByRole('button', { name: 'Clear all selected items' })
    ).toHaveLength(1);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should handle disabled state', async () => {
    render(<FilterableMultiSelect {...mockProps} disabled={true} />);
    await waitForPosition();

    expect(screen.getByRole('combobox')).toBeDisabled();
    await userEvent.click(screen.getByRole('combobox'));
    assertMenuClosed();
  });

  it('should handle invalid state', async () => {
    render(
      <FilterableMultiSelect
        {...mockProps}
        invalid={true}
        invalidText="Invalid selection"
      />
    );
    await waitForPosition();

    expect(screen.getByText('Invalid selection')).toBeInTheDocument();
    expect(
      screen.getByRole('combobox').closest(`.${prefix}--multi-select`)
    ).toHaveClass(`${prefix}--multi-select--invalid`);
  });

  it('should handle warning state', async () => {
    render(
      <FilterableMultiSelect
        {...mockProps}
        warn={true}
        warnText="Warning message"
      />
    );
    await waitForPosition();

    expect(screen.getByText('Warning message')).toBeInTheDocument();
    expect(
      screen.getByRole('combobox').closest(`.${prefix}--multi-select`)
    ).not.toHaveClass(`${prefix}--multi-select--invalid`);
  });

  it('should call onInputValueChange when typing', async () => {
    const onInputValueChange = jest.fn();
    render(
      <FilterableMultiSelect
        {...mockProps}
        onInputValueChange={onInputValueChange}
      />
    );
    await waitForPosition();

    await openMenu();
    await userEvent.type(screen.getByRole('combobox'), 'test');

    expect(onInputValueChange).toHaveBeenCalledWith('test');
  });

  it('should clear all selections when clicking clear all button', async () => {
    const initialSelectedItems = [mockProps.items[0], mockProps.items[1]];
    render(
      <FilterableMultiSelect
        {...mockProps}
        initialSelectedItems={initialSelectedItems}
      />
    );
    await waitForPosition();

    await userEvent.click(
      screen.getByRole('button', { name: 'Clear all selected items' })
    );

    expect(mockProps.onChange).toHaveBeenCalledWith({ selectedItems: [] });
  });

  it('should handle different sizes', async () => {
    const { rerender } = render(
      <FilterableMultiSelect {...mockProps} size="sm" />
    );
    await waitForPosition();

    expect(
      screen.getByRole('combobox').closest(`.${prefix}--multi-select`)
    ).toHaveClass(`${prefix}--list-box--sm`);

    rerender(<FilterableMultiSelect {...mockProps} size="lg" />);
    await waitForPosition();

    expect(
      screen.getByRole('combobox').closest(`.${prefix}--multi-select`)
    ).toHaveClass(`${prefix}--list-box--lg`);
  });

  it('should handle selectionFeedback prop', async () => {
    render(
      <FilterableMultiSelect
        {...mockProps}
        selectionFeedback="top-after-reopen"
      />
    );
    await waitForPosition();

    await openMenu();
    await userEvent.click(screen.getAllByRole('option')[2]);
    await userEvent.click(findMenuIconNode());
    await openMenu();

    expect(screen.getAllByRole('option')[0]).toHaveTextContent('Item 2');
  });

  it('should handle custom itemToString prop', async () => {
    const customItemToString = (item) => `Custom ${item.label}`;
    render(
      <FilterableMultiSelect {...mockProps} itemToString={customItemToString} />
    );
    await waitForPosition();

    await openMenu();

    expect(screen.getByText('Custom Item 0')).toBeInTheDocument();
  });

  it('should handle custom compareItems prop', async () => {
    const customCompareItems = (a, b) => {
      if (a.text && b.text) {
        return b.text.localeCompare(a.text);
      }
      return 0;
    };
    render(
      <FilterableMultiSelect {...mockProps} compareItems={customCompareItems} />
    );
    await waitForPosition();

    await openMenu();

    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveTextContent('Item 0');
    expect(options[4]).toHaveTextContent('Item 4');
  });

  it('should handle autoAlign prop', async () => {
    const { container } = render(
      <FilterableMultiSelect {...mockProps} autoAlign />
    );
    await waitForPosition();

    expect(container.firstChild).toHaveClass(`${prefix}--autoalign`);
  });

  it('should handle inline type', async () => {
    const { container } = render(
      <FilterableMultiSelect {...mockProps} type="inline" />
    );
    await waitForPosition();

    expect(container.firstChild).toHaveClass(
      `${prefix}--multi-select__wrapper--inline`
    );
  });

  it('should handle hideLabel prop', async () => {
    render(
      <FilterableMultiSelect {...mockProps} titleText="Test Title" hideLabel />
    );
    await waitForPosition();

    expect(screen.getByText('Test Title')).toHaveClass(
      `${prefix}--visually-hidden`
    );
  });

  it('should handle custom filterItems function', async () => {
    const customFilterItems = jest.fn((items) =>
      items.filter((item) => item.label.includes('2'))
    );
    render(
      <FilterableMultiSelect {...mockProps} filterItems={customFilterItems} />
    );
    await waitForPosition();

    await openMenu();
    await userEvent.type(screen.getByRole('combobox'), '2');

    expect(customFilterItems).toHaveBeenCalled();
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('should handle custom sortItems function', async () => {
    const customSortItems = jest.fn((items) =>
      [...items].sort((a, b) => b.label.localeCompare(a.label))
    );
    render(
      <FilterableMultiSelect {...mockProps} sortItems={customSortItems} />
    );
    await waitForPosition();

    await openMenu();

    expect(customSortItems).toHaveBeenCalled();
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveTextContent('Item 4');
    expect(options[4]).toHaveTextContent('Item 0');
  });

  it('should handle useTitleInItem prop', async () => {
    render(<FilterableMultiSelect {...mockProps} useTitleInItem />);
    await waitForPosition();

    await openMenu();

    const option = screen.getAllByRole('option')[0];
    expect(option.querySelector('span')).toHaveAttribute('title', 'Item 0');
  });

  it('should handle helperText prop', async () => {
    render(
      <FilterableMultiSelect {...mockProps} helperText="This is helper text" />
    );
    await waitForPosition();

    expect(screen.getByText('This is helper text')).toHaveClass(
      `${prefix}--form__helper-text`
    );
  });

  it('should handle itemToElement prop', async () => {
    const items = [{ text: 'test-item' }];
    const label = 'test-label';

    render(
      <FilterableMultiSelect
        id="custom-id"
        label={label}
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        itemToElement={(item) =>
          item ? (
            <span className="test-element" data-testid="custom-id-item">
              {item.text}{' '}
              <span role="img" aria-label="fire">
                {' '}
                🔥
              </span>
            </span>
          ) : (
            <span></span>
          )
        }
      />
    );
    await waitForPosition();

    await openMenu();

    expect(screen.getAllByTestId('custom-id-item')).toHaveLength(1);
    expect(screen.getByText('test-item')).toBeInTheDocument();
  });

  it('should handle custom translateWithId', async () => {
    const translateWithId = jest.fn((id) => `Custom ${id}`);
    render(
      <FilterableMultiSelect {...mockProps} translateWithId={translateWithId} />
    );
    await waitForPosition();

    await openMenu();
    expect(translateWithId).toHaveBeenCalled();
    expect(screen.getByTitle('Custom close.menu')).toBeInTheDocument();
  });

  it('should handle keyboard navigation', async () => {
    render(<FilterableMultiSelect {...mockProps} />);
    await waitForPosition();

    const input = screen.getByRole('combobox');
    await userEvent.type(input, '{arrowdown}');
    expect(mockProps.onMenuChange).toHaveBeenCalledWith(true);

    await userEvent.keyboard('[Enter]');
    expect(screen.getAllByRole('option')[0]).toHaveAttribute(
      'aria-selected',
      'true'
    );

    await userEvent.type(input, '{escape}');
    assertMenuClosed();
  });

  it('should handle clearInputValue function', async () => {
    render(<FilterableMultiSelect {...mockProps} />);
    await waitForPosition();

    await openMenu();
    await userEvent.type(screen.getByRole('combobox'), 'test');
    expect(screen.getByRole('combobox')).toHaveValue('test');

    const clearButton = screen.getByRole('button', {
      name: 'Clear selected item',
    });
    await userEvent.click(clearButton);
    expect(screen.getByRole('combobox')).toHaveValue('');
  });

  it('should handle selectionFeedback prop with "fixed" value', async () => {
    render(<FilterableMultiSelect {...mockProps} selectionFeedback="fixed" />);
    await waitForPosition();

    await openMenu();
    await userEvent.click(screen.getAllByRole('option')[2]);
    await userEvent.click(findMenuIconNode());
    await openMenu();

    const options = screen.getAllByRole('option');
    expect(options[2]).toHaveTextContent('Item 2');
    expect(options[2]).toHaveAttribute('aria-selected', 'true');
  });

  it('should call onMenuChange when menu is opened and closed via keyboard', async () => {
    render(<FilterableMultiSelect {...mockProps} />);
    await waitForPosition();

    const input = screen.getByRole('combobox');
    await userEvent.type(input, '{arrowdown}');
    expect(mockProps.onMenuChange).toHaveBeenCalledWith(true);

    await userEvent.type(input, '{escape}');
    expect(mockProps.onMenuChange).toHaveBeenCalledWith(false);
  });

  it('should respect changes to the open prop over time', async () => {
    const { rerender } = render(
      <FilterableMultiSelect {...mockProps} open={false} />
    );
    await waitForPosition();
    assertMenuClosed();

    rerender(<FilterableMultiSelect {...mockProps} open={true} />);
    await waitForPosition();
    assertMenuOpen(mockProps);

    rerender(<FilterableMultiSelect {...mockProps} open={false} />);
    await waitForPosition();
    assertMenuClosed();
  });

  it('should have proper aria attributes for accessibility', async () => {
    render(<FilterableMultiSelect {...mockProps} titleText="Test Title" />);
    await waitForPosition();

    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveAttribute('aria-haspopup', 'listbox');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(combobox);

    expect(combobox).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('should render properly with an empty items array', async () => {
    render(<FilterableMultiSelect {...mockProps} items={[]} />);
    await waitForPosition();

    await userEvent.click(screen.getByRole('combobox'));

    expect(screen.queryByRole('option')).not.toBeInTheDocument();
  });

  it('should handle rapid selection and deselection of items', async () => {
    render(<FilterableMultiSelect {...mockProps} />);
    await waitForPosition();

    await userEvent.click(screen.getByRole('combobox'));

    const options = screen.getAllByRole('option');

    // Rapidly select and deselect items
    await userEvent.click(options[0]);
    await userEvent.click(options[1]);
    await userEvent.click(options[0]);
    await userEvent.click(options[2]);
    await userEvent.click(options[1]);

    expect(mockProps.onChange).toHaveBeenCalledTimes(5);
    expect(mockProps.onChange).toHaveBeenLastCalledWith({
      selectedItems: [mockProps.items[2]],
    });
  });

  it('should update input value but not clear selection on Delete key press', async () => {
    const initialSelectedItems = [mockProps.items[0]];
    render(
      <FilterableMultiSelect
        {...mockProps}
        initialSelectedItems={initialSelectedItems}
      />
    );
    await waitForPosition();

    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'test');
    await userEvent.keyboard('{Delete}');

    expect(input).toHaveValue();
    expect(mockProps.onChange).not.toHaveBeenCalled(); // Selection should remain unchanged
  });

  it('should clear selection when the clear selection button is clicked', async () => {
    const user = userEvent.setup();
    const initialSelectedItems = [mockProps.items[0]];
    render(
      <FilterableMultiSelect
        {...mockProps}
        initialSelectedItems={initialSelectedItems}
      />
    );
    await waitForPosition();

    const clearButton = screen.getByRole('button', {
      name: /Clear all selected items/i,
    });
    await user.click(clearButton);

    expect(mockProps.onChange).toHaveBeenCalledWith({ selectedItems: [] });
  });

  it('should handle multiple item selection and removal', async () => {
    const user = userEvent.setup();
    render(<FilterableMultiSelect {...mockProps} />);
    await waitForPosition();

    // Select multiple items
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Item 0'));
    await user.click(screen.getByText('Item 1'));

    expect(mockProps.onChange).toHaveBeenLastCalledWith({
      selectedItems: [mockProps.items[0], mockProps.items[1]],
    });

    // Remove all selected items
    const clearButton = screen.getByRole('button', {
      name: /Clear all selected items/i,
    });
    await user.click(clearButton);

    expect(mockProps.onChange).toHaveBeenLastCalledWith({ selectedItems: [] });
  });

  it('should clear selection when Backspace is pressed on selected item (SelectedItemKeyDownBackspace)', async () => {
    const initialSelectedItems = [mockProps.items[0]];
    render(
      <FilterableMultiSelect
        {...mockProps}
        initialSelectedItems={initialSelectedItems}
      />
    );
    await waitForPosition();

    // Get the selected item element (the tag/chip showing the selection)
    const selectionElement = screen.getByLabelText('Clear all selected items');
    await userEvent.type(selectionElement, '{Backspace}');

    expect(mockProps.onChange).toHaveBeenCalledWith({ selectedItems: [] });
  });

  it('should clear selection when Delete is pressed on selected item (SelectedItemKeyDownDelete)', async () => {
    const initialSelectedItems = [mockProps.items[0]];
    render(
      <FilterableMultiSelect
        {...mockProps}
        initialSelectedItems={initialSelectedItems}
      />
    );
    await waitForPosition();

    const selectionElement = screen.getByLabelText('Clear all selected items');
    await userEvent.type(selectionElement, '{Delete}');

    expect(mockProps.onChange).toHaveBeenCalledWith({ selectedItems: [] });
  });

  it('should clear selection when Backspace is pressed in dropdown (DropdownKeyDownBackspace)', async () => {
    const initialSelectedItems = [mockProps.items[0]];
    const user = userEvent.setup();

    render(
      <FilterableMultiSelect
        {...mockProps}
        initialSelectedItems={initialSelectedItems}
      />
    );
    await waitForPosition();

    // First click to open dropdown
    const combobox = screen.getByRole('combobox');
    await user.click(combobox);

    // Select the item to ensure it's in focus
    await user.click(screen.getByText('Item 0'));

    // Press backspace in the input
    await user.type(combobox, '{Backspace}', { skipClick: true });

    // Verify that onChange was called with empty selection
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [],
    });
  });

  it('should clear selection when removal function is triggered (FunctionRemoveSelectedItem)', async () => {
    const initialSelectedItems = [mockProps.items[0]];
    render(
      <FilterableMultiSelect
        {...mockProps}
        initialSelectedItems={initialSelectedItems}
      />
    );
    await waitForPosition();

    const clearButton = screen.getByLabelText('Clear all selected items');
    await userEvent.click(clearButton);

    expect(mockProps.onChange).toHaveBeenCalledWith({ selectedItems: [] });
  });

  it('should clear selection when Backspace is pressed in dropdown with multiple selections', async () => {
    const initialSelectedItems = [mockProps.items[0], mockProps.items[1]];
    const user = userEvent.setup();

    render(
      <FilterableMultiSelect
        {...mockProps}
        initialSelectedItems={initialSelectedItems}
        selectedItems={initialSelectedItems} // Add this to ensure controlled behavior
      />
    );
    await waitForPosition();

    const combobox = screen.getByRole('combobox');

    // First focus the input
    await user.tab(); // Focus into the component

    // Ensure we have the initial selections
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(combobox).toHaveValue('');

    // Now trigger the backspace
    await user.keyboard('{Backspace}');

    // Check that the onChange was called with empty selection
    expect(mockProps.onChange).toHaveBeenCalledWith({ selectedItems: [] });
  });

  it('should clear selection using keyboard navigation and Delete key', async () => {
    const initialSelectedItems = [mockProps.items[0]];
    render(
      <FilterableMultiSelect
        {...mockProps}
        initialSelectedItems={initialSelectedItems}
      />
    );
    await waitForPosition();

    // Navigate to the selected item using Tab
    await userEvent.tab();
    await userEvent.keyboard('{Delete}');

    expect(mockProps.onChange).toHaveBeenCalledWith({ selectedItems: [] });
  });

  it('should clear selection when Delete is pressed in dropdown', async () => {
    const initialSelectedItems = [mockProps.items[0]];
    const user = userEvent.setup();

    render(
      <FilterableMultiSelect
        {...mockProps}
        initialSelectedItems={initialSelectedItems}
      />
    );
    await waitForPosition();

    const combobox = screen.getByRole('combobox');
    await user.tab();

    await user.keyboard('{Delete}');

    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItems: [],
    });
  });

  it('should handle focus on regular elements', async () => {
    const user = userEvent.setup();
    render(<FilterableMultiSelect {...mockProps} />);
    await waitForPosition();

    const combobox = screen.getByRole('combobox');
    await user.click(combobox);

    // Regular focus should show focus state
    expect(combobox.closest(`.${prefix}--list-box`)).toHaveClass(
      `${prefix}--multi-select--filterable--input-focused`
    );
  });

  it('should maintain focus state appropriately when selecting items', async () => {
    const user = userEvent.setup();
    render(<FilterableMultiSelect {...mockProps} />);
    await waitForPosition();

    const combobox = screen.getByRole('combobox');
    await user.click(combobox);

    // Select an item
    const options = screen.getAllByRole('option');
    await user.click(options[0]);

    // Verify focus state is maintained after selection
    expect(combobox.closest(`.${prefix}--list-box`)).toHaveClass(
      `${prefix}--multi-select--filterable--input-focused`
    );
  });

  it('should call `onMenuChange` exactly once on mount when `open` prop is provided', async () => {
    render(<FilterableMultiSelect {...mockProps} open />);
    await waitForPosition();

    expect(mockProps.onMenuChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onMenuChange).toHaveBeenCalledWith(true);
  });

  it('should not re-trigger `onMenuChange` on re-render if `open` prop remains unchanged', async () => {
    const { rerender } = render(<FilterableMultiSelect {...mockProps} open />);
    await waitForPosition();

    // Initially called once on mount.
    expect(mockProps.onMenuChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onMenuChange).toHaveBeenCalledWith(true);

    // Rerender with the same open prop value.
    rerender(<FilterableMultiSelect {...mockProps} open />);
    await waitForPosition();

    // The callback should not be called again.
    expect(mockProps.onMenuChange).toHaveBeenCalledTimes(1);
  });

  it('should not call `onMenuChange` on mount when uncontrolled', async () => {
    render(<FilterableMultiSelect {...mockProps} />);
    await waitForPosition();

    // Since uncontrolled mode only fires on interactions, expect no call on
    // mount.
    expect(mockProps.onMenuChange).not.toHaveBeenCalled();
  });

  it('should call `onMenuChange` when user interactions trigger state changes', async () => {
    render(<FilterableMultiSelect {...mockProps} />);
    await waitForPosition();

    // Open the menu by clicking the combobox.
    await userEvent.click(screen.getByRole('combobox'));
    expect(mockProps.onMenuChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onMenuChange).toHaveBeenCalledWith(true);
    mockProps.onMenuChange.mockClear();

    // Close the menu by clicking outside of it.
    await userEvent.click(document.body);
    expect(mockProps.onMenuChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onMenuChange).toHaveBeenCalledWith(false);
  });
});
