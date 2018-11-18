import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthAnnotationVisibility24 from '../../../es/watson-health/annotation-visibility/24.js';

storiesOf('WatsonHealthAnnotationVisibility24', module)
  .add('default', () => <WatsonHealthAnnotationVisibility24 />)
  .add('with accessibility label', () => (
    <WatsonHealthAnnotationVisibility24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthAnnotationVisibility24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthAnnotationVisibility24>
  ));
