import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStudyPrevious24 from '../../../es/watson-health/study--previous/24.js';

storiesOf('WatsonHealthStudyPrevious24', module)
  .add('default', () => <WatsonHealthStudyPrevious24 />)
  .add('with accessibility label', () => (
    <WatsonHealthStudyPrevious24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStudyPrevious24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthStudyPrevious24>
  ));
