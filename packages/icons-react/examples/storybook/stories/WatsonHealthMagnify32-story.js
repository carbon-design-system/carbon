import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthMagnify32 from '../../../lib/WatsonHealthMagnify/32';

storiesOf('WatsonHealthMagnify32', module)
  .add('default', () => <WatsonHealthMagnify32 />)
  .add('with accessibility label', () => (
    <WatsonHealthMagnify32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthMagnify32 focusable>
      <title>Icon title</title>
    </WatsonHealthMagnify32>
  ));
