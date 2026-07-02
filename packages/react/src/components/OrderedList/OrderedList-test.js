/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderedList from './OrderedList';
import ListItem from '../ListItem';

const prefix = 'cds';

describe('OrderedList', () => {
  describe('Renders as expected', () => {
    it('should be an ol element', () => {
      render(
        <OrderedList>
          <ListItem>Item</ListItem>
        </OrderedList>
      );

      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should render with the appropriate classes', () => {
      const { container } = render(
        <OrderedList className="custom-class">
          <ListItem>Item</ListItem>
        </OrderedList>
      );

      expect(container.firstChild).toHaveClass('custom-class');
      expect(container.firstChild).toHaveClass(`${prefix}--list--ordered`);
    });

    it('should render children as expected', () => {
      render(
        <OrderedList>
          <ListItem>Item 1</ListItem>
        </OrderedList>
      );
      expect(screen.getByRole('listitem')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('should render nested lists', () => {
      render(
        <OrderedList data-testid="not-nested">
          <ListItem>
            Ordered List level 1
            <OrderedList nested data-testid="nested">
              <ListItem>Ordered List level 2</ListItem>
              <ListItem>Ordered List level 2</ListItem>
            </OrderedList>
          </ListItem>
        </OrderedList>
      );

      expect(screen.getByTestId('not-nested')).not.toHaveClass(
        `${prefix}--list--nested`
      );
      expect(screen.getByTestId('nested')).toHaveClass(
        `${prefix}--list--nested`
      );
      expect(screen.getByTestId('nested')).toHaveClass(
        `${prefix}--list--ordered`
      );
    });

    it('should render native lists', () => {
      const { container } = render(
        <OrderedList native>
          <ListItem>Item</ListItem>
        </OrderedList>
      );

      expect(container.firstChild).toHaveClass(
        `${prefix}--list--ordered--native`
      );
      expect(container.firstChild).not.toHaveClass(`${prefix}--list--nested`);
    });

    it('should render expressive lists', () => {
      const { container } = render(
        <OrderedList isExpressive>
          <ListItem>Item</ListItem>
        </OrderedList>
      );

      expect(container.firstChild).toHaveClass(`${prefix}--list--ordered`);
      expect(container.firstChild).toHaveClass(`${prefix}--list--expressive`);
    });
  });
});
