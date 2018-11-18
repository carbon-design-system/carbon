import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCrossReference20 from '../../../es/watson-health/cross-reference/20.js';

storiesOf('WatsonHealthCrossReference20', module)
  .add('default', () => <WatsonHealthCrossReference20 />)
  .add('with accessibility label', () => (
    <WatsonHealthCrossReference20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCrossReference20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCrossReference20>
  ));
