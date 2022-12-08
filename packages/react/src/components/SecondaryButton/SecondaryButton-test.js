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

const prefix = 'cds';

describe('SecondaryButton', () => {
  describe('Renders as expected', () => {
    it('Renders children as expected', () => {
      render(
        <SecondaryButton>
          <div className="child">Test</div>
          <div className="child">Test</div>
        </SecondaryButton>
      );
      expect(screen.getAllByText('Test').length).toBe(2);
    });

    it('Has the expected kind set to "secondary"', () => {
      render(<SecondaryButton />);
      expect(screen.getByRole('button')).toHaveClass(
        `${prefix}--btn--secondary`
      );
    });

    it('Should add extra classes that are passed via className', () => {
      render(<SecondaryButton className="extra-class" />);
      expect(screen.getByRole('button')).toHaveClass('extra-class');
    });

    describe('Renders icon buttons', () => {
      it('should have the appropriate icon', () => {
        render(
          <SecondaryButton iconDescription={'Search'} renderIcon={Search} />
        );
        expect(screen.queryByLabelText('Search')).toHaveClass(
          `${prefix}--btn__icon`
        );
      });
    });
  });
});
