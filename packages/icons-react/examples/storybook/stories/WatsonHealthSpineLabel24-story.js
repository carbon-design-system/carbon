import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthSpineLabel24 from '../../../es/watson-health/spine-label/24.js';

storiesOf('WatsonHealthSpineLabel24', module)
  .add('default', () => <WatsonHealthSpineLabel24 />)
  .add('with accessibility label', () => (
    <WatsonHealthSpineLabel24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthSpineLabel24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthSpineLabel24>
  ));
