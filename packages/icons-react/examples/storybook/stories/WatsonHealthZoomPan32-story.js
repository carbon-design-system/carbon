import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthZoomPan32 from '../../../es/watson-health/zoom-pan/32.js';

storiesOf('WatsonHealthZoomPan32', module)
  .add('default', () => <WatsonHealthZoomPan32 />)
  .add('with accessibility label', () => (
    <WatsonHealthZoomPan32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthZoomPan32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthZoomPan32>
  ));
