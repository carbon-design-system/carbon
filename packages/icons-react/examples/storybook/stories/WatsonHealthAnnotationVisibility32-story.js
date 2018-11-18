import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthAnnotationVisibility32 from '../../../es/watson-health/annotation-visibility/32.js';

storiesOf('WatsonHealthAnnotationVisibility32', module)
  .add('default', () => <WatsonHealthAnnotationVisibility32 />)
  .add('with accessibility label', () => (
    <WatsonHealthAnnotationVisibility32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthAnnotationVisibility32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthAnnotationVisibility32>
  ));
