import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCrossReference24 from '../../../es/watson-health/cross-reference/24.js';

storiesOf('WatsonHealthCrossReference24', module)
  .add('default', () => <WatsonHealthCrossReference24 />)
  .add('with accessibility label', () => (
    <WatsonHealthCrossReference24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCrossReference24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCrossReference24>
  ));
