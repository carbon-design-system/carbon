/**
 * Copyright IBM Corp. 2016, 2018
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
} from '../../ListBox/test-helpers';
import FluidMultiSelect from '../FluidMultiSelect';
import { FeatureFlags } from '../../FeatureFlags';

const prefix = 'cds';

const findInputNode = () => screen.getByRole('combobox');
const openMenu = () => {
  userEvent.click(findInputNode());
};

describe('FluidMultiSelect', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      id: 'test-FluidMultiSelect',
      label: 'Choose an option',
      items: generateItems(5, generateGenericItem),
      onChange: jest.fn(),
      placeholder: 'Filter...',
      type: 'default',
    };
  });

  it('should render with fluid classes', () => {
    const { container } = render(
      <FeatureFlags flags={{ 'enable-v11-release': true }}>
        <FluidMultiSelect {...mockProps} />
      </FeatureFlags>
    );
    expect(container.firstChild).toHaveClass(
      `${prefix}--list-box__wrapper--fluid`
    );
  });

  it('should render with condensed styles if isCondensed is provided', () => {
    const { container } = render(
      <FeatureFlags flags={{ 'enable-v11-release': true }}>
        <FluidMultiSelect isCondensed {...mockProps} />
      </FeatureFlags>
    );
    expect(container.firstChild).toHaveClass(
      `${prefix}--list-box__wrapper--fluid--condensed`
    );
  });

  it('should display the menu of items when a user clicks on the input', () => {
    render(<FluidMultiSelect {...mockProps} />);

    userEvent.click(findInputNode());

    assertMenuOpen(mockProps);
  });

  it('should call `onChange` each time an item is selected', () => {
    render(<FluidMultiSelect {...mockProps} />);
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
    render(<FluidMultiSelect {...mockProps} onInputChange={onInputChange} />);

    userEvent.type(findInputNode(), 'something');

    expect(onInputChange).toHaveBeenCalledWith('something');
  });

  it('should render custom item components', () => {
    const itemToElement = jest.fn((item) => {
      return <div className="mock-item">{item.text}</div>;
    });
    render(<FluidMultiSelect {...mockProps} itemToElement={itemToElement} />);
    openMenu();

    expect(itemToElement).toHaveBeenCalled();
  });

  it('should let the user select an option by clicking on the option node', () => {
    render(<FluidMultiSelect {...mockProps} />);
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
        <FluidMultiSelect
          {...mockProps}
          initialSelectedItem={mockProps.items[0]}
        />
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
        <FluidMultiSelect
          {...mockProps}
          initialSelectedItem={mockProps.items[1]}
        />
      );

      expect(findInputNode()).toHaveDisplayValue(mockProps.items[1]);
    });
  });

  describe('should display selected item found in `selectedItem`', () => {
    it('using an object type for the `selectedItem` prop', () => {
      render(
        <FluidMultiSelect {...mockProps} selectedItem={mockProps.items[0]} />
      );

      expect(findInputNode()).toHaveDisplayValue(mockProps.items[0].label);
    });

    it('using a string type for the `selectedItem` prop', () => {
      // Replace the 'items' property in mockProps with a list of strings
      mockProps = {
        ...mockProps,
        items: ['1', '2', '3'],
      };

      render(
        <FluidMultiSelect {...mockProps} selectedItem={mockProps.items[1]} />
      );

      expect(findInputNode()).toHaveDisplayValue(mockProps.items[1]);
    });
  });

  describe('when disabled', () => {
    it('should not let the user edit the input node', () => {
      render(<FluidMultiSelect {...mockProps} disabled={true} />);

      expect(findInputNode()).toHaveAttribute('disabled');

      expect(findInputNode()).toHaveDisplayValue('');

      userEvent.type(findInputNode(), 'a');

      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should not let the user expand the menu', () => {
      render(<FluidMultiSelect {...mockProps} disabled={true} />);
      openMenu();
      expect(findListBoxNode()).not.toHaveClass('cds--list-box--expanded');
    });
  });

  describe('downshift quirks', () => {
    it('should set `inputValue` to an empty string if a false-y value is given', () => {
      render(<FluidMultiSelect {...mockProps} />);

      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should only render one listbox at a time when multiple FluidMultiSelectes are present', () => {
      render(
        <>
          <div data-testid="FluidMultiSelect-1">
            <FluidMultiSelect {...mockProps} id="FluidMultiSelect-1" />
          </div>
          <div data-testid="FluidMultiSelect-2">
            <FluidMultiSelect {...mockProps} id="FluidMultiSelect-2" />
          </div>
        </>
      );
      const firstFluidMultiSelect = screen.getByTestId('FluidMultiSelect-1');
      const secondFluidMultiSelect = screen.getByTestId('FluidMultiSelect-2');

      const firstFluidMultiSelectChevron = within(
        firstFluidMultiSelect
      ).getByRole('button');
      const secondFluidMultiSelectChevron = within(
        secondFluidMultiSelect
      ).getByRole('button');

      function firstListBox() {
        return within(firstFluidMultiSelect).getByRole('listbox');
      }

      function secondListBox() {
        return within(secondFluidMultiSelect).getByRole('listbox');
      }

      expect(firstListBox()).toBeEmptyDOMElement();
      expect(secondListBox()).toBeEmptyDOMElement();

      userEvent.click(firstFluidMultiSelectChevron);

      expect(firstListBox()).not.toBeEmptyDOMElement();
      expect(secondListBox()).toBeEmptyDOMElement();

      userEvent.click(secondFluidMultiSelectChevron);

      expect(firstListBox()).toBeEmptyDOMElement();
      expect(secondListBox()).not.toBeEmptyDOMElement();

      userEvent.click(secondFluidMultiSelectChevron);

      expect(firstListBox()).toBeEmptyDOMElement();
      expect(secondListBox()).toBeEmptyDOMElement();
    });
  });
});
