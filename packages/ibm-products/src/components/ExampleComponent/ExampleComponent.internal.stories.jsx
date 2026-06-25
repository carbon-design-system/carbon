/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { action } from 'storybook/actions';
import { Add } from '@carbon/react/icons';
import { ExampleComponent } from '.';
import { pkg } from '../../settings';
// import DocsPage from './ExampleComponent.docs-page';

// import styles from './_storybook-styles.scss?inline';

export default {
  title: 'Internal/ExampleComponent',
  component: ExampleComponent,
  tags: ['autodocs'],
  argTypes: {
    borderColor: { control: 'color' },
  },
  parameters: {
    // styles,
    docs: {
      // page:  DocsPage, // OPTIONAL: required only to customize default docs page
    },
  },
};

// eslint-disable-next-line react/prop-types
const Template = ({ featureFlags, ...args }) => {
  if (featureFlags) {
    pkg._silenceWarnings(false); // warnings are ordinarily silenced in storybook, add this to test.
    Object.keys(featureFlags).forEach((flagKey) => {
      pkg.feature[flagKey] = featureFlags[flagKey];
    });
    pkg._silenceWarnings(true);
  }

  return (
    <ExampleComponent
      primaryButtonLabel="Primary"
      secondaryButtonLabel="Secondary"
      onPrimaryClick={action('onPrimaryClick')}
      onSecondaryClick={action('onSecondaryClick')}
      {...args}
    />
  );
};

export const exampleComponent = Template.bind({});
exampleComponent.args = {};

export const borderedSet = Template.bind({});
borderedSet.args = {
  ...exampleComponent.args,
  borderColor: '#141414',
  borderType: 'box',
};

export const featureFlagSecondaryIconFalse = Template.bind({});
featureFlagSecondaryIconFalse.args = {
  ...exampleComponent.args,
  secondaryIcon: Add,
  featureFlags: { ['ExampleComponent.secondaryIcon']: false },
};

export const featureFlagSecondaryIconTrue = Template.bind({});
featureFlagSecondaryIconTrue.args = {
  ...exampleComponent.args,
  secondaryIcon: Add,
  featureFlags: { ['ExampleComponent.secondaryIcon']: true },
};

// eslint-disable-next-line react/prop-types
const HookedTemplate = ({ featureFlags, ...args }) => {
  if (featureFlags) {
    pkg._silenceWarnings(false); // warnings are ordinarily silenced in storybook, add this to test.
    Object.keys(featureFlags).forEach((flagKey) => {
      pkg.feature[flagKey] = featureFlags[flagKey];
    });
    pkg._silenceWarnings(true);
  }

  return (
    <ExampleComponent
      usesExampleHook={10}
      primaryButtonLabel="Primary"
      secondaryButtonLabel="Secondary"
      onPrimaryClick={action('onPrimaryClick')}
      onSecondaryClick={action('onSecondaryClick')}
      {...args}
    />
  );
};

export const exampleHookDisabledComponent = HookedTemplate.bind({});
exampleHookDisabledComponent.args = {
  featureFlags: { ['ExampleComponent.useExample']: false },
};

export const exampleHookEnabledComponent = HookedTemplate.bind({});
exampleHookEnabledComponent.args = {
  featureFlags: { ['ExampleComponent.useExample']: true },
};
