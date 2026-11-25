/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@testing-library/jest-dom/jest-globals';
import { describe, expect, it, jest } from '@jest/globals';

import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} from '../';

const prefix = 'cds';

const mockBoundingClientRect = (element: typeof Element, width: number) => {
  element.prototype.getBoundingClientRect = jest.fn(
    () => new DOMRect(0, 0, width, 1)
  );
};

const mockMeasureText = (width: number) => {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    configurable: true,
    value: jest.fn(() => ({
      measureText: () => ({ width }),
    })),
  });
};

describe('Table', () => {
  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
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

  describe('with overflow menu', () => {
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

  describe('experimentalAutoAlign', () => {
    it('should align content top when property passed in and content is wrapping', () => {
      mockBoundingClientRect(Element, 1);
      mockMeasureText(101);
      render(
        <Table experimentalAutoAlign>
          <TableHead>
            <TableRow>
              <TableHeader>Header1</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Wrapping content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByRole('table')).toHaveClass(
        `${prefix}--data-table--top-aligned-body`
      );
    });

    it('should not align content top when property not passed in and content is wrapping', () => {
      mockBoundingClientRect(Element, 1);
      mockMeasureText(100);
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Header1</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Wrapping content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByRole('table')).not.toHaveClass(
        `${prefix}--data-table--top-aligned-body`
      );
      expect(screen.getByRole('table')).not.toHaveClass(
        `${prefix}--data-table--top-aligned-header`
      );
    });

    it('should not align content top when property  passed in and content is not wrapping', () => {
      mockBoundingClientRect(Element, 10000);
      mockMeasureText(100);
      render(
        <Table experimentalAutoAlign>
          <TableHead>
            <TableRow>
              <TableHeader>Header1</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Wrapping content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByRole('table')).not.toHaveClass(
        `${prefix}--data-table--top-aligned-body`
      );
      expect(screen.getByRole('table')).not.toHaveClass(
        `${prefix}--data-table--top-aligned-header`
      );
    });

    it('should only align header top when property passed in and header content is wrapping but body content is not wrapping', () => {
      mockBoundingClientRect(HTMLTableCellElement, 10000);
      mockMeasureText(100);
      mockBoundingClientRect(HTMLDivElement, 1);

      render(
        <Table experimentalAutoAlign>
          <TableHead>
            <TableRow>
              <TableHeader isSortable={true}>Header1</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Wrapping content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByRole('table')).toHaveClass(
        `${prefix}--data-table--top-aligned-header`
      );
      expect(screen.getByRole('table')).not.toHaveClass(
        `${prefix}--data-table--top-aligned-body`
      );
    });

    it('should only align body top when property passed in and body content is wrapping but header content is not wrapping', () => {
      mockBoundingClientRect(HTMLTableCellElement, 1);
      mockBoundingClientRect(HTMLDivElement, 10000);
      mockMeasureText(100);
      render(
        <Table experimentalAutoAlign>
          <TableHead>
            <TableRow>
              <TableHeader>Header1</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Wrapping content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByRole('table')).toHaveClass(
        `${prefix}--data-table--top-aligned-body`
      );
      expect(screen.getByRole('table')).not.toHaveClass(
        `${prefix}--data-table--top-aligned-header`
      );
    });
  });
});
