/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Switcher from '../Switcher';
import { render, screen } from '@testing-library/react';

describe('Switcher', () => {
  describe('renders as expected - Component API', () => {
    it('should respect aria-label prop', () => {
      const { container } = render(
        <Switcher aria-label="test-aria-label">Dummy child</Switcher>
      );

      expect(container.firstChild).toHaveAttribute(
        'aria-label',
        'test-aria-label'
      );
    });

    it('should respect aria-labelledby prop', () => {
      const { container } = render(
        <Switcher aria-labelledby="test-aria-labelledby">Dummy child</Switcher>
      );

      expect(container.firstChild).toHaveAttribute(
        'aria-labelledby',
        'test-aria-labelledby'
      );
    });

    it('should render children as expected', () => {
      render(<Switcher aria-label="dummy-aria-label">text child</Switcher>);

      expect(screen.getByText('text child')).toBeInTheDocument();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <Switcher aria-label="dummy-aria-label" className="custom-class">
          Dummy child
        </Switcher>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
