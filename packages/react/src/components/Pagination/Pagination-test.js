import React from 'react';
import Pagination from './Pagination';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('Pagination', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      const { container } = render(
        <Pagination data-testid="test-id" pageSizes={[10]} />
      );

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should label icon with backwardText', () => {
      render(<Pagination backwardText="Move backwards" pageSizes={[10]} />);

      expect(screen.getByText('Move backwards')).toBeDefined();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <Pagination className="custom-class" pageSizes={[10]} />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should disable controls with disabled', () => {
      render(<Pagination disabled pageSizes={[10]} />);

      expect(
        document.querySelector('#cds-pagination-select-id-5-right')
      ).toHaveProperty('disabled');

      expect(
        screen.getByLabelText('Next page', { hidden: true })
      ).toHaveProperty('disabled');

      expect(
        screen.getByLabelText('Previous page', { hidden: true })
      ).toHaveProperty('disabled');
    });

    it('should label icon with forwardText', () => {
      render(<Pagination forwardText="forward" pageSizes={[10]} />);

      expect(screen.getByText('forward')).toBeDefined();
    });

    it('should respect itemRangeText prop', () => {
      render(
        <Pagination
          totalItems={40}
          pageSizes={[10, 20]}
          pageSize={4}
          page={1}
          itemRangeText={(min, max, total) =>
            `${min}–${max} de ${total} éléments`
          }
        />
      );

      expect(screen.getByText('1–10 de 40 éléments')).toBeDefined();
    });

    it('should respect itemText prop', () => {
      render(
        <Pagination
          pagesUnknown
          pageSizes={[10, 20]}
          pageSize={4}
          page={1}
          itemText={(min, max) => `${min}-${max} éléments`}
        />
      );

      expect(screen.getByText('1-10 éléments')).toBeDefined();
    });

    it('should respect itemsPerPageText prop', () => {
      render(
        <Pagination pageSizes={[10]} itemsPerPageText={'éléments par page'} />
      );

      screen.debug();

      expect(screen.getByText('éléments par page')).toBeDefined();
    });

    it('should call onChange when approrpiate', () => {
      const onChange = jest.fn();
      render(
        <Pagination
          pageSizes={[10, 20]}
          pageSize={4}
          page={3}
          onChange={onChange}
        />
      );

      userEvent.click(screen.getByLabelText('Previous page'));
      userEvent.click(screen.getByLabelText('Next page'));
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('should change page based on page', () => {
      render(
        <Pagination
          totalItems={40}
          pageSizes={[10, 20]}
          pageSize={4}
          page={2}
        />
      );

      expect(screen.getByText('11–20 of 40 items')).toBeDefined();
    });

    it('should respect pageInputDisabled prop', () => {
      render(<Pagination pageSizes={[10]} pageInputDisabled />);

      expect(document.querySelectorAll('.cds--select-input')[1]).toHaveProperty(
        'disabled'
      );
    });

    it('should respect pageRangeText prop', () => {
      render(
        <Pagination
          totalItems={40}
          pageSizes={[10, 20]}
          pageSize={4}
          page={2}
          pagesUnknown={false}
          pageRangeText={(page, totalPages) => {
            return `${page} de ${totalPages}`;
          }}
        />
      );

      expect(screen.getByText('2 de 4')).toBeDefined();
    });

    it('should respect pageSize prop', () => {
      render(
        <Pagination
          totalItems={40}
          pageSizes={[10, 20, 30, 40]}
          pageSize={20}
          page={2}
        />
      );

      expect(screen.getByText('21–40 of 40 items')).toBeDefined();
    });

    it('should respect pageSizeInputDisabled prop', () => {
      render(
        <Pagination
          pageSizes={[10, 20, 30, 40]}
          totalItems={40}
          pageSizeInputDisabled
        />
      );

      expect(document.querySelectorAll('.cds--select-input')[0]).toHaveProperty(
        'disabled'
      );
    });

    fit('should respect pageSizes prop', () => {
      render(<Pagination pageSizes={[10, 20, 30, 40]} totalItems={40} />);

      screen.debug();
      expect();
    });

    it('should respect pageText prop', () => {
      render(<Pagination pageText pageSizes={[10]} />);

      expect();
    });

    it('should respect pagesUnknown prop', () => {
      render(<Pagination pagesUnknown pageSizes={[10]} />);

      expect();
    });

    it('should respect size prop', () => {
      render(<Pagination size pageSizes={[10]} />);

      expect();
    });

    it('should respect totalItems prop', () => {
      render(<Pagination totalItems pageSizes={[10]} />);

      expect();
    });
  });

  describe('behaves as expected', () => {
    // Add tests for relevant component behavior. For more information, visit https://github.com/carbon-design-system/carbon/issues/10184#issuecomment-992978122
  });
});
