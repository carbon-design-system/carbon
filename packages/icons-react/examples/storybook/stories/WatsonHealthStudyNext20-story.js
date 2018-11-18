import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStudyNext20 from '../../../es/watson-health/study--next/20.js';

storiesOf('WatsonHealthStudyNext20', module)
  .add('default', () => <WatsonHealthStudyNext20 />)
  .add('with accessibility label', () => (
    <WatsonHealthStudyNext20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStudyNext20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthStudyNext20>
  ));
