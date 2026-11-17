/**
 * Copyright IBM Corp. 2023, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, it } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { render, screen } from '@testing-library/react';
import React, { type ComponentProps } from 'react';
import AspectRatio from '../AspectRatio';

describe('AspectRatio', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      const { container } = render(<AspectRatio data-testid="test-id" />);

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should respect as prop', () => {
      const CustomButton = (props: ComponentProps<'button'>) => (
        <button type="button" {...props} />
      );

      render(
        <>
          <AspectRatio as="li">test</AspectRatio>
          <AspectRatio className="test" as={CustomButton}>
            test as component
          </AspectRatio>
        </>
      );

      expect(screen.getByRole('listitem')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should render children as expected', () => {
      render(<AspectRatio>Text child</AspectRatio>);

      expect(screen.getByText('Text child')).toBeInTheDocument();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(<AspectRatio className="custom-class" />);

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect ratio prop', () => {
      const ratios = [
        '16x9',
        '9x16',
        '2x1',
        '1x2',
        '4x3',
        '3x4',
        '1x1',
      ] as const;

      ratios.forEach((ratio) => {
        render(
          <AspectRatio ratio={ratio} data-testid={`aspect-ratio ${ratio}`} />
        );

        expect(screen.getByTestId(`aspect-ratio ${ratio}`)).toHaveClass(
          `cds--aspect-ratio--${ratio}`
        );
      });
    });
  });
});
