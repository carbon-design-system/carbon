import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCrossReference32 from '../../../lib/watson-health--cross-reference/32';

storiesOf('WatsonHealthCrossReference32', module)
  .add('default', () => <WatsonHealthCrossReference32 />)
  .add('with accessibility label', () => (
    <WatsonHealthCrossReference32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCrossReference32 focusable>
      <title>Icon title</title>
    </WatsonHealthCrossReference32>
  ));
