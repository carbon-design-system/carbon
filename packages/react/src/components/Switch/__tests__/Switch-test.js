/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Search } from '@carbon/icons-react';
import Switch from '../Switch';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('Switch', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      const { container } = render(<Switch data-testid="test-id" />);

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(<Switch className="custom-class" />);

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect disabled prop', () => {
      render(<Switch disabled />);

      expect(screen.getByRole('tab')).toBeDisabled();
    });

    it('should call onClick when expected', async () => {
      const onClick = jest.fn();
      render(<Switch text="First section" onClick={onClick} />);

      await userEvent.click(screen.getByText('First section'));

      expect(onClick).toHaveBeenCalled();
    });

    it('should call onKeyDown when expected', async () => {
      const onKeyDown = jest.fn();
      render(<Switch text="First section" onKeyDown={onKeyDown} />);

      await userEvent.type(screen.getByText('First section'), 'enter');

      expect(onKeyDown).toHaveBeenCalled();
    });

    it('should respect selected prop', () => {
      render(<Switch selected />);

      expect(screen.getByRole('tab')).toHaveClass(
        'cds--content-switcher--selected'
      );
      expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'true');
    });

    it('should respect text prop', () => {
      render(<Switch text="First section" />);

      expect(screen.getByText('First section')).toBeInTheDocument();
    });

    it('should report a prop violation error if `renderIcon` is passed without `text` and `children`', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

      render(<Switch renderIcon={Search} />);

      try {
        expect(spy).toHaveBeenCalled();
      } finally {
        spy.mockRestore();
      }
    });

    it('should not render an icon by default', () => {
      const { container } = render(<Switch text="First section" />);

      expect(
        container.querySelector('.cds--content-switcher__icon')
      ).not.toBeInTheDocument();
    });

    it('should render an icon alongside text when `renderIcon` is provided', () => {
      const Icon = (props) => <svg data-testid="icon" {...props} />;
      render(<Switch text="First section" renderIcon={Icon} />);

      expect(screen.getByTestId('icon')).toHaveClass(
        'cds--content-switcher__icon'
      );
      expect(screen.getByText('First section')).toBeInTheDocument();
      expect(screen.getByRole('tab')).toContainElement(
        screen.getByTestId('icon')
      );
    });
  });
});
