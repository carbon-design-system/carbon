import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthSaveAnnotation32 from '../../../es/watson-health/save--annotation/32.js';

storiesOf('WatsonHealthSaveAnnotation32', module)
  .add('default', () => <WatsonHealthSaveAnnotation32 />)
  .add('with accessibility label', () => (
    <WatsonHealthSaveAnnotation32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthSaveAnnotation32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthSaveAnnotation32>
  ));
