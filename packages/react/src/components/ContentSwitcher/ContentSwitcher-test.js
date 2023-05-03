/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ContentSwitcher from './ContentSwitcher';
import Switch from '../Switch';

describe('ContentSwitcher - RTL', () => {
  describe('renders API as expected', () => {
    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <ContentSwitcher onChange={() => {}} className="custom-class">
          <Switch name="one" text="First section" />
          <Switch name="two" text="Second section" />
          <Switch name="three" text="Third section" />
        </ContentSwitcher>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should spread extra props on the outermost element', () => {
      const { container } = render(
        <ContentSwitcher onChange={() => {}} data-testid="test-id">
          <Switch name="one" text="First section" />
          <Switch name="two" text="Second section" />
          <Switch name="three" text="Third section" />
        </ContentSwitcher>
      );

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should render with first item selected by default', () => {
      render(
        <ContentSwitcher onChange={() => {}}>
          <Switch name="one" text="First section" />
          <Switch name="two" text="Second section" />
          <Switch name="three" text="Third section" />
        </ContentSwitcher>
      );

      expect(screen.getAllByRole('tab')[0]).toHaveAttribute('tabindex', '0');
      expect(screen.getAllByRole('tab')[0]).toHaveClass(
        'cds--content-switcher--selected'
      );
    });

    it('should call onChange when selected item changes through mouse click', async () => {
      const onChange = jest.fn();
      render(
        <ContentSwitcher onChange={onChange} data-testid="test-id">
          <Switch name="one" text="First section" />
          <Switch name="two" text="Second section" />
          <Switch name="three" text="Third section" />
        </ContentSwitcher>
      );

      await userEvent.click(screen.getByText('Second section'));

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenLastCalledWith({
        index: 1,
        name: 'two',
        text: 'Second section',
      });
    });

    it('should call onChange when selected item changes through keydown', async () => {
      const onChange = jest.fn();
      render(
        <ContentSwitcher onChange={onChange} data-testid="test-id">
          <Switch name="one" text="First section" />
          <Switch name="two" text="Second section" />
          <Switch name="three" text="Third section" />
        </ContentSwitcher>
      );

      await userEvent.type(screen.getByText('First section'), '{ArrowRight}');

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenLastCalledWith({
        index: 1,
        key: 'ArrowRight',
        name: 'two',
        text: 'Second section',
      });

      await userEvent.type(screen.getByText('Second section'), '{arrowleft}');

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenLastCalledWith({
        index: 0,
        key: 'ArrowLeft',
        name: 'one',
        text: 'First section',
      });
    });

    it('should selected initally selected index based on prop', () => {
      render(
        <ContentSwitcher
          onChange={() => {}}
          data-testid="test-id"
          selectedIndex={2}>
          <Switch name="one" text="First section" />
          <Switch name="two" text="Second section" />
          <Switch name="three" text="Third section" />
        </ContentSwitcher>
      );

      expect(screen.getAllByRole('tab')[2]).toHaveAttribute('tabindex', '0');
      expect(screen.getAllByRole('tab')[2]).toHaveClass(
        'cds--content-switcher--selected'
      );
    });

    it('should change sizes based on prop', () => {
      render(
        <ContentSwitcher onChange={() => {}} data-testid="test-id" size="lg">
          <Switch name="one" text="First section" />
          <Switch name="two" text="Second section" />
          <Switch name="three" text="Third section" />
        </ContentSwitcher>
      );

      expect(screen.getByRole('tablist')).toHaveClass(
        'cds--content-switcher--lg'
      );
    });
  });

  describe('automated verification testing', () => {
    it('should have no aXe violations', async () => {
      const { container } = render(
        <ContentSwitcher>
          <Switch kind="anchor" text="one" />
          <Switch kind="anchor" text="two" />
        </ContentSwitcher>
      );
      await expect(container).toHaveNoAxeViolations();
    });

    it('should have no AC violations', async () => {
      const { container } = render(
        <ContentSwitcher>
          <Switch kind="anchor" text="one" />
          <Switch kind="anchor" text="two" />
        </ContentSwitcher>
      );
      await expect(container).toHaveNoACViolations('ContentSwitcher');
    });
  });
});
