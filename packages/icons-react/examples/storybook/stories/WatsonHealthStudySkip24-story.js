import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStudySkip24 from '../../../es/watson-health/study--skip/24.js';

storiesOf('WatsonHealthStudySkip24', module)
  .add('default', () => <WatsonHealthStudySkip24 />)
  .add('with accessibility label', () => (
    <WatsonHealthStudySkip24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStudySkip24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthStudySkip24>
  ));
