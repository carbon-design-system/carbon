/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PaginationNav from './PaginationNav';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const prefix = 'cds';

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
        // eslint-disable-next-line testing-library/no-node-access
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
        // eslint-disable-next-line testing-library/no-node-access
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

    it('should render in small size and let user render 4 pages', () => {
      render(
        <PaginationNav
          size="sm"
          totalItems={10}
          itemsShown={4}
          aria-label="pagination"
        />
      );

      expect(screen.getByLabelText('pagination')).toHaveClass(
        `${prefix}--pagination-nav ${prefix}--layout--size-sm`
      );
      expect(screen.getByLabelText('Select Page number')).toBeInTheDocument();
    });

    it('should render in medium size and let user render 4 pages', () => {
      render(
        <PaginationNav
          size="md"
          totalItems={10}
          itemsShown={4}
          aria-label="pagination"
        />
      );

      expect(screen.getByLabelText('pagination')).toHaveClass(
        `${prefix}--pagination-nav ${prefix}--layout--size-md`
      );
      expect(screen.getByLabelText('Select Page number')).toBeInTheDocument();
    });

    it('should render in default (large) size and let user render 4 pages', () => {
      render(
        <PaginationNav
          size="lg"
          totalItems={10}
          itemsShown={4}
          aria-label="pagination"
        />
      );

      expect(screen.getByLabelText('pagination')).toHaveClass(
        `${prefix}--pagination-nav ${prefix}--layout--size-lg`
      );
      expect(screen.getByLabelText('Select Page number')).toBeInTheDocument();
    });

    it('should respect tooltipAlignment and tooltipPosition props', () => {
      render(
        <PaginationNav
          totalItems={10}
          tooltipAlignment="end"
          tooltipPosition="right"
        />
      );

      expect(
        document.querySelector('.cds--popover--right-end')
      ).toBeInTheDocument();
    });
  });

  describe('translateWithId', () => {
    const messages = {
      'carbon.pagination-nav.next': '下一頁',
      'carbon.pagination-nav.previous': '上一頁',
      'carbon.pagination-nav.item': '頁',
      'carbon.pagination-nav.active': '目前',
      'carbon.pagination-nav.of': '共',
    };
    const translateWithId = (messageId) => {
      if (!Object.hasOwn(messages, messageId)) {
        throw new Error(`Unexpected translation key: ${messageId}`);
      }
      return messages[messageId];
    };

    it('should translate both enabled overflow selectors', () => {
      render(
        <PaginationNav
          totalItems={20}
          itemsShown={5}
          page={9}
          translateWithId={translateWithId}
        />
      );

      const selects = screen.getAllByRole('combobox', {
        name: 'Select 頁 number',
      });
      expect(selects).toHaveLength(2);
      for (const select of selects) {
        expect(select).toBeEnabled();
      }
      expect(
        screen.getByRole('button', { name: /目前, 頁\s*10$/ })
      ).toHaveAttribute('aria-current', 'page');
      expect(within(selects[0]).getByRole('option', { name: '2' })).toHaveValue(
        '1'
      );
      expect(
        within(selects[1]).getByRole('option', { name: '19' })
      ).toHaveValue('18');
    });

    it('should translate both disabled overflow selectors without options', () => {
      render(
        <PaginationNav
          totalItems={20}
          itemsShown={5}
          page={9}
          disableOverflow
          translateWithId={translateWithId}
        />
      );

      const selects = screen.getAllByRole('combobox', {
        name: 'Select 頁 number',
      });
      expect(selects).toHaveLength(2);
      for (const select of selects) {
        expect(select).toBeDisabled();
        expect(within(select).queryAllByRole('option')).toHaveLength(0);
      }
      expect(
        screen.getByRole('button', { name: /目前, 頁\s*10$/ })
      ).toHaveAttribute('aria-current', 'page');
    });

    it.each([
      { overflow: 'front', selectIndex: 0, value: '1', page: 2 },
      { overflow: 'back', selectIndex: 1, value: '18', page: 19 },
    ])(
      'should preserve page selection through the translated $overflow overflow',
      async ({ selectIndex, value, page }) => {
        const onChange = jest.fn();
        render(
          <PaginationNav
            totalItems={20}
            itemsShown={5}
            page={9}
            translateWithId={translateWithId}
            onChange={onChange}
          />
        );

        const select = screen.getAllByRole('combobox', {
          name: 'Select 頁 number',
        })[selectIndex];
        const option = within(select).getByRole('option', {
          name: String(page),
        });
        expect(option).toHaveValue(value);
        await userEvent.selectOptions(select, option);

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(Number(value));
        expect(
          screen.getByRole('button', {
            name: new RegExp(`目前, 頁\\s*${page}$`),
          })
        ).toHaveAttribute('aria-current', 'page');
      }
    );

    it.each([false, true])(
      'should preserve both default overflow labels when disableOverflow is %s',
      (disableOverflow) => {
        render(
          <PaginationNav
            totalItems={20}
            itemsShown={5}
            page={9}
            disableOverflow={disableOverflow}
          />
        );

        expect(
          screen.getAllByRole('combobox', { name: 'Select Page number' })
        ).toHaveLength(2);
      }
    );
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

    it('should render PaginationNav correctly and navigate through different page ranges using select elements', async () => {
      render(<PaginationNav totalItems={10} itemsShown={4} />);

      // Initial state: < 1 2 ... 10 >
      expect(screen.getByText('1')).toHaveAttribute('aria-current', 'page');
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();

      let selectElements = screen.getAllByLabelText('Select Page number');
      expect(selectElements).toHaveLength(1);

      // Select page 6 from the dropdown
      await userEvent.selectOptions(selectElements[0], '6');

      // New state: < ... 6 ... 10 >
      expect(screen.getByText('6')).toHaveAttribute('aria-current', 'page');

      // Check for two select elements in this state
      selectElements = screen.getAllByLabelText('Select Page number');
      expect(selectElements).toHaveLength(2);

      // Select page 1 from the first dropdown
      await userEvent.selectOptions(selectElements[0], '1');

      // Final state: < 1 2 ... 10 >
      expect(screen.getByText('1')).toHaveAttribute('aria-current', 'page');
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();

      // Check that we're back to one select element
      selectElements = screen.getAllByLabelText('Select Page number');
      expect(selectElements).toHaveLength(1);
    });
  });
});
