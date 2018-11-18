import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCrossReference32 from '../../../es/watson-health/cross-reference/32.js';

storiesOf('WatsonHealthCrossReference32', module)
  .add('default', () => <WatsonHealthCrossReference32 />)
  .add('with accessibility label', () => (
    <WatsonHealthCrossReference32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCrossReference32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCrossReference32>
  ));
