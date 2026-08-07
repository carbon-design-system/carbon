/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { OverflowMenuVertical } from '@carbon/icons-react';
import Button from '../../../src/components/Button';
import { FeatureFlags } from '../../../src/components/FeatureFlags';
import { Popover, PopoverContent } from '../../../src/components/Popover';
import { Tooltip } from '../../../src/components/Tooltip';
import mdx from './Motion.mdx';

export default {
  title: 'Elements/Motion/Popover',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

/**
 * Button > Popover. The contextual surface is a fade + scale * reveal
 */
export const PopoverWithContextualMotion = () => {
  const [open, setOpen] = useState(false);

  return (
    <FeatureFlags enableV12PopoverMotion>
      <Popover
        open={open}
        onRequestClose={() => setOpen(false)}
        align="bottom-left">
        <Button onClick={() => setOpen((prev) => !prev)}>
          {open ? 'Close popover' : 'Open popover'}
        </Button>
        <PopoverContent>
          <div style={{ padding: '1rem', maxWidth: '16rem' }}>
            <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
              Contextual surface
            </p>
            <p>
              This popover fades and scales in using the <code>contextual</code>{' '}
              motion surface — <code>fast-02</code> duration with entrance/exit
              expressive easing.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </FeatureFlags>
  );
};

/**
 * Tooltip. Tooltip is a thin wrapper around Popover + PopoverContent, so it
 * inherits the contextual surface motion automatically — no changes to
 * Tooltip.tsx are needed. The `enable-v12-popover-motion` flag activates the
 * same fade + scale reveal on the tooltip panel.
 *
 * Hover or focus the icon button to see the animation.
 */
export const TooltipWithContextualMotion = () => (
  <FeatureFlags enableV12PopoverMotion>
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Tooltip autoAlign align="bottom" description="tooltip label">
        <Button>This button has a tooltip</Button>
      </Tooltip>
    </div>
  </FeatureFlags>
);
