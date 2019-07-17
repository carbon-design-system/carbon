/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import ContentSwitcher from '../ContentSwitcher';
import Switch from '../Switch';

const props = {
  contentSwitcher: () => ({
    onChange: action('onChange'),
  }),
  switch: () => ({
    onClick: action('onClick - Switch'),
    disabled: boolean('Disabled (disabled)', false),
  }),
};

storiesOf('ContentSwitcher', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
      const switchProps = props.switch();
      return (
        <ContentSwitcher
          {...props.contentSwitcher()}
          selectedIndex={number('Selected Index (selectedIndex)', 0)}>
          <Switch text="First section" {...switchProps} />
          <Switch text="Second section" {...switchProps} />
          <Switch text="Third section" {...switchProps} />
        </ContentSwitcher>
      );
    },
    {
      info: {
        text: `
            The Content Switcher component manipulates the content shown following an exclusive or “either/or” pattern.
            Create Switch components for each section in the content switcher.
          `,
      },
    }
  )
  .add(
    'Selected',
    () => {
      const switchProps = props.switch();
      return (
        <ContentSwitcher {...props.contentSwitcher()} selectedIndex={1}>
          <Switch text="First section" {...switchProps} />
          <Switch text="Second section" {...switchProps} />
          <Switch text="Third section" {...switchProps} />
        </ContentSwitcher>
      );
    },
    {
      info: {
        text: `
             Render the Content Switcher with a different section automatically selected
           `,
      },
    }
  );
