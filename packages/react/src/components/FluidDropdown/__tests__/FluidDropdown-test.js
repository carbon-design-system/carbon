/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  assertMenuOpen,
  assertMenuClosed,
  openMenu,
  generateItems,
  generateGenericItem,
} from '../../ListBox/test-helpers';
import FluidDropdown from '../FluidDropdown';

const prefix = 'cds';

describe('FluidDropdown', () => {
  let mockProps;
  beforeEach(() => {
    mockProps = {
      id: 'test-fluiddropdown',
      items: generateItems(5, generateGenericItem),
      onChange: jest.fn(),
      label: 'input',
      placeholder: 'Filter...',
      type: 'default',
    };
  });

  it('should render with fluid classes', () => {
    const { container } = render(<FluidDropdown {...mockProps} />);
    expect(container.firstChild).toHaveClass(
      `${prefix}--list-box__wrapper--fluid`
    );
  });

  it('should render with condensed styles if isCondensed is provided', () => {
    const { container } = render(<FluidDropdown isCondensed {...mockProps} />);
    expect(container.firstChild).toHaveClass(
      `${prefix}--list-box__wrapper--fluid--condensed`
    );
  });

  it('should initially render with the menu not open', () => {
    render(<FluidDropdown {...mockProps} />);
    assertMenuClosed();
  });

  it('should let the user open the menu by clicking on the control', async () => {
    render(<FluidDropdown {...mockProps} />);
    await openMenu();
    assertMenuOpen(mockProps);
  });

  it('should render with strings as items', async () => {
    render(<FluidDropdown {...mockProps} items={['zar', 'doz']} />);
    await openMenu();

    expect(screen.getByText('zar')).toBeInTheDocument();
    expect(screen.getByText('doz')).toBeInTheDocument();
  });

  it('should render custom item components', async () => {
    const itemToElement = jest.fn((item) => {
      return <div className="mock-item">{item.label}</div>;
    });

    render(<FluidDropdown itemToElement={itemToElement} {...mockProps} />);
    await openMenu();

    expect(itemToElement).toHaveBeenCalled();
  });

  it('should render selectedItem as an element', () => {
    render(
      <FluidDropdown
        {...mockProps}
        selectedItem={{
          id: `id-1`,
          label: `Item 1`,
          value: 1,
        }}
        renderSelectedItem={(selectedItem) => (
          <div id="a-custom-element-for-selected-item">
            {selectedItem.label}
          </div>
        )}
      />
    );
    // custom element should be rendered for the selected item
    expect(
      document.querySelector('#a-custom-element-for-selected-item')
    ).toBeDefined();
    // the title should use the normal itemToString method

    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  describe('title', () => {
    it('renders a title', () => {
      render(<FluidDropdown titleText="Email Input" {...mockProps} />);
      expect(screen.getByText('Email Input')).toBeInTheDocument();
    });

    it('has the expected classes', () => {
      render(<FluidDropdown titleText="Email Input" {...mockProps} />);
      expect(screen.getByText('Email Input')).toHaveClass(`${prefix}--label`);
    });
  });

  it('should let the user select an option by clicking on the option node', async () => {
    render(<FluidDropdown {...mockProps} />);
    await openMenu();

    await userEvent.click(screen.getByText('Item 0'));
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: mockProps.items[0],
    });
    assertMenuClosed();

    mockProps.onChange.mockClear();

    await openMenu();
    await userEvent.click(screen.getByText('Item 1'));

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: mockProps.items[1],
    });
  });

  describe('should display initially selected item found in `initialSelectedItem`', () => {
    it('using an object type for the `initialSelectedItem` prop', () => {
      render(
        <FluidDropdown
          {...mockProps}
          initialSelectedItem={mockProps.items[0]}
        />
      );

      expect(screen.getByText(mockProps.items[0].label)).toBeInTheDocument();
    });

    it('using a string type for the `initialSelectedItem` prop', () => {
      // Replace the 'items' property in mockProps with a list of strings
      mockProps = {
        ...mockProps,
        items: ['1', '2', '3'],
      };

      render(
        <FluidDropdown
          {...mockProps}
          initialSelectedItem={mockProps.items[1]}
        />
      );

      expect(screen.getByText(mockProps.items[1])).toBeInTheDocument();
    });
  });

  describe('Component API', () => {
    afterEach(cleanup);

    it('should accept a `ref` for the underlying button element', () => {
      const ref = React.createRef();
      render(<FluidDropdown {...mockProps} ref={ref} />);
      expect(ref.current).toHaveAttribute('aria-haspopup', 'listbox');
    });
  });
});
