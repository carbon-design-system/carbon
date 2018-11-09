import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthWindowBase32 from '../../../lib/WatsonHealthWindowBase/32';

storiesOf('WatsonHealthWindowBase32', module)
  .add('default', () => <WatsonHealthWindowBase32 />)
  .add('with accessibility label', () => (
    <WatsonHealthWindowBase32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthWindowBase32 focusable>
      <title>Icon title</title>
    </WatsonHealthWindowBase32>
  ));
