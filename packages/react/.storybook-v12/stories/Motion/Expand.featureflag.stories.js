/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { AspectRatio } from '../../../src/components/AspectRatio';
import { ClickableTile } from '../../../src/components/Tile';
import { Column, Grid } from '../../../src/components/Grid';
import { ArrowRight } from '@carbon/icons-react';
import { MotionSurfaceOrigin } from '../../../src/internal/motion/MotionSurface';
import { DemoDialog } from './DemoDialog';
import mdx from './Motion.mdx';
import './surfaces.stories.scss';

export default {
  title: 'Elements/Motion',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const solutionTiles = [
  {
    id: 'multicloud-management',
    name: 'Multicloud management',
    description:
      'Increase operational efficiency with intelligent data analysis and built-in support for compliance management.',
  },
  {
    id: 'cloud-pak-integration',
    name: 'Cloud Pak for integration',
    description:
      'Integrate applications and data across on-premises and cloud environments.',
  },
  {
    id: 'cloud-pak-automation',
    name: 'Cloud Pak for automation',
    description:
      'Design, build, and run automation applications and services on any cloud.',
  },
  {
    id: 'cloud-pak-applications',
    name: 'Cloud Pak for applications',
    description:
      'Modernize existing applications and develop cloud-native apps with continuous compliance.',
  },
  {
    id: 'cloud-pak-data',
    name: 'Cloud Pak for data',
    description:
      'Collect, organize, analyze, and operationalize data and AI across your business.',
  },
  {
    id: 'all-solutions',
    name: 'View all IBM solutions',
    description:
      'Explore products and services designed to solve complex business challenges.',
  },
];

/**
 * Card/tile > dialog. Each tile is a MotionSurfaceOrigin; the dialog
 * container is the MotionSurface with the matching surfaceId, so Motion
 * morphs the clicked tile into the dialog and back on close.
 */
export const Expand = () => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Grid condensed>
        {solutionTiles.map((tile) => (
          <Column key={tile.id} sm={4} md={4} lg={5}>
            <MotionSurfaceOrigin
              key={tile.id}
              surface="expand"
              surfaceId={`expand-${tile.id}`}>
              <AspectRatio
                layout
                as={ClickableTile}
                aria-expanded={open && selected?.id === tile.id}
                aria-haspopup="dialog"
                className="motion-surface-tile"
                clicked={open && selected?.id === tile.id}
                onClick={() => {
                  setSelected(tile);
                  setOpen(true);
                }}
                ratio="1x1"
                renderIcon={ArrowRight}>
                <div className="motion-surface-tile__content">
                  <h3 className="motion-surface-tile__heading">{tile.name}</h3>
                  <p className="motion-surface-tile__description">
                    {tile.description}
                  </p>
                </div>
              </AspectRatio>
            </MotionSurfaceOrigin>
          </Column>
        ))}
      </Grid>
      <DemoDialog
        surface="expand"
        // Fall back to an unpaired id while nothing is selected; the dialog
        // only opens once a tile has been chosen.
        surfaceId={`expand-${selected?.id ?? 'none'}`}
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
