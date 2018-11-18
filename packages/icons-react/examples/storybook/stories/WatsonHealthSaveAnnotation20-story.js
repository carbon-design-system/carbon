import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthSaveAnnotation20 from '../../../es/watson-health/save--annotation/20.js';

storiesOf('WatsonHealthSaveAnnotation20', module)
  .add('default', () => <WatsonHealthSaveAnnotation20 />)
  .add('with accessibility label', () => (
    <WatsonHealthSaveAnnotation20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthSaveAnnotation20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthSaveAnnotation20>
  ));
