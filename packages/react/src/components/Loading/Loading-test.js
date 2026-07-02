/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Loading from './Loading';
import { render, screen } from '@testing-library/react';

describe('Loading', () => {
  describe('renders as expected - Component API', () => {
    it('should change classes based on active', () => {
      const { container, rerender } = render(<Loading active />);

      expect(container.firstChild).not.toHaveClass(
        'cds--loading-overlay--stop'
      );

      rerender(<Loading active={false} />);

      expect(container.firstChild).toHaveClass('cds--loading-overlay--stop');
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <Loading className="custom-class" withOverlay={false} />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should spread extra props on the outermost element', () => {
      const { container } = render(
        <Loading withOverlay={false} data-testid="test" />
      );

      expect(container.firstChild).toHaveAttribute('data-testid', 'test');
    });

    it('should specify a description based on prop', () => {
      render(<Loading description="Loading description" />);

      expect(screen.getByTitle('Loading description')).toBeInTheDocument();
    });

    it('should respect small prop', () => {
      const { container } = render(<Loading small withOverlay={false} />);

      expect(container.firstChild).toHaveClass('cds--loading--small');
    });

    it('should respect withOverlay prop', () => {
      const { container, rerender } = render(<Loading withOverlay />);

      expect(container.firstChild).toHaveClass('cds--loading-overlay');

      rerender(<Loading withOverlay={false} />);

      expect(container.firstChild).not.toHaveClass('cds--loading-overlay');
    });
  });

  describe('with a screenreader', () => {
    // https://www.w3.org/TR/WCAG21/#headings-and-labels
    it('should have a label on the live region', () => {
      const { container } = render(<Loading />);
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const liveRegion = container.querySelector('[aria-live]');
      expect(liveRegion).toBeInstanceOf(HTMLElement);
    });

    // https://www.w3.org/TR/WCAG21/#status-messages
    it('should announce a loading status', () => {
      const { container } = render(<Loading />);
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const liveRegion = container.querySelector('[aria-live]');
      expect(liveRegion).toBeInstanceOf(HTMLElement);

      const atomicBoolean = liveRegion.getAttribute('aria-atomic');
      expect(atomicBoolean).toBe('true');

      const ariaLiveValue = liveRegion.getAttribute('aria-live');
      expect(ariaLiveValue).toEqual('assertive');
    });
  });
});
