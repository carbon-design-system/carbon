import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthArrowAnnotation20 from '../../../es/watson-health/arrow-annotation/20.js';

storiesOf('WatsonHealthArrowAnnotation20', module)
  .add('default', () => <WatsonHealthArrowAnnotation20 />)
  .add('with accessibility label', () => (
    <WatsonHealthArrowAnnotation20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthArrowAnnotation20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthArrowAnnotation20>
  ));
