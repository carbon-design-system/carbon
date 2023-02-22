/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { Table } from '../';

describe('Table', () => {
  it.each(['xs', 'sm', 'md', 'lg', 'xl'])(
    'should support size=`%s`',
    (size) => {
      render(<Table size={size} />);
      expect(screen.getByRole('table')).toHaveClass(`cds--data-table--${size}`);
    }
  );

  it('should support a custom className on the <table> element', () => {
    render(<Table className="custom-class" />);
    expect(screen.getByRole('table')).toHaveClass('custom-class');
  });

  it('should spread props onto the <table> element', () => {
    render(<Table data-testid="test" />);
    expect(screen.getByRole('table')).toHaveAttribute('data-testid', 'test');
  });

  describe('with zebra stripes', () => {
    it('should set the zebra class with `useZebraStyles`', () => {
      const { rerender } = render(<Table />);
      expect(screen.getByRole('table')).not.toHaveClass(
        'cds--data-table--zebra'
      );

      rerender(<Table useZebraStyles />);
      expect(screen.getByRole('table')).toHaveClass('cds--data-table--zebra');
    });
  });

  describe('with static width', () => {
    it('should set the static class with `useStaticWidth`', () => {
      const { rerender } = render(<Table />);
      expect(screen.getByRole('table')).not.toHaveClass(
        'cds--data-table--static'
      );

      rerender(<Table useStaticWidth />);
      expect(screen.getByRole('table')).toHaveClass('cds--data-table--static');
    });
  });

  describe('with sticky header', () => {
    it('should set the sticky header class with `stickyHeader`', () => {
      const { rerender } = render(<Table />);
      expect(screen.getByRole('table')).not.toHaveClass(
        'cds--data-table--sticky-header'
      );

      rerender(<Table stickyHeader />);
      expect(screen.getByRole('table')).toHaveClass(
        'cds--data-table--sticky-header'
      );
    });
  });

  describe('with overfow menu', () => {
    it('should set the visible overflow menu class with `overflowMenuOnHover`', () => {
      const { rerender } = render(<Table />);
      expect(screen.getByRole('table')).not.toHaveClass(
        'cds--data-table--visible-overflow-menu'
      );

      rerender(<Table overflowMenuOnHover={false} />);
      expect(screen.getByRole('table')).toHaveClass(
        'cds--data-table--visible-overflow-menu'
      );
    });
  });
});
