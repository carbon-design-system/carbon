/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useRef, useState } from 'react';
import { useSidePanelPresence } from '../useSidePanelPresence';

const EXIT_ANIMATION = 'cds--side-panel-exit';

const TestComponent = () => {
  const ref = useRef(null);
  const [open, setOpen] = useState(true);
  const { shouldRender } = useSidePanelPresence(open, ref, EXIT_ANIMATION);

  return shouldRender ? (
    <div ref={ref} role="dialog">
      <button onClick={() => setOpen(false)}>Close</button>
    </div>
  ) : null;
};

describe('useSidePanelPresence', () => {
  let originalGetAnimations;
  let originalCSSAnimation;
  let exitAnimation;

  beforeEach(() => {
    originalGetAnimations = Element.prototype.getAnimations;
    originalCSSAnimation = global.CSSAnimation;

    function MockCSSAnimation(animationName) {
      this.animationName = animationName;
      this.finished = new Promise((resolve, reject) => {
        exitAnimation = { resolve, reject };
      });
    }

    global.CSSAnimation = MockCSSAnimation;
    Element.prototype.getAnimations = jest.fn(() => [
      new MockCSSAnimation(EXIT_ANIMATION),
    ]);
  });

  afterEach(() => {
    if (originalGetAnimations) {
      Element.prototype.getAnimations = originalGetAnimations;
    } else {
      delete Element.prototype.getAnimations;
    }

    if (originalCSSAnimation) {
      global.CSSAnimation = originalCSSAnimation;
    } else {
      delete global.CSSAnimation;
    }
  });

  it('should keep the panel mounted until the exit animation finishes', async () => {
    render(<TestComponent />);

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    exitAnimation.resolve();

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
  });

  it('should unmount without an unhandled rejection when the exit animation is canceled', async () => {
    render(<TestComponent />);

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Browsers reject `Animation.finished` with an `AbortError` when an
    // animation is canceled, e.g. when the panel unmounts mid-exit.
    exitAnimation.reject(
      new DOMException('The animation was aborted.', 'AbortError')
    );

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
  });
});
