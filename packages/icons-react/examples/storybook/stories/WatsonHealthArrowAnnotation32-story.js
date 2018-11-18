import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthArrowAnnotation32 from '../../../es/watson-health/arrow-annotation/32.js';

storiesOf('WatsonHealthArrowAnnotation32', module)
  .add('default', () => <WatsonHealthArrowAnnotation32 />)
  .add('with accessibility label', () => (
    <WatsonHealthArrowAnnotation32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthArrowAnnotation32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthArrowAnnotation32>
  ));
