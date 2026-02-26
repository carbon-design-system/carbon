/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Preview Pagination', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      const { container } = render(
        <Pagination
          data-testid="test-id"
          pageSizes={[10]}
          onChange={() => {}}
        />
      );

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should label icon with backwardText', () => {
      render(
        <Pagination
          backwardText="Move backwards"
          pageSizes={[10]}
          onChange={() => {}}
        />
      );

      expect(screen.getByText('Move backwards')).toBeInTheDocument();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <Pagination
          className="custom-class"
          pageSizes={[10]}
          onChange={() => {}}
        />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should disable controls with disabled', () => {
      render(<Pagination disabled pageSizes={[10]} onChange={() => {}} />);

      expect(
        screen.getByLabelText('Next page', { hidden: true })
      ).toBeDisabled();

      expect(
        screen.getByLabelText('Previous page', { hidden: true })
      ).toBeDisabled();
    });

    it('should call onChange when changing page size using the dropdown', async () => {
      const onChange = jest.fn();
      render(
        <Pagination
          totalItems={20}
          pageSizes={[10, 20]}
          pageSize={10}
          onChange={onChange}
        />
      );

      await userEvent.selectOptions(screen.getByLabelText('Items per page:'), [
        '20',
      ]);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ page: 1, pageSize: 20 })
      );
    });
  });
});
