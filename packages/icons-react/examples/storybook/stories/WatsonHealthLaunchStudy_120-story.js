import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthLaunchStudy_120 from '../../../es/watson-health/launch-study--1/20.js';

storiesOf('WatsonHealthLaunchStudy_120', module)
  .add('default', () => <WatsonHealthLaunchStudy_120 />)
  .add('with accessibility label', () => (
    <WatsonHealthLaunchStudy_120 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthLaunchStudy_120 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthLaunchStudy_120>
  ));
