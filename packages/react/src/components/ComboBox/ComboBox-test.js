/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { render, screen, within, fireEvent, act } from '@testing-library/react';
import { useCombobox } from 'downshift';
import userEvent from '@testing-library/user-event';
import {
  findListBoxNode,
  assertMenuOpen,
  assertMenuClosed,
  generateItems,
  generateGenericItem,
  cognateItems,
  waitForPosition,
  findMenuItemNode,
} from '../ListBox/test-helpers';
import ComboBox from '../ComboBox';
import { AILabel } from '../AILabel';

const findInputNode = () => screen.getByRole('combobox');
const openMenu = async () => {
  await userEvent.click(screen.getByRole('combobox'));
};

const prefix = 'cds';

const ControlledComboBox = ({ controlledItem }) => {
  const items = generateItems(5, generateGenericItem);
  const [value, setValue] = useState(
    typeof controlledItem !== 'undefined' ? controlledItem : items[0]
  );
  const [onChangeCallCount, setOnChangeCallCount] = useState(0);
  const [onInputChangeCallCount, setOnInputChangeCallCount] = useState(0);
  const controlledOnChange = ({ selectedItem }) => {
    setValue(selectedItem);
    setOnChangeCallCount((prevCount) => prevCount + 1);
  };
  const controlledOnInputChange = () => {
    setOnInputChangeCallCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <ComboBox
        id="test-combobox"
        items={items}
        selectedItem={value}
        onChange={controlledOnChange}
        onInputChange={controlledOnInputChange}
        placeholder="Filter..."
        type="default"
      />
      <div data-testid="selected-item">{value?.label || 'none'}</div>
      <div>onChangeCallCount: {onChangeCallCount}</div>
      <div>onInputChangeCallCount: {onInputChangeCallCount}</div>
      <button onClick={() => setValue(items[3])}>Choose item 3</button>
      <button onClick={() => setValue(null)}>reset</button>
    </div>
  );
};

