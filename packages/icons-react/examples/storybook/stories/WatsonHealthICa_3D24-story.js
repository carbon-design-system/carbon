import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthICa_3D24 from '../../../es/watson-health/iCA-3D/24.js';

storiesOf('WatsonHealthICa_3D24', module)
  .add('default', () => <WatsonHealthICa_3D24 />)
  .add('with accessibility label', () => (
    <WatsonHealthICa_3D24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthICa_3D24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthICa_3D24>
  ));
