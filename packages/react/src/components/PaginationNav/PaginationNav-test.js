/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PaginationNav from './PaginationNav';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('PaginationNav', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      const { container } = render(
        <PaginationNav totalItems={10} data-testid="test-id" />
      );

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <PaginationNav totalItems={10} className="custom-class" />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect itemsShown prop', () => {
      render(<PaginationNav totalItems={10} itemsShown={4} />);

      expect(
        document.querySelectorAll('.cds--pagination-nav__page').length
      ).toBe(4);
    });

    it('should respect loop prop', async () => {
      render(<PaginationNav totalItems={4} loop />);

      await userEvent.click(screen.getByText('4'));

      await userEvent.click(screen.getByLabelText('Next'));
      expect(screen.getByText('1')).toHaveAttribute('aria-current', 'page');

      await userEvent.click(screen.getByText('1'));
      await userEvent.click(screen.getByLabelText('Previous'));

      expect(screen.getByText('4')).toHaveAttribute('aria-current', 'page');
    });

    it('should respect onChange prop', async () => {
      const onChange = jest.fn();

      render(<PaginationNav totalItems={10} onChange={onChange} />);
      await userEvent.click(screen.getByText('4'));
      expect(onChange).toHaveBeenCalled();
    });

    it('should respect page prop', () => {
      render(<PaginationNav totalItems={10} page={3} />);

      expect(screen.getByText('4')).toHaveAttribute('aria-current', 'page');
    });

    it('should respect totalItems prop', () => {
      render(<PaginationNav totalItems={5} />);

      expect(
        document.querySelectorAll('.cds--pagination-nav__page').length
      ).toBe(5);
    });

    it('should disable "Previous" button when on first page and loop is false', () => {
      render(<PaginationNav totalItems={4} />);

      expect(screen.getByLabelText('Previous')).toBeDisabled();
    });

    it('should disable "Next" button when on last page and loop is false', () => {
      render(<PaginationNav totalItems={4} page={3} />);

      expect(screen.getByLabelText('Next')).toBeDisabled();
    });
  });

  describe('behaves as expected', () => {
    it('should move to next page when "Next" is pressed', async () => {
      render(<PaginationNav totalItems={4} loop />);

      await userEvent.click(screen.getByLabelText('Next'));
      expect(screen.getByText('2')).toHaveAttribute('aria-current', 'page');
    });

    it('should move to previous page when "Previous" is pressed', async () => {
      render(<PaginationNav totalItems={4} loop />);

      await userEvent.click(screen.getByText('4'));

      await userEvent.click(screen.getByLabelText('Previous'));
      expect(screen.getByText('3')).toHaveAttribute('aria-current', 'page');
    });

    it('should move to page that is pressed', async () => {
      render(<PaginationNav totalItems={4} loop />);

      await userEvent.click(screen.getByText('4'));

      expect(screen.getByText('4')).toHaveAttribute('aria-current', 'page');
    });
  });
});
