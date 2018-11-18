import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthSpineLabel32 from '../../../es/watson-health/spine-label/32.js';

storiesOf('WatsonHealthSpineLabel32', module)
  .add('default', () => <WatsonHealthSpineLabel32 />)
  .add('with accessibility label', () => (
    <WatsonHealthSpineLabel32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthSpineLabel32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthSpineLabel32>
  ));
