/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Information } from '@carbon/icons-react';

import { Link } from '../Link';
import { Button } from '../Button';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
  ToggletipActions,
} from '../Toggletip';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/Toggletip/Feature Flag',
  component: Toggletip,
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
  return (
    <div>
      <ToggletipLabel>Toggletip label</ToggletipLabel>
      <Toggletip align={args.align} defaultOpen>
        <ToggletipButton label="Show information">
          <Information />
        </ToggletipButton>
        <ToggletipContent>
          <p>
            Scroll the container up, down, left or right to observe how the
            Toggletip will automatically change its position in attempt to stay
            within the viewport. This works on initial render in addition to on
            scroll.
          </p>
          <ToggletipActions>
            <Link href="#">Link action</Link>
            <Button size="sm">Button</Button>
          </ToggletipActions>
        </ToggletipContent>
      </Toggletip>
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
