import React from 'react';
import Pagination from '../Pagination';
import userEvent from '@testing-library/user-event';
import { getAllByRole, render, screen } from '@testing-library/react';

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

      expect(screen.getByText('Move backwards')).toBeInTheDocument();
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
      ).toBeDisabled();

      expect(
        screen.getByLabelText('Previous page', { hidden: true })
      ).toBeDisabled();
    });

    it('should label icon with forwardText', () => {
      render(<Pagination forwardText="forward" pageSizes={[10]} />);

      expect(screen.getByText('forward')).toBeInTheDocument();
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

      expect(screen.getByText('1–10 de 40 éléments')).toBeInTheDocument();
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

      expect(screen.getByText('1-10 éléments')).toBeInTheDocument();
    });

    it('should respect itemsPerPageText prop', () => {
      render(
        <Pagination pageSizes={[10]} itemsPerPageText={'éléments par page'} />
      );

      expect(screen.getByText('éléments par page')).toBeInTheDocument();
    });

    it('should call onChange when switching pages using the buttons', async () => {
      const onChange = jest.fn();
      render(
        <Pagination
          pageSizes={[10, 20]}
          pageSize={4}
          page={3}
          onChange={onChange}
        />
      );

      await userEvent.click(screen.getByLabelText('Previous page'));
      await userEvent.click(screen.getByLabelText('Next page'));
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({ page: 2 })
      );
      expect(onChange).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({ page: 3 })
      );
    });

    it('should call onChange when switching pages using the dropdown', async () => {
      const onChange = jest.fn();
      render(
        <Pagination
          totalItems={2}
          pageSizes={[1]}
          pageSize={1}
          page={1}
          onChange={onChange}
        />
      );
      await userEvent.selectOptions(screen.getByLabelText(/Page/), '2');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ page: 2 })
      );
    });

    it('should call onChange when changing page size using the dropdown', async () => {
      const onChange = jest.fn();
      render(
        <Pagination
          totalItems={2}
          pageSizes={[1, 2]}
          pageSize={1}
          page={1}
          onChange={onChange}
        />
      );
      await userEvent.selectOptions(
        screen.getByLabelText('Items per page:'),
        '2'
      );
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ pageSize: 2 })
      );
    });

    it('should keep focus on the previous button if there is a previous page after it is clicked', async () => {
      const onChange = jest.fn();
      render(
        <Pagination
          pageSizes={[10, 20]}
          pageSize={10}
          page={3}
          onChange={onChange}
        />
      );

      await userEvent.click(screen.getByLabelText('Previous page'));
      expect(screen.getByLabelText('Previous page')).toHaveFocus();
    });

    it('should change focus off the previous button and to the next button if there is no previous page after it is clicked', async () => {
      const onChange = jest.fn();
      render(
        <Pagination
          pageSizes={[10, 20]}
          pageSize={10}
          page={2}
          onChange={onChange}
        />
      );

      await userEvent.click(screen.getByLabelText('Previous page'));
      expect(screen.getByLabelText('Next page')).toHaveFocus();
    });

    it('should keep focus on the next button if there is a next page after it is clicked', async () => {
      const onChange = jest.fn();
      render(
        <Pagination
          pageSizes={[10, 20]}
          pageSize={10}
          page={2}
          onChange={onChange}
        />
      );

      await userEvent.click(screen.getByLabelText('Next page'));
      expect(screen.getByLabelText('Next page')).toHaveFocus();
    });

    it('should change focus off the next button and to the previous button if there is no next page after it is clicked', async () => {
      const onChange = jest.fn();
      render(
        <Pagination
          pageSizes={[10, 20]}
          pageSize={10}
          totalItems={31}
          page={3}
          onChange={onChange}
        />
      );

      await userEvent.click(screen.getByLabelText('Next page'));
      expect(screen.getByLabelText('Previous page')).toHaveFocus();
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

      expect(screen.getByText('11–20 of 40 items')).toBeInTheDocument();
    });

    it('should update the text when switching pages using the buttons', async () => {
      render(<Pagination pageSizes={[10, 20]} pageSize={10} page={3} />);
      expect(screen.getByText('21–30 items')).toBeInTheDocument();

      await userEvent.click(screen.getByLabelText('Previous page'));
      expect(screen.getByText('11–20 items')).toBeInTheDocument();

      await userEvent.click(screen.getByLabelText('Next page'));
      expect(screen.getByText('21–30 items')).toBeInTheDocument();
    });

    it('should update the text when switching pages using the dropdown', async () => {
      render(
        <Pagination totalItems={2} pageSizes={[1]} pageSize={1} page={1} />
      );
      expect(screen.getByText('1–1 of 2 items')).toBeInTheDocument();

      await userEvent.selectOptions(screen.getByLabelText(/Page/), '2');
      expect(screen.getByText('2–2 of 2 items')).toBeInTheDocument();
    });

    it('should update the text when switching page size using the dropdown', async () => {
      render(
        <Pagination totalItems={2} pageSizes={[1, 2]} pageSize={1} page={1} />
      );
      expect(screen.getByText('1–1 of 2 items')).toBeInTheDocument();

      await userEvent.selectOptions(
        screen.getByLabelText('Items per page:'),
        '2'
      );
      expect(screen.getByText('1–2 of 2 items')).toBeInTheDocument();
    });

    it('should respect pageInputDisabled prop', () => {
      render(<Pagination pageSizes={[10]} pageInputDisabled />);

      expect(
        // eslint-disable-next-line testing-library/no-node-access
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

      expect(screen.getByText('2 de 4')).toBeInTheDocument();
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

      expect(screen.getByText('21–40 of 40 items')).toBeInTheDocument();
    });

    it('should respect pageSize prop with a custom label', () => {
      render(
        <Pagination
          totalItems={40}
          pageSizes={[
            { text: 'Five', value: 5 },
            { text: 'Ten', value: 10 },
          ]}
          pageSize={10}
          page={1}
        />
      );

      expect(screen.getByText('1–10 of 40 items')).toBeInTheDocument();
      expect(screen.getByText('Ten')).toBeInTheDocument();
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
        // eslint-disable-next-line testing-library/no-node-access
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

    it('should include only current page when pagesUnknown', () => {
      const page = 1;
      render(
        <Pagination pageSizes={[10, 20]} page={page} pagesUnknown={true} />
      );

      expect(screen.queryByText(`page ${page}`)).toBeInTheDocument();
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
    it('should allow totalItems undefined', () => {
      render(<Pagination pagesUnknown={true} pageSizes={[10]} />);

      expect(screen.getByText(`page 1`)).toBeInTheDocument();
      expect(
        document.querySelector('.cds--pagination__unknown-pages-text')
      ).toBeInTheDocument();
      expect(
        document.querySelector('.cds--select__page-number')
      ).not.toBeInTheDocument();
    });

    it('Next button should be enabled if totalItems undefined and pagesUnknown is true', () => {
      render(<Pagination pagesUnknown={true} pageSizes={[10]} />);
      expect(screen.getByLabelText('Next page')).not.toBeDisabled();
    });

    it('should handle zero total items', () => {
      render(
        <Pagination
          totalItems={0}
          pageSizes={[10, 20]}
          pageSize={10}
          page={1}
        />
      );
      expect(screen.getByLabelText('Next page')).toBeDisabled();
      expect(screen.getByText('0–0 of 0 items')).toBeInTheDocument();
    });

    it('should update the page when updated externally', () => {
      const commonProps = {
        totalItems: 4,
        pageSizes: [2],
        pageSize: 2,
      };
      const { rerender } = render(<Pagination {...commonProps} page={1} />);
      expect(screen.getByText('1–2 of 4 items')).toBeInTheDocument();
      rerender(<Pagination {...commonProps} page={2} />);
      expect(screen.getByText('3–4 of 4 items')).toBeInTheDocument();
    });

    it('should update the page size when updated externally', () => {
      const commonProps = {
        page: 1,
        totalItems: 4,
        pageSizes: [2, 4],
      };
      const { rerender } = render(<Pagination {...commonProps} pageSize={2} />);
      expect(screen.getByText('1–2 of 4 items')).toBeInTheDocument();
      rerender(<Pagination {...commonProps} pageSize={4} />);
      expect(screen.getByText('1–4 of 4 items')).toBeInTheDocument();
    });

    it('should update the page sizes when updated externally', () => {
      const commonProps = {
        page: 1,
        totalItems: 4,
        pageSize: 2,
      };
      const { rerender } = render(
        <Pagination {...commonProps} pageSizes={[2, 4]} />
      );
      const select = screen.getByLabelText('Items per page:');

      expect(getAllByRole(select, 'option')).toHaveLength(2);
      expect(getAllByRole(select, 'option')[0]).toHaveValue('2');
      expect(getAllByRole(select, 'option')[1]).toHaveValue('4');

      rerender(<Pagination {...commonProps} pageSizes={[1, 2, 3]} />);

      expect(getAllByRole(select, 'option')).toHaveLength(3);
      expect(getAllByRole(select, 'option')[0]).toHaveValue('1');
      expect(getAllByRole(select, 'option')[1]).toHaveValue('2');
      expect(getAllByRole(select, 'option')[2]).toHaveValue('3');
    });

    it('should update the page to 1 when the updated page sizes do not include the new size', () => {
      const commonProps = {
        page: 2,
        totalItems: 4,
        pageSize: 2,
      };
      const { rerender } = render(
        <Pagination {...commonProps} pageSizes={[2, 4]} />
      );
      expect(screen.getByText('3–4 of 4 items')).toBeInTheDocument();

      rerender(<Pagination {...commonProps} pageSizes={[1]} />);
      expect(screen.getByText('1–2 of 4 items')).toBeInTheDocument();
    });
  });
});
