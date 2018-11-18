import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthFusionBlender24 from '../../../es/watson-health/fusion-blender/24.js';

storiesOf('WatsonHealthFusionBlender24', module)
  .add('default', () => <WatsonHealthFusionBlender24 />)
  .add('with accessibility label', () => (
    <WatsonHealthFusionBlender24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthFusionBlender24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthFusionBlender24>
  ));
