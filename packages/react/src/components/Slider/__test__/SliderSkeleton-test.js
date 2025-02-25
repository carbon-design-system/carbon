import React from 'react';
import { render, screen } from '@testing-library/react';
import SliderSkeleton from '../Slider.Skeleton';

describe('SliderSkeleton', () => {
  describe('behaves as expected - Component API', () => {
    it('should apply the expected classes', () => {
      const { container } = render(<SliderSkeleton />);
      expect(container.firstChild.firstChild).toHaveClass(
        'cds--label cds--skeleton'
      );
    });

    it('should pass custom class via className', () => {
      const customSliderClass = 'slider-custom-class';
      const { container } = render(
        <SliderSkeleton twoHandles={true} className={customSliderClass} />
      );
      expect(container.firstChild).toHaveClass(customSliderClass);
    });

    it('renders without label when hideLabel is true', () => {
      const { container } = render(<SliderSkeleton hideLabel={true} />);
      const label = container.querySelector('.cds--label.cds--skeleton');
      expect(label).not.toBeInTheDocument();
    });

    describe('Accessibility labels', () => {
      it('applies default aria labels', () => {
        render(<SliderSkeleton twoHandles={true} />);
        const lowerHandle = screen.getByLabelText('slider handle');
        const upperHandle = screen.getByLabelText('upper slider handle');
        expect(lowerHandle).toBeInTheDocument();
        expect(upperHandle).toBeInTheDocument();
      });

      it('allows custom aria labels', () => {
        render(
          <SliderSkeleton
            twoHandles={true}
            ariaLabel="Custom Lower Handle"
            unstable_ariaLabelHandleUpper="Custom Upper Handle"
          />
        );
        const lowerHandle = screen.getByLabelText('Custom Lower Handle');
        const upperHandle = screen.getByLabelText('Custom Upper Handle');
        expect(lowerHandle).toBeInTheDocument();
        expect(upperHandle).toBeInTheDocument();
      });
    });
  });
});
