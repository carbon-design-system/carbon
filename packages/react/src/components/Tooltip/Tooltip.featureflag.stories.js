/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { OverflowMenuVertical } from '@carbon/icons-react';
import { Tooltip } from '../Tooltip';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

import './story.scss';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/Tooltip/Feature Flag',
  component: Tooltip,
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
  const tooltipLabel = 'Options';
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Tooltip label={tooltipLabel} align={args.align}>
        <button className="sb-tooltip-trigger" type="button">
          <OverflowMenuVertical />
        </button>
      </Tooltip>
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
  label: {
    control: {
      type: 'text',
    },
  },
  description: {
    control: {
      type: 'text',
    },
  },
  highContrast: {
    table: {
      disable: true,
    },
  },
};
