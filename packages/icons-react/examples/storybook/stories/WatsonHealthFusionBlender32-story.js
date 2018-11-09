import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthFusionBlender32 from '../../../lib/WatsonHealthFusionBlender/32';

storiesOf('WatsonHealthFusionBlender32', module)
  .add('default', () => <WatsonHealthFusionBlender32 />)
  .add('with accessibility label', () => (
    <WatsonHealthFusionBlender32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthFusionBlender32 focusable>
      <title>Icon title</title>
    </WatsonHealthFusionBlender32>
  ));
