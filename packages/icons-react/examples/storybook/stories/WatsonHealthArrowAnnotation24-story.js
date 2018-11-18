import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthArrowAnnotation24 from '../../../es/watson-health/arrow-annotation/24.js';

storiesOf('WatsonHealthArrowAnnotation24', module)
  .add('default', () => <WatsonHealthArrowAnnotation24 />)
  .add('with accessibility label', () => (
    <WatsonHealthArrowAnnotation24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthArrowAnnotation24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthArrowAnnotation24>
  ));
