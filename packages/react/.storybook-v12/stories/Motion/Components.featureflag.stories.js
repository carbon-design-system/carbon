/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Information } from '@carbon/icons-react';
import Button from '../../../src/components/Button';
import Dropdown from '../../../src/components/Dropdown';
import { FeatureFlags } from '../../../src/components/FeatureFlags';
import { Popover, PopoverContent } from '../../../src/components/Popover';
import { TextInput } from '../../../src/components/TextInput';
import {
  Toggletip,
  ToggletipButton,
  ToggletipContent,
  ToggletipActions,
  ToggletipLabel,
} from '../../../src/components/Toggletip';
import { Tooltip } from '../../../src/components/Tooltip';
import mdx from './Motion.mdx';

export default {
  title: 'Elements/Motion/Components',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const dropdownItems = [
  { id: 'option-1', text: 'Option 1' },
  { id: 'option-2', text: 'Option 2' },
  { id: 'option-3', text: 'Option 3' },
  { id: 'option-4', text: 'Option 4' },
  { id: 'option-5', text: 'Option 5' },
];

/**
 * All five components that have motion wired under `enable-v12-motion`:
 * TextInput, Dropdown, Popover, ToggleTip, and Tooltip — shown together in a
 * single story so reviewers can exercise them side by side.
 */
export const AllComponents = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <FeatureFlags enableV12Motion>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
          padding: '2rem',
        }}>
        {/* TextInput */}
        <div style={{ maxInlineSize: '32rem' }}>
          <h4
            style={{
              marginBlockEnd: '0.75rem',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}>
            TextInput
          </h4>
          <TextInput
            id="motion-text-input"
            labelText="Label"
            placeholder="Placeholder text"
            helperText="Helper text"
          />
        </div>

        {/* Dropdown */}
        <div style={{ maxInlineSize: '32rem' }}>
          <h4
            style={{
              marginBlockEnd: '0.75rem',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}>
            Dropdown
          </h4>
          <Dropdown
            id="motion-dropdown"
            titleText="Label"
            label="Choose an option"
            items={dropdownItems}
            itemToString={(item) => (item ? item.text : '')}
            helperText="Helper text"
          />
        </div>

        {/* Popover · Toggletip · Tooltip — horizontal row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(16rem, max-content))',
            gap: '3rem',
            alignItems: 'flex-start',
          }}>
          {/* Popover */}
          <div>
            <h4
              style={{
                marginBlockEnd: '0.75rem',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}>
              Popover
            </h4>
            <Popover
              open={popoverOpen}
              onRequestClose={() => setPopoverOpen(false)}
              align="bottom-left">
              <Button onClick={() => setPopoverOpen((prev) => !prev)}>
                {popoverOpen ? 'Close popover' : 'Open popover'}
              </Button>
              <PopoverContent>
                <div style={{ padding: '1rem', maxInlineSize: '16rem' }}>
                  <p style={{ marginBlockEnd: '0.5rem', fontWeight: 600 }}>
                    Contextual surface
                  </p>
                  <p>
                    Fades and scales in using the <code>contextual</code> motion
                    surface — <code>fast-02</code> with entrance/exit expressive
                    easing.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Tooltip */}
          <div>
            <h4
              style={{
                marginBlockEnd: '0.75rem',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}>
              Tooltip
            </h4>
            <Tooltip autoAlign align="bottom" description="Tooltip label">
              <Button>Button with tooltip</Button>
            </Tooltip>
          </div>

          {/* Toggletip */}
          <div>
            <h4
              style={{
                marginBlockEnd: '0.75rem',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}>
              Toggletip
            </h4>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ToggletipLabel>Label text</ToggletipLabel>
              <Toggletip align="bottom">
                <ToggletipButton label="Show information">
                  <Information />
                </ToggletipButton>
                <ToggletipContent>
                  <p>
                    Toggletip inherits contextual surface motion via Popover —
                    click the icon to see the fade + scale reveal.
                  </p>
                  <ToggletipActions>
                    <Button kind="ghost" size="sm">
                      Learn more
                    </Button>
                  </ToggletipActions>
                </ToggletipContent>
              </Toggletip>
            </div>
          </div>
        </div>
      </div>
    </FeatureFlags>
  );
};

AllComponents.storyName =
  'TextInput, Dropdown, Popover, Toggletip, Tooltip — enable-v12-motion';
