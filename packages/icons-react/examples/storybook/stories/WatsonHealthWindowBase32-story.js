import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthWindowBase32 from '../../../es/watson-health/window--base/32.js';

storiesOf('WatsonHealthWindowBase32', module)
  .add('default', () => <WatsonHealthWindowBase32 />)
  .add('with accessibility label', () => (
    <WatsonHealthWindowBase32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthWindowBase32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthWindowBase32>
  ));
