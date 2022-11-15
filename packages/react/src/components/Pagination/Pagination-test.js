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
        screen.getByLabelText('Next page', { hidden: true })
      ).toHaveAttribute('disabled');

      expect(
        screen.getByLabelText('Previous page', { hidden: true })
      ).toHaveAttribute('disabled');
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

      expect(
        document.querySelectorAll('.cds--select-input')[1]
      ).toHaveAttribute('disabled');
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

      expect(
        document.querySelectorAll('.cds--select-input')[0]
      ).toHaveAttribute('disabled');
    });

    it('should respect pageSizes prop', () => {
      render(<Pagination pageSizes={[10, 20, 30, 40]} totalItems={40} />);

      expect(screen.getAllByRole('option')[0]).toHaveValue('10');
      expect(screen.getAllByRole('option')[1]).toHaveValue('20');
      expect(screen.getAllByRole('option')[2]).toHaveValue('30');
      expect(screen.getAllByRole('option')[3]).toHaveValue('40');
    });

    it('should respect pageText prop', () => {
      const page = 1;
      render(
        <Pagination
          pageText={(page) => `página ${page}`}
          pageSizes={[10, 20]}
          page={page}
          pagesUnknown={true}
        />
      );

      expect(screen.getByText(`página ${page}`)).toBeInTheDocument();
    });

    it('should not include page count when pagesUnknown', () => {
      const page = 1;
      render(
        <Pagination pageSizes={[10, 20]} page={page} pagesUnknown={true} />
      );

      expect(screen.getByText(`page`)).toBeInTheDocument();
      expect(screen.queryByText(`page ${page}`)).not.toBeInTheDocument();
    });

    it('should respect size prop', () => {
      const { container } = render(<Pagination size="sm" pageSizes={[10]} />);

      expect(container.firstChild).toHaveClass('cds--pagination--sm');
    });

    it('should respect totalItems prop', () => {
      const total = 40;
      render(<Pagination totalItems={total} pageSizes={[10]} />);

      expect(screen.getByText(`1–10 of ${total} items`)).toBeInTheDocument();
    });
  });
});
