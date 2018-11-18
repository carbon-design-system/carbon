import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthFusionBlender20 from '../../../es/watson-health/fusion-blender/20.js';

storiesOf('WatsonHealthFusionBlender20', module)
  .add('default', () => <WatsonHealthFusionBlender20 />)
  .add('with accessibility label', () => (
    <WatsonHealthFusionBlender20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthFusionBlender20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthFusionBlender20>
  ));
