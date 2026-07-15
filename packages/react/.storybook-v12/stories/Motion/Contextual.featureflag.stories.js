/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Button from '../../../src/components/Button';
import { ClickableTile } from '../../../src/components/Tile';
import { MotionSurfaceOrigin } from '../../../src/internal/motion/MotionSurface';
import { DemoDialog } from './DemoDialog';
import './surfaces.stories.scss';

export default {
  title: 'Elements/Motion',
  tags: ['!autodocs'],
};

const plans = [
  {
    id: 'lite',
    name: 'Lite',
    summary: '2 vCPUs | 4GB RAM',
    price: '$0.12 USD / hourly',
  },
  {
    id: 'graduated',
    name: 'Graduated tier',
    summary: '2 vCPUs | 8GB RAM',
    price: '$0.13 USD / hourly',
  },
  {
    id: 'premium',
    name: 'Premium',
    summary: '4 vCPUs | 10GB RAM',
    price: '$0.20 USD / hourly',
  },
];

/**
 * Button > dialog. The contextual surface is a reveal animation.
 */
export const Contextual = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MotionSurfaceOrigin
        surface="contextual"
        surfaceId="contextual-demo"
        className="motion-surface-demo__trigger">
        <Button onClick={() => setOpen(true)}>Create resource</Button>
      </MotionSurfaceOrigin>
      <DemoDialog
        surface="contextual"
        surfaceId="contextual-demo"
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
