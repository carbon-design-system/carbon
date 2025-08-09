/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Popover, PopoverContent } from '../Popover';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';
import { Checkbox as CheckboxIcon } from '@carbon/icons-react';

import './story.scss';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/Popover/Feature Flag',
  component: Popover,
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

export const FloatingStyles = (args) => {
  const [open, setOpen] = useState(true);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Popover open={open} align={args.align}>
        <div className="playground-trigger">
          <CheckboxIcon
            onClick={() => {
              setOpen(!open);
            }}
          />
        </div>
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

FloatingStyles.args = {
  align: 'bottom',
};

FloatingStyles.argTypes = {
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
    control: {
      type: 'select',
    },
  },
};
