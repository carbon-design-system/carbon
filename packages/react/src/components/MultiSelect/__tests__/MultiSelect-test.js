/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getByText, isElementVisible } from '@carbon/test-utils/dom';
import { pressEnter, pressSpace, pressTab } from '@carbon/test-utils/keyboard';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { act, Simulate } from 'react-dom/test-utils';
import MultiSelect from '../';
import { generateItems, generateGenericItem } from '../../ListBox/test-helpers';

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

  it('should open the menu when a user clicks on the label', () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" label={label} items={items} />
    );

    const labelNode = getByText(container, label);
    Simulate.click(labelNode);

    expect(
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeInstanceOf(HTMLElement);
  });

  it('should open the menu when a user hits space while the field is focused', () => {
    const items = generateItems(4, generateGenericItem);
    const { container } = render(
      <MultiSelect id="test" label="test-label" items={items} />
    );

    pressTab();
    pressSpace();

    expect(
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeInstanceOf(HTMLElement);
  });

  it('should open the menu when a user hits enter while the field is focused', () => {
    const items = generateItems(4, generateGenericItem);
    const { container } = render(
      <MultiSelect id="test" label="test-label" items={items} />
    );

    pressTab();
    pressEnter();

    expect(
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeInstanceOf(HTMLElement);
  });

  it('should let the user toggle item selection with a mouse', () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" label={label} items={items} />
    );

    const labelNode = getByText(container, label);
    Simulate.click(labelNode);

    const [item] = items;
    const itemNode = getByText(container, item.label);

    expect(
      document.querySelector('[aria-selected="true"][role="option"]')
    ).toBeNull();

    Simulate.click(itemNode);

    expect(itemNode.getAttribute('data-contained-checkbox-state')).toBe('true');

    Simulate.click(itemNode);

    expect(itemNode.getAttribute('data-contained-checkbox-state')).toBe(
      'false'
    );
  });

  it('should close the menu when the user hits the Escape key', () => {
    const items = generateItems(4, generateGenericItem);
    const { container } = render(
      <MultiSelect id="test" label="test-label" items={items} />
    );

    pressTab();
    pressSpace();

    expect(
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeInstanceOf(HTMLElement);

    Simulate.keyDown(container.querySelector('[role="listbox"]'), {
      key: 'Escape',
    });

    expect(
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeNull();
  });

  it('close menu with click outside of field', () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" label={label} items={items} />
    );
    const labelNode = getByText(container, label);

    expect(
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeFalsy();

    Simulate.click(labelNode);

    expect(
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeTruthy();

    Simulate.blur(container.querySelector('[role="listbox"]'));

    expect(
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeFalsy();
  });

  it('should toggle selection with enter', () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" label={label} items={items} />
    );

    pressTab();
    pressSpace();

    const [item] = items;
    const itemNode = getByText(container, item.label);

    expect(itemNode.getAttribute('data-contained-checkbox-state')).toBe(
      'false'
    );

    Simulate.keyDown(container.querySelector('[role="listbox"]'), {
      key: 'ArrowDown',
    });
    pressEnter();

    expect(itemNode.getAttribute('data-contained-checkbox-state')).toBe('true');

    pressEnter();

    expect(itemNode.getAttribute('data-contained-checkbox-state')).toBe(
      'false'
    );
  });

  it('should clear selected items when the user clicks the clear selection button', () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" label={label} items={items} />
    );
    const labelNode = getByText(container, label);
    Simulate.click(labelNode);

    const [item] = items;
    const itemNode = getByText(container, item.label);
    Simulate.click(itemNode);

    expect(
      document.querySelector('[aria-label="Clear all selected items"]')
    ).toBeTruthy();

    Simulate.click(
      document.querySelector('[aria-label="Clear all selected items"]')
    );

    expect(
      document.querySelector('[aria-label="Clear all selected items"]')
    ).toBeFalsy();
  });

  it('should not be interactive if disabled', () => {
    const items = generateItems(4, generateGenericItem);
    const label = 'test-label';
    const { container } = render(
      <MultiSelect id="test" disabled label={label} items={items} />
    );
    const labelNode = getByText(container, label);
    Simulate.click(labelNode);

    expect(
      container.querySelector('[aria-expanded="true"][aria-haspopup="listbox"]')
    ).toBeFalsy();
  });

  describe('Component API', () => {
    it('should set the default selected items with the `initialSelectedItems` prop', () => {
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

      Simulate.click(labelNode);

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

    it('should support a custom itemToString with object items', () => {
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

      Simulate.click(labelNode);

      expect(getByText(container, 'joey')).toBeTruthy();
      expect(getByText(container, 'johnny')).toBeTruthy();
      expect(getByText(container, 'tommy')).toBeTruthy();
      expect(getByText(container, 'dee dee')).toBeTruthy();
      expect(getByText(container, 'marky')).toBeTruthy();
    });

    it('should support a custom itemToElement', () => {
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
              ''
            )
          }
        />
      );

      const labelNode = getByText(container, label);
      Simulate.click(labelNode);

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

    it('should call onChange when the selection changes', () => {
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
      Simulate.click(labelNode);

      const [item] = items;
      const itemNode = getByText(container, item.label);

      act(() => {
        Simulate.click(itemNode);
      });

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

      expect(getByText(container, 'Fool of a Took!')).toBeTruthy();

      expect(document.querySelector('[data-invalid="true"')).toBeInstanceOf(
        HTMLElement
      );
    });

    it('should support different feedback modes with selectionFeedback', () => {
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
      Simulate.click(labelNode);

      // click the third option down in the list
      const itemNode = getByText(container, thirdItem.label);
      Simulate.click(itemNode);

      // get an array of all the options
      const optionsArray = Array.from(
        document.querySelectorAll('[role="option"]')
      );

      // the first option in the list to the the former third option in the list
      expect(optionsArray[0].getAttribute('aria-label')).toBe('Item 2');
    });

    it('should accept a `ref` for the underlying button element', () => {
      const ref = React.createRef();
      const items = generateItems(4, generateGenericItem);
      const label = 'test-label';
      render(<MultiSelect id="test" label={label} items={items} ref={ref} />);
      expect(ref.current.getAttribute('aria-haspopup')).toBe('listbox');
    });
  });
});
