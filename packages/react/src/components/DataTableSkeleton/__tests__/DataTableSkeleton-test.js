/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DataTableSkeleton from '../DataTableSkeleton';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('DataTableSkeleton', () => {
  describe('renders as expected - Component API', () => {
    it('should render the correct classname', () => {
      render(<DataTableSkeleton />);
      expect(screen.getByRole('table')).toHaveClass(`${prefix}--data-table`);
      expect(screen.getByRole('table')).toHaveClass(`${prefix}--skeleton`);
    });

    it('should spread extra props on the outermost element', () => {
      render(<DataTableSkeleton data-testid="test-id" />);

      expect(screen.getByRole('table')).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('should support a custom `className` prop on the outermost element', () => {
      render(<DataTableSkeleton className="custom-class" />);

      expect(screen.getByRole('table')).toHaveClass('custom-class');
    });

    it('should respect the columnCount prop', () => {
      render(<DataTableSkeleton columnCount={3} />);

      expect(screen.getAllByRole('columnheader').length).toEqual(3);
    });

    it('should respect the compact prop', () => {
      render(<DataTableSkeleton compact />);

      expect(screen.getByRole('table')).toHaveClass(
        `${prefix}--data-table--compact`
      );
    });

    it('should respect the headers prop', () => {
      const headers = [
        {
          key: 'name',
          header: 'Name',
        },
        {
          key: 'protocol',
          header: 'Protocol',
        },
        {
          key: 'port',
          header: 'Port',
        },
      ];
      render(<DataTableSkeleton headers={headers} />);

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Protocol')).toBeInTheDocument();
      expect(screen.getByText('Port')).toBeInTheDocument();
    });

    it('should respect the rowCount prop', () => {
      const { container } = render(<DataTableSkeleton rowCount={20} />);

      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const rows = container.querySelectorAll('tbody tr');
      expect(rows.length).toEqual(20);
    });

    it('should respect the showHeader prop', () => {
      const { container } = render(<DataTableSkeleton showHeader={false} />);

      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const header = container.querySelector(`.${prefix}--data-table-header`);
      expect(header).not.toBeInTheDocument();
    });

    it('should respect the showToolbar prop', () => {
      const { container } = render(<DataTableSkeleton showToolbar={false} />);

      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const toolbar = container.querySelector(`.${prefix}--table-toolbar`);
      expect(toolbar).not.toBeInTheDocument();
    });

    it('should respect the zebra prop', () => {
      render(<DataTableSkeleton zebra />);

      expect(screen.getByRole('table')).toHaveClass(
        `${prefix}--data-table--zebra`
      );
    });
  });
});
