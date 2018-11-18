import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthWindowBase20 from '../../../es/watson-health/window--base/20.js';

storiesOf('WatsonHealthWindowBase20', module)
  .add('default', () => <WatsonHealthWindowBase20 />)
  .add('with accessibility label', () => (
    <WatsonHealthWindowBase20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthWindowBase20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthWindowBase20>
  ));
