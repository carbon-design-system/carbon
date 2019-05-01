/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import Filter16 from '@carbon/icons-react/lib/filter/16';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import TooltipIcon from '../TooltipIcon';

const directions = {
  'Bottom (bottom)': 'bottom',
  'Top (top)': 'top',
};

const props = () => ({
  direction: select('Tooltip direction (direction)', directions, 'bottom'),
  tooltipText: text('Tooltip content (tooltipText)', 'Filter'),
});

storiesOf('TooltipIcon', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    () => (
      <TooltipIcon {...props()}>
        <Filter16 />
      </TooltipIcon>
    ),
    {
      info: {
        text: `
            Tooltip Icon
          `,
      },
    }
  );
