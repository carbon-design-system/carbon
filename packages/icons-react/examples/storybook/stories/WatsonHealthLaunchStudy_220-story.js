import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthLaunchStudy_220 from '../../../es/watson-health/launch-study--2/20.js';

storiesOf('WatsonHealthLaunchStudy_220', module)
  .add('default', () => <WatsonHealthLaunchStudy_220 />)
  .add('with accessibility label', () => (
    <WatsonHealthLaunchStudy_220 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthLaunchStudy_220 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthLaunchStudy_220>
  ));
