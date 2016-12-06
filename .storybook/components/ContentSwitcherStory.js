import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ContentSwitcher from '../../components/ContentSwitcher';
import Switch from '../../components/Switch';

storiesOf('ContentSwitcher', module)
  .addWithInfo(
    '',
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
  ));
