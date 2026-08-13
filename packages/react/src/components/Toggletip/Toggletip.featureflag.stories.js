/**
 * Copyright IBM Corp. 2016, 2026
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

const args = {
  align: 'bottom',
  bodyText:
    'Scroll the container to observe how the toggletip automatically changes position to stay within the viewport.',
  buttonLabel: 'Show auto-alignment details',
  buttonText: 'View details',
  defaultOpen: true,
  labelText: 'Automatic alignment',
  linkText: 'Learn more',
};

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
  const {
    align,
    bodyText,
    buttonLabel,
    buttonText,
    defaultOpen,
    labelText,
    linkText,
  } = args;

  return (
    <div>
      <ToggletipLabel>{labelText}</ToggletipLabel>
      <Toggletip
        key={defaultOpen ? 'open' : 'closed'}
        align={align}
        defaultOpen={defaultOpen}>
        <ToggletipButton label={buttonLabel}>
          <Information />
        </ToggletipButton>
        <ToggletipContent>
          <p>{bodyText}</p>
          <ToggletipActions>
            <Link href="#">{linkText}</Link>
            <Button size="sm">{buttonText}</Button>
          </ToggletipActions>
        </ToggletipContent>
      </Toggletip>
    </div>
  );
};

FloatingStyles.args = args;

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
  bodyText: {
    control: 'text',
    table: {
      category: 'ToggletipContent',
    },
  },
  buttonLabel: {
    control: 'text',
    table: {
      category: 'ToggletipButton',
    },
  },
  buttonText: {
    control: 'text',
    table: {
      category: 'ToggletipActions',
    },
  },
  defaultOpen: {
    control: 'boolean',
  },
  labelText: {
    control: 'text',
    table: {
      category: 'ToggletipLabel',
    },
  },
  linkText: {
    control: 'text',
    table: {
      category: 'ToggletipActions',
    },
  },
};

FloatingStyles.parameters = {
  controls: {
    include: Object.keys(FloatingStyles.argTypes),
  },
};
