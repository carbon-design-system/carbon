import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ContentSwitcher from '../ContentSwitcher';
import Switch from '../Switch';

storiesOf('ContentSwitcher', module)
  .addWithInfo(
    'Default',
    `
      The Content Switcher component manipulates the content shown following an exclusive or “either/or” pattern.
      Create Switch components for each section in the content switcher.
    `,
    () => (
      <ContentSwitcher onChange={action('onChange')}>
        <Switch kind="anchor" name="one" text="First section" />
        <Switch kind="anchor" name="two" text="Second section" />
        <Switch kind="anchor" name="three" text="Third section" />
      </ContentSwitcher>
    )
  )
  .addWithInfo(
    'Selected',
    `
      Render the Content Switcher with a different section automatically selected
    `,
    () => (
      <ContentSwitcher selectedIndex={1} onChange={action('onChange')}>
        <Switch kind="anchor" name="one" text="First section" />
        <Switch kind="anchor" name="two" text="Second section" />
        <Switch kind="anchor" name="three" text="Third section" />
      </ContentSwitcher>
    )
  );
