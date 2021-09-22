/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TabContent from '../TabContent';
import { render, screen } from '@testing-library/react';

describe('TabContent', () => {
  describe('renders as expected', () => {
    it('renders children as expected', () => {
      render(
        <TabContent selected>
          <div className="child">content</div>
          <div className="child">content</div>
        </TabContent>
      );
      expect(screen.getByRole('tabpanel').children.length).toEqual(2);
    });

    it('sets selected and hidden props with opposite boolean values', () => {
      const { rerender } = render(
        <TabContent>
          <div className="child">content</div>
          <div className="child">content</div>
        </TabContent>
      );
      expect(screen.queryByRole('tabpanel')).not.toBeInTheDocument();
      rerender(
        <TabContent selected>
          <div className="child">content</div>
          <div className="child">content</div>
        </TabContent>
      );
      expect(screen.getByRole('tabpanel')).toBeVisible();
    });

    it('includes the content container in the tabbable index when no tab contents are provided', () => {
      render(
        <TabContent selected>
          <p>content</p>
        </TabContent>
      );
      expect(screen.getByRole('tabpanel')).toHaveAttribute('tabindex', '0');
    });

    it('does not include the content container in the tabbable index when tab contents are provided', () => {
      render(
        <TabContent selected>
          <a href="https://www.ibm.com/">content</a>
        </TabContent>
      );
      expect(screen.getByRole('tabpanel')).not.toHaveAttribute('tabindex', '0');
    });
  });
});
