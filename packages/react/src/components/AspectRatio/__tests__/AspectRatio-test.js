/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import AspectRatio from '../AspectRatio';
import { render, screen } from '@testing-library/react';

describe('AspectRatio', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      const { container } = render(<AspectRatio data-testid="test-id" />);

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should respect as prop', () => {
      render(
        <>
          <AspectRatio as="li">test</AspectRatio>
          <AspectRatio
            className="test"
            as={(props) => <button type="button" {...props} />}>
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
        '3x2',
        '2x3',
        '1x1',
      ];

      ratios.forEach((ratio) => {
        render(
          <AspectRatio ratio={ratio} data-testid={`aspect-ratio ${ratio}`} />
        );

        expect(screen.getByTestId(`aspect-ratio ${ratio}`)).toHaveClass(
          `cds--aspect-ratio--${ratio}`
        );
      });
    });

    it('should respect responsive ratio props', () => {
      render(
        <AspectRatio
          ratio="1x1"
          ratioSm="2x1"
          ratioMd="4x3"
          ratioLg="16x9"
          ratioXlg="3x2"
          ratioMax="2x3"
          data-testid="aspect-ratio"
        />
      );

      expect(screen.getByTestId('aspect-ratio')).toHaveClass(
        'cds--aspect-ratio--2x1',
        'cds--aspect-ratio--md--4x3',
        'cds--aspect-ratio--lg--16x9',
        'cds--aspect-ratio--xlg--3x2',
        'cds--aspect-ratio--max--2x3'
      );
    });
  });
});
