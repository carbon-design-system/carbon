/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Button from '../Button';
import { MotionSurfaceOrigin } from '../../internal/motion/MotionSurface';
import { DemoDialog } from './DemoDialog';
import './surfaces.stories.scss';

export default {
  title: 'Motion/Surfaces/Invoke',
  tags: ['!autodocs'],
};

/**
 * Button > dialog. The invoke surface is a shared-element morph whose origin
 * is the trigger: the launcher button is the MotionSurfaceOrigin, so the
 * button itself morphs into the dialog and collapses back on close.
 */
export const Invoke = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MotionSurfaceOrigin
        surface="invoke"
        surfaceId="invoke-demo"
        className="motion-surface-demo__trigger">
        <Button onClick={() => setOpen(true)}>Create resource</Button>
      </MotionSurfaceOrigin>
      <DemoDialog
        surface="invoke"
        surfaceId="invoke-demo"
        open={open}
        onClose={() => setOpen(false)}
        heading="Create resource">
        <p>
          The launcher button morphs into this dialog through the invoke surface
          and collapses back into the button on close. With reduced motion
          enabled the dialog opens and closes with no morph at all.
        </p>
      </DemoDialog>
    </>
  );
};
