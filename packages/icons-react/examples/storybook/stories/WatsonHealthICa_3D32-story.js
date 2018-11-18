import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthICa_3D32 from '../../../es/watson-health/iCA-3D/32.js';

storiesOf('WatsonHealthICa_3D32', module)
  .add('default', () => <WatsonHealthICa_3D32 />)
  .add('with accessibility label', () => (
    <WatsonHealthICa_3D32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthICa_3D32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthICa_3D32>
  ));
