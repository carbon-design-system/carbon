import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthAnnotationVisibility32 from '../../../lib/WatsonHealthAnnotationVisibility/32';

storiesOf('WatsonHealthAnnotationVisibility32', module)
  .add('default', () => <WatsonHealthAnnotationVisibility32 />)
  .add('with accessibility label', () => (
    <WatsonHealthAnnotationVisibility32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthAnnotationVisibility32 focusable>
      <title>Icon title</title>
    </WatsonHealthAnnotationVisibility32>
  ));
