import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthSaveImage32 from '../../../lib/watson-health--save--image/32';

storiesOf('WatsonHealthSaveImage32', module)
  .add('default', () => <WatsonHealthSaveImage32 />)
  .add('with accessibility label', () => (
    <WatsonHealthSaveImage32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthSaveImage32 focusable>
      <title>Icon title</title>
    </WatsonHealthSaveImage32>
  ));
