import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStudyPrevious20 from '../../../es/watson-health/study--previous/20.js';

storiesOf('WatsonHealthStudyPrevious20', module)
  .add('default', () => <WatsonHealthStudyPrevious20 />)
  .add('with accessibility label', () => (
    <WatsonHealthStudyPrevious20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStudyPrevious20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthStudyPrevious20>
  ));
