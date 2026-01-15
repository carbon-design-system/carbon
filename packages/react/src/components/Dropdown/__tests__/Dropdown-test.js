/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef } from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  assertMenuOpen,
  assertMenuClosed,
  openMenu,
  generateItems,
  generateGenericItem,
  waitForPosition,
} from '../../ListBox/test-helpers';
import Dropdown from '..';
import DropdownSkeleton from '../Dropdown.Skeleton';
import { AILabel } from '../../AILabel';
import { Simulate } from 'react-dom/test-utils';

const prefix = 'cds';

describe('Dropdown', () => {
  let mockProps;
  beforeEach(() => {
    mockProps = {
      id: 'test-dropdown',
      items: generateItems(5, generateGenericItem),
      onChange: jest.fn(),
      label: 'input',
      placeholder: 'Filter...',
      type: 'default',
      titleText: 'Dropdown label',
    };
  });
  afterEach(() => {
    jest.useRealTimers(); // Restore real timers after each test
  });

  it('should initially render with the menu not open', async () => {
    render(<Dropdown {...mockProps} />);
    await waitForPosition();
    assertMenuClosed();
  });

  it('should let the user open the menu by clicking on the control', async () => {
    render(<Dropdown {...mockProps} />);
    await openMenu();
    assertMenuOpen(mockProps);
  });

  it('should render with strings as items', async () => {
    render(<Dropdown {...mockProps} items={['zar', 'doz']} />);
    await openMenu();

    expect(screen.getByText('zar')).toBeInTheDocument();
    expect(screen.getByText('doz')).toBeInTheDocument();
  });

  it('should render custom item components', async () => {
    const itemToElement = jest.fn((item) => {
      return <div className="mock-item">{item.label}</div>;
    });

    render(<Dropdown itemToElement={itemToElement} {...mockProps} />);
    await openMenu();

    expect(itemToElement).toHaveBeenCalled();
  });

  it('should render selectedItem as an element', async () => {
    render(
      <Dropdown
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
    await waitForPosition();
    // custom element should be rendered for the selected item
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector('#a-custom-element-for-selected-item')
    ).toBeDefined();
    // the title should use the normal itemToString method

    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('should render selectedItem as an element of type number', async () => {
    const itemToElement = jest.fn((item) => {
      return <div className="mock-item">{item.label}</div>;
    });
    let mockProps1 = { ...mockProps, label: 1 };
    render(<Dropdown itemToElement={itemToElement} {...mockProps1} />);
    await openMenu();
    expect(itemToElement).toHaveBeenCalled();
    await waitForPosition();
    expect(screen.getByText(1)).toBeInTheDocument();
  });

  it('should render when defaultItemToString passed with null value', async () => {
    let mockProps2 = { ...mockProps, label: [] };
    const { container } = render(<Dropdown {...mockProps2} />);
    const labelElement = screen.queryByText('shankar');
    expect(labelElement).not.toBeInTheDocument();
    const emptySpanTargeting = container.querySelector(
      '.cds--list-box__label:not(:empty)'
    );
    expect(emptySpanTargeting).toBeNull();
  });

  describe('title', () => {
    it('renders a title', async () => {
      render(<Dropdown {...mockProps} titleText="Email Input" />);
      await waitForPosition();
      expect(screen.getByText('Email Input')).toBeInTheDocument();
    });

    it('has the expected classes', async () => {
      render(<Dropdown {...mockProps} titleText="Email Input" />);
      await waitForPosition();
      expect(screen.getByText('Email Input')).toHaveClass(`${prefix}--label`);
    });
  });

  describe('helper', () => {
    it('renders a helper', async () => {
      render(<Dropdown helperText="Email Input" {...mockProps} />);
      await waitForPosition();
      expect(screen.getByText('Email Input')).toBeInTheDocument();
    });

    it('renders children as expected', async () => {
      render(
        <Dropdown
          helperText={
            <span>
              This helper text has <a href="/">a link</a>.
            </span>
          }
          {...mockProps}
        />
      );
      await waitForPosition();

      expect(screen.getByRole('link')).toBeInTheDocument();
    });
  });

  it('should let the user select an option by clicking on the option node', async () => {
    render(<Dropdown {...mockProps} />);
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

  it('should not open on arrowUp', async () => {
    let mockProps1 = { ...mockProps };
    const ref = React.createRef();
    render(<Dropdown {...mockProps1} readOnly={false} ref={ref} />);

    const button = screen.getByRole('combobox');

    if (button) {
      assertMenuClosed();
      // ArrowUp should not open the menu
      fireEvent.keyDown(button, { key: 'ArrowUp' });
      assertMenuClosed();
      // ArrowDown should open the menu
      fireEvent.keyDown(button, { key: 'ArrowDown' });
      assertMenuOpen(mockProps1);
      // ArrowUp is allowed now that the menu is open
      fireEvent.keyDown(button, { key: 'ArrowUp' });
      assertMenuOpen(mockProps1);
    }

    mockProps.onChange.mockClear();
  });

  it('should respect readOnly prop', async () => {
    let onChange = jest.fn();
    let onKeyDown = jest.fn();
    let mockProps1 = { ...mockProps };
    const ref = React.createRef();
    let dropDownItem = render(
      <Dropdown
        {...mockProps1}
        readOnly={true}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={ref}
      />
    );
    await openMenu(); // menu should not open
    assertMenuClosed();

    await waitForPosition();

    const button = screen.getByRole('combobox');

    if (button) {
      fireEvent.click(button);
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
      fireEvent.keyDown(screen.getByRole('combobox'), { code: 'ArrowDown' });
    }

    expect(onChange).toHaveBeenCalledTimes(0);
    expect(onKeyDown).toHaveBeenCalledTimes(2);
    expect(onKeyDown).toHaveBeenCalledWith(
      expect.objectContaining({ key: 'ArrowDown' })
    );
    await openMenu(); // menu should not open
    expect(screen.queryByText('Item 0')).not.toBeInTheDocument();
    expect(mockProps.onChange).toHaveBeenCalledTimes(0);
    assertMenuClosed();

    mockProps.onChange.mockClear();
  });

  it('should respect readOnly prop with false and respect call setTimeout function', async () => {
    let onChange = jest.fn();
    let onKeyDown = jest.fn();
    let mockProps2 = { ...mockProps };
    const ref = React.createRef();

    render(
      <Dropdown
        {...mockProps2}
        readOnly={false}
        onKeyDown={onKeyDown}
        onChange={onChange}
        ref={ref}
      />
    );

    //const button = dropDownItem.container.querySelector('#downshift-\\:r19\\»-toggle-button');
    const button = screen.getByRole('combobox');
    await waitForPosition();
    if (button) {
      act(() => {
        jest.useFakeTimers();
        fireEvent.keyDown(screen.getByRole('combobox'), {
          key: 'Space',
          code: 'Space',
        });
        fireEvent.keyDown(screen.getByRole('combobox'), {
          key: 'ArrowLeft',
          code: 'ArrowLeft',
        });
        jest.advanceTimersByTime(3000);
      });
    }
    if (button) {
      act(() => {
        fireEvent.keyDown(screen.getByRole('combobox'), {
          key: 'Space',
          code: 'Space',
        });
        fireEvent.keyDown(screen.getByRole('combobox'), {
          key: 'ArrowLeft',
          code: 'ArrowLeft',
        });
      });
    }
    //await openMenu();

    expect(onKeyDown).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'Space' })
    );
    expect(onKeyDown).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'ArrowLeft' })
    );
    expect(onChange).toHaveBeenCalledTimes(0);
    assertMenuClosed();
    jest.useRealTimers(); // Restore the original timer behavior
  });

  it('should respect readOnly prop with false argument and respect clear activated Timeout', async () => {
    let onChange = jest.fn();
    let onKeyDown = jest.fn();
    render(<Dropdown {...mockProps} readOnly={false} onKeyDown={onKeyDown} />);

    await waitForPosition();
    const button = screen.getByRole('combobox');
    if (button) {
      act(() => {
        fireEvent.keyDown(screen.getByRole('combobox'), {
          key: 'Space',
          code: 'Space',
        });
        fireEvent.keyDown(screen.getByRole('combobox'), {
          key: 'ArrowLeft',
          code: 'ArrowLeft',
        });
      });
    }
    expect(onKeyDown).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'Space' })
    );
    expect(onKeyDown).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'ArrowLeft' })
    );
    //expect(screen.queryByText('Item 0')).not.toBeInTheDocument();
    expect(onChange).toHaveBeenCalledTimes(0);
    assertMenuClosed();
  });

  it('should preserve selectedItem when menu is closed programmatically', async () => {
    render(
      <Dropdown {...mockProps} initialSelectedItem={mockProps.items[2]} />
    );

    await waitForPosition();

    expect(screen.getByText('Item 2')).toBeInTheDocument();

    await openMenu();
    assertMenuOpen(mockProps);

    const button = screen.getByRole('combobox');
    fireEvent.keyDown(button, { key: 'ArrowDown' });

    act(() => {
      fireEvent.blur(button);
    });

    await waitForPosition();
    assertMenuClosed();

    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(mockProps.onChange).not.toHaveBeenCalled();
  });

  describe('should display initially selected item found in `initialSelectedItem`', () => {
    it('using an object type for the `initialSelectedItem` prop', async () => {
      render(
        <Dropdown {...mockProps} initialSelectedItem={mockProps.items[0]} />
      );
      await waitForPosition();

      expect(screen.getByText(mockProps.items[0].label)).toBeInTheDocument();
    });

    it('using a string type for the `initialSelectedItem` prop', async () => {
      // Replace the 'items' property in mockProps with a list of strings
      mockProps = {
        ...mockProps,
        items: ['1', '2', '3'],
      };

      render(
        <Dropdown {...mockProps} initialSelectedItem={mockProps.items[1]} />
      );
      await waitForPosition();

      expect(screen.getByText(mockProps.items[1])).toBeInTheDocument();
    });
  });

  describe('Component API', () => {
    window.HTMLElement.prototype.scrollIntoView = function () {};
    it('should accept a `ref` for the underlying button element', async () => {
      const ref = React.createRef();
      render(<Dropdown {...mockProps} ref={ref} />);
      await waitForPosition();
      expect(ref.current).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('should respect decorator prop', async () => {
      const { container } = render(
        <Dropdown {...mockProps} decorator={<AILabel />} />
      );
      await waitForPosition();
      expect(container.firstChild).toHaveClass(
        `${prefix}--list-box__wrapper--decorator`
      );
    });

    it('should respect deprecated slug prop', async () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const { container } = render(
        <Dropdown {...mockProps} slug={<AILabel />} />
      );
      await waitForPosition();
      expect(container.firstChild).toHaveClass(
        `${prefix}--list-box__wrapper--slug`
      );
      spy.mockRestore();
    });
  });
});

