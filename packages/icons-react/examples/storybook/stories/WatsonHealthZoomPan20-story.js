import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthZoomPan20 from '../../../es/watson-health/zoom-pan/20.js';

storiesOf('WatsonHealthZoomPan20', module)
  .add('default', () => <WatsonHealthZoomPan20 />)
  .add('with accessibility label', () => (
    <WatsonHealthZoomPan20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthZoomPan20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthZoomPan20>
  ));
