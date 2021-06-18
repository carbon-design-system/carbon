/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  Add16,
  AddFilled16,
  Filter16,
  Search16,
  Information16,
} from '@carbon/icons-react';
import { action } from '@storybook/addon-actions';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import TooltipIcon from '../TooltipIcon';
import mdx from './TooltipIcon.mdx';

const directions = {
  'Top (top)': 'top',
  'Right (right)': 'right',
  'Bottom (bottom)': 'bottom',
  'Left (left)': 'left',
};

const alignments = {
  'Start (start)': 'start',
  'Center (center)': 'center',
  'End (end)': 'end',
};

const icons = {
  'Add (Add16 from `@carbon/icons-react`)': 'Add16',
  'Add (Filled) (AddFilled16 from `@carbon/icons-react`)': 'AddFilled16',
  'Filter (Filter16 from `@carbon/icons-react`)': 'Filter16',
  'Search (Search16 from `@carbon/icons-react`)': 'Search16',
};

const iconMap = {
  Add16,
  AddFilled16,
  Filter16,
  Search16,
};

const props = () => {
  const iconToUse = iconMap[select('Icon (icon)', icons, 'Filter16')];

  return {
    disabled: boolean('Disabled (disabled)', false),
    direction: select('Tooltip direction (direction)', directions, 'bottom'),
    align: select('Tooltip alignment (align)', alignments, 'center'),
    renderIcon: !iconToUse || iconToUse.svgData ? undefined : iconToUse,
    tooltipText: text('Tooltip content (tooltipText)', 'Filter'),
    onClick: action('onClick'),
  };
};

export default {
  title: 'Components/TooltipIcon',
  decorators: [withKnobs],

  parameters: {
    component: TooltipIcon,
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <div
    style={{
      padding: '2rem',
      display: 'flex',
      justifyContent: 'space-between',
      width: '200px',
    }}>
    <TooltipIcon
      tooltipText="Interactive tooltip"
      onClick={action('onClick')}
      renderIcon={Filter16}
    />
    <TooltipIcon
      tooltipText="Non-interactive tooltip"
      renderIcon={Information16}
    />
  </div>
);

export const Playground = () => (
  <div
    style={{
      padding: '2rem',
      display: 'flex',
      justifyContent: 'space-between',
      width: '200px',
    }}>
    <TooltipIcon {...props()} />
  </div>
);
