/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Slug } from '../../Slug';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('Slug', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto the popover element', () => {
      const { container } = render(<Slug data-testid="test" />);

      expect(container.firstChild.firstChild).toHaveAttribute(
        'data-testid',
        'test'
      );
    });

    it('should render children as expected', () => {
      render(<Slug>Children test</Slug>);

      expect(screen.getByText('Children test')).toBeInTheDocument();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(<Slug className="custom-class" />);

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect aiText prop', () => {
      render(<Slug aiText="IA" />);

      expect(screen.getByText('IA')).toBeInTheDocument();
    });

    it('should respect aiTextLabel prop', () => {
      render(<Slug aiTextLabel="Test text" />);

      expect(screen.getByText('Test text')).toBeInTheDocument();
    });

    it('should respect align prop', () => {
      render(<Slug data-testid="test" align="left-bottom" />);

      expect(screen.getByTestId('test')).toHaveClass(
        `${prefix}--popover--left-bottom`
      );
    });

    it('should respect kind prop', () => {
      render(<Slug kind="inline" />);

      expect(screen.getByRole('button')).toHaveClass(
        `${prefix}--slug__button--inline`
      );
    });

    it('should respect revertActive prop', () => {
      const { container } = render(<Slug revertActive />);

      expect(container.firstChild).toHaveClass(`${prefix}--slug--revert`);
      expect(container.firstChild.firstChild).toHaveClass(
        `${prefix}--icon-tooltip`
      );
    });

    it('should respect revertLabel prop', () => {
      render(<Slug revertActive revertLabel="Test revert label" />);

      expect(screen.getByText('Test revert label')).toBeInTheDocument();
    });

    it('should respect size prop', () => {
      render(<Slug size="xl" />);

      expect(screen.getByRole('button')).toHaveClass(
        `${prefix}--slug__button--xl`
      );
    });
  });
});
