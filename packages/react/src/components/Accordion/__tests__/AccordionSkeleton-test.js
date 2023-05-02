/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import AccordionSkeleton from '../Accordion.Skeleton';
import { render, screen } from '@testing-library/react';

describe('AccordionSkeleton', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      const { container } = render(<AccordionSkeleton data-testid="test-id" />);

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should render and match snapshot', () => {
      const { container } = render(<AccordionSkeleton />);

      expect(container).toMatchSnapshot();
    });

    it('should respect align prop', () => {
      render(<AccordionSkeleton data-testid="start" align="start" />);
      expect(screen.getByTestId('start')).toHaveClass('cds--accordion--start');

      render(<AccordionSkeleton data-testid="end" align="end" />);
      expect(screen.getByTestId('end')).toHaveClass('cds--accordion--end');
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <AccordionSkeleton className="custom-class" />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect count prop', () => {
      render(<AccordionSkeleton count={8} />);

      expect(screen.getAllByRole('listitem').length).toBe(8);
    });

    it('should respect isFlush prop', () => {
      render(<AccordionSkeleton data-testid="flush" isFlush />);
      expect(screen.getByTestId('flush')).toHaveClass('cds--accordion--flush');
    });

    it('should respect open prop', () => {
      render(<AccordionSkeleton open />);
      expect(screen.getAllByRole('listitem')[0]).toHaveClass(
        'cds--accordion__item--active'
      );
    });
  });

  describe('behaves as expected', () => {
    // Add tests for relevant component behavior. For more information, visit https://github.com/carbon-design-system/carbon/issues/10184#issuecomment-992978122
  });
});
