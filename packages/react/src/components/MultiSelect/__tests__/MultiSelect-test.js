/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getByText, isElementVisible } from '@carbon/test-utils/dom';
import { act, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import MultiSelect from '../';
import {
  generateItems,
  generateGenericItem,
  waitForPosition,
} from '../../ListBox/test-helpers';
import userEvent from '@testing-library/user-event';
import { AILabel } from '../../AILabel';
import Button from '../../Button';
import ButtonSet from '../../ButtonSet';

const prefix = 'cds';

describe('MultiSelect', () => {
  beforeEach(() => {
    jest.mock('../../../internal/deprecateFieldOnObject');
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

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector('[aria-selected="true"][role="option"]')
    ).toBeNull();

    await userEvent.click(itemNode);

    expect(itemNode).toHaveAttribute('data-contained-checkbox-state', 'true');

    await userEvent.click(itemNode);

    expect(itemNode).toHaveAttribute('data-contained-checkbox-state', 'false');
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

    expect(itemNode).toHaveAttribute('data-contained-checkbox-state', 'false');

    await userEvent.keyboard('[Enter]');
    await userEvent.keyboard('[ArrowDown]');
    await userEvent.keyboard('[Enter]');

    expect(itemNode).toHaveAttribute('data-contained-checkbox-state', 'true');
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

      expect(
        // eslint-disable-next-line testing-library/no-node-access
        document.querySelector('[data-contained-checkbox-state="true"]')
      ).toBeInstanceOf(HTMLElement);
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
      const items = generateItems(4, generateGenericItem);
      const label = 'test-label';
      const { container } = render(
        <MultiSelect id="test" label={label} items={items} slug={<AILabel />} />
      );
      await waitForPosition();

      expect(container.firstChild).toHaveClass(
        `${prefix}--list-box__wrapper--slug`
      );
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
      const dropwdownNode = screen.getByRole('combobox');
      await userEvent.click(dropwdownNode);
      // Check if all items are selected
      const options = screen.getAllByRole('option');
      options.forEach((option) => {
        expect(option).toHaveAttribute('aria-selected', 'true');
      });

      //clear the selection
      await userEvent.click(screen.getByText('Clear'));
      await userEvent.click(dropwdownNode);
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
      const dropwdownNode = screen.getByRole('combobox');
      await userEvent.click(dropwdownNode);
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
});
