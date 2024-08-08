/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { AILabel } from '../';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('AILabel', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto the popover element', () => {
      const { container } = render(<AILabel data-testid="test" />);

      expect(container.firstChild.firstChild).toHaveAttribute(
        'data-testid',
        'test'
      );
    });

    it('should render children as expected', () => {
      render(<AILabel>Children test</AILabel>);

      expect(screen.getByText('Children test')).toBeInTheDocument();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(<AILabel className="custom-class" />);

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect aiText prop', () => {
      render(<AILabel aiText="IA" />);

      expect(screen.getByText('IA')).toBeInTheDocument();
    });

    it('should respect textLabel prop when kind is inline', () => {
      const wrapper = render(<AILabel kind="inline" textLabel="Test text" />);

      const additionalTextSpan = wrapper.container.querySelector(
        `.${prefix}--slug__additional-text`
      );
      expect(additionalTextSpan).toBeInTheDocument();
      expect(additionalTextSpan).toHaveTextContent('Test text');
    });

    it('should not populate textLabel prop when kind is not inline', () => {
      const wrapper = render(<AILabel textLabel="Test text" />);

      const additionalTextSpan = wrapper.container.querySelector(
        `.${prefix}--slug__additional-text`
      );
      expect(additionalTextSpan).not.toBeInTheDocument();
    });

    it('should respect align prop when autoAlign is false', () => {
      render(
        <AILabel data-testid="test" autoAlign={false} align="bottom-start" />
      );

      expect(screen.getByTestId('test')).not.toHaveClass(
        `${prefix}--popover--auto-align`
      );
      expect(screen.getByTestId('test')).toHaveClass(
        `${prefix}--popover--bottom-start`
      );
    });

    it('should apply align prop classes even when autoAlign is true', () => {
      render(<AILabel data-testid="test" align="bottom-start" />);

      expect(screen.getByTestId('test')).toHaveClass(
        `${prefix}--popover--auto-align`
      );
      expect(screen.getByTestId('test')).toHaveClass(
        `${prefix}--popover--bottom-start`
      );
    });

    it('should respect kind prop', () => {
      render(<AILabel kind="inline" />);

      expect(screen.getByRole('button')).toHaveClass(
        `${prefix}--slug__button--inline`
      );
    });

    it('should respect revertActive prop', () => {
      const { container } = render(<AILabel revertActive />);

      expect(container.firstChild).toHaveClass(`${prefix}--slug--revert`);
      expect(container.firstChild.firstChild).toHaveClass(
        `${prefix}--icon-tooltip`
      );
    });

    it('should respect revertLabel prop', () => {
      render(<AILabel revertActive revertLabel="Test revert label" />);

      expect(screen.getByText('Test revert label')).toBeInTheDocument();
    });

    it('should respect size prop', () => {
      render(<AILabel size="xl" />);

      expect(screen.getByRole('button')).toHaveClass(
        `${prefix}--slug__button--xl`
      );
    });
  });
});
