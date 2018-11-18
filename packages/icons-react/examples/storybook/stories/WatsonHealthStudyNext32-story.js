import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStudyNext32 from '../../../es/watson-health/study--next/32.js';

storiesOf('WatsonHealthStudyNext32', module)
  .add('default', () => <WatsonHealthStudyNext32 />)
  .add('with accessibility label', () => (
    <WatsonHealthStudyNext32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStudyNext32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthStudyNext32>
  ));
