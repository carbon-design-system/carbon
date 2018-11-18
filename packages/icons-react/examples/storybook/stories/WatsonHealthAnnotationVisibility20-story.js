import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthAnnotationVisibility20 from '../../../es/watson-health/annotation-visibility/20.js';

storiesOf('WatsonHealthAnnotationVisibility20', module)
  .add('default', () => <WatsonHealthAnnotationVisibility20 />)
  .add('with accessibility label', () => (
    <WatsonHealthAnnotationVisibility20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthAnnotationVisibility20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthAnnotationVisibility20>
  ));