describe('Dropdown', () => {
  let mockProps;
  beforeEach(() => {
    mockProps = {
      id: 'test-dropdown',
      items: generateItems(5, generateGenericItem),
      onChange: jest.fn(),
      label: 'input',
      placeholder: 'Filter...',
      type: 'default',
      titleText: 'Dropdown label',
    };
  });

  it('should initially render with the menu not open ', async () => {
    render(<Dropdown {...mockProps} readOnly={true} />);
    await waitForPosition();
    assertMenuClosed();
  });
});

describe('Validation states with disabled/readonly', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      id: 'test-dropdown',
      items: generateItems(5, generateGenericItem),
      onChange: jest.fn(),
      label: 'input',
      titleText: 'Dropdown label',
    };
  });

  it('should not show invalid state when disabled', async () => {
    const { container } = render(
      <Dropdown {...mockProps} disabled invalid invalidText="Error message" />
    );
    await waitForPosition();

    expect(
      container.querySelector(`.${prefix}--dropdown--invalid`)
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Error message')).not.toBeInTheDocument();
    expect(
      container.querySelector(`.${prefix}--list-box__invalid-icon`)
    ).not.toBeInTheDocument();
  });

  it('should not show invalid state when readonly', async () => {
    const { container } = render(
      <Dropdown {...mockProps} readOnly invalid invalidText="Error message" />
    );
    await waitForPosition();

    expect(
      container.querySelector(`.${prefix}--dropdown--invalid`)
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Error message')).not.toBeInTheDocument();
    expect(
      container.querySelector(`.${prefix}--list-box__invalid-icon`)
    ).not.toBeInTheDocument();
  });

  it('should not show warning state when disabled', async () => {
    const { container } = render(
      <Dropdown {...mockProps} disabled warn warnText="Warning message" />
    );
    await waitForPosition();

    expect(
      container.querySelector(`.${prefix}--dropdown--warning`)
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Warning message')).not.toBeInTheDocument();
    expect(
      container.querySelector(`.${prefix}--list-box__invalid-icon--warning`)
    ).not.toBeInTheDocument();
  });

  it('should not show warning state when readonly', async () => {
    const { container } = render(
      <Dropdown {...mockProps} readOnly warn warnText="Warning message" />
    );
    await waitForPosition();

    expect(
      container.querySelector(`.${prefix}--dropdown--warning`)
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Warning message')).not.toBeInTheDocument();
    expect(
      container.querySelector(`.${prefix}--list-box__invalid-icon--warning`)
    ).not.toBeInTheDocument();
  });

  it('should show invalid state when interactive', async () => {
    const { container } = render(
      <Dropdown {...mockProps} invalid invalidText="Error message" />
    );
    await waitForPosition();

    expect(
      container.querySelector(`.${prefix}--dropdown--invalid`)
    ).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(
      container.querySelector(`.${prefix}--list-box__invalid-icon`)
    ).toBeInTheDocument();
  });

  it('should show warning state when interactive', async () => {
    const { container } = render(
      <Dropdown {...mockProps} warn warnText="Warning message" />
    );
    await waitForPosition();

    expect(
      container.querySelector(`.${prefix}--dropdown--warning`)
    ).toBeInTheDocument();
    expect(screen.getByText('Warning message')).toBeInTheDocument();
    expect(
      container.querySelector(`.${prefix}--list-box__invalid-icon--warning`)
    ).toBeInTheDocument();
  });

  it('should show helper text instead of validation when disabled', async () => {
    render(
      <Dropdown
        {...mockProps}
        disabled
        invalid
        invalidText="Error"
        helperText="Helper text"
      />
    );
    await waitForPosition();

    expect(screen.getByText('Helper text')).toBeInTheDocument();
    expect(screen.queryByText('Error')).not.toBeInTheDocument();
  });

  it('should show helper text instead of validation when readonly', async () => {
    render(
      <Dropdown
        {...mockProps}
        readOnly
        warn
        warnText="Warning"
        helperText="Helper text"
      />
    );
    await waitForPosition();

    expect(screen.getByText('Helper text')).toBeInTheDocument();
    expect(screen.queryByText('Warning')).not.toBeInTheDocument();
  });
});

describe('DropdownSkeleton', () => {
  describe('Renders as expected', () => {
    it('Has the expected classes', () => {
      render(<DropdownSkeleton size="sm" />);

      // eslint-disable-next-line testing-library/no-node-access
      expect(document.querySelector(`${prefix}--skeleton`)).toBeDefined();
    });
  });
});

describe('Test useEffect ', () => {
  let mockProps;
  beforeEach(() => {
    mockProps = {
      id: 'test-dropdown',
      items: generateItems(5, generateGenericItem),
      onChange: jest.fn(),
      label: 'input',
      placeholder: 'Filter...',
      type: 'default',
      titleText: 'Dropdown label',
    };
  });

  it('for auto-align features', async () => {
    const initialStyles = { top: '10px', left: '20px' };
    const updatedStyles = { top: '30px', left: '40px' };
    const { getByTestId, rerender } = render(
      <Dropdown
        {...mockProps}
        autoAlign={false}
        floatingstyles={initialStyles}
      />
    );
    //Initially, styles should not be set because autoAlign is false
    //const floatingElement = getByTestId('test-dropdown');
    rerender(
      <Dropdown
        {...mockProps}
        autoAlign={true}
        floatingstyles={updatedStyles}
      />
    );
    await waitForPosition();
    assertMenuClosed();
  });

  it('should add certain label props when `titleText` is a string', () => {
    render(<Dropdown {...mockProps} titleText="Dropdown Title" />);

    const label = screen.getByText('Dropdown Title').closest('label');
    const attributes = Array.from(label.attributes).reduce(
      (acc, { name, value }) => ({ ...acc, [name]: value }),
      {}
    );

    expect(attributes).toEqual({
      class: 'cds--label',
      for: 'downshift-_r_27_-toggle-button',
      id: 'downshift-_r_27_-label',
    });
  });

  it('should add certain label props when `titleText` is an element', () => {
    render(<Dropdown {...mockProps} titleText={<span>Dropdown Title</span>} />);

    const label = screen.getByText('Dropdown Title').closest('label');
    const attributes = Array.from(label.attributes).reduce(
      (acc, { name, value }) => ({ ...acc, [name]: value }),
      {}
    );

    expect(attributes).toEqual({
      class: 'cds--label',
      id: 'downshift-_r_29_-label',
    });
  });
});
