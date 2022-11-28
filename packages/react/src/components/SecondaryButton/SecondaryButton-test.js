/**
 * Copyright IBM Corp. 2016, 2018, 2022
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
    const renderSecondaryButton = (props) => {
      render(
        <SecondaryButton {...props} className="extra-class" size="sm">
          <div className="child">Test</div>
          <div className="child">Test</div>
        </SecondaryButton>
      );
    };

    it('Renders children as expected', () => {
      renderSecondaryButton();
      expect(screen.getAllByText('Test').length).toBe(2);
    });

    it('Has the expected kind set to "secondary"', () => {
      renderSecondaryButton();
      expect(screen.getByRole('button')).toHaveClass('cds--btn--secondary');
    });

    it('Should add extra classes that are passed via className', () => {
      renderSecondaryButton();
      expect(screen.getByRole('button')).toHaveClass('extra-class');
    });

    describe('Renders icon buttons', () => {
      it('should have the appropriate icon', () => {
        renderSecondaryButton({
          iconDescription: 'Search',
          renderIcon: Search,
        });
        expect(screen.queryByLabelText('Search')).toHaveClass('cds--btn__icon');
      });
    });
  });
});
