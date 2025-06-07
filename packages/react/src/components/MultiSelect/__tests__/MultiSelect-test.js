/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { generateGenericItem, generateItems } from '../../ListBox/test-helpers';
import { getByText, isElementVisible } from '@carbon/test-utils/dom';

import { AILabel } from '../../AILabel';
import Button from '../../Button';
import ButtonSet from '../../ButtonSet';
import { MultiSelect } from '../';
import userEvent from '@testing-library/user-event';

const prefix = 'cds';
const waitForPosition = () => act(async () => {});

describe('MultiSelect', () => {
  let mockProps;
  beforeEach(() => {
    jest.mock('../../../internal/deprecateFieldOnObject');
    mockProps = {
      id: 'test-multiselect',
      initialSelectedItems: [],
      items: generateItems(5, generateGenericItem),
      label: 'Test label',
      onChange: jest.fn(),
    };
  });

  describe.skip('automated accessibility tests', () => {
    it('should have no axe violations', async () => {
      const items = generateItems(4, generateGenericItem);
      const { container } = render(
        <MultiSelect id="test" label="Field" items={items} />
      );
      await waitForPosition();

      await expect(container).toHaveNoAxeViolations();
    });

    it('should have no AC violations', async () => {
      const items = generateItems(4, generateGenericItem);
      const { container } = render(
        <MultiSelect id="test" label="Field" items={items} />
      );
      await waitForPosition();

      await expect(container).toHaveNoACViolations('MultiSelect');
    });
  });
  it('does not render items with undefined values', async () => {
    const items = [{ text: 'joey' }, { text: 'johnny' }, { text: undefined }];
    const label = 'test-label';
    render(
      <MultiSelect
        id="custom-id"
        label={label}
        items={items}
        itemToString={(item) => (item ? item.text : '')}
      />
    );
    await waitForPosition();

    const labelNode = screen.getByRole('combobox');
    await userEvent.click(labelNode);

    expect(screen.getByRole('option', { name: 'joey' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'johnny' })).toBeInTheDocument();
    expect(
      screen.queryByRole('option', { name: 'undefined' })
    ).not.toBeInTheDocument();
  });

  it('should initially render with a given label', async () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" label={label} items={items} />
    );
    await waitForPosition();

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const labelNode = getByText(container, label);
    expect(isElementVisible(labelNode)).toBe(true);

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeNull();
  });

  it('should open the menu when a user clicks on the label', async () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" label={label} items={items} />
    );
    await waitForPosition();

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const labelNode = getByText(container, label);
    await userEvent.click(labelNode);

    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-haspopup',
      'listbox'
    );
  });

  it('should open the menu when a user hits space while the field is focused', async () => {
    const items = generateItems(4, generateGenericItem);
    render(<MultiSelect id="test" label="test-label" items={items} />);
    await waitForPosition();

    await userEvent.tab();
    await userEvent.keyboard('[Space]');

    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-haspopup',
      'listbox'
    );
  });

  it('should open the menu when a user hits enter while the field is focused', async () => {
    const items = generateItems(4, generateGenericItem);
    render(<MultiSelect id="test" label="test-label" items={items} />);
    await waitForPosition();

    await userEvent.tab();
    await userEvent.keyboard('[Enter]');

    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-haspopup',
      'listbox'
    );
  });

  it('should let the user toggle item selection with a mouse', async () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" label={label} items={items} />
    );
    await waitForPosition();

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const labelNode = getByText(container, label);
    await userEvent.click(labelNode);

    const [item] = items;
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const itemNode = getByText(container, item.label);

    const options = screen.getAllByRole('option');
    for (const option of options) {
      expect(option).toHaveAttribute('aria-selected', 'false');
    }

    await userEvent.click(itemNode);
    expect(options[0]).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(itemNode);
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('should close the menu when the user hits the Escape key', async () => {
    const items = generateItems(4, generateGenericItem);
    const { container } = render(
      <MultiSelect id="test" label="test-label" items={items} />
    );

    await userEvent.tab();
    await userEvent.keyboard('[Space]');

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeInstanceOf(HTMLElement);

    await userEvent.keyboard('[Escape]');

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeNull();
  });

  it('close menu with click outside of field', async () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" label={label} items={items} />
    );
    await waitForPosition();

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const labelNode = getByText(container, label);

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeFalsy();

    await userEvent.click(labelNode);

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeTruthy();

    await userEvent.click(document.body);

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeFalsy();
  });

  it('should toggle selection with enter', async () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" label={label} items={items} />
    );
    await waitForPosition();

    await userEvent.tab();
    await userEvent.keyboard('[Space]');

    const [item] = items;
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const itemNode = getByText(container, item.label);

    const options = screen.getAllByRole('option');
    for (const option of options) {
      expect(option).toHaveAttribute('aria-selected', 'false');
    }

    expect(options[0]).toHaveAttribute('aria-selected', 'false');

    await userEvent.keyboard('[Enter]');
    await userEvent.keyboard('[ArrowDown]');
    await userEvent.keyboard('[Enter]');

    expect(options[0]).toHaveAttribute('aria-selected', 'true');
  });

  it('should clear selected items when the user clicks the clear selection button', async () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" label={label} items={items} />
    );
    await waitForPosition();

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const labelNode = getByText(container, label);
    await userEvent.click(labelNode);

    const [item] = items;
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const itemNode = getByText(container, item.label);
    await userEvent.click(itemNode);

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector('[aria-label="Clear all selected items"]')
    ).toBeTruthy();

    await userEvent.click(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector('[aria-label="Clear all selected items"]')
    );

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector('[aria-label="Clear all selected items"]')
    ).toBeFalsy();
  });

  it('should not be interactive if disabled', async () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" disabled label={label} items={items} />
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

  it('should not be interactive if readonly', async () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" readOnly={true} label={label} items={items} />
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

  describe('Component API', () => {
    it('should set the default selected items with the `initialSelectedItems` prop', async () => {
      const items = generateItems(4, generateGenericItem);
      const label = 'test-label';
      const { container } = render(
        <MultiSelect
          id="test-multiselect"
          label={label}
          items={items}
          initialSelectedItems={[items[0], items[1]]}
        />
      );
      await waitForPosition();

      expect(
        // eslint-disable-next-line testing-library/no-node-access
        document.querySelector('[aria-label="Clear all selected items"]')
      ).toBeTruthy();

      // eslint-disable-next-line testing-library/prefer-screen-queries
      const labelNode = getByText(container, label);

      await userEvent.click(labelNode);

      const options = screen.getAllByRole('option');
      expect(options[0]).toHaveAttribute('aria-selected', 'true');
      expect(options[1]).toHaveAttribute('aria-selected', 'true');
      expect(options[2]).toHaveAttribute('aria-selected', 'false');
      expect(options[3]).toHaveAttribute('aria-selected', 'false');
    });

    it('should trigger onChange with selected items', async () => {
      let selectedItems = [];
      const testFunction = jest.fn((e) => (selectedItems = e?.selectedItems));
      const items = generateItems(4, generateGenericItem);
      const label = 'test-label';
      const { container } = render(
        <MultiSelect
          id="custom-id"
          onChange={testFunction}
          selectedItems={selectedItems}
          label={label}
          items={items}
        />
      );
      await waitForPosition();

      // eslint-disable-next-line testing-library/prefer-screen-queries
      const labelNode = getByText(container, label);
      await userEvent.click(labelNode);

      const [item] = items;
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const itemNode = getByText(container, item.label);

      await userEvent.click(itemNode);
      // Assert that the onChange callback returned the selected items and assigned it to selectedItems
      expect(testFunction.mock.results[0].value).toEqual(selectedItems);
    });

    it('should place the given id on the ___ node when passed in as a prop', async () => {
      const items = generateItems(4, generateGenericItem);
      const label = 'test-label';

      render(
        <MultiSelect
          id="custom-id"
          label={label}
          items={items}
          initialSelectedItems={[items[0], items[1]]}
        />
      );
      await waitForPosition();

      // eslint-disable-next-line testing-library/no-node-access
      expect(document.getElementById('custom-id')).toBeTruthy();
    });

    it('should support a custom itemToString with object items', async () => {
      const items = [
        { text: 'joey' },
        { text: 'johnny' },
        { text: 'tommy' },
        { text: 'dee dee' },
        { text: 'marky' },
      ];
      const label = 'test-label';
      const { container } = render(
        <MultiSelect
          id="custom-id"
          label={label}
          items={items}
          itemToString={(item) => (item ? item.text : '')}
        />
      );
      await waitForPosition();

      // eslint-disable-next-line testing-library/prefer-screen-queries
      const labelNode = getByText(container, label);

      await userEvent.click(labelNode);

      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText(container, 'joey')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText(container, 'johnny')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText(container, 'tommy')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText(container, 'dee dee')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText(container, 'marky')).toBeInTheDocument();
    });

    it('should support a custom itemToElement', async () => {
      const items = [{ text: 'test-item' }];
      const label = 'test-label';
      const { container } = render(
        <MultiSelect
          id="custom-id"
          label={label}
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          itemToElement={(item) =>
            item ? (
              <span className="test-element">
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

      // eslint-disable-next-line testing-library/prefer-screen-queries
      const labelNode = getByText(container, label);
      await userEvent.click(labelNode);

      // eslint-disable-next-line testing-library/no-node-access
      expect(document.querySelector('.test-element')).toBeTruthy();
      // eslint-disable-next-line testing-library/no-node-access
      expect(document.querySelector('span[role="img"]')).toBeTruthy();
    });

    it('should support custom translation with translateWithId', async () => {
      const items = generateItems(4, generateGenericItem);
      const label = 'test-label';
      const translateWithId = jest.fn(() => 'message');

      render(
        <MultiSelect
          id="custom-id"
          translateWithId={translateWithId}
          label={label}
          items={items}
        />
      );
      await waitForPosition();

      expect(translateWithId).toHaveBeenCalled();
    });

    it('should call onChange when the selection changes from user selection', async () => {
      const testFunction = jest.fn();
      const items = generateItems(4, generateGenericItem);
      const label = 'test-label';

      const { container } = render(
        <MultiSelect
          id="custom-id"
          onChange={testFunction}
          label={label}
          items={items}
        />
      );
      await waitForPosition();

      // eslint-disable-next-line testing-library/prefer-screen-queries
      const labelNode = getByText(container, label);
      await userEvent.click(labelNode);

      const [item] = items;
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const itemNode = getByText(container, item.label);

      await userEvent.click(itemNode);

      expect(testFunction).toHaveBeenCalledTimes(1);
    });

    it('should support an invalid state with invalidText that describes the field', async () => {
      const items = generateItems(4, generateGenericItem);
      const label = 'test-label';

      const { container } = render(
        <MultiSelect
          id="custom-id"
          invalid
          invalidText="Fool of a Took!"
          label={label}
          items={items}
        />
      );
      await waitForPosition();

      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText(container, 'Fool of a Took!')).toBeInTheDocument();

      // eslint-disable-next-line testing-library/no-node-access
      expect(document.querySelector('[data-invalid="true"')).toBeInstanceOf(
        HTMLElement
      );
    });

    it('should support different feedback modes with selectionFeedback', async () => {
      const items = generateItems(4, generateGenericItem);
      const label = 'test-label';
      const [_firstItem, _secondItem, thirdItem] = items;
      const { container } = render(
        <MultiSelect
          id="custom-id"
          selectionFeedback="top"
          label={label}
          items={items}
        />
      );
      await waitForPosition();

      // click the label to open the multiselect options menu
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const labelNode = getByText(container, label);
      await userEvent.click(labelNode);

      // click the third option down in the list
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const itemNode = getByText(container, thirdItem.label);
      await userEvent.click(itemNode);

      // get an array of all the options
      const optionsArray = Array.from(
        // eslint-disable-next-line testing-library/no-node-access
        document.querySelectorAll('[role="option"]')
      );

      // the first option in the list to the the former third option in the list
      expect(optionsArray[0]).toHaveAttribute('aria-label', 'Item 2');
    });

    it('should accept a `ref` for the underlying button element', async () => {
      const ref = React.createRef();
      const items = generateItems(4, generateGenericItem);
      const label = 'test-label';
      render(<MultiSelect id="test" label={label} items={items} ref={ref} />);
      await waitForPosition();

      expect(ref.current).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('should respect slug prop', async () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const items = generateItems(4, generateGenericItem);
      const label = 'test-label';
      const { container } = render(
        <MultiSelect id="test" label={label} items={items} slug={<AILabel />} />
      );
      await waitForPosition();

      expect(container.firstChild).toHaveClass(
        `${prefix}--list-box__wrapper--slug`
      );
      spy.mockRestore();
    });

    it('should respect decorator prop', async () => {
      const items = generateItems(4, generateGenericItem);
      const label = 'test-label';
      const { container } = render(
        <MultiSelect
          id="test"
          label={label}
          items={items}
          decorator={<AILabel />}
        />
      );
      await waitForPosition();

      expect(container.firstChild).toHaveClass(
        `${prefix}--list-box__wrapper--decorator`
      );
    });

    it('should select all options when isSelectAll property in an item is provided', async () => {
      const items = [
        {
          id: 'select-all',
          text: 'All roles',
          isSelectAll: true,
        },
        {
          id: 'downshift-1-item-0',
          text: 'Editor',
        },
        {
          id: 'downshift-1-item-1',
          text: 'Owner',
        },
        {
          id: 'downshift-1-item-2',
          text: 'Uploader',
        },
      ];
      render(
        <MultiSelect
          id="test"
          label={'test-label'}
          titleText="Multiselect title"
          itemToString={(item) => (item ? item.text : '')}
          helperText="This is helper text"
          items={items}
        />
      );

      const labelNode = screen.getByRole('combobox');
      await userEvent.click(labelNode);

      const options = screen.getAllByRole('option');

      await userEvent.click(screen.getByText('All roles'));
      options.forEach((option) => {
        expect(option).toHaveAttribute('aria-selected', 'true');
      });
      //verify all options are de-selected
      await userEvent.click(screen.getByText('All roles'));
      options.forEach((option) => {
        expect(option).toHaveAttribute('aria-selected', 'false');
      });
    });
  });

  describe('Controlled', () => {
    const ControlledMultiselect = () => {
      const items = generateItems(4, generateGenericItem);
      const [selectedItems, setSelectedItems] = useState([]);

      const onSelectionChanged = (value) => {
        setSelectedItems(value);
      };
      return (
        <>
          <MultiSelect
            id="test"
            titleText="Multiselect title"
            label="test-label"
            items={items}
            selectedItems={selectedItems}
            onChange={(data) => onSelectionChanged(data.selectedItems)}
            selectionFeedback="top-after-reopen"
          />
          <br />
          <ButtonSet>
            <Button
              id="all"
              onClick={() =>
                setSelectedItems(items.filter((item) => !item.disabled))
              }>
              Select all
            </Button>
            <Button
              id="clear"
              kind="secondary"
              onClick={() => setSelectedItems([])}>
              Clear
            </Button>
          </ButtonSet>
        </>
      );
    };

    it('should initially render controlled multiselect with a given label', async () => {
      const label = 'test-label';
      const { container } = render(<ControlledMultiselect />);
      await waitForPosition();
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const labelNode = getByText(container, label);
      expect(isElementVisible(labelNode)).toBe(true);

      expect(
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        container.querySelector(
          '[aria-expanded="true"][aria-haspopup="listbox"]'
        )
      ).toBeNull();
    });
    it('should allow the items to be controlled from external state', async () => {
      const label = 'test-label';
      const { container } = render(<ControlledMultiselect />);
      const labelNode = getByText(container, label);
      expect(isElementVisible(labelNode)).toBe(true);
      //select all the items
      await userEvent.click(screen.getByText('Select all'));
      //open the dropdown to check
      const dropdownNode = screen.getByRole('combobox');
      await userEvent.click(dropdownNode);
      // Check if all items are selected
      const options = screen.getAllByRole('option');
      options.forEach((option) => {
        expect(option).toHaveAttribute('aria-selected', 'true');
      });

      //clear the selection
      await userEvent.click(screen.getByText('Clear'));
      await userEvent.click(dropdownNode);
      //check if all items are cleared
      const items = screen.getAllByRole('option');
      items.forEach((option) => {
        expect(option).toHaveAttribute('aria-selected', 'false');
      });
    });
    it('should support controlled component functionality with selectedItems and onChange', async () => {
      const onChange = jest.fn();
      const items = generateItems(4, generateGenericItem);
      const { rerender } = render(
        <MultiSelect
          items={items}
          label="test-label"
          id="test-id"
          selectedItems={[items[0]]}
          onChange={onChange}
        />
      );

      // The selected items should match what's passed into selectedItems
      const dropdownNode = screen.getByRole('combobox');
      await userEvent.click(dropdownNode);
      expect(screen.getAllByRole('option')[0]).toHaveAttribute(
        'aria-selected',
        'true'
      );

      // onChange should fire for interactions
      await userEvent.click(screen.getAllByRole('option')[1]);
      expect(onChange).toHaveBeenCalledTimes(1);

      // If the onChange event data is not used to update selectedItems, the selection should remain as it was before
      expect(screen.getAllByRole('option')[0]).toHaveAttribute(
        'aria-selected',
        'true'
      );
      expect(screen.getAllByRole('option')[1]).toHaveAttribute(
        'aria-selected',
        'false'
      );

      // Force a re-render with updated selectedItems matching the initial selection and the onChange event data
      rerender(
        <MultiSelect
          items={items}
          label="test-label"
          id="test-id"
          selectedItems={[items[0], items[1]]}
          onChange={onChange}
        />
      );

      // Now both should be selected
      expect(screen.getAllByRole('option')[0]).toHaveAttribute(
        'aria-selected',
        'true'
      );
      expect(screen.getAllByRole('option')[1]).toHaveAttribute(
        'aria-selected',
        'true'
      );
    });
  });

  it('should prevent default behavior for ArrowDown, ArrowUp, Space, and Enter keys', async () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';

    render(<MultiSelect id="test" label={label} items={items} />);

    await waitForPosition();

    const combobox = screen.getByRole('combobox');
    const keysToTest = ['ArrowDown', 'ArrowUp', ' ', 'Enter'];

    for (const key of keysToTest) {
      const event = new KeyboardEvent('keydown', {
        key,
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultMock = jest.fn();
      Object.defineProperty(event, 'preventDefault', {
        value: preventDefaultMock,
        writable: true,
      });

      // Wrap the event dispatch in act(...)
      await act(async () => {
        combobox.dispatchEvent(event);
      });

      expect(preventDefaultMock).toHaveBeenCalled();
    }
  });

  it('should focus the element if mergedRef.current is defined', async () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const mergedRef = React.createRef(); // No TypeScript type annotation needed here

    render(
      <MultiSelect id="test" label={label} items={items} ref={mergedRef} />
    );

    // Wait for mergedRef to be defined (i.e., after component mounts)
    await waitFor(() => expect(mergedRef.current).toBeDefined());

    // Wrap the action of focusing inside `act()`
    await act(async () => {
      if (mergedRef.current) {
        mergedRef.current.focus();
      }
    });

    // Verify that the element is focused
    if (mergedRef.current) {
      expect(mergedRef.current).toHaveFocus();
    }
  });

  it('should not throw an error when slug is not defined', () => {
    render(<MultiSelect id="test" label="Test Label" items={[]} />);

    const combobox = screen.getByRole('combobox');
    expect(combobox).toBeInTheDocument();
  });
  it('should call preventDefault for select access keys when readonly is true', () => {
    const mockPreventDefault = jest.fn();
    render(
      <MultiSelect id="test" label="Test Label" items={[]} readOnly={true} />
    );
    const combobox = screen.getByRole('combobox');
    expect(combobox).toBeInTheDocument();
    combobox.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        mockPreventDefault();
      }
    });
    fireEvent.keyDown(combobox, { key: 'Enter' });
    expect(mockPreventDefault).toHaveBeenCalled();
  });

  it('should return a comma-separated string for an array of items', () => {
    const mockItems = [{ value: 'item1' }, { value: 'item2' }];
    const mockItemToString = jest.fn((item) => item.value);

    const selectProps = {
      stateReducer: jest.fn(),
      isOpen: false,
      itemToString: (filteredItems) =>
        Array.isArray(filteredItems)
          ? filteredItems.map((item) => mockItemToString(item)).join(', ')
          : '',
    };
    const result = selectProps.itemToString(mockItems);
    expect(result).toBe('item1, item2');
    expect(mockItemToString).toHaveBeenCalledTimes(2);
  });

  it('should return an empty string for non-array input', () => {
    const mockItemToString = jest.fn();

    const selectProps = {
      stateReducer: jest.fn(),
      isOpen: false,
      itemToString: (filteredItems) =>
        Array.isArray(filteredItems)
          ? filteredItems.map((item) => mockItemToString(item)).join(', ')
          : '',
    };

    const result = selectProps.itemToString(null);

    expect(result).toBe('');
    expect(mockItemToString).not.toHaveBeenCalled();
  });

  it('should add certain label props when `titleText` is a string', () => {
    render(<MultiSelect {...mockProps} titleText="MultiSelect Title" />);

    const label = screen.getByText('MultiSelect Title').closest('label');
    const attributes = Array.from(label.attributes).reduce(
      (acc, { name, value }) => ({ ...acc, [name]: value }),
      {}
    );

    expect(attributes).toEqual({
      class: 'cds--label',
      for: 'downshift-«r5o»-toggle-button',
      id: 'downshift-«r5o»-label',
    });
  });

  it('should add certain label props when `titleText` is an element', () => {
    render(
      <MultiSelect {...mockProps} titleText={<span>MultiSelect Title</span>} />
    );

    const label = screen.getByText('MultiSelect Title').closest('label');
    const attributes = Array.from(label.attributes).reduce(
      (acc, { name, value }) => ({ ...acc, [name]: value }),
      {}
    );

    expect(attributes).toEqual({
      class: 'cds--label',
      id: 'downshift-«r5r»-label',
    });
  });

  it('should show indeterminate state after adding new items when all items were previously selected', async () => {
    // Initial test items with "select all" option
    const initialItems = [
      {
        id: 'downshift-1-item-0',
        text: 'Editor',
      },
      {
        id: 'downshift-1-item-1',
        text: 'Owner',
      },
      {
        id: 'downshift-1-item-2',
        text: 'Uploader',
      },
      {
        id: 'select-all',
        text: 'All roles',
        isSelectAll: true,
      },
    ];

    // Setup the test component
    const TestComponent = () => {
      const [items, setItems] = useState(initialItems);

      function addItems() {
        setItems((prevItems) => {
          const now = Date.now();
          return [
            ...prevItems,
            {
              id: `item-added-via-button-1${now}`,
              text: `item-added-via-button-1${now}`,
            },
            {
              id: `item-added-via-button-2${now}`,
              text: `item-added-via-button-2${now}`,
            },
          ];
        });
      }

      return (
        <>
          <MultiSelect
            id="test-multiselect"
            titleText="Multiselect title"
            label="test-label"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
          />
          <Button id="add-items" onClick={addItems}>
            Add Items
          </Button>
        </>
      );
    };

    render(<TestComponent />);
    await waitForPosition();

    // Open the dropdown
    const labelNode = screen.getByRole('combobox');
    await userEvent.click(labelNode);

    // Click the "All roles" option to select all items
    await userEvent.click(screen.getByText('All roles'));

    // Verify all options are selected
    const initialOptions = screen.getAllByRole('option');
    initialOptions.forEach((option) => {
      expect(option).toHaveAttribute('aria-selected', 'true');
    });

    // Close the dropdown
    await userEvent.click(document.body);

    // Add new items
    await userEvent.click(screen.getByText('Add Items'));

    // Open the dropdown again
    await userEvent.click(labelNode);

    // Get the "Select All" checkbox element
    const selectAllOption = screen.getByText('All roles').closest('li');
    const selectAllCheckbox = selectAllOption.querySelector(
      'input[type="checkbox"]'
    );

    // Verify the "Select All" checkbox is in an indeterminate state
    expect(selectAllCheckbox).toHaveProperty('indeterminate', true);

    // Verify only original items are selected, not the new ones
    const updatedOptions = screen.getAllByRole('option');
    expect(updatedOptions.length).toBe(initialOptions.length + 2); // 2 new items added

    // First items should be selected (original items)
    initialOptions.forEach((option) => {
      expect(option).toHaveAttribute('aria-selected', 'true');
    });

    // Last two items should not be selected (new items)
    expect(updatedOptions[updatedOptions.length - 2]).toHaveAttribute(
      'aria-selected',
      'false'
    );
    expect(updatedOptions[updatedOptions.length - 1]).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });
});
