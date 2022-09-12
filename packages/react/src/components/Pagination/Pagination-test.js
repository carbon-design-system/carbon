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

      screen.debug();
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

    fit('should respect itemRangeText prop', () => {
      render(
        <Pagination
          totalItems={40}
          pageSizes={[10, 20]}
          pageSize={3}
          page={1}
          itemRangeText={(min, max, total) =>
            `${min}–${max} de ${total} elements`
          }
        />
      );

      screen.debug();
      expect(screen.getByText('1–10 de 40 elements')).toBeDefined();
    });

    it('should respect itemText prop', () => {
      render(<Pagination pageSizes={[10]} itemText />);

      expect();
    });

    it('should respect itemsPerPageText prop', () => {
      render(<Pagination pageSizes={[10]} itemsPerPageText />);

      expect();
    });

    it('should respect onChange prop', () => {
      render(<Pagination pageSizes={[10]} onChange />);

      expect();
    });

    it('should respect page prop', () => {
      render(<Pagination pageSizes={[10]} page />);

      expect();
    });

    it('should respect pageInputDisabled prop', () => {
      render(<Pagination pageSizes={[10]} pageInputDisabled />);

      expect();
    });

    it('should respect pageNumberText prop', () => {
      render(<Pagination pageSizes={[10]} pageNumberText />);

      expect();
    });

    it('should respect pageRangeText prop', () => {
      render(<Pagination pageSizes={[10]} pageRangeText />);

      expect();
    });

    it('should respect pageSize prop', () => {
      render(<Pagination pageSizes={[10]} pageSize />);

      expect();
    });

    it('should respect pageSizeInputDisabled prop', () => {
      render(<Pagination pageSizes={[10]} pageSizeInputDisabled />);

      expect();
    });

    it('should respect pageSizes prop', () => {
      render(<Pagination pageSizes={[10]} />);

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
