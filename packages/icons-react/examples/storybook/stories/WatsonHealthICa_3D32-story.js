import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthICa_3D32 from '../../../lib/watson-health--iCA-3D/32';

storiesOf('WatsonHealthICa_3D32', module)
  .add('default', () => <WatsonHealthICa_3D32 />)
  .add('with accessibility label', () => (
    <WatsonHealthICa_3D32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthICa_3D32 focusable>
      <title>Icon title</title>
    </WatsonHealthICa_3D32>
  ));
