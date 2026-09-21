/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import { defineMotionSurface } from '@carbon/motion';
import Button from '../../../src/components/Button';
import { DemoDialog } from './DemoDialog';
import mdx from './Motion.mdx';
import './surfaces.stories.scss';

export default {
  title: 'Elements/Motion/Custom surface',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

// user-defined `stretch` reveal exapmle (not using built-in surface)
const stretchReveal = defineMotionSurface({
  kind: 'reveal',
  duration: 'slow-01',
  enter: { opacity: 1, clipPath: 'inset(0 0 0 0)' },
  exit: { opacity: 0, clipPath: 'inset(50% 0 50% 0)' },
  enterEasing: { name: 'entrance', mode: 'expressive' },
  exitEasing: { name: 'exit', mode: 'expressive' },
});

/**
 * user-defined stretch example, pure CSS
 *
 * `surfaces.stories.scss` passes a definition map to
 * `@include motion.surface(...)`, and the story toggles
 * `data-carbon-surface-state` to move between enter and exit keyframes
 */
export const CustomSurfaceWithNativeCSS = () => {
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
        open={present}
        useNativeCSS
        onClose={() => setOpen(false)}
        heading="Create resource"
        data-carbon-surface="custom-panel"
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
          User-defined example - does not use a built-in motion surface. The
          reveal is a definition map passed to the <code>surface()</code> mixin.
          When reduced motion is enabled, it opens and closes with default
          transitions.
        </p>
      </DemoDialog>
    </>
  );
};

// user-defined reveal example using motion.dev
export const CustomSurfaceWithMotion = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="motion-surface-demo__trigger"
        onClick={() => setOpen(true)}>
        Create resource
      </Button>
      <DemoDialog
        surface={stretchReveal}
        open={open}
        onClose={() => setOpen(false)}
        heading="Create resource">
        <p>
          This dialog passes an inline definition to <code>MotionSurface</code>{' '}
          in place of a catalog name. The keyframes and tokens are identical to
          the CSS story above. With reduced motion enabled it opens and closes
          with no animation.
        </p>
      </DemoDialog>
    </>
  );
};
