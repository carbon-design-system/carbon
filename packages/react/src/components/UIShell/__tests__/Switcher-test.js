/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Switcher from '../Switcher';
import { render, screen } from '@testing-library/react';
import SwitcherItem from '../SwitcherItem';

describe('Switcher', () => {
  describe('renders as expected - Component API', () => {
    it('should respect aria-label prop', () => {
      const { container } = render(
        <Switcher aria-label="test-aria-label">
          <SwitcherItem aria-label="test-aria-label-switcheritem">
            Dummy child
          </SwitcherItem>
        </Switcher>
      );

      expect(container.firstChild).toHaveAttribute(
        'aria-label',
        'test-aria-label'
      );
    });

    it('should respect aria-labelledby prop', () => {
      const { container } = render(
        <Switcher aria-labelledby="test-aria-labelledby">
          <SwitcherItem aria-label="test-aria-label-switcheritem">
            Dummy child
          </SwitcherItem>
        </Switcher>
      );

      expect(container.firstChild).toHaveAttribute(
        'aria-labelledby',
        'test-aria-labelledby'
      );
    });

    it('should render children as expected', () => {
      render(
        <Switcher aria-label="dummy-aria-label">
          <SwitcherItem aria-label="test-aria-label-switcheritem">
            Dummy child
          </SwitcherItem>
        </Switcher>
      );

      expect(screen.getByText('Dummy child')).toBeInTheDocument();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <Switcher aria-label="dummy-aria-label" className="custom-class">
          <SwitcherItem aria-label="test-aria-label-switcheritem">
            Dummy child
          </SwitcherItem>
        </Switcher>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
