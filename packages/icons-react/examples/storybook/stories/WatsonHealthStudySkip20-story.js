import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStudySkip20 from '../../../es/watson-health/study--skip/20.js';

storiesOf('WatsonHealthStudySkip20', module)
  .add('default', () => <WatsonHealthStudySkip20 />)
  .add('with accessibility label', () => (
    <WatsonHealthStudySkip20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStudySkip20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthStudySkip20>
  ));
