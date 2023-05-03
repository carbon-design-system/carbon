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
} from '../../ListBox/test-helpers';
import FluidComboBox from '../FluidComboBox';
import { FeatureFlags } from '../../FeatureFlags';

const prefix = 'cds';

const findInputNode = () => screen.getByRole('combobox');
const openMenu = async () => {
  await userEvent.click(findInputNode());
};

describe('FluidComboBox', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      id: 'test-fluidcombobox',
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
        <FluidComboBox {...mockProps} />
      </FeatureFlags>
    );
    expect(container.firstChild).toHaveClass(
      `${prefix}--list-box__wrapper--fluid`
    );
  });

  it('should render with condensed styles if isCondensed is provided', () => {
    const { container } = render(
      <FeatureFlags flags={{ 'enable-v11-release': true }}>
        <FluidComboBox isCondensed {...mockProps} />
      </FeatureFlags>
    );
    expect(container.firstChild).toHaveClass(
      `${prefix}--list-box__wrapper--fluid--condensed`
    );
  });

  it('should display the menu of items when a user clicks on the input', async () => {
    render(<FluidComboBox {...mockProps} />);

    await userEvent.click(findInputNode());

    assertMenuOpen(mockProps);
  });

  it('should call `onChange` each time an item is selected', async () => {
    render(<FluidComboBox {...mockProps} />);
    expect(mockProps.onChange).not.toHaveBeenCalled();

    for (let i = 0; i < mockProps.items.length; i++) {
      await openMenu();

      await userEvent.click(screen.getAllByRole('option')[i]);

      expect(mockProps.onChange).toHaveBeenCalledTimes(i + 1);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItem: mockProps.items[i],
      });
    }
  });

  it('capture filter text events', async () => {
    const onInputChange = jest.fn();
    render(<FluidComboBox {...mockProps} onInputChange={onInputChange} />);

    await userEvent.type(findInputNode(), 'something');

    expect(onInputChange).toHaveBeenCalledWith('something');
  });

  it('should render custom item components', async () => {
    const itemToElement = jest.fn((item) => {
      return <div className="mock-item">{item.text}</div>;
    });
    render(<FluidComboBox {...mockProps} itemToElement={itemToElement} />);
    await openMenu();

    expect(itemToElement).toHaveBeenCalled();
  });

  it('should let the user select an option by clicking on the option node', async () => {
    render(<FluidComboBox {...mockProps} />);
    await openMenu();

    await userEvent.click(screen.getAllByRole('option')[0]);

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: mockProps.items[0],
    });
    assertMenuClosed();

    mockProps.onChange.mockClear();

    await openMenu();

    await userEvent.click(screen.getAllByRole('option')[1]);
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: mockProps.items[1],
    });
  });

  describe('should display initially selected item found in `initialSelectedItem`', () => {
    it('using an object type for the `initialSelectedItem` prop', () => {
      render(
        <FluidComboBox
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
        <FluidComboBox
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
        <FluidComboBox {...mockProps} selectedItem={mockProps.items[0]} />
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
        <FluidComboBox {...mockProps} selectedItem={mockProps.items[1]} />
      );

      expect(findInputNode()).toHaveDisplayValue(mockProps.items[1]);
    });
  });

  describe('when disabled', () => {
    it('should not let the user edit the input node', async () => {
      render(<FluidComboBox {...mockProps} disabled={true} />);

      expect(findInputNode()).toHaveAttribute('disabled');

      expect(findInputNode()).toHaveDisplayValue('');

      await userEvent.type(findInputNode(), 'a');

      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should not let the user expand the menu', async () => {
      render(<FluidComboBox {...mockProps} disabled={true} />);
      await openMenu();
      expect(findListBoxNode()).not.toHaveClass('cds--list-box--expanded');
    });
  });

  describe('downshift quirks', () => {
    it('should set `inputValue` to an empty string if a false-y value is given', () => {
      render(<FluidComboBox {...mockProps} />);

      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should only render one listbox at a time when multiple fluidcomboboxes are present', async () => {
      render(
        <>
          <div data-testid="fluidcombobox-1">
            <FluidComboBox {...mockProps} id="fluidcombobox-1" />
          </div>
          <div data-testid="fluidcombobox-2">
            <FluidComboBox {...mockProps} id="fluidcombobox-2" />
          </div>
        </>
      );
      const firstFluidComboBox = screen.getByTestId('fluidcombobox-1');
      const secondFluidComboBox = screen.getByTestId('fluidcombobox-2');

      const firstFluidComboBoxChevron =
        within(firstFluidComboBox).getByRole('button');
      const secondFluidComboBoxChevron =
        within(secondFluidComboBox).getByRole('button');

      function firstListBox() {
        return within(firstFluidComboBox).getByRole('listbox');
      }

      function secondListBox() {
        return within(secondFluidComboBox).getByRole('listbox');
      }

      expect(firstListBox()).toBeEmptyDOMElement();
      expect(secondListBox()).toBeEmptyDOMElement();

      await userEvent.click(firstFluidComboBoxChevron);

      expect(firstListBox()).not.toBeEmptyDOMElement();
      expect(secondListBox()).toBeEmptyDOMElement();

      await userEvent.click(secondFluidComboBoxChevron);

      expect(firstListBox()).toBeEmptyDOMElement();
      expect(secondListBox()).not.toBeEmptyDOMElement();

      await userEvent.click(secondFluidComboBoxChevron);

      expect(firstListBox()).toBeEmptyDOMElement();
      expect(secondListBox()).toBeEmptyDOMElement();
    });
  });
});
