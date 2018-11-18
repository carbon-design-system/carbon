import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthSaveAnnotation24 from '../../../es/watson-health/save--annotation/24.js';

storiesOf('WatsonHealthSaveAnnotation24', module)
  .add('default', () => <WatsonHealthSaveAnnotation24 />)
  .add('with accessibility label', () => (
    <WatsonHealthSaveAnnotation24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthSaveAnnotation24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthSaveAnnotation24>
  ));
