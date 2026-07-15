/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import Button from '../../../src/components/Button';
import { MotionSurfaceOrigin } from '../../../src/internal/motion/MotionSurface';
import { DemoDialog } from './DemoDialog';
import './surfaces.stories.scss';

export default {
  title: 'Elements/Motion/Contextual',
  tags: ['!autodocs'],
};

/**
 * Contextual reveal via native CSS.
 * `DemoDialog` skips `MotionSurface` for this surface; the story sets
 * `data-carbon-surface` / `data-carbon-surface-state` and holds the dialog
 * mounted until the exit transition finishes. Styles come from
 * `@include motion.surface(contextual)`.
 */
export const ContextualWithNativeCSS = () => {
  const [open, setOpen] = useState(false);
  // Keep the dialog mounted while the exit transition runs
  const [present, setPresent] = useState(false);

  useEffect(() => {
    if (open) {
      setPresent(true);
    }
  }, [open]);

  return (
    <>
      <Button
        className="motion-surface-demo__trigger"
        onClick={() => setOpen(true)}>
        Create resource
      </Button>
      <DemoDialog
        surface="contextual"
        open={present}
        useNativeCSS
        onClose={() => setOpen(false)}
        heading="Create resource"
        data-carbon-surface="contextual"
        data-carbon-surface-state={open ? 'enter' : 'exit'}
        onTransitionEnd={(event) => {
          if (event.target !== event.currentTarget) {
            return;
          }
          // opacity and clip-path both fire; complete once on opacity
          if (event.propertyName !== 'opacity') {
            return;
          }
          if (!open) {
            setPresent(false);
          }
        }}>
        <p>
          This dialog uses the native CSS path for the <code>contextual</code>{' '}
          reveal: <code>data-carbon-surface</code> and{' '}
          <code>data-carbon-surface-state</code> drive enter/exit styles from
          the shared surface map via the Sass mixin. With reduced motion enabled
          the dialog opens and closes with no transition.
        </p>
      </DemoDialog>
    </>
  );
};

/**
 * Contextual reveal via Motion (`MotionSurface` + motion/react).
 * The trigger is wrapped in `MotionSurfaceOrigin` for parity with shared-
 * element demos; for a reveal surface the origin is a plain wrapper and the
 * dialog animates from the shared `contextual` keyframes.
 */
export const ContextualWithMotion = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MotionSurfaceOrigin
        surface="contextual"
        surfaceId="contextual-motion-demo"
        className="motion-surface-demo__trigger">
        <Button onClick={() => setOpen(true)}>Create resource</Button>
      </MotionSurfaceOrigin>
      <DemoDialog
        surface="contextual"
        surfaceId="contextual-motion-demo"
        open={open}
        onClose={() => setOpen(false)}
        heading="Create resource">
        <p>
          This dialog uses the Motion path: <code>MotionSurface</code> resolves
          the <code>contextual</code> reveal surface and animates with
          motion/react. With reduced motion enabled the dialog opens and closes
          with no animation.
        </p>
      </DemoDialog>
    </>
  );
};
