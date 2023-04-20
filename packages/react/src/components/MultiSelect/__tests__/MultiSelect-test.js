/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getByText, isElementVisible } from '@carbon/test-utils/dom';
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import MultiSelect from '../';
import { generateItems, generateGenericItem } from '../../ListBox/test-helpers';
import userEvent from '@testing-library/user-event';

describe('MultiSelect', () => {
  beforeEach(() => {
    jest.mock('../../../internal/deprecateFieldOnObject');
  });
  afterEach(cleanup);

  describe.skip('automated accessibility tests', () => {
    it('should have no axe violations', async () => {
      const items = generateItems(4, generateGenericItem);
      const { container } = render(
        <MultiSelect id="test" label="Field" items={items} />
      );
      await expect(container).toHaveNoAxeViolations();
    });

    it('should have no AC violations', async () => {
      const items = generateItems(4, generateGenericItem);
      const { container } = render(
        <MultiSelect id="test" label="Field" items={items} />
      );
      await expect(container).toHaveNoACViolations('MultiSelect');
    });
  });

  it('should initially render with a given label', () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" label={label} items={items} />
    );

    const labelNode = getByText(container, label);
    expect(isElementVisible(labelNode)).toBe(true);

    expect(
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeNull();
  });

  it('should open the menu when a user clicks on the label', async () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" label={label} items={items} />
    );

    const labelNode = getByText(container, label);
    await userEvent.click(labelNode);

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-haspopup',
      'listbox'
    );
  });

  it('should open the menu when a user hits space while the field is focused', async () => {
    const items = generateItems(4, generateGenericItem);
    render(<MultiSelect id="test" label="test-label" items={items} />);

    await userEvent.tab();
    await userEvent.keyboard('[Space]');

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-haspopup',
      'listbox'
    );
  });

  it('should open the menu when a user hits enter while the field is focused', async () => {
    const items = generateItems(4, generateGenericItem);
    render(<MultiSelect id="test" label="test-label" items={items} />);

    await userEvent.tab();
    await userEvent.keyboard('[Enter]');

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button')).toHaveAttribute(
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

    const labelNode = getByText(container, label);
    await userEvent.click(labelNode);

    const [item] = items;
    const itemNode = getByText(container, item.label);

    expect(
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
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeInstanceOf(HTMLElement);

    await userEvent.keyboard('[Escape]');

    expect(
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeNull();
  });

  it('close menu with click outside of field', async () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" label={label} items={items} />
    );
    const labelNode = getByText(container, label);

    expect(
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeFalsy();

    await userEvent.click(labelNode);

    expect(
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeTruthy();

    await userEvent.click(document.body);

    expect(
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeFalsy();
  });

  it('should not toggle selection with enter', async () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" label={label} items={items} />
    );

    await userEvent.tab();
    await userEvent.keyboard('[Space]');

    const [item] = items;
    const itemNode = getByText(container, item.label);

    expect(itemNode).toHaveAttribute('data-contained-checkbox-state', 'false');

    await userEvent.keyboard('[ArrowDown]');
    await userEvent.keyboard('[Enter]');

    expect(itemNode).toHaveAttribute('data-contained-checkbox-state', 'false');
  });

  it('should clear selected items when the user clicks the clear selection button', async () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" label={label} items={items} />
    );
    const labelNode = getByText(container, label);
    await userEvent.click(labelNode);

    const [item] = items;
    const itemNode = getByText(container, item.label);
    await userEvent.click(itemNode);

    expect(
      document.querySelector('[aria-label="Clear all selected items"]')
    ).toBeTruthy();

    await userEvent.click(
      document.querySelector('[aria-label="Clear all selected items"]')
    );

    expect(
      document.querySelector('[aria-label="Clear all selected items"]')
    ).toBeFalsy();
  });

  it('should not be interactive if disabled', async () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" disabled label={label} items={items} />
    );
    const labelNode = getByText(container, label);
    await userEvent.click(labelNode);

    expect(
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeFalsy();
  });

  it('should not be interactive if readonly', async () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" readOnly={true} label={label} items={items} />
    );
    const labelNode = getByText(container, label);
    await userEvent.click(labelNode);

    expect(
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

      expect(
        document.querySelector('[aria-label="Clear all selected items"]')
      ).toBeTruthy();

      const labelNode = getByText(container, label);

      await userEvent.click(labelNode);

      expect(
        document.querySelector('[data-contained-checkbox-state="true"]')
      ).toBeInstanceOf(HTMLElement);
    });

    it('should place the given id on the ___ node when passed in as a prop', () => {
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
      const labelNode = getByText(container, label);

      await userEvent.click(labelNode);

      expect(getByText(container, 'joey')).toBeInTheDocument();
      expect(getByText(container, 'johnny')).toBeInTheDocument();
      expect(getByText(container, 'tommy')).toBeInTheDocument();
      expect(getByText(container, 'dee dee')).toBeInTheDocument();
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

      const labelNode = getByText(container, label);
      await userEvent.click(labelNode);

      expect(document.querySelector('.test-element')).toBeTruthy();
      expect(document.querySelector('span[role="img"]')).toBeTruthy();
    });

    it('should support custom translation with translateWithId', () => {
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

      expect(translateWithId).toHaveBeenCalled();
    });

    it('should call onChange when the selection changes', async () => {
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

      const labelNode = getByText(container, label);
      await userEvent.click(labelNode);

      const [item] = items;
      const itemNode = getByText(container, item.label);

      await userEvent.click(itemNode);

      expect(testFunction).toHaveBeenCalledTimes(1);
    });

    it('should support an invalid state with invalidText that describes the field', () => {
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

      expect(getByText(container, 'Fool of a Took!')).toBeInTheDocument();

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

      // click the label to open the multiselect options menu
      const labelNode = getByText(container, label);
      await userEvent.click(labelNode);

      // click the third option down in the list
      const itemNode = getByText(container, thirdItem.label);
      await userEvent.click(itemNode);

      // get an array of all the options
      const optionsArray = Array.from(
        document.querySelectorAll('[role="option"]')
      );

      // the first option in the list to the the former third option in the list
      expect(optionsArray[0]).toHaveAttribute('aria-label', 'Item 2');
    });

    it('should accept a `ref` for the underlying button element', () => {
      const ref = React.createRef();
      const items = generateItems(4, generateGenericItem);
      const label = 'test-label';
      render(<MultiSelect id="test" label={label} items={items} ref={ref} />);
      expect(ref.current).toHaveAttribute('aria-haspopup', 'listbox');
    });
  });
});
