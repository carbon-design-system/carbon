/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ListItem from './ListItem';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('ListItem', () => {
  describe('Renders as expected', () => {
    it('should be an li element', () => {
      render(<ListItem>Item</ListItem>);

      expect(screen.getByRole('listitem')).toBeInTheDocument();
    });

    it('should render with the appropriate classes', () => {
      const { container } = render(
        <ListItem className="custom-class">Item</ListItem>
      );

      expect(container.firstChild).toHaveClass(`${prefix}--list__item`);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should render children as expected', () => {
      render(<ListItem>Item</ListItem>);
      expect(screen.getByText('Item')).toBeInTheDocument();
    });
  });
});
