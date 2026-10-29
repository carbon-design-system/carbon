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
import mdx from './Motion.mdx';
import './surfaces.stories.scss';

export default {
  title: 'Elements/Motion/Invoke',
  parameters: {
    docs: {
      page: mdx,
    },
  },
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
 * Button > dialog. The invoke surface is a shared-element morph whose origin
 * is the trigger: the launcher button is the MotionSurfaceOrigin, so the
 * button itself morphs into the dialog and collapses back on close.
 */
export const ButtonToDialog = () => {
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

/**
 * Card/tile > dialog. Each tile is a MotionSurfaceOrigin; the dialog
 * container is the MotionSurface with the matching surfaceId, so Motion
 * morphs the clicked tile into the dialog and back on close.
 */
export const TileToDialog = () => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="motion-surface-demo__grid">
        {plans.map((plan) => (
          <MotionSurfaceOrigin
            key={plan.id}
            surface="invoke"
            surfaceId={`invoke-${plan.id}`}
            className="motion-surface-demo__origin">
            <ClickableTile
              id={plan.id}
              onClick={() => {
                setSelected(plan);
                setOpen(true);
              }}>
              <h4>{plan.name}</h4>
              <p>{plan.summary}</p>
              <p>{plan.price}</p>
            </ClickableTile>
          </MotionSurfaceOrigin>
        ))}
      </div>
      <DemoDialog
        surface="invoke"
        // Fall back to an unpaired id while nothing is selected; the dialog
        // only opens once a tile has been chosen.
        surfaceId={`invoke-${selected?.id ?? 'none'}`}
        open={open}
        onClose={() => setOpen(false)}
        onExitComplete={() => setSelected(null)}
        heading={selected?.name ?? ''}>
        <p>{selected?.summary}</p>
        <p>{selected?.price}</p>
        <p>
          The tile you clicked morphs into this dialog through the expand
          surface and morphs back on close. With reduced motion enabled the
          dialog opens and closes with no morph at all.
        </p>
      </DemoDialog>
    </>
  );
};
