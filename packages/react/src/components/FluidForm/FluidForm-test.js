import React from 'react';
import FluidForm from './FluidForm';
import { render, screen, fireEvent } from '@testing-library/react';

describe('FluidForm', () => {
  describe('renders as expected - Component API', () => {
    it('should render children as expected', () => {
      render(
        <FluidForm>
          <div>Text</div>
          <div>Text</div>
        </FluidForm>
      );
      expect(screen.getAllByText('Text')).toHaveLength(2);
    });

    it('should be a fluid form', () => {
      const { container } = render(<FluidForm />);
      expect(container.firstChild).toHaveClass('cds--form--fluid');
    });

    it('should spread extra props onto outermost container', () => {
      const { container } = render(<FluidForm data-testid="test-id" />);

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(<FluidForm className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should handle submit events', () => {
      const onSubmit = jest.fn();
      render(
        <FluidForm>
          <button className="button" type="submit" onSubmit={onSubmit}>
            Submit
          </button>
        </FluidForm>
      );

      fireEvent.submit(screen.getByRole('button'));
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
