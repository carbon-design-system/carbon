import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthFusionBlender32 from '../../../es/watson-health/fusion-blender/32.js';

storiesOf('WatsonHealthFusionBlender32', module)
  .add('default', () => <WatsonHealthFusionBlender32 />)
  .add('with accessibility label', () => (
    <WatsonHealthFusionBlender32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthFusionBlender32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthFusionBlender32>
  ));
