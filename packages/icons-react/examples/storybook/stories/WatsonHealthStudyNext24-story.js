import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStudyNext24 from '../../../es/watson-health/study--next/24.js';

storiesOf('WatsonHealthStudyNext24', module)
  .add('default', () => <WatsonHealthStudyNext24 />)
  .add('with accessibility label', () => (
    <WatsonHealthStudyNext24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStudyNext24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthStudyNext24>
  ));
