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

  describe('Switcher navigation and focus management', () => {
    const renderSwitcher = () => {
      return (
        <Switcher aria-label="test-switcher" expanded>
          <SwitcherItem aria-label="test-1" href="#">
            Item 1
          </SwitcherItem>
          <SwitcherItem aria-label="test-2" href="#">
            Item 2
          </SwitcherItem>
          <SwitcherItem aria-label="test-3" href="#">
            Item 3
          </SwitcherItem>
        </Switcher>
      );
    };

    it('should focus the next valid index when moving forward', async () => {
      render(renderSwitcher());
      const items = screen.getAllByRole('listitem');
      const firstLink = items[0].querySelector('a');
      const secondLink = items[1].querySelector('a');

      await userEvent.keyboard('{Tab}');
      expect(document.activeElement).toBe(firstLink);
      await userEvent.keyboard('{Tab}');

      expect(document.activeElement).toBe(secondLink);
    });

    it('should focus the next valid index when moving backword', async () => {
      render(renderSwitcher());

      const items = screen.getAllByRole('listitem');
      const firstLink = items[0].querySelector('a');
      const secondLink = items[1].querySelector('a');

      await userEvent.keyboard('{Tab}');
      expect(document.activeElement).toBe(firstLink);
      await userEvent.keyboard('Shift+Tab');
      expect(document.activeElement).toBe(firstLink);
    });
    it('should focus next SwitcherItem when pressing ArrowDown from first item', async () => {
      render(renderSwitcher());
      const focusableItems = screen.getAllByRole('link');
      expect(focusableItems).toHaveLength(3);

      await userEvent.keyboard('{Tab}');
      expect(document.activeElement).toBe(focusableItems[0]);

      await userEvent.keyboard('{ArrowDown}');
      expect(document.activeElement).toBe(focusableItems[1]);
    });
    it('should focus previous SwitcherItem when pressing ArrowUp from last item', async () => {
      render(renderSwitcher());
      const focusableItems = screen.getAllByRole('link');
      expect(focusableItems).toHaveLength(3);

      focusableItems[2].focus();
      expect(document.activeElement).toBe(focusableItems[2]);

      await userEvent.keyboard('{ArrowUp}');
      expect(document.activeElement).toBe(focusableItems[1]);
    });

    it('should wrap to first item when pressing ArrowDown from last SwitcherItem', async () => {
      render(renderSwitcher());
      const focusableItems = screen.getAllByRole('link');
      expect(focusableItems).toHaveLength(3);

      focusableItems[2].focus();
      expect(document.activeElement).toBe(focusableItems[2]);

      await userEvent.keyboard('{ArrowDown}');
      expect(document.activeElement).toBe(focusableItems[0]);
    });

    it('should wrap to last item when pressing ArrowUp from first SwitcherItem', async () => {
      render(renderSwitcher());
      const focusableItems = screen.getAllByRole('link');
      expect(focusableItems).toHaveLength(3);

      focusableItems[0].focus();
      expect(document.activeElement).toBe(focusableItems[0]);

      await userEvent.keyboard('{ArrowUp}');
      expect(document.activeElement).toBe(focusableItems[2]);
      expect(document.activeElement).toHaveTextContent('Item 3');
    });
    it('should skip non SwitcherItem elements', async () => {
      render(renderSwitcher());
      const focusableItems = screen.getAllByRole('link');
      expect(focusableItems).toHaveLength(3);

      focusableItems[0].focus();
      expect(document.activeElement).toBe(focusableItems[0]);
      expect(document.activeElement).toHaveTextContent('Item 1');

      await userEvent.keyboard('{ArrowDown}');
      expect(document.activeElement).toBe(focusableItems[1]);
      expect(document.activeElement).toHaveTextContent('Item 2');

      await userEvent.keyboard('{ArrowDown}');
      expect(document.activeElement).toBe(focusableItems[2]);
      expect(document.activeElement).toHaveTextContent('Item 3');
    });
    it('should handle keyboard navigation with mixed child types', async () => {
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
      const secondItem = items[2].querySelector('a');
      secondItem?.focus();
      expect(document.activeElement).toBe(secondItem);
      await userEvent.keyboard('{ArrowDown}');
      expect(document.activeElement).toHaveTextContent('Nested Item');
    });
  });
});
