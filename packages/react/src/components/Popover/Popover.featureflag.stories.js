/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent } from '../Popover';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';
import { Checkbox as CheckboxIcon } from '@carbon/icons-react';

import './story.scss';

const args = {
  align: 'bottom',
  alignmentAxisOffset: 0,
  backgroundToken: 'layer',
  border: false,
  caret: true,
  dropShadow: true,
  highContrast: false,
  open: true,
};

const argTypes = {
  align: {
    options: [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-end',
      'left-start',
      'right',
      'right-end',
      'right-start',
    ],
    control: { type: 'select' },
  },
  alignmentAxisOffset: {
    control: { type: 'number' },
  },
  backgroundToken: {
    options: ['layer', 'background'],
    control: { type: 'select' },
  },
  border: {
    control: { type: 'boolean' },
  },
  caret: {
    control: { type: 'boolean' },
  },
  dropShadow: {
    control: { type: 'boolean' },
  },
  highContrast: {
    control: { type: 'boolean' },
  },
  onRequestClose: {
    action: 'onRequestClose',
  },
  open: {
    control: { type: 'boolean' },
  },
};

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/Popover/Feature Flag',
  component: Popover,
  tags: ['!autodocs'],
  args,
  argTypes,
  parameters: {
    controls: {
      include: Object.keys(argTypes),
    },
  },
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

export const FloatingStyles = (args) => {
  const { onRequestClose, open: openArg, ...popoverProps } = args;
  const [open, setOpen] = useState(openArg);

  useEffect(() => {
    setOpen(openArg);
  }, [openArg]);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Popover
        {...popoverProps}
        open={open}
        onRequestClose={() => {
          onRequestClose?.();
          setOpen(false);
        }}>
        <button
          className="playground-trigger"
          aria-label="Checkbox"
          aria-expanded={open}
          type="button"
          onClick={() => {
            setOpen(!open);
          }}>
          <CheckboxIcon />
        </button>
        <PopoverContent className="p-3">
          <div>
            <p className="popover-title">This popover uses autoAlign</p>
            <p className="popover-details">
              Scroll the container up, down, left or right to observe how the
              popover will automatically change its position in attempt to stay
              within the viewport. This works on initial render in addition to
              on scroll.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
