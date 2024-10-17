/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { act, render, screen } from '@testing-library/react';
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

  // it('should handle locale prop', async () => {
  //   const customCompareItems = jest.fn((a, b, options = {}) => {
  //     // Use the 'label' property for comparison
  //     return a.label.localeCompare(b.label, options.locale);
  //   });

  //   render(
  //     <FilterableMultiSelect
  //       {...mockProps}
  //       locale="fr"
  //       compareItems={customCompareItems}
  //     />
  //   );

  //   await waitForPosition();
  //   await openMenu();

  //   // Verify that customCompareItems was called
  //   expect(customCompareItems).toHaveBeenCalled();

  //   // Check that it was called with the correct locale
  //   const calls = customCompareItems.mock.calls;
  //   expect(calls.some((call) => call[2] && call[2].locale === 'fr')).toBe(true);

  //   // Verify the structure of the items being compared
  //   const firstCall = customCompareItems.mock.calls[0];
  //   expect(firstCall[0]).toMatchObject({
  //     id: expect.stringContaining('id-'),
  //     label: expect.stringContaining('Item '),
  //     value: expect.any(Number),
  //   });
  //   expect(firstCall[1]).toMatchObject({
  //     id: expect.stringContaining('id-'),
  //     label: expect.stringContaining('Item '),
  //     value: expect.any(Number),
  //   });
  // });

  // it('should handle direction prop', async () => {
  //   const { container } = render(
  //     <FilterableMultiSelect {...mockProps} direction="top" />
  //   );
  //   await waitForPosition();

  //   expect(container.querySelector(`.${prefix}--list-box`)).toHaveClass(
  //     `${prefix}--list-box--up`
  //   );
  // });

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
              <span role="img" alt="fire">
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

  // it('should handle fluid form context', async () => {
  //   const user = userEvent.setup();
  //   const FormContext = React.createContext({ isFluid: true });

  //   render(
  //     <FormContext.Provider value={{ isFluid: true }}>
  //       <FilterableMultiSelect {...mockProps} />
  //     </FormContext.Provider>
  //   );

  //   await waitForPosition();

  //   // Find the input element (combobox) within the FilterableMultiSelect
  //   const combobox = screen.getByRole('combobox');

  //   // Click on the combobox
  //   await user.click(combobox);

  //   // Find the list box wrapper
  //   const listBoxWrapper = combobox.closest(`.${prefix}--list-box__wrapper`);

  //   // Check if the wrapper has the fluid focus class
  //   expect(listBoxWrapper).toHaveClass(
  //     `${prefix}--list-box__wrapper--fluid--focus`
  //   );
  // });

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
});
