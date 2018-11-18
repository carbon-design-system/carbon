import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStudyPrevious32 from '../../../es/watson-health/study--previous/32.js';

storiesOf('WatsonHealthStudyPrevious32', module)
  .add('default', () => <WatsonHealthStudyPrevious32 />)
  .add('with accessibility label', () => (
    <WatsonHealthStudyPrevious32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStudyPrevious32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthStudyPrevious32>
  ));
