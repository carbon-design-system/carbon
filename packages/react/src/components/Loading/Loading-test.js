/**
 * Copyright IBM Corp. 2016, 2026
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
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const overlay = container.firstChild;

      expect(overlay).not.toHaveClass('cds--loading-overlay--stop');

      rerender(<Loading active={false} />);

      expect(overlay).toHaveClass('cds--loading-overlay--stop');
    });

    it('should support a custom `className` prop on the loading element', () => {
      const { container } = render(
        <Loading className="custom-class" withOverlay={false} />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should spread extra props on the loading element when withOverlay is false', () => {
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

    it('should render presentation wrapper and dialog when withOverlay is true', () => {
      const { container } = render(<Loading withOverlay />);
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const overlay = container.firstChild;
      expect(overlay).toHaveAttribute('role', 'presentation');
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const dialog = overlay.firstChild;
      expect(dialog).toHaveAttribute('role', 'dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('should not render overlay wrapper when withOverlay is false', () => {
      const { container } = render(<Loading withOverlay={false} />);

      expect(container.firstChild).toHaveClass('cds--loading');
      expect(container.firstChild).not.toHaveAttribute('role', 'presentation');
    });
  });

  describe('with a screenreader', () => {
    // https://www.w3.org/TR/WCAG21/#headings-and-labels
    it('should have a live region on the loading element', () => {
      const { container } = render(<Loading />);
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const liveRegion = container.querySelector('[aria-live]');
      expect(liveRegion).toBeInstanceOf(HTMLElement);
      expect(liveRegion).toHaveClass('cds--loading');
    });

    // https://www.w3.org/TR/WCAG21/#status-messages
    it('should announce a loading status when active', () => {
      const { container } = render(<Loading active />);
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const liveRegion = container.querySelector('[aria-live]');
      expect(liveRegion).toBeInstanceOf(HTMLElement);

      expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
      expect(liveRegion).toHaveAttribute('aria-live', 'assertive');
    });

    it('should set aria-live to off when not active', () => {
      const { container } = render(<Loading active={false} />);
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const liveRegion = container.querySelector('[aria-live]');

      expect(liveRegion).toHaveAttribute('aria-live', 'off');
    });

    it('should set aria-label on dialog when withOverlay is true', () => {
      render(<Loading withOverlay description="Loading content" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-label', 'Loading content');
    });
  });
});
