/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  findListBoxNode,
  assertMenuOpen,
  assertMenuClosed,
  generateItems,
  generateGenericItem,
} from '../ListBox/test-helpers';
import ComboBox from '../ComboBox';

const findInputNode = () => screen.getByRole('combobox');
const openMenu = () => {
  userEvent.click(findInputNode());
};

describe('ComboBox', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      id: 'test-combobox',
      items: generateItems(5, generateGenericItem),
      onChange: jest.fn(),
      placeholder: 'Filter...',
      type: 'default',
    };
  });

  it('should display the menu of items when a user clicks on the input', () => {
    render(<ComboBox {...mockProps} />);

    userEvent.click(findInputNode());

    assertMenuOpen(mockProps);
  });

  it('should call `onChange` each time an item is selected', () => {
    render(<ComboBox {...mockProps} />);
    expect(mockProps.onChange).not.toHaveBeenCalled();

    for (let i = 0; i < mockProps.items.length; i++) {
      openMenu();

      userEvent.click(screen.getAllByRole('option')[i]);

      expect(mockProps.onChange).toHaveBeenCalledTimes(i + 1);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItem: mockProps.items[i],
      });
    }
  });

  it('capture filter text events', () => {
    const onInputChange = jest.fn();
    render(<ComboBox {...mockProps} onInputChange={onInputChange} />);

    userEvent.type(findInputNode(), 'something');

    expect(onInputChange).toHaveBeenCalledWith('something');
  });

  it('should render custom item components', () => {
    const itemToElement = jest.fn((item) => {
      return <div className="mock-item">{item.text}</div>;
    });
    render(<ComboBox {...mockProps} itemToElement={itemToElement} />);
    openMenu();

    expect(itemToElement).toHaveBeenCalled();
  });

  it('should let the user select an option by clicking on the option node', () => {
    render(<ComboBox {...mockProps} />);
    openMenu();

    userEvent.click(screen.getAllByRole('option')[0]);

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: mockProps.items[0],
    });
    assertMenuClosed();

    mockProps.onChange.mockClear();

    openMenu();

    userEvent.click(screen.getAllByRole('option')[1]);
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: mockProps.items[1],
    });
  });

  describe('should display initially selected item found in `initialSelectedItem`', () => {
    it('using an object type for the `initialSelectedItem` prop', () => {
      render(
        <ComboBox {...mockProps} initialSelectedItem={mockProps.items[0]} />
      );
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[0].label);
    });

    it('using a string type for the `initialSelectedItem` prop', () => {
      // Replace the 'items' property in mockProps with a list of strings
      mockProps = {
        ...mockProps,
        items: ['1', '2', '3'],
      };

      render(
        <ComboBox {...mockProps} initialSelectedItem={mockProps.items[1]} />
      );

      expect(findInputNode()).toHaveDisplayValue(mockProps.items[1]);
    });
  });

  describe('should display selected item found in `selectedItem`', () => {
    it('using an object type for the `selectedItem` prop', () => {
      render(<ComboBox {...mockProps} selectedItem={mockProps.items[0]} />);

      expect(findInputNode()).toHaveDisplayValue(mockProps.items[0].label);
    });

    it('using a string type for the `selectedItem` prop', () => {
      // Replace the 'items' property in mockProps with a list of strings
      mockProps = {
        ...mockProps,
        items: ['1', '2', '3'],
      };

      render(<ComboBox {...mockProps} selectedItem={mockProps.items[1]} />);

      expect(findInputNode()).toHaveDisplayValue(mockProps.items[1]);
    });
  });

  describe('when disabled', () => {
    it('should not let the user edit the input node', () => {
      render(<ComboBox {...mockProps} disabled={true} />);

      expect(findInputNode()).toHaveAttribute('disabled');

      expect(findInputNode()).toHaveDisplayValue('');

      userEvent.type(findInputNode(), 'a');

      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should not let the user expand the menu', () => {
      render(<ComboBox {...mockProps} disabled={true} />);
      openMenu();
      expect(findListBoxNode()).not.toHaveClass('cds--list-box--expanded');
    });
  });

  describe('when readonly', () => {
    it('should not let the user edit the input node', () => {
      render(<ComboBox {...mockProps} readOnly={true} />);

      expect(findInputNode()).toHaveAttribute('readonly');

      expect(findInputNode()).toHaveDisplayValue('');

      userEvent.type(findInputNode(), 'o');

      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should not let the user expand the menu', () => {
      render(<ComboBox {...mockProps} disabled={true} />);
      openMenu();
      expect(findListBoxNode()).not.toHaveClass('cds--list-box--expanded');
    });
  });

  describe('downshift quirks', () => {
    it('should set `inputValue` to an empty string if a false-y value is given', () => {
      render(<ComboBox {...mockProps} />);

      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should only render one listbox at a time when multiple comboboxes are present', () => {
      render(
        <>
          <div data-testid="combobox-1">
            <ComboBox {...mockProps} id="combobox-1" />
          </div>
          <div data-testid="combobox-2">
            <ComboBox {...mockProps} id="combobox-2" />
          </div>
        </>
      );
      const firstCombobox = screen.getByTestId('combobox-1');
      const secondCombobox = screen.getByTestId('combobox-2');

      const firstComboboxChevron = within(firstCombobox).getByRole('button');
      const secondComboboxChevron = within(secondCombobox).getByRole('button');

      function firstListBox() {
        return within(firstCombobox).getByRole('listbox');
      }

      function secondListBox() {
        return within(secondCombobox).getByRole('listbox');
      }

      expect(firstListBox()).toBeEmptyDOMElement();
      expect(secondListBox()).toBeEmptyDOMElement();

      userEvent.click(firstComboboxChevron);

      expect(firstListBox()).not.toBeEmptyDOMElement();
      expect(secondListBox()).toBeEmptyDOMElement();

      userEvent.click(secondComboboxChevron);

      expect(firstListBox()).toBeEmptyDOMElement();
      expect(secondListBox()).not.toBeEmptyDOMElement();

      userEvent.click(secondComboboxChevron);

      expect(firstListBox()).toBeEmptyDOMElement();
      expect(secondListBox()).toBeEmptyDOMElement();
    });
  });
});
