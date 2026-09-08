/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

jest.mock('../useMotionEnabled', () => ({
  useMotionEnabled: jest.fn(() => true),
}));

// timer-based implementation before requiring anything that imports `motion/react`
// to avoid infinite looping
if (typeof global.performance === 'undefined') {
  global.performance = { now: () => Date.now() };
}
global.requestAnimationFrame = (callback) =>
  setTimeout(() => callback(performance.now()), 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);

const { MotionSurface, MotionSurfaceOrigin } = require('../MotionSurface');
const { useMotionEnabled } = require('../useMotionEnabled');

describe('MotionSurface', () => {
  afterEach(() => {
    useMotionEnabled.mockReturnValue(true);
  });

  it('renders children when open', () => {
    render(
      <MotionSurface surface="expand" surfaceId="pair">
        content
      </MotionSurface>
    );

    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('mounts nothing while closed', () => {
    render(
      <MotionSurface surface="contextual" open={false}>
        content
      </MotionSurface>
    );

    expect(screen.queryByText('content')).not.toBeInTheDocument();
  });

  it('applies the reveal keyframes to the motion element', () => {
    render(
      <MotionSurface surface="contextual" data-testid="surface">
        content
      </MotionSurface>
    );

    // Motion drives reveal styles inline; the surface's enter/exit keyframes
    // target element instead of class
    expect(screen.getByTestId('surface')).toHaveAttribute('style');
  });

  it('runs the exit before unmounting and reports completion', async () => {
    const onExitComplete = jest.fn();
    const { rerender } = render(
      <MotionSurface surface="contextual" onExitComplete={onExitComplete}>
        content
      </MotionSurface>
    );

    rerender(
      <MotionSurface
        surface="contextual"
        open={false}
        onExitComplete={onExitComplete}>
        content
      </MotionSurface>
    );

    await waitFor(() => expect(onExitComplete).toHaveBeenCalledTimes(1));
    expect(screen.queryByText('content')).not.toBeInTheDocument();
  });

  describe('with reduced motion', () => {
    it('renders a plain element with no motion styles', () => {
      useMotionEnabled.mockReturnValue(false);

      render(
        <MotionSurface surface="contextual" data-testid="surface">
          content
        </MotionSurface>
      );

      expect(screen.getByTestId('surface')).not.toHaveAttribute('style');
      expect(screen.getByText('content')).toBeInTheDocument();
    });

    it('unmounts immediately but still reports exit completion', () => {
      useMotionEnabled.mockReturnValue(false);
      const onExitComplete = jest.fn();
      const { rerender } = render(
        <MotionSurface surface="contextual" onExitComplete={onExitComplete}>
          content
        </MotionSurface>
      );

      rerender(
        <MotionSurface
          surface="contextual"
          open={false}
          onExitComplete={onExitComplete}>
          content
        </MotionSurface>
      );

      expect(screen.queryByText('content')).not.toBeInTheDocument();
      expect(onExitComplete).toHaveBeenCalledTimes(1);
    });
  });
});

describe('MotionSurfaceOrigin', () => {
  afterEach(() => {
    useMotionEnabled.mockReturnValue(true);
  });

  it('stays mounted and renders its children', () => {
    render(
      <MotionSurfaceOrigin surface="expand" surfaceId="pair">
        origin content
      </MotionSurfaceOrigin>
    );

    expect(screen.getByText('origin content')).toBeInTheDocument();
  });

  it('renders a plain element with reduced motion', () => {
    useMotionEnabled.mockReturnValue(false);

    render(
      <MotionSurfaceOrigin
        surface="expand"
        surfaceId="pair"
        data-testid="origin">
        origin content
      </MotionSurfaceOrigin>
    );

    expect(screen.getByTestId('origin')).not.toHaveAttribute('style');
  });
});
