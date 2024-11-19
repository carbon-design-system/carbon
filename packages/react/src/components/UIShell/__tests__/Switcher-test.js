/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Switcher from '../Switcher';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeaderPanel from '../HeaderPanel';
import SwitcherItem from '../SwitcherItem';

describe('Switcher', () => {
  describe('renders as expected - Component API', () => {
    it('should respect aria-label prop', () => {
      const { container } = render(
        <Switcher aria-label="test-aria-label">
          <SwitcherItem aria-label="test-aria-label-switcheritem">
            Dummy child
          </SwitcherItem>
        </Switcher>
      );

      expect(container.firstChild).toHaveAttribute(
        'aria-label',
        'test-aria-label'
      );
    });

    it('should respect aria-labelledby prop', () => {
      const { container } = render(
        <Switcher aria-labelledby="test-aria-labelledby">
          <SwitcherItem aria-label="test-aria-label-switcheritem">
            Dummy child
          </SwitcherItem>
        </Switcher>
      );

      expect(container.firstChild).toHaveAttribute(
        'aria-labelledby',
        'test-aria-labelledby'
      );
    });

    it('should render children as expected', () => {
      render(
        <Switcher aria-label="dummy-aria-label">
          <SwitcherItem aria-label="test-aria-label-switcheritem">
            Dummy child
          </SwitcherItem>
        </Switcher>
      );

      expect(screen.getByText('Dummy child')).toBeInTheDocument();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <Switcher aria-label="dummy-aria-label" className="custom-class">
          <SwitcherItem aria-label="test-aria-label-switcheritem">
            Dummy child
          </SwitcherItem>
        </Switcher>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle complex nested structure', () => {
      const ComplexSwitcher = () => (
        <Switcher aria-label="complex-switcher">
          <SwitcherItem aria-label="test-aria-label-switcheritem">
            Nested Complex Item
          </SwitcherItem>
        </Switcher>
      );
      ComplexSwitcher.displayName = 'Switcher';

      render(
        <Switcher aria-label="test-label">
          <SwitcherItem aria-label="test-aria-label-switcheritem">
            Item 1
          </SwitcherItem>
          <div>Regular div</div>
          <ComplexSwitcher />
          {/* {null} */}
          <SwitcherItem aria-label="test-aria-label-switcheritem">
            Item 2
          </SwitcherItem>
        </Switcher>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Regular div')).toBeInTheDocument();
      expect(screen.getByText('Nested Complex Item')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    //makes difference in coverage
    it('should set focus on the switcherItem', async () => {
      render(
        <Switcher aria-label="test-label">
          <SwitcherItem aria-label="test-aria-label-switcheritem">
            Item 1
          </SwitcherItem>
          <div>Non-focusable div</div>
          <SwitcherItem aria-label="test-aria-label-switcheritem">
            Item 2
          </SwitcherItem>
          <Switcher aria-label="nested-switcher">
            <SwitcherItem aria-label="test-aria-label-switcheritem">
              Nested Item
            </SwitcherItem>
          </Switcher>
        </Switcher>
      );

      const items = screen.getAllByRole('listitem');
      const firstLink = items[0].querySelector('a, button');

      firstLink?.focus();

      expect(document.activeElement).toBe(firstLink);
    });

    it('should calculate enabledIndices correctly for an empty children array', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const { container } = render(
        <Switcher aria-label="Test Switcher">{/* No children */}</Switcher>
      );
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
      expect(container.querySelector('ul')).toHaveAttribute(
        'aria-label',
        'Test Switcher'
      );
      expect(container.querySelector('ul').children.length).toBe(0);
    });

    it('should calculate enabledIndices correctly for a children array with valid and other elements', () => {
      const { container } = render(
        <Switcher aria-label="Test Switcher">
          <SwitcherItem aria-label="test-aria-label-switcheritem">
            Item 1
          </SwitcherItem>
          <div>test</div>
          <SwitcherItem aria-label="test-aria-label-switcheritem">
            Item 2
          </SwitcherItem>
        </Switcher>
      );
      expect(container.querySelector('ul')).toHaveAttribute(
        'aria-label',
        'Test Switcher'
      );
      expect(container.querySelector('ul').children.length).toBe(3);
    });

    it('should map children with props correctly when the children array contains a mix of valid and invalid elements', () => {
      const { container } = render(
        <Switcher aria-label="Test Switcher">
          <SwitcherItem aria-label="test-aria-label-switcheritem">
            Item 1
          </SwitcherItem>
          {/* Invalid element */}
          <div>Invalid item</div>
          <SwitcherItem aria-label="test-aria-label-switcheritem">
            Item 2
          </SwitcherItem>
        </Switcher>
      );
      const switcherItems = container.querySelectorAll('li');
      expect(switcherItems.length).toBe(2);
      expect(switcherItems[0].firstChild).toHaveAttribute(
        'aria-label',
        'test-aria-label-switcheritem'
      );
      expect(switcherItems[1].firstChild).toHaveAttribute(
        'aria-label',
        'test-aria-label-switcheritem'
      );
    });
    it('should correctly merge refs', () => {
      const ref1 = React.createRef();

      render(
        <Switcher ref={ref1} aria-label="test-label">
          <SwitcherItem aria-label="test-item">Item 1</SwitcherItem>
          <SwitcherItem aria-label="test-item">Item 2</SwitcherItem>
        </Switcher>
      );

      expect(ref1.current).not.toBeNull();
      expect(ref1.current.tagName).toBe('UL');
    });

    it('should clone children with additional props', () => {
      const MockChild = jest.fn(() => null);

      render(
        <Switcher aria-label="test-switcher" expanded={true}>
          <MockChild />
          <MockChild />
        </Switcher>
      );

      expect(MockChild.mock.calls[0][0]).toHaveProperty('expanded', true);
      expect(MockChild.mock.calls[0][0]).toHaveProperty('index', 0);
      expect(MockChild.mock.calls[1][0]).toHaveProperty('index', 1);
    });

    it('should apply aria attributes correctly', () => {
      render(
        <Switcher
          aria-label="test-aria-label"
          aria-labelledby="test-labelledby">
          <SwitcherItem aria-label="item">Item</SwitcherItem>
        </Switcher>
      );

      const switcher = screen.getByRole('list');
      expect(switcher).toHaveAttribute('aria-label', 'test-aria-label');
      expect(switcher).toHaveAttribute('aria-labelledby', 'test-labelledby');
    });
  });

  describe('Switcher', () => {
    const mockChildren = [
      <SwitcherItem key="1" aria-label="test-aria-label-switcheritem-1">
        Item 1
      </SwitcherItem>,
      <SwitcherItem key="2" aria-label="test-aria-label-switcheritem-2">
        Item 2
      </SwitcherItem>,
      <SwitcherItem key="3" aria-label="test-aria-label-switcheritem-3">
        Item 3
      </SwitcherItem>,
    ];

    it('should focus the next valid index when moving forward', async () => {
      render(
        <HeaderPanel expanded>
          <Switcher aria-label="test-label" expanded={true}>
            <SwitcherItem aria-label="test-aria-label-1" href="#">
              Item 1
            </SwitcherItem>
            <SwitcherItem aria-label="test-aria-label-2" href="#">
              Item 2
            </SwitcherItem>
            <SwitcherItem aria-label="test-aria-label-3" href="#">
              Item 3
            </SwitcherItem>
          </Switcher>
        </HeaderPanel>
      );

      const items = screen.getAllByRole('listitem');
      const firstLink = items[0].querySelector('a, button');
      const secondLink = items[1].querySelector('a, button');

      await userEvent.keyboard('{Tab}');
      expect(document.activeElement).toBe(firstLink);
      await userEvent.keyboard('{Tab}');

      expect(document.activeElement).toBe(secondLink);
    });

    it('should focus the next valid index when moving backword', async () => {
      render(
        <Switcher aria-label="test-label" expanded={true}>
          <SwitcherItem aria-label="test-aria-label-1" href="#">
            Item 1
          </SwitcherItem>
          <SwitcherItem aria-label="test-aria-label-2" href="#">
            Item 2
          </SwitcherItem>
          <SwitcherItem aria-label="test-aria-label-3" href="#">
            Item 3
          </SwitcherItem>
        </Switcher>
      );

      const items = screen.getAllByRole('listitem');
      const firstLink = items[0].querySelector('a, button');
      const secondLink = items[1].querySelector('a, button');

      await userEvent.keyboard('{Tab}');
      expect(document.activeElement).toBe(firstLink);
      await userEvent.keyboard('Shift+Tab');
      expect(document.activeElement).toBe(firstLink);
    });
  });

  describe('childrenWithProps', () => {
    const mockSwitcherItemFocus = jest.fn();
    const createMockChildren = (count = 3, overrideProps = {}) => {
      return Array.from({ length: count }, (_, index) => (
        <SwitcherItem
          key={index}
          id={index}
          {...overrideProps}
          aria-label="test-aria-label">
          Item {index + 1}
        </SwitcherItem>
      ));
    };

    it('should add index prop to each child', () => {
      const children = createMockChildren();
      const { container } = render(
        <Switcher aria-label="test-label" expanded={false}>
          {children}
        </Switcher>
      );
      const renderedChildren = container.querySelectorAll('a');
      renderedChildren.forEach((child, index) => {
        expect(child).toHaveAttribute('id', index.toString());
      });
    });
  });
});
