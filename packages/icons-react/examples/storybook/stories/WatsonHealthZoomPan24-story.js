import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthZoomPan24 from '../../../es/watson-health/zoom-pan/24.js';

storiesOf('WatsonHealthZoomPan24', module)
  .add('default', () => <WatsonHealthZoomPan24 />)
  .add('with accessibility label', () => (
    <WatsonHealthZoomPan24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthZoomPan24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthZoomPan24>
  ));