describe('ComboBox', () => {
  let mockProps;
  window.HTMLElement.prototype.scrollIntoView = function () {};
  beforeEach(() => {
    mockProps = {
      id: 'test-combobox',
      items: generateItems(5, generateGenericItem),
      onChange: jest.fn(),
      placeholder: 'Filter...',
      type: 'default',
    };
  });

  it('should display the menu of items when a user clicks on the input', async () => {
    render(<ComboBox {...mockProps} />);

    await userEvent.click(findInputNode());

    assertMenuOpen(mockProps);
  });

  it('should call `onChange` each time an item is selected', async () => {
    render(<ComboBox {...mockProps} />);
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

  it('should call `onChange` when selection is cleared', async () => {
    render(<ComboBox {...mockProps} />);
    expect(mockProps.onChange).not.toHaveBeenCalled();
    await openMenu();
    await userEvent.click(screen.getAllByRole('option')[0]);
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    await userEvent.click(
      screen.getByRole('button', { name: 'Clear selected item' })
    );
    expect(mockProps.onChange).toHaveBeenCalledTimes(2);
  });

  it('should call `onChange` with the proper item when `shouldFilterItem` is provided', async () => {
    const filterItems = (menu) => {
      return menu?.item?.label
        ?.toLowerCase()
        .includes(menu?.inputValue?.toLowerCase());
    };
    const onInputChange = jest.fn();

    render(
      <ComboBox
        {...mockProps}
        shouldFilterItem={filterItems}
        onInputChange={onInputChange}
      />
    );

    await userEvent.type(findInputNode(), 'Item 2');
    expect(onInputChange).toHaveBeenCalledWith('Item 2');

    await userEvent.click(screen.getAllByRole('option')[0]);
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: mockProps.items[2],
    });
  });

  it('should display titleText', () => {
    render(<ComboBox {...mockProps} titleText="Combobox title" />);

    expect(screen.getByText('Combobox title')).toBeInTheDocument();
  });

  it('should confirm custom aria-label is on the input', () => {
    render(<ComboBox {...mockProps} aria-label="custom aria-label" />);

    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-label',
      'custom aria-label'
    );
  });

  it('should select the correct item from the filtered list after text input on click', async () => {
    const user = userEvent.setup();

    render(<ComboBox {...mockProps} items={cognateItems} />);

    await user.type(findInputNode(), 'struct');

    await user.click(screen.getAllByRole('option')[1]);

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: {
        id: 'construct',
        text: 'Construct',
      },
    });
  });

  it('should select the correct item from the filtered list after text input on [Enter]', async () => {
    const user = userEvent.setup();

    render(<ComboBox {...mockProps} items={cognateItems} />);

    await user.type(findInputNode(), 'struct');

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('[Enter]');

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: {
        id: 'construct',
        text: 'Construct',
      },
    });
  });

  describe('onInputChange', () => {
    let onInputChange;
    beforeEach(() => {
      onInputChange = jest.fn();
    });
    it('should not call onChange or onInputChange on initial render', () => {
      render(<ComboBox {...mockProps} onInputChange={onInputChange} />);
      expect(onInputChange).not.toHaveBeenCalled();
      expect(mockProps.onChange).not.toHaveBeenCalled();
    });

    it('capture filter text event onInputChange', async () => {
      render(<ComboBox {...mockProps} onInputChange={onInputChange} />);
      await userEvent.type(findInputNode(), 'something');
      expect(onInputChange).toHaveBeenCalledWith('something');
    });

    it('should call onInputChange when option is selected from dropdown', async () => {
      render(<ComboBox {...mockProps} onInputChange={onInputChange} />);
      await openMenu();
      expect(onInputChange).not.toHaveBeenCalled();
      await userEvent.click(screen.getByRole('option', { name: 'Item 2' }));
      expect(onInputChange).toHaveBeenCalledWith('Item 2');
    });

    it('should call onInputChange when option is cleared with button', async () => {
      render(
        <ComboBox
          {...mockProps}
          initialSelectedItem={mockProps.items[0]}
          onInputChange={onInputChange}
        />
      );
      expect(onInputChange).not.toHaveBeenCalled();
      await userEvent.click(
        screen.getByRole('button', { name: 'Clear selected item' })
      );
      expect(onInputChange).toHaveBeenCalledWith('');
    });

    it('should not call onInputChange when combobox is interacted with but input value does not change', async () => {
      render(
        <ComboBox
          {...mockProps}
          initialSelectedItem={mockProps.items[0]}
          onInputChange={onInputChange}
        />
      );
      expect(onInputChange).not.toHaveBeenCalled();
      await openMenu();
      await userEvent.click(screen.getByRole('option', { name: 'Item 0' }));
      expect(onInputChange).not.toHaveBeenCalled();
    });

    it('should call onInputChange when custom value is entered into combobox', async () => {
      render(
        <ComboBox
          {...mockProps}
          initialSelectedItem={mockProps.items[0]}
          onInputChange={onInputChange}
        />
      );
      await userEvent.clear(findInputNode());
      expect(onInputChange).toHaveBeenCalledWith('');
      await userEvent.type(findInputNode(), 'custom value');
      await userEvent.keyboard('[Enter]');
      expect(onInputChange).toHaveBeenCalledWith('custom value');
    });
  });

  it('should render custom item components', async () => {
    const itemToElement = jest.fn((item) => {
      return <div className="mock-item">{item.text}</div>;
    });
    render(<ComboBox {...mockProps} itemToElement={itemToElement} />);
    await openMenu();

    expect(itemToElement).toHaveBeenCalled();
  });

  it('should let the user select an option by clicking on the option node', async () => {
    render(<ComboBox {...mockProps} />);
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
    expect(screen.getByRole('combobox')).toHaveDisplayValue('Item 1');
  });

  it('should not let the user select an option by clicking on the disabled option node', async () => {
    mockProps.items[2].disabled = true;

    render(<ComboBox {...mockProps} />);
    await openMenu();

    await userEvent.click(screen.getAllByRole('option')[2]);

    expect(mockProps.onChange).not.toHaveBeenCalled();
  });

  it('should not select the disabled option if user type in input and press enter', async () => {
    mockProps.items[2].disabled = true;

    render(<ComboBox {...mockProps} />);
    await userEvent.type(findInputNode(), 'Item 2');
    await userEvent.keyboard('[Enter]');

    expect(mockProps.onChange).not.toHaveBeenCalled();
    //it should not close the menu if matching element not found and enter is pressed.
    expect(findListBoxNode()).toHaveClass(`${prefix}--list-box--expanded`);
  });

  it('should retain value if custom value is entered and `allowCustomValue` is set', async () => {
    render(<ComboBox {...mockProps} allowCustomValue />);

    expect(findInputNode()).toHaveDisplayValue('');

    await userEvent.type(findInputNode(), 'Apple');
    // Should close menu and keep value in input, even though it is not in the item list
    await userEvent.keyboard('[Enter]');
    assertMenuClosed();
    expect(findInputNode()).toHaveDisplayValue('Apple');
    // Should retain value on blur
    await userEvent.keyboard('[Tab]');
    expect(findInputNode()).toHaveDisplayValue('Apple');
  });

  it('should handle InputBlur with allowCustomValue', async () => {
    render(<ComboBox {...mockProps} allowCustomValue />);
    await userEvent.type(findInputNode(), 'Apple');
    fireEvent.blur(findInputNode());
    expect(findInputNode()).toHaveDisplayValue('Apple');
  });

  it('should apply onChange value if custom value is entered and `allowCustomValue` is set', async () => {
    render(<ComboBox {...mockProps} allowCustomValue />);

    expect(findInputNode()).toHaveDisplayValue('');

    await userEvent.type(findInputNode(), 'Apple');
    await userEvent.keyboard('[Enter]');
    assertMenuClosed();
    expect(mockProps.onChange).toHaveBeenCalledWith({
      inputValue: 'Apple',
      selectedItem: null,
    });
  });

  it('should respect slug prop', async () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(
      <ComboBox {...mockProps} slug={<AILabel />} />
    );
    await waitForPosition();
    expect(container.firstChild).toHaveClass(
      `${prefix}--list-box__wrapper--slug`
    );
    spy.mockRestore();
  });

  it('should respect decorator prop', async () => {
    const { container } = render(
      <ComboBox {...mockProps} decorator={<AILabel />} />
    );
    await waitForPosition();
    expect(container.firstChild).toHaveClass(
      `${prefix}--list-box__wrapper--decorator`
    );
  });

  it('should keep the selected item active after blur when allowCustomValue is set', async () => {
    const user = userEvent.setup();

    render(
      <>
        <ComboBox {...mockProps} allowCustomValue />
        <button type="button">Move focus</button>
      </>
    );

    await openMenu();
    await user.click(screen.getByRole('option', { name: 'Item 1' }));
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: 'Move focus' }));

    await openMenu();
    const activeOption = screen.getByRole('option', { name: 'Item 1' });
    expect(activeOption).toHaveClass(`${prefix}--list-box__menu-item--active`);
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('should yield highlighted item as `selectedItem` when pressing Enter with an unmodified input value', async () => {
    render(<ControlledComboBox controlledItem={null} />);

    const input = findInputNode();

    expect(screen.getByTestId('selected-item').textContent).toBe('none');

    await userEvent.click(input);
    await userEvent.type(input, 'Item 1');
    await userEvent.keyboard('{Enter}');

    expect(screen.getByTestId('selected-item').textContent).toBe('Item 1');

    await userEvent.type(input, '{backspace}');
    await userEvent.type(input, '1');
    await userEvent.keyboard('{Enter}');

    expect(screen.getByTestId('selected-item').textContent).toBe('Item 1');
  });

  it('should yield highlighted item as `selectedItem` when pressing Enter with a modified input value', async () => {
    render(<ControlledComboBox controlledItem={null} />);
    const input = findInputNode();

    expect(screen.getByTestId('selected-item').textContent).toBe('none');

    await userEvent.click(input);
    await userEvent.type(input, 'Item 2');
    await userEvent.keyboard('{Enter}');

    expect(screen.getByTestId('selected-item').textContent).toBe('Item 2');

    await userEvent.type(input, '{backspace}');
    await userEvent.keyboard('{Enter}');

    expect(screen.getByTestId('selected-item').textContent).toBe('Item 0');
  });

  it('should restore selected item label on blur when input does not match any item and a selection exists', async () => {
    render(
      <ComboBox
        {...mockProps}
        initialSelectedItem={mockProps.items[1]}
        allowCustomValue={false}
      />
    );

    expect(findInputNode()).toHaveDisplayValue('Item 1');

    await userEvent.clear(findInputNode());
    await userEvent.type(findInputNode(), 'no-match');
    await userEvent.keyboard('[Tab]');

    expect(findInputNode()).toHaveDisplayValue('Item 1');
  });

  it('should keep exact match input on blur when it matches an item label', async () => {
    render(<ComboBox {...mockProps} allowCustomValue={false} />);

    await userEvent.type(findInputNode(), 'Item 2');
    await userEvent.keyboard('[Tab]');

    expect(findInputNode()).toHaveDisplayValue('Item 2');
  });

  describe('should display initially selected item found in `initialSelectedItem`', () => {
    it('using an object type for the `initialSelectedItem` prop', async () => {
      render(
        <ComboBox {...mockProps} initialSelectedItem={mockProps.items[0]} />
      );
      await waitForPosition();
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[0].label);
    });

    it('using a string type for the `initialSelectedItem` prop', async () => {
      // Replace the 'items' property in mockProps with a list of strings
      mockProps = {
        ...mockProps,
        items: ['1', '2', '3'],
      };

      render(
        <ComboBox {...mockProps} initialSelectedItem={mockProps.items[1]} />
      );
      await waitForPosition();
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[1]);
    });

    it('should not revert to `initialSelectedItem` after clearing selection in uncontrolled mode', async () => {
      // Render a non-fully controlled `ComboBox` using `initialSelectedItem`.
      render(
        <ComboBox {...mockProps} initialSelectedItem={mockProps.items[0]} />
      );
      await waitForPosition();
      // Verify that the input initially displays `initialSelectedItem`.
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[0].label);

      // Simulate clearing the selection by clicking the clear button.
      await userEvent.click(
        screen.getByRole('button', { name: 'Clear selected item' })
      );
      // After clearing, the input should be empty rather than reverting to
      // `initialSelectedItem`.
      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should ignore updates to `initialSelectedItem` after initial render in uncontrolled mode', async () => {
      // Render a non-fully controlled `ComboBox` using `initialSelectedItem`.
      const { rerender } = render(
        <ComboBox {...mockProps} initialSelectedItem={mockProps.items[0]} />
      );
      await waitForPosition();
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[0].label);

      // Rerender the component with a different `initialSelectedItem`.
      rerender(
        <ComboBox {...mockProps} initialSelectedItem={mockProps.items[2]} />
      );
      // The displayed value should still be the one from the first render.
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[0].label);
    });

    it('should mark the initially selectedItem on load when rendered', async () => {
      render(
        <ComboBox
          {...mockProps}
          initialSelectedItem={mockProps.items[0]}
          selectedItem={mockProps.items[0]}
        />
      );
      await openMenu();

      // Find the first menu item (which should be the initially selected item)
      const menuItems = screen.getAllByRole('option');
      const firstMenuItem = menuItems[0];

      // Check if the initially selected item has the active class
      expect(firstMenuItem).toHaveClass(
        `${prefix}--list-box__menu-item--active`
      );

      // Check if the initially selected item contains an SVG (checkmark icon)
      expect(firstMenuItem.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('provided `selectedItem`', () => {
    it('should display selected item using an object type for the `selectedItem` prop', async () => {
      render(<ComboBox {...mockProps} selectedItem={mockProps.items[0]} />);
      await waitForPosition();
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[0].label);
    });
    it('should not call onChange or onInputChange on initial render', () => {
      render(<ControlledComboBox />);
      expect(screen.getByText('onChangeCallCount: 0')).toBeInTheDocument();
      expect(screen.getByText('onInputChangeCallCount: 0')).toBeInTheDocument();
    });
    it('should call onInputChange when input changes', async () => {
      render(<ControlledComboBox />);
      await userEvent.type(findInputNode(), 'Item 2');
      expect(screen.getByText('onInputChangeCallCount: 6')).toBeInTheDocument();
    });
    it('should call onInputChange when external state managing selectedItem is updated', async () => {
      render(<ControlledComboBox />);
      await userEvent.click(
        screen.getByRole('button', { name: 'Choose item 3' })
      );
      expect(screen.getByText('onInputChangeCallCount: 1')).toBeInTheDocument();
    });
    it('should not call onChange or onInputChange when external state managing selectedItem is updated to same value', async () => {
      render(
        <ControlledComboBox
          controlledItem={{ id: 'id-3', label: 'Item 3', value: 3 }}
        />
      );
      await userEvent.click(
        screen.getByRole('button', { name: 'Choose item 3' })
      );
      expect(screen.getByText('onChangeCallCount: 0')).toBeInTheDocument();
      expect(screen.getByText('onInputChangeCallCount: 0')).toBeInTheDocument();
    });

    it('should display selected item using a string type for the `selectedItem` prop', async () => {
      // Replace the 'items' property in mockProps with a list of strings
      mockProps = {
        ...mockProps,
        items: ['1', '2', '3'],
      };

      render(<ComboBox {...mockProps} selectedItem={mockProps.items[1]} />);
      await waitForPosition();
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[1]);
    });
    it('should update and call `onChange` once when selection is updated from the combobox', async () => {
      render(<ComboBox {...mockProps} selectedItem={mockProps.items[0]} />);
      expect(mockProps.onChange).not.toHaveBeenCalled();
      await openMenu();
      await userEvent.click(screen.getByRole('option', { name: 'Item 2' }));
      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
      expect(
        screen.getByRole('combobox', { value: 'Item 2' })
      ).toBeInTheDocument();
    });
    it('should not call `onChange` when current selection is selected again', async () => {
      render(<ComboBox {...mockProps} selectedItem={mockProps.items[0]} />);
      expect(mockProps.onChange).not.toHaveBeenCalled();
      await openMenu();
      await userEvent.click(screen.getByRole('option', { name: 'Item 0' }));
      expect(mockProps.onChange).toHaveBeenCalledTimes(0);
      expect(
        screen.getByRole('combobox', { value: 'Item 0' })
      ).toBeInTheDocument();
    });
    it('should update and call `onChange` once when selection is updated from the combobox and the external state managing selectedItem is updated', async () => {
      render(<ControlledComboBox />);
      expect(screen.getByText('onChangeCallCount: 0')).toBeInTheDocument();
      await openMenu();
      await userEvent.click(screen.getByRole('option', { name: 'Item 2' }));
      expect(screen.getByText('onChangeCallCount: 1')).toBeInTheDocument();
      expect(screen.getByTestId('selected-item').textContent).toBe('Item 2');
      expect(
        screen.getByRole('combobox', { value: 'Item 2' })
      ).toBeInTheDocument();
    });
    it('should update and call `onChange` once when selection is cleared from the combobox and the external state managing selectedItem is updated', async () => {
      render(<ControlledComboBox />);
      expect(screen.getByText('onChangeCallCount: 0')).toBeInTheDocument();
      await openMenu();
      await userEvent.click(screen.getByRole('option', { name: 'Item 2' }));
      expect(screen.getByText('onChangeCallCount: 1')).toBeInTheDocument();
      await userEvent.click(
        screen.getByRole('button', { name: 'Clear selected item' })
      );
      expect(screen.getByText('onChangeCallCount: 2')).toBeInTheDocument();
      expect(screen.getByTestId('selected-item').textContent).toBe('none');
      expect(findInputNode()).toHaveDisplayValue('');
    });
    it('should update and call `onChange` once when selection is cleared from the combobox after an external update is made, and the external state managing selectedItem is updated', async () => {
      render(<ControlledComboBox />);
      expect(screen.getByText('onChangeCallCount: 0')).toBeInTheDocument();
      await openMenu();
      await userEvent.click(
        screen.getByRole('button', { name: 'Choose item 3' })
      );
      expect(screen.getByText('onChangeCallCount: 1')).toBeInTheDocument();
      await userEvent.click(
        screen.getByRole('button', { name: 'Clear selected item' })
      );
      expect(screen.getByText('onChangeCallCount: 2')).toBeInTheDocument();
      expect(screen.getByTestId('selected-item').textContent).toBe('none');
      expect(findInputNode()).toHaveDisplayValue('');
    });
    it('should update and call `onChange` when a combination of external and combobox selections are made', async () => {
      render(<ControlledComboBox />);
      expect(screen.getByText('onChangeCallCount: 0')).toBeInTheDocument();
      await userEvent.click(
        screen.getByRole('button', { name: 'Choose item 3' })
      );
      expect(screen.getByText('onChangeCallCount: 1')).toBeInTheDocument();
      expect(findInputNode()).toHaveDisplayValue('Item 3');
      expect(screen.getByTestId('selected-item').textContent).toBe('Item 3');
      await openMenu();
      await userEvent.click(screen.getByRole('option', { name: 'Item 2' }));
      expect(screen.getByText('onChangeCallCount: 2')).toBeInTheDocument();
      expect(findInputNode()).toHaveDisplayValue('Item 2');
      expect(screen.getByTestId('selected-item').textContent).toBe('Item 2');
      await userEvent.click(
        screen.getByRole('button', { name: 'Clear selected item' })
      );
      expect(screen.getByText('onChangeCallCount: 3')).toBeInTheDocument();
      expect(screen.getByTestId('selected-item').textContent).toBe('none');
      expect(findInputNode()).toHaveDisplayValue('');
    });
    it('should sync the menu active item when `selectedItem` updates externally', async () => {
      render(<ControlledComboBox />);
      await openMenu();
      let menuItems = screen.getAllByRole('option');
      expect(menuItems[0]).toHaveClass(
        `${prefix}--list-box__menu-item--active`
      );

      await userEvent.keyboard('{Escape}');
      await userEvent.click(
        screen.getByRole('button', { name: 'Choose item 3' })
      );

      await openMenu();
      menuItems = screen.getAllByRole('option');
      expect(menuItems[3]).toHaveClass(
        `${prefix}--list-box__menu-item--active`
      );
      expect(menuItems[0]).not.toHaveClass(
        `${prefix}--list-box__menu-item--active`
      );
    });
    it('should update and call `onChange` once when selection is updated externally', async () => {
      const { rerender } = render(
        <ComboBox {...mockProps} selectedItem={mockProps.items[0]} />
      );
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[0].label);
      rerender(<ComboBox {...mockProps} selectedItem={mockProps.items[1]} />);
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[1].label);
      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    });
    it('should clear selected item and call `onChange` when selection is cleared externally', async () => {
      render(<ControlledComboBox />);
      expect(screen.getByText('onChangeCallCount: 0')).toBeInTheDocument();
      await openMenu();
      await userEvent.click(screen.getByRole('option', { name: 'Item 2' }));
      await userEvent.click(screen.getByRole('button', { name: 'reset' }));
      expect(screen.getByText('onChangeCallCount: 2')).toBeInTheDocument();
      expect(screen.getByTestId('selected-item').textContent).toBe('none');
      expect(findInputNode()).toHaveDisplayValue('');
    });
    it('should clear selected item when `selectedItem` is updated to `null` externally', async () => {
      const { rerender } = render(
        <ComboBox {...mockProps} selectedItem={mockProps.items[1]} />
      );
      await waitForPosition();
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[1].label);
      rerender(<ComboBox {...mockProps} selectedItem={null} />);
      await waitForPosition();
      expect(findInputNode()).toHaveDisplayValue('');
      expect(mockProps.onChange).toHaveBeenCalled();
    });
    it('should call onChange when downshiftProps onStateChange is provided', async () => {
      const downshiftProps = {
        onStateChange: jest.fn(),
      };
      render(
        <ComboBox
          {...mockProps}
          selectedItem={mockProps.items[0]}
          downshiftProps={downshiftProps}
        />
      );
      expect(mockProps.onChange).not.toHaveBeenCalled();
      expect(downshiftProps.onStateChange).not.toHaveBeenCalled();
      await openMenu();
      expect(downshiftProps.onStateChange).toHaveBeenCalledTimes(1);
      await userEvent.click(screen.getByRole('option', { name: 'Item 2' }));
      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
      expect(downshiftProps.onStateChange).toHaveBeenCalledTimes(3);
      expect(downshiftProps.onStateChange).toHaveBeenNthCalledWith(2, {
        selectedItem: {
          id: 'id-2',
          label: 'Item 2',
          value: 2,
        },
        type: useCombobox.stateChangeTypes.ItemClick,
      });
      expect(downshiftProps.onStateChange).toHaveBeenLastCalledWith({
        selectedItem: undefined,
        type: useCombobox.stateChangeTypes.FunctionSetHighlightedIndex,
      });
      expect(
        screen.getByRole('combobox', { value: 'Item 2' })
      ).toBeInTheDocument();
    });
  });

  describe('when disabled', () => {
    it('should not let the user edit the input node', async () => {
      render(<ComboBox {...mockProps} disabled={true} />);
      await waitForPosition();
      expect(findInputNode()).toHaveAttribute('disabled');

      expect(findInputNode()).toHaveDisplayValue('');

      await userEvent.type(findInputNode(), 'a');

      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should not let the user expand the menu', async () => {
      render(<ComboBox {...mockProps} disabled={true} />);
      await waitForPosition();
      await openMenu();
      expect(findListBoxNode()).not.toHaveClass(
        `${prefix}--list-box--expanded`
      );
    });
  });

  describe('when readonly', () => {
    it('should not let the user edit the input node', async () => {
      render(<ComboBox {...mockProps} readOnly={true} />);
      await waitForPosition();
      expect(findInputNode()).toHaveAttribute('readonly');

      expect(findInputNode()).toHaveDisplayValue('');

      await userEvent.type(findInputNode(), 'o');

      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should not let the user expand the menu', async () => {
      render(<ComboBox {...mockProps} disabled={true} />);
      await waitForPosition();
      await openMenu();
      expect(findListBoxNode()).not.toHaveClass(
        `${prefix}--list-box--expanded`
      );
    });
  });

  describe('downshift quirks', () => {
    it('should set `inputValue` to an empty string if a false-y value is given', async () => {
      render(<ComboBox {...mockProps} />);
      await waitForPosition();
      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should only render one listbox at a time when multiple comboboxes are present', async () => {
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
      await waitForPosition();
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

      await userEvent.click(firstComboboxChevron);

      expect(firstListBox()).not.toBeEmptyDOMElement();
      expect(secondListBox()).toBeEmptyDOMElement();

      await userEvent.click(secondComboboxChevron);

      expect(firstListBox()).toBeEmptyDOMElement();
      expect(secondListBox()).not.toBeEmptyDOMElement();

      await userEvent.click(secondComboboxChevron);

      expect(firstListBox()).toBeEmptyDOMElement();
      expect(secondListBox()).toBeEmptyDOMElement();
    });
    it('should open menu without moving focus on pressing Alt+ DownArrow', async () => {
      render(<ComboBox {...mockProps} />);
      await waitForPosition();
      act(() => {
        screen.getByRole('combobox').focus();
      });
      await userEvent.keyboard('{Alt>}{ArrowDown}');
      assertMenuOpen(mockProps);
    });

    it('should close menu and return focus to combobox on pressing Alt+ UpArrow', async () => {
      render(<ComboBox {...mockProps} />);
      await waitForPosition();
      await openMenu();
      await userEvent.keyboard('{Alt>}{ArrowUp}');
      assertMenuClosed(mockProps);
    });
  });

  describe('Highlights', () => {
    it('should highlight the matched element', async () => {
      render(<ComboBox {...mockProps} allowCustomValue={false} />);
      await userEvent.type(findInputNode(), '1');
      expect(screen.getAllByRole('option')[1]).toHaveClass(
        'cds--list-box__menu-item'
      );
    });

    it('should highlight the selected element', async () => {
      render(<ComboBox {...mockProps} allowCustomValue={false} />);
      await openMenu();
      await userEvent.type(findInputNode(), 'Item 1');
      await userEvent.keyboard('[Enter]');
      await openMenu();
      expect(screen.getAllByRole('option')[1]).toHaveClass(
        'cds--list-box__menu-item--highlighted'
      );
    });

    it('should highlight the selected element if user enter some other value click outside of combobox', async () => {
      render(<ComboBox {...mockProps} allowCustomValue={false} />);
      await openMenu();
      await userEvent.type(findInputNode(), 'Item 1');
      await userEvent.keyboard('[Enter]');
      await openMenu();
      expect(screen.getAllByRole('option')[1]).toHaveClass(
        'cds--list-box__menu-item--highlighted'
      );

      await userEvent.clear(findInputNode());
      await userEvent.type(findInputNode(), 'Item');
      //should match the loosely match element
      expect(screen.getAllByRole('option')[0]).toHaveClass(
        'cds--list-box__menu-item--highlighted'
      );

      fireEvent.blur(findInputNode());
      await openMenu();
      // on blur, it should retain the selected value
      expect(findInputNode()).toHaveDisplayValue('Item 1');
      expect(screen.getAllByRole('option')[1]).toHaveClass(
        'cds--list-box__menu-item--highlighted'
      );
    });

    it('should clear input when closing with chevron if input does not match any item and allowCustomValue is false', async () => {
      render(<ComboBox {...mockProps} allowCustomValue={false} />);

      // First type something that doesn't match any item
      await userEvent.type(findInputNode(), 'xyz');

      // Menu should be open at this point
      assertMenuOpen(mockProps);

      // Click the chevron/toggle button to close
      await userEvent.click(screen.getByRole('button', { name: 'Close' }));

      // Menu should be closed
      assertMenuClosed();

      // Input should be cleared
      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should not clear input when opening then closing the menu without changes', async () => {
      render(
        <ComboBox {...mockProps} initialSelectedItem={mockProps.items[1]} />
      );

      expect(findInputNode()).toHaveDisplayValue('Item 1');

      await userEvent.click(screen.getByRole('button', { name: 'Open' }));
      assertMenuOpen(mockProps);

      await userEvent.click(screen.getByRole('button', { name: 'Close' }));
      assertMenuClosed(mockProps);

      expect(findInputNode()).toHaveDisplayValue('Item 1');
    });

    it('should clear input on blur when no item is selected and value does not match any item (`allowCustomValue` is `false`)', async () => {
      render(<ComboBox {...mockProps} allowCustomValue={false} />);

      await userEvent.type(findInputNode(), 'no-match-here');
      await userEvent.keyboard('[Tab]');

      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should pass defined selectedItem to onChange when item is selected', async () => {
      render(<ComboBox {...mockProps} />);

      expect(mockProps.onChange).not.toHaveBeenCalled();

      await openMenu();
      await userEvent.click(screen.getAllByRole('option')[0]);

      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
      expect(mockProps.onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          selectedItem: expect.anything(),
        })
      );

      const call = mockProps.onChange.mock.calls[0][0];
      expect(call.selectedItem).toBeDefined();
      expect(call.selectedItem).toEqual(mockProps.items[0]);
    });

    it('should never pass undefined as selectedItem to onChange', async () => {
      render(<ComboBox {...mockProps} />);

      for (let i = 0; i < mockProps.items.length; i++) {
        await openMenu();
        await userEvent.click(screen.getAllByRole('option')[i]);

        const call = mockProps.onChange.mock.calls[i][0];
        expect(call.selectedItem).toBeDefined();
        expect(call.selectedItem).not.toBeUndefined();
        expect(call.selectedItem).toEqual(mockProps.items[i]);
      }
    });
    it('should clear selection if input does not match any item and there is already a selected item', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} />);

      // First select an item
      await openMenu();
      await user.click(screen.getAllByRole('option')[0]);

      expect(findInputNode()).toHaveDisplayValue('Item 0');
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItem: mockProps.items[0],
      });

      // Clear input and type something that doesn't match
      await user.clear(findInputNode());
      await user.type(findInputNode(), 'xyz');
      await user.keyboard('[Enter]');
      // Selection should be cleared

      expect(mockProps.onChange).toHaveBeenLastCalledWith({
        selectedItem: null,
      });

      expect(findInputNode()).toHaveDisplayValue('xyz');
    });

    it('should not clear selection if no item was previously selected', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} />);

      // Type something that doesn't match any item
      await user.type(findInputNode(), 'xyz');
      await user.keyboard('[Enter]');

      // No onChange should be called since there was no selection to clear
      expect(mockProps.onChange).not.toHaveBeenCalled();
      expect(findInputNode()).toHaveDisplayValue('xyz');
    });

    it('should keep selection when allowCustomValue is true even if input does not match', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} allowCustomValue />);

      // First select an item
      await openMenu();
      await user.click(screen.getAllByRole('option')[0]);
      expect(findInputNode()).toHaveDisplayValue('Item 0');

      // Type something that doesn't match
      await user.clear(findInputNode());
      await user.type(findInputNode(), 'xyz');
      await user.keyboard('[Enter]');

      // Selection should not be cleared with allowCustomValue
      expect(mockProps.onChange).toHaveBeenLastCalledWith({
        selectedItem: null,
        inputValue: 'xyz',
      });

      expect(findInputNode()).toHaveDisplayValue('xyz');
    });
  });

  describe('ComboBox autocomplete', () => {
    const items = [
      { id: 'option-1', text: 'Option 1' },
      { id: 'option-2', text: 'Option 2' },
      { id: 'option-3', text: 'Option 3' },
      { id: 'apple', text: 'Apple' },
      { id: 'banana', text: 'Banana' },
      { id: 'orange', text: 'Orange' },
      { id: 'orangeish', text: 'Orangeish' },
    ];

    const mockProps = {
      id: 'test-combobox',
      items,
      itemToString: (item) => (item ? item.text : ''),
      onChange: jest.fn(),
    };

    it('should respect autocomplete prop', async () => {
      render(<ComboBox {...mockProps} typeahead />);
      await waitForPosition();
      const inputNode = findInputNode();
      expect(inputNode).toHaveAttribute('autocomplete');
    });
    it('should use autocompleteCustomFilter when autocomplete prop is true', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} typeahead />);

      // Open the dropdown
      const input = screen.getByRole('combobox');
      user.click(input);

      // Type 'op' which should match all options
      await user.type(input, 'op');
      expect(screen.getAllByRole('option')).toHaveLength(3);

      // Type 'opt' which should still match all options
      await user.type(input, 't');
      expect(screen.getAllByRole('option')).toHaveLength(3);

      // Type 'opti' which should match only 'Option 1'
      await user.type(input, 'i');
      expect(screen.getAllByRole('option')).toHaveLength(3);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('should use default filter when autocomplete prop is false', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} />);

      // Open the dropdown
      const input = screen.getByRole('combobox');
      user.click(input);

      // Type 'op' which should match all options
      await user.type(input, 'op');
      expect(screen.getAllByRole('option')).toHaveLength(7);

      // Type 'opt' which should still match all options
      await user.type(input, 't');
      expect(screen.getAllByRole('option')).toHaveLength(7);

      // Type 'opti' which should still match all options
      await user.type(input, 'i');
      expect(screen.getAllByRole('option')).toHaveLength(7);

      // Type 'option' which should still match all options
      await user.type(input, 'on');
      expect(screen.getAllByRole('option')).toHaveLength(7);
    });

    it('should not autocomplete when no match is found', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} typeahead />);

      const input = screen.getByRole('combobox');
      user.click(input);

      await user.type(input, 'xyz');
      await user.keyboard('[Tab]');

      expect(document.activeElement).not.toBe(input);
    });
    it('should suggest best matching typeahead suggestion and complete it in Tab key press', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} typeahead />);

      // Open the dropdown
      const input = screen.getByRole('combobox');
      user.click(input);

      // Type 'op' which should match all options
      await user.type(input, 'Ap');

      await user.keyboard('[Tab]');

      expect(findInputNode()).toHaveDisplayValue('Apple');
    });
    it('should not autocomplete on Tab after backspace', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} allowCustomValue typeahead />);

      const input = screen.getByRole('combobox');
      user.click(input);

      await user.type(input, 'App');
      await user.keyboard('[Backspace]');

      await user.keyboard('[Tab]');

      expect(document.activeElement).not.toBe(input);
    });
    it('should autocomplete with the first matching suggestion when multiple matches exist', async () => {
      const multipleMatchProps = {
        ...mockProps,
        options: ['Apple', 'Application', 'Apricot'],
      };
      const user = userEvent.setup();
      render(<ComboBox {...multipleMatchProps} allowCustomValue typeahead />);

      const input = screen.getByRole('combobox');
      user.click(input);

      await user.type(input, 'App');
      await user.keyboard('[Tab]');

      expect(input).toHaveDisplayValue('Apple');
    });

    it('should match case exactly with option list when Tab is pressed', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} allowCustomValue typeahead />);

      const input = screen.getByRole('combobox');
      user.click(input);

      await user.type(input, 'APpl');
      await user.keyboard('[Tab]');

      expect(input).toHaveDisplayValue('Apple');
    });

    it('should remove input and enter new conditions', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} typeahead />);

      const input = screen.getByRole('combobox');
      user.click(input);

      await user.keyboard('[Enter]');

      expect(input).toHaveDisplayValue('');
    });

    it('should open the menu and select null when Enter is pressed with no input and no highlighted item', async () => {
      const onInputChange = jest.fn();

      render(<ComboBox {...mockProps} onInputChange={onInputChange} />);

      await userEvent.type(findInputNode(), 'apple');
      expect(findInputNode()).toHaveDisplayValue('apple');
      await userEvent.keyboard('[Enter]');

      // Delete the selected item
      await userEvent.keyboard('[Backspace]');
      await userEvent.keyboard('[Backspace]');
      await userEvent.keyboard('[Backspace]');
      await userEvent.keyboard('[Backspace]');
      await userEvent.keyboard('[Backspace]');
      // check for an empty value
      expect(findInputNode()).toHaveDisplayValue('');

      // blur
      await userEvent.keyboard('[Tab]');
      assertMenuClosed(mockProps);

      // open the menu
      await userEvent.click(findInputNode());
      assertMenuOpen(mockProps);

      // check if the `li` item are all false
      for (let i = 0; i < mockProps.items.length; i++) {
        const item = findMenuItemNode(i);
        expect(item).toHaveAttribute('aria-selected', 'false');
      }
    });
  });

  describe('ComboBox repeated selection with controlled selectedItem and object items', () => {
    const ControlledComboBox = () => {
      const [selectedItem, setSelectedItem] = useState(null);
      const [changeCount, setChangeCount] = useState(0);
      const items = [
        {
          id: 'option-0',
          text: 'An example option that is really long to show what should be done to handle long text',
        },
        {
          id: 'option-1',
          text: 'Option 1',
        },
        {
          id: 'option-2',
          text: 'Option 2',
        },
        {
          id: 'option-3',
          text: 'Option 3 - a disabled item',
          disabled: true,
        },
        {
          id: 'option-4',
          text: 'Option 4',
        },
        {
          id: 'option-5',
          text: 'Option 5',
        },
      ];

      const handleChange = ({ selectedItem }) => {
        setSelectedItem(selectedItem);
        setChangeCount((prev) => prev + 1);
      };

      return (
        <>
          <ComboBox
            id="test-combobox"
            items={items}
            selectedItem={selectedItem}
            onChange={handleChange}
            itemToString={(item) => (item ? item.text : '')}
            placeholder="Filter..."
          />
          <div data-testid="change-count">{changeCount}</div>
        </>
      );
    };
    it('should not fire onChange when selecting the same item repeatedly with mouse', async () => {
      const user = userEvent.setup();

      render(<ControlledComboBox />);

      // First selection - should trigger onChange
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Verify first selection changed the state
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Second selection of the same item - should NOT trigger onChange
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Should NOT trigger another onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Third selection of the same item - should still NOT trigger onChange
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Should still NOT trigger onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');
    });

    it('should not fire onChange when selecting the same item repeatedly with keyboard', async () => {
      const user = userEvent.setup();

      render(<ControlledComboBox />);

      // First selection with keyboard
      await openMenu();
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}'); // Navigate to Option 2
      await user.keyboard('{Enter}');

      // Verify first selection changed the state
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Second selection of same item with keyboard
      await openMenu();
      await user.keyboard('{Enter}'); // Option 2 should already be highlighted

      // Should NOT trigger another onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Third selection of same item with keyboard
      await openMenu();
      await user.keyboard('{Enter}'); // Option 2 should still be highlighted

      // Should still NOT trigger onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');
    });

    it('should not fire onChange when selecting the same item repeatedly with mouse, with allowCustomValue', async () => {
      const user = userEvent.setup();

      // Set up a controlled component with object items and allowCustomValue

      render(<ControlledComboBox />);

      // First selection with mouse
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Verify first selection changed the state
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Second selection of same item with mouse
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Should NOT trigger another onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      await user.click(document.body); // Close the menu

      // Third selection of same item with mouse
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Should still NOT trigger onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');
    });

    it('should not fire onChange when selecting the same item repeatedly with keyboard, with allowCustomValue', async () => {
      const user = userEvent.setup();

      render(<ControlledComboBox />);

      // First selection with keyboard
      await openMenu();
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}'); // Navigate to Option 2
      await user.keyboard('{Enter}');

      // Verify first selection changed the state
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Second selection of same item with keyboard
      await openMenu();
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');
      await user.keyboard('{Enter}'); // Option 2 should already be highlighted

      // Should NOT trigger another onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Third selection of same item with keyboard
      await openMenu();
      await user.keyboard('{Enter}'); // Option 2 should still be highlighted

      // Should still NOT trigger onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');
    });
  });

  describe('ComboBox repeated selection with controlled selectedItem and string items', () => {
    const ControlledComboBox = () => {
      const [selectedItem, setSelectedItem] = useState(null);
      const [changeCount, setChangeCount] = useState(0);
      const items = [
        'An example option that is really long',
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4',
        'Option 5',
      ];

      const handleChange = ({ selectedItem }) => {
        setSelectedItem(selectedItem);
        setChangeCount((prev) => prev + 1);
      };

      return (
        <>
          <ComboBox
            id="test-combobox"
            items={items}
            selectedItem={selectedItem}
            onChange={handleChange}
            placeholder="Filter..."
          />
          <div data-testid="change-count">{changeCount}</div>
        </>
      );
    };
    it('should not fire onChange when selecting the same item repeatedly with mouse', async () => {
      const user = userEvent.setup();
      // Set up a controlled component that uses state to manage selectedItem

      render(<ControlledComboBox />);

      // First selection - should trigger onChange
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Verify first selection changed the state
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Second selection of the same item - should NOT trigger onChange
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Should NOT trigger another onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');
    });

    it('should not fire onChange when selecting the same item repeatedly with keyboard', async () => {
      const user = userEvent.setup();

      render(<ControlledComboBox />);

      // First selection with keyboard
      await openMenu();
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}'); // Navigate to Option 2
      await user.keyboard('{Enter}');

      // Verify first selection changed the state
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Second selection of same item with keyboard
      await openMenu();
      await user.keyboard('{Enter}'); // Option 2 should already be highlighted

      // Should NOT trigger another onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');
    });

    it('should not fire onChange when selecting the same item repeatedly with mouse, with allowCustomValue', async () => {
      const user = userEvent.setup();

      render(<ControlledComboBox />);

      // First selection with mouse
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Verify first selection changed the state
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Second selection of same item with mouse
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Should NOT trigger another onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');
    });

    it('should not fire onChange when selecting the same item repeatedly with keyboard, with allowCustomValue', async () => {
      const user = userEvent.setup();

      render(<ControlledComboBox />);

      // First selection with keyboard
      await openMenu();
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}'); // Navigate to Option 2
      await user.keyboard('{Enter}');

      // Verify first selection changed the state
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Second selection of same item with keyboard
      await openMenu();
      await user.keyboard('{Enter}'); // Option 2 should already be highlighted

      // Should NOT trigger another onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');
    });
  });

  it('passes inputProps to the input element', () => {
    render(
      <ComboBox
        id="test-combo"
        items={[{ label: 'Item 1' }]}
        itemToString={(item) => item?.label || ''}
        inputProps={{ maxLength: 10, placeholder: 'Type here' }}
      />
    );

    const input = screen.getByPlaceholderText('Type here');
    const attributes = Array.from(input.attributes).reduce(
      (acc, { name, value }) => ({ ...acc, [name]: value }),
      {}
    );

    expect(input).toBeInTheDocument();
    expect(attributes).toEqual({
      'aria-activedescendant': '',
      'aria-autocomplete': 'list',
      'aria-controls': attributes['aria-controls'],
      'aria-expanded': 'false',
      'aria-haspopup': 'listbox',
      'aria-label': 'Choose an item',
      autocomplete: 'off',
      class: 'cds--text-input cds--text-input--empty',
      id: 'test-combo',
      maxlength: '10',
      placeholder: 'Type here',
      role: 'combobox',
      tabindex: '0',
      type: 'text',
      value: '',
    });
  });

  it('should set `aria-controls` on the combobox input when the menu opens', async () => {
    render(<ComboBox {...mockProps} />);

    await openMenu();

    const combobox = screen.getByRole('combobox');
    const listbox = screen.getByRole('listbox');

    expect(listbox).toHaveAttribute('id');
    expect(combobox).toHaveAttribute('aria-controls', listbox.id);
  });
});
