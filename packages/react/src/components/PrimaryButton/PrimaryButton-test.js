import React from 'react';
import PrimaryButton from './PrimaryButton';
import { render, screen } from '@testing-library/react';

describe('PrimaryButton', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      const { container } = render(<PrimaryButton data-testid="test-id" />);

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(<PrimaryButton className="custom-class" />);

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should be of kind primary', () => {
      render(<PrimaryButton>Submit</PrimaryButton>);

      expect(screen.getByText('Submit')).toHaveClass('cds--btn--primary');
    });
  });
});
