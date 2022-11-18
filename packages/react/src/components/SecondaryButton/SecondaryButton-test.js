/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Search } from '@carbon/icons-react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SecondaryButton from '../SecondaryButton';

describe('SecondaryButton', () => {
  describe('Renders as expected', () => {
    const secondaryButton = (
      <SecondaryButton size="sm" className="extra-class">
        <div className="child">Test</div>
        <div className="child">Test</div>
      </SecondaryButton>
    );

    it('Renders children as expected', () => {
      const { container } = render(secondaryButton);
      expect(screen.getAllByText('Test').length).toBe(2);
      expect(container.querySelector('svg')).toBeNull();
    });

    it('Has the expected kind set to "secondary"', () => {
      const { container } = render(secondaryButton);
      expect(container.firstChild).toHaveClass('cds--btn--secondary');
    });

    it('Should add extra classes that are passed via className', () => {
      const { container } = render(secondaryButton);
      expect(container.firstChild).toHaveClass('extra-class');
    });

    describe('Renders icon buttons', () => {
      it('should have the appropriate icon', () => {
        const { container } = render(
          <SecondaryButton renderIcon={Search} iconDescription="Search">
            Search
          </SecondaryButton>
        );
        expect(container.querySelector('.cds--btn__icon')).toBeTruthy();
      });
    });
  });
});
