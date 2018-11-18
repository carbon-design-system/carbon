import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthLaunchStudy_132 from '../../../es/watson-health/launch-study--1/32.js';

storiesOf('WatsonHealthLaunchStudy_132', module)
  .add('default', () => <WatsonHealthLaunchStudy_132 />)
  .add('with accessibility label', () => (
    <WatsonHealthLaunchStudy_132 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthLaunchStudy_132 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthLaunchStudy_132>
  ));
