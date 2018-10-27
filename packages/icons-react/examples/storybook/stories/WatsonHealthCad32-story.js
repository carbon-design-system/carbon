import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCad32 from '../../../lib/watson-health--CAD/32';

storiesOf('WatsonHealthCad32', module)
  .add('default', () => <WatsonHealthCad32 />)
  .add('with accessibility label', () => (
    <WatsonHealthCad32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCad32 focusable>
      <title>Icon title</title>
    </WatsonHealthCad32>
  ));
