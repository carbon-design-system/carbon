import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthLaunchStudy_124 from '../../../es/watson-health/launch-study--1/24.js';

storiesOf('WatsonHealthLaunchStudy_124', module)
  .add('default', () => <WatsonHealthLaunchStudy_124 />)
  .add('with accessibility label', () => (
    <WatsonHealthLaunchStudy_124 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthLaunchStudy_124 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthLaunchStudy_124>
  ));
