/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import ToggleSmall from '../ToggleSmall';
import ToggleSmallSkeleton from '../ToggleSmall/ToggleSmall.Skeleton';

const a11yprops = () => ({
  labelText: text('Label toggle input control (labelText)', ''),
  ['aria-label']: text('ARIA label of the toggle (aria-label)', ''),
});

const toggleProps = () => ({
  ...a11yprops(),
  className: 'some-class',
  labelA: text('Label for untoggled state (labelA)', ''),
  labelB: text('Label for toggled state (labelB)', ''),
  disabled: boolean('Disabled (disabled)', false),
  onChange: action('onChange'),
  onToggle: action('onToggle'),
});

export default {
  title: 'ToggleSmall',
  decorators: [withKnobs],

  parameters: {
    component: ToggleSmall,

    subcomponents: {
      ToggleSmallSkeleton,
    },
  },
};

export const Toggled = () => (
  <ToggleSmall
    defaultToggled
    {...toggleProps()}
    className="some-class"
    id="toggle-1"
  />
);

Toggled.storyName = 'toggled';

Toggled.parameters = {
  info: {
    text: `
        Toggles are controls that are used to quickly switch between two possible states. The example below shows
        an uncontrolled Toggle component. To use the Toggle component as a controlled component, set the toggled property.
        Setting the toggled property will allow you to change the value dynamically, whereas setting the defaultToggled
        prop will only set the value initially. This example has defaultToggled set to true. Small toggles may be used
        when there is not enough space for a regular sized toggle. This issue is most commonly found in tables.
      `,
  },
};

export const Untoggled = () => (
  <ToggleSmall {...toggleProps()} className="some-class" id="toggle-1" />
);

Untoggled.storyName = 'untoggled';

Untoggled.parameters = {
  info: {
    text: `
        Toggles are controls that are used to quickly switch between two possible states. The example below shows
        an uncontrolled Toggle component. To use the Toggle component as a controlled component, set the toggled property.
        Setting the toggled property will allow you to change the value dynamically, whereas setting the defaultToggled
        prop will only set the value initially. Small toggles may be used when there is not enough space for a regular sized toggle. This issue is most
        commonly found in tables.
      `,
  },
};

export const Skeleton = () => <ToggleSmallSkeleton {...a11yprops()} />;

Skeleton.storyName = 'skeleton';

Skeleton.parameters = {
  info: {
    text: `
            Placeholder skeleton state to use when content is loading.
          `,
  },
};
