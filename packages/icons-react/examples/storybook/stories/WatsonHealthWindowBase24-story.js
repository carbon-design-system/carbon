import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthWindowBase24 from '../../../es/watson-health/window--base/24.js';

storiesOf('WatsonHealthWindowBase24', module)
  .add('default', () => <WatsonHealthWindowBase24 />)
  .add('with accessibility label', () => (
    <WatsonHealthWindowBase24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthWindowBase24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthWindowBase24>
  ));
